// Healthcare Frontend Application
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5000/api';
    let token = localStorage.getItem('accessToken');
    let user = JSON.parse(localStorage.getItem('user') || 'null');
    let patients = [];
    let doctors = [];

    // Debug initial token state
    console.log('App initialized - Token:', !!token, 'User:', !!user);
    if (token) {
        console.log('Token length:', token.length);
    }

    // DOM Elements
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const addPatientForm = document.getElementById('add-patient-form');
    const addDoctorForm = document.getElementById('add-doctor-form');
    const mapDoctorForm = document.getElementById('map-doctor-form');
    const logoutBtn = document.getElementById('logout-btn');
    const addPatientBtn = document.getElementById('add-patient-btn');
    const addDoctorBtn = document.getElementById('add-doctor-btn');
    const userNameSpan = document.getElementById('user-name');
    const patientsListDiv = document.getElementById('patients-list');
    const doctorsListDiv = document.getElementById('doctors-list');
    const patientModal = document.getElementById('patient-modal');
    const doctorModal = document.getElementById('doctor-modal');
    const cancelPatientModalBtn = document.getElementById('cancel-patient-modal');
    const cancelDoctorModalBtn = document.getElementById('cancel-doctor-modal');
    const mapModal = document.getElementById('map-modal');
    const cancelMapModalBtn = document.getElementById('cancel-map-modal');
    const mapPatientNameSpan = document.getElementById('map-patient-name');
    const mapPatientIdInput = document.getElementById('map-patient-id');
    const doctorSelect = document.getElementById('doctor-select');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // Utility Functions
    const showToast = (message, isError = true) => {
        toastMessage.textContent = message;
        toast.className = `fixed top-5 right-5 text-white py-3 px-5 rounded-lg shadow-xl transition-opacity duration-300 ${isError ? 'bg-red-600' : 'bg-green-600'}`;
        toast.classList.remove('hidden', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3000);
    };

    const apiFetch = async (endpoint, options = {}) => {
        try {
            const headers = { 'Content-Type': 'application/json', ...options.headers };
            
            // Skip token requirement for authentication endpoints
            const isAuthEndpoint = endpoint.includes('/auth/');
            
            if (!isAuthEndpoint) {
                // For non-auth endpoints, require token
                const currentToken = localStorage.getItem('accessToken');
                
                if (currentToken) {
                    headers['x-access-token'] = currentToken;
                    token = currentToken; // Update the global token variable
                } else {
                    console.warn('No access token found in localStorage');
                    // If no token, redirect to login for protected endpoints
                    handleLogout();
                    throw new Error('No token provided!');
                }
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
            
            let data;
            try {
                data = await response.json();
            } catch {
                data = { message: 'Invalid server response' };
            }
            
            // Handle token expiration for protected endpoints
            if (!isAuthEndpoint && (response.status === 401 || response.status === 403)) {
                if (data.message && data.message.toLowerCase().includes('token')) {
                    console.log('Token expired or invalid, logging out...');
                    handleLogout();
                    throw new Error('Session expired. Please login again.');
                }
            }
            
            if (!response.ok) {
                const errorMessage = data.message || `HTTP Error ${response.status}: ${response.statusText}`;
                throw new Error(errorMessage);
            }
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error; // Let the calling function handle the toast
        }
    };

    // Authentication Functions
    const handleLogin = async (email, password) => {
        try {
            console.log('Attempting login for:', email);
            const data = await apiFetch('/auth/login', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }) 
            });
            
            token = data.accessToken;
            user = { id: data.id, name: data.name, email: data.email };
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful, token stored:', !!token);
            
            showToast(`✅ Welcome back, ${user.name}!`, false);
            initDashboard();
        } catch (error) {
            console.error('Login error:', error);
            showToast(`❌ Login failed: ${error.message}`, true);
        }
    };
    
    const handleRegister = async (name, email, password) => {
        try {
            console.log('Attempting registration for:', email);
            const data = await apiFetch('/auth/register', { 
                method: 'POST', 
                body: JSON.stringify({ name, email, password }) 
            });
            showToast(`✅ ${data.message}`, false);
            registerForm.reset();
            switchToLogin();
        } catch (error) {
            console.error('Registration error:', error);
            showToast(`❌ Registration failed: ${error.message}`, true);
        }
    };

    const handleLogout = () => {
        console.log('Logging out user...');
        token = null;
        user = null;
        patients = [];
        doctors = [];
        localStorage.clear();
        // Reset the UI
        if (patientsListDiv) patientsListDiv.innerHTML = '';
        if (doctorsListDiv) doctorsListDiv.innerHTML = '';
        updateView();
        // Don't show toast during initial load or recursive calls
        if (typeof showToast === 'function') {
            showToast('Logged out successfully', false);
        }
    };

    // Data Management Functions
    const fetchPatients = async () => { 
        patients = await apiFetch('/patients'); 
        // Fetch assignments for each patient
        for (let patient of patients) {
            patient.assignments = await fetchPatientAssignments(patient.id);
        }
        renderPatients(); 
    };

    const fetchDoctors = async () => { 
        doctors = await apiFetch('/doctors'); 
        renderDoctors(); 
    };

    const fetchPatientAssignments = async (patientId) => {
        try {
            const assignments = await apiFetch(`/mappings/patient/${patientId}`);
            return assignments || []; // Ensure we always return an array
        } catch (error) {
            console.error(`Error fetching assignments for patient ${patientId}:`, error);
            // Don't show toast for assignment errors as it's not critical
            return []; // Return empty array on error
        }
    };
    
    const createPatient = async (name, dob, history) => {
        try {
            await apiFetch('/patients', { method: 'POST', body: JSON.stringify({ name, dateOfBirth: dob, medicalHistory: history }) });
            showToast('Patient added successfully!', false);
            fetchPatients();
            toggleModal(patientModal, false);
            addPatientForm.reset();
        } catch (error) {
            showToast(error.message || 'Failed to add patient');
        }
    };
    
    const createDoctor = async (name, specialization) => {
        try {
            await apiFetch('/doctors', { method: 'POST', body: JSON.stringify({ name, specialization }) });
            showToast('Doctor added successfully!', false);
            fetchDoctors();
            toggleModal(doctorModal, false);
            addDoctorForm.reset();
        } catch (error) {
            showToast(error.message || 'Failed to add doctor');
        }
    };
    
    const mapDoctorToPatient = async (patientId, doctorId) => {
        try {
            // Find the selected doctor to get the name
            const selectedDoctor = doctors.find(d => d.id.toString() === doctorId.toString());
            const patientName = mapPatientNameSpan.textContent;
            
            await apiFetch('/mappings', { method: 'POST', body: JSON.stringify({ patientId, doctorId }) });
            
            const doctorName = selectedDoctor ? selectedDoctor.name : 'Doctor';
            showToast(`✅ Dr. ${doctorName} has been assigned to ${patientName} successfully!`, false);
            toggleModal(mapModal, false);
            fetchPatients(); // Refresh to show new assignment
        } catch (error) {
            console.error('Assignment error:', error);
            showToast(`❌ Failed to assign doctor: ${error.message}`, true);
        }
    };

    const deletePatient = async (patientId, patientName) => {
        if (confirm(`🗑️ DELETE PATIENT\n\nAre you sure you want to delete patient "${patientName}"?\n\n⚠️ This action cannot be undone and will remove all doctor assignments for this patient.`)) {
            try {
                // Check if we're still authenticated
                const currentToken = localStorage.getItem('accessToken');
                if (!currentToken) {
                    showToast('❌ Please login again to perform this action', true);
                    handleLogout();
                    return;
                }
                
                await apiFetch(`/patients/${patientId}`, { method: 'DELETE' });
                showToast(`✅ Patient "${patientName}" deleted successfully!`, false);
                fetchPatients();
            } catch (error) {
                console.error('Delete patient error:', error);
                if (error.message.includes('token') || error.message.includes('Session expired')) {
                    showToast(`❌ Session expired. Please login again.`, true);
                    handleLogout();
                } else {
                    showToast(`❌ Failed to delete patient: ${error.message}`, true);
                }
            }
        }
    };

    const deleteDoctor = async (doctorId, doctorName) => {
        if (confirm(`🗑️ DELETE DOCTOR\n\nAre you sure you want to delete Dr. "${doctorName}"?\n\n⚠️ This action cannot be undone and will remove all patient assignments for this doctor.`)) {
            try {
                // Check if we're still authenticated
                const currentToken = localStorage.getItem('accessToken');
                if (!currentToken) {
                    showToast('❌ Please login again to perform this action', true);
                    handleLogout();
                    return;
                }
                
                await apiFetch(`/doctors/${doctorId}`, { method: 'DELETE' });
                showToast(`✅ Dr. "${doctorName}" deleted successfully!`, false);
                fetchDoctors();
                fetchPatients(); // Refresh patients to update their assignments
            } catch (error) {
                console.error('Delete doctor error:', error);
                if (error.message.includes('token') || error.message.includes('Session expired')) {
                    showToast(`❌ Session expired. Please login again.`, true);
                    handleLogout();
                } else {
                    showToast(`❌ Failed to delete doctor: ${error.message}`, true);
                }
            }
        }
    };

    const removeAssignment = async (patientId, doctorId, patientName, doctorName) => {
        if (confirm(`🔄 REMOVE ASSIGNMENT\n\nRemove Dr. ${doctorName} from patient "${patientName}"?\n\nThis will only remove the assignment, not delete the doctor or patient.`)) {
            try {
                await apiFetch('/mappings', { 
                    method: 'DELETE', 
                    body: JSON.stringify({ patientId, doctorId }) 
                });
                showToast(`✅ Dr. ${doctorName} removed from ${patientName} successfully!`, false);
                fetchPatients(); // Refresh to show updated assignments
            } catch (error) {
                console.error('Remove assignment error:', error);
                showToast(`❌ Failed to remove assignment: ${error.message}`, true);
            }
        }
    };

    // Rendering Functions
    const renderPatients = () => {
        patientsListDiv.innerHTML = patients.length ? '' : `<div class="text-center text-gray-500 py-10"><p>No patients found.</p><p class="text-sm">Click "Add Patient" to get started.</p></div>`;
        patients.forEach(p => {
            const div = document.createElement('div');
            div.className = 'p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50 mb-4';
            
            // Create assignments display
            let assignmentsHtml = '';
            if (p.assignments && p.assignments.length > 0) {
                assignmentsHtml = `
                    <div class="mt-3 p-3 bg-blue-50 rounded-md">
                        <h4 class="text-sm font-semibold text-blue-800 mb-2">Assigned Doctors:</h4>
                        <div class="space-y-1">
                            ${p.assignments.map(assignment => {
                                // Safe access to doctor properties with fallbacks
                                const doctorName = assignment.doctor?.name || 'Unknown Doctor';
                                const doctorSpec = assignment.doctor?.specialization || 'Unknown Specialization';
                                const doctorId = assignment.doctor?.id || assignment.doctorId;
                                
                                return `
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-blue-700">
                                        <strong>Dr. ${doctorName}</strong> (${doctorSpec})
                                    </span>
                                    <button data-patient-id="${p.id}" data-doctor-id="${doctorId}" 
                                            data-patient-name="${p.name}" data-doctor-name="${doctorName}"
                                            class="remove-assignment-btn text-red-600 hover:text-red-800 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors duration-200">
                                        🗑️ Remove
                                    </button>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }
            
            div.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-lg text-gray-800">${p.name}</h3>
                        <p class="text-sm text-gray-600">DOB: ${new Date(p.dateOfBirth).toLocaleDateString()}</p>
                        <p class="text-sm text-gray-500 mt-2">${p.medicalHistory || 'No medical history provided.'}</p>
                        ${assignmentsHtml}
                    </div>
                    <div class="flex flex-col space-y-2 ml-4">
                        <button data-patient-id="${p.id}" data-patient-name="${p.name}" 
                                class="map-btn text-sm py-2 px-3 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
                            👩‍⚕️ Assign Doctor
                        </button>
                        <button data-patient-id="${p.id}" data-patient-name="${p.name}" 
                                class="delete-patient-btn text-sm py-2 px-3 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
                            🗑️ Delete Patient
                        </button>
                    </div>
                </div>
            `;
            patientsListDiv.appendChild(div);
        });
    };

    const renderDoctors = () => {
        doctorsListDiv.innerHTML = doctors.length ? '' : `<div class="text-center text-gray-500 py-10"><p>No doctors available.</p></div>`;
        doctors.forEach(d => {
            const div = document.createElement('div');
            div.className = 'p-4 border rounded-lg bg-gray-50 hover:shadow-md transition-shadow';
            div.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-lg text-gray-800">Dr. ${d.name}</h3>
                        <p class="text-sm text-gray-600">${d.specialization}</p>
                    </div>
                    <button data-doctor-id="${d.id}" data-doctor-name="${d.name}" 
                            class="delete-doctor-btn text-sm py-2 px-3 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
                        🗑️ Delete
                    </button>
                </div>
            `;
            doctorsListDiv.appendChild(div);
        });
    };
    
    const populateDoctorSelect = () => {
        doctorSelect.innerHTML = '<option value="" disabled selected>Choose a doctor...</option>';
        doctors.forEach(d => {
            const option = document.createElement('option');
            option.value = d.id;
            option.textContent = `${d.name} (${d.specialization})`;
            doctorSelect.appendChild(option);
        });
    };

    // UI Helper Functions
    const toggleModal = (modal, show) => { 
        modal.style.display = show ? 'flex' : 'none'; 
    };
    
    const switchToLogin = () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        showLoginBtn.classList.add('border-indigo-600', 'text-indigo-600');
        showLoginBtn.classList.remove('border-transparent', 'text-gray-500');
        showRegisterBtn.classList.add('border-transparent', 'text-gray-500');
        showRegisterBtn.classList.remove('border-indigo-600', 'text-indigo-600');
    };
    
    const switchToRegister = () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        showLoginBtn.classList.remove('border-indigo-600', 'text-indigo-600');
        showLoginBtn.classList.add('border-transparent', 'text-gray-500');
        showRegisterBtn.classList.remove('border-transparent', 'text-gray-500');
        showRegisterBtn.classList.add('border-indigo-600', 'text-indigo-600');
    };

    const updateView = () => {
        const isLoggedIn = token && user;
        authView.style.display = isLoggedIn ? 'none' : 'block';
        dashboardView.style.display = isLoggedIn ? 'block' : 'none';
        if (isLoggedIn) userNameSpan.textContent = user.name;
    };
    
    // Token validation function
    const validateToken = async () => {
        if (!token) {
            console.log('No token found, user needs to login');
            return false;
        }
        
        try {
            // Try to fetch user data to validate token
            await apiFetch('/patients'); // This will test if token is valid
            return true;
        } catch (error) {
            console.log('Token validation failed:', error.message);
            // Only logout if it's a token-related error, not network issues
            if (error.message.includes('token') || error.message.includes('Session expired')) {
                handleLogout();
            }
            return false;
        }
    };

    const initDashboard = async () => { 
        if (token && user) {
            const isValid = await validateToken();
            if (isValid) {
                updateView(); 
                fetchPatients(); 
                fetchDoctors(); 
            }
        } 
    };

    // Event Listeners
    showLoginBtn.addEventListener('click', switchToLogin);
    showRegisterBtn.addEventListener('click', switchToRegister);
    
    loginForm.addEventListener('submit', e => { 
        e.preventDefault();
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return; // Prevent multiple submissions
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing In...';
        
        handleLogin(loginForm.elements['login-email'].value, loginForm.elements['login-password'].value)
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            });
    });

    registerForm.addEventListener('submit', e => { 
        e.preventDefault();
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return; // Prevent multiple submissions
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
        
        handleRegister(
            registerForm.elements['register-name'].value, 
            registerForm.elements['register-email'].value, 
            registerForm.elements['register-password'].value
        ).finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        });
    });

    addPatientForm.addEventListener('submit', e => { 
        e.preventDefault(); 
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return; // Prevent double submission
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding...';
        
        createPatient(
            addPatientForm.elements['patient-name'].value, 
            addPatientForm.elements['patient-dob'].value, 
            addPatientForm.elements['patient-history'].value
        ).finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Save Patient';
        });
    });
    
    addDoctorForm.addEventListener('submit', e => { 
        e.preventDefault(); 
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return; // Prevent double submission
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding...';
        
        createDoctor(
            addDoctorForm.elements['doctor-name'].value, 
            addDoctorForm.elements['doctor-specialization'].value
        ).finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Save Doctor';
        });
    });

    mapDoctorForm.addEventListener('submit', async e => { 
        e.preventDefault(); 
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (submitBtn.disabled) return; // Prevent double submission
        
        if (mapPatientIdInput.value && doctorSelect.value) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Assigning...';
            
            try {
                await mapDoctorToPatient(mapPatientIdInput.value, doctorSelect.value);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Assign Doctor';
            }
        } else {
            showToast('Please select a doctor.', true);
        }
    });

    logoutBtn.addEventListener('click', handleLogout);
    
    addPatientBtn.addEventListener('click', () => { 
        toggleModal(patientModal, true); 
        addPatientForm.reset(); 
    });
    
    addDoctorBtn.addEventListener('click', () => { 
        toggleModal(doctorModal, true); 
        addDoctorForm.reset(); 
    });

    cancelPatientModalBtn.addEventListener('click', () => toggleModal(patientModal, false));
    cancelDoctorModalBtn.addEventListener('click', () => toggleModal(doctorModal, false));
    cancelMapModalBtn.addEventListener('click', () => toggleModal(mapModal, false));

    patientsListDiv.addEventListener('click', e => {
        if (e.target.classList.contains('map-btn')) {
            toggleModal(mapModal, true);
            mapDoctorForm.reset();
            populateDoctorSelect();
            mapPatientNameSpan.textContent = e.target.dataset.patientName;
            mapPatientIdInput.value = e.target.dataset.patientId;
        } else if (e.target.classList.contains('delete-patient-btn')) {
            deletePatient(e.target.dataset.patientId, e.target.dataset.patientName);
        } else if (e.target.classList.contains('remove-assignment-btn')) {
            removeAssignment(
                e.target.dataset.patientId,
                e.target.dataset.doctorId,
                e.target.dataset.patientName,
                e.target.dataset.doctorName
            );
        }
    });

    doctorsListDiv.addEventListener('click', e => {
        if (e.target.classList.contains('delete-doctor-btn')) {
            deleteDoctor(e.target.dataset.doctorId, e.target.dataset.doctorName);
        }
    });

    // Initialize the application
    updateView();
    
    // Check authentication status on app start
    if (token && user) {
        console.log('User appears to be logged in, initializing dashboard...');
        initDashboard();
    } else {
        console.log('No valid session found, showing login screen');
    }
});
