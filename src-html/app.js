// ========================================
// VFS Global - JavaScript
// ========================================

// Data
const countries = [
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
    { code: 'AL', name: 'Albania', flag: '🇦🇱' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
];

const visaTypes = [
    { code: 'TOURIST', name: 'Tourist Visa' },
    { code: 'BUSINESS', name: 'Business Visa' },
    { code: 'STUDENT', name: 'Student Visa' },
    { code: 'WORK', name: 'Work Visa' },
    { code: 'TRANSIT', name: 'Transit Visa' },
    { code: 'MEDICAL', name: 'Medical Visa' },
];

const genders = ['Male', 'Female', 'Other'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const purposesOfVisit = ['Tourism', 'Business', 'Study', 'Work', 'Transit', 'Medical', 'Family Visit'];
const entryTypes = ['Single', 'Double', 'Multiple'];
const accommodationTypes = ['Hotel', 'Hostel', 'Apartment', 'Friend/Family', 'Other'];

const visaCenters = [
    { id: 1, name: 'VFS Global Visa Application Center', city: 'New York', address: '123 Visa Street, Manhattan, NY 10001', phone: '+1-212-555-0100', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
    { id: 2, name: 'VFS Global Visa Application Center', city: 'Los Angeles', address: '456 Application Ave, Downtown, LA 90012', phone: '+1-213-555-0200', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Premium Lounge'] },
    { id: 3, name: 'VFS Global Visa Application Center', city: 'Chicago', address: '789 Processing Blvd, Loop, Chicago 60601', phone: '+1-312-555-0300', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
    { id: 4, name: 'VFS Global Visa Application Center', city: 'Houston', address: '321 Embassy Row, Galleria, Houston 77056', phone: '+1-713-555-0400', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Courier Services'] },
    { id: 5, name: 'VFS Global Visa Application Center', city: 'Miami', address: '654 Consulate Way, Brickell, Miami 33131', phone: '+1-305-555-0500', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
    { id: 6, name: 'VFS Global Visa Application Center', city: 'San Francisco', address: '987 Gateway Plaza, Financial District, SF 94105', phone: '+1-415-555-0600', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Premium Lounge'] },
];

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];

// LocalStorage Keys
const STORAGE_KEYS = {
    USER: 'vfs_user',
    TOKEN: 'vfs_token',
    APPLICATIONS: 'vfs_applications',
    APPOINTMENTS: 'vfs_appointments',
    USERS: 'vfs_users'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initCountries();
    initServices();
    checkAuth();
    initPageSpecific();
});

// Initialize country dropdowns
function initCountries() {
    const fromSelect = document.getElementById('fromCountry');
    const toSelect = document.getElementById('toCountry');
    
    if (fromSelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = `${country.flag} ${country.name}`;
            fromSelect.appendChild(option);
        });
    }
    
    if (toSelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = `${country.flag} ${country.name}`;
            toSelect.appendChild(option);
        });
    }
}

// Initialize services grid
function initServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    visaTypes.forEach(visa => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3>${visa.name}</h3>
            <p>Apply for ${visa.name.toLowerCase()} and start your journey</p>
            <a href="apply.html?visaType=${visa.code}">Apply Now →</a>
        `;
        servicesGrid.appendChild(card);
    });
}

// Check authentication
function checkAuth() {
    const user = getCurrentUser();
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (user) {
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            if (userName) userName.textContent = `Welcome, ${user.firstName}`;
        }
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Get current user
function getCurrentUser() {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
}

// Get token
function getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

// Logout
function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    window.location.href = 'index.html';
}

// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}

// Start application
function startApplication() {
    const fromCountry = document.getElementById('fromCountry')?.value;
    const toCountry = document.getElementById('toCountry')?.value;
    
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html?redirect=apply';
        return;
    }
    
    let url = 'apply.html';
    if (fromCountry) url += `?from=${encodeURIComponent(fromCountry)}`;
    if (toCountry) url += `${url.includes('?') ? '&' : '?'}to=${encodeURIComponent(toCountry)}`;
    
    window.location.href = url;
}

// Initialize page-specific functionality
function initPageSpecific() {
    const path = window.location.pathname;
    
    if (path.includes('login.html')) initLoginPage();
    if (path.includes('register.html')) initRegisterPage();
    if (path.includes('dashboard.html')) initDashboardPage();
    if (path.includes('apply.html')) initApplyPage();
    if (path.includes('appointments.html')) initAppointmentsPage();
    if (path.includes('track.html')) initTrackPage();
    if (path.includes('centers.html')) initCentersPage();
    if (path.includes('admin.html')) initAdminPage();
}

// ===================
// Login Page
// ===================
function initLoginPage() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            localStorage.setItem(STORAGE_KEYS.TOKEN, 'mock-token-' + Date.now());
            
            // Redirect
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get('redirect') || 'dashboard.html';
            window.location.href = redirect;
        } else {
            if (errorDiv) {
                errorDiv.textContent = 'Invalid email or password';
                errorDiv.style.display = 'block';
            }
        }
    });
    
    // Toggle password visibility
    const toggleBtn = document.querySelector('.password-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
}

// ===================
// Register Page
// ===================
function initRegisterPage() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('registerError');
        
        if (password !== confirmPassword) {
            if (errorDiv) {
                errorDiv.textContent = 'Passwords do not match';
                errorDiv.style.display = 'block';
            }
            return;
        }
        
        if (password.length < 8) {
            if (errorDiv) {
                errorDiv.textContent = 'Password must be at least 8 characters';
                errorDiv.style.display = 'block';
            }
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        
        // Check if user exists
        if (users.find(u => u.email === email)) {
            if (errorDiv) {
                errorDiv.textContent = 'User already exists';
                errorDiv.style.display = 'block';
            }
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            firstName,
            lastName,
            email,
            phone,
            password,
            role: 'user',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        // Redirect to login
        window.location.href = 'login.html?registered=true';
    });
    
    // Toggle password visibility
    const toggleBtns = document.querySelectorAll('.password-toggle');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });
}

// ===================
// Dashboard Page
// ===================
function initDashboardPage() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load applications
    const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    const userApplications = applications.filter(a => a.userId === user.id);
    
    const appsContainer = document.getElementById('applicationsList');
    if (appsContainer) {
        if (userApplications.length === 0) {
            appsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <p>No applications yet</p>
                    <a href="apply.html" class="btn btn-primary">Start Application</a>
                </div>
            `;
        } else {
            appsContainer.innerHTML = userApplications.slice(0, 5).map(app => `
                <div class="application-item">
                    <div class="app-header">
                        <div>
                            <h4>${app.visaType} Visa</h4>
                            <p>${app.fromCountry} → ${app.toCountry}</p>
                        </div>
                        <span class="status-badge status-${app.status}">${app.status.replace(/_/g, ' ')}</span>
                    </div>
                    <div class="app-footer">
                        <span>Ref: ${app.referenceNumber}</span>
                        <a href="#">View Details →</a>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Load appointments
    const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const userAppointments = appointments.filter(a => a.userId === user.id);
    
    const apptsContainer = document.getElementById('appointmentsList');
    if (apptsContainer) {
        if (userAppointments.length === 0) {
            apptsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar"></i>
                    <p>No appointments yet</p>
                    <a href="appointments.html" class="btn btn-primary">Book Appointment</a>
                </div>
            `;
        } else {
            apptsContainer.innerHTML = userAppointments.slice(0, 5).map(appt => `
                <div class="appointment-item">
                    <div class="app-header">
                        <div>
                            <h4>${appt.visaType || 'Visa'} Application</h4>
                            <p>${appt.centerName}, ${appt.centerCity}</p>
                        </div>
                        <span class="status-badge status-${appt.status}">${appt.status}</span>
                    </div>
                    <div class="app-footer">
                        <span>📅 ${appt.date} 🕒 ${appt.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update stats
    document.getElementById('totalApps')?.textContent && (document.getElementById('totalApps').textContent = userApplications.length);
    document.getElementById('upcomingAppts')?.textContent && (document.getElementById('upcomingAppts').textContent = userAppointments.filter(a => a.status === 'scheduled').length);
}

// ===================
// Apply Page
// ===================
function initApplyPage() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html?redirect=apply';
        return;
    }
    
    let currentStep = 1;
    const totalSteps = 5;
    
    // Get URL params
    const params = new URLSearchParams(window.location.search);
    const fromCountry = params.get('from') || '';
    const toCountry = params.get('to') || '';
    const visaTypeParam = params.get('visaType') || '';
    
    // Pre-fill form
    if (fromCountry) document.getElementById('fromCountry')?.setAttribute('data-value', fromCountry);
    if (toCountry) document.getElementById('toCountry')?.setAttribute('data-value', toCountry);
    
    // Populate dropdowns
    populateFormDropdowns();
    
    // Update progress
    updateProgress();
    
    // Navigation
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateProgress();
            showStep(currentStep);
        }
    });
    
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateProgress();
            showStep(currentStep);
        }
    });
    
    document.getElementById('submitBtn')?.addEventListener('click', submitApplication);
    
    document.getElementById('saveDraftBtn')?.addEventListener('click', saveDraft);
    
    function updateProgress() {
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < currentStep) step.classList.add('completed');
            if (index + 1 === currentStep) step.classList.add('active');
        });
    }
    
    function showStep(step) {
        document.querySelectorAll('.form-step').forEach((s, index) => {
            s.style.display = index + 1 === step ? 'block' : 'none';
        });
        
        document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline-block';
        
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        if (step === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            updateReview();
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
    
    function updateReview() {
        const reviewContainer = document.getElementById('reviewContent');
        if (!reviewContainer) return;
        
        const formData = getFormData();
        reviewContainer.innerHTML = `
            <div class="booking-summary">
                <h3>Application Summary</h3>
                <p><strong>From:</strong> ${formData.fromCountry || 'Not selected'}</p>
                <p><strong>To:</strong> ${formData.toCountry || 'Not selected'}</p>
                <p><strong>Visa Type:</strong> ${formData.visaType || 'Not selected'}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--primary); margin-bottom: 10px;">Personal Details</h4>
                <p>Name: ${formData.personalDetails.firstName} ${formData.personalDetails.lastName}</p>
                <p>DOB: ${formData.personalDetails.dateOfBirth}</p>
                <p>Gender: ${formData.personalDetails.gender}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--primary); margin-bottom: 10px;">Passport Details</h4>
                <p>Passport No: ${formData.passportDetails.passportNumber}</p>
                <p>Expiry: ${formData.passportDetails.passportExpiryDate}</p>
            </div>
        `;
    }
    
    function getFormData() {
        return {
            fromCountry: document.getElementById('fromCountry')?.value || '',
            toCountry: document.getElementById('toCountry')?.value || '',
            visaType: document.getElementById('visaType')?.value || '',
            personalDetails: {
                firstName: document.getElementById('firstName')?.value || '',
                lastName: document.getElementById('lastName')?.value || '',
                dateOfBirth: document.getElementById('dateOfBirth')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                nationality: document.getElementById('nationality')?.value || '',
                countryOfBirth: document.getElementById('countryOfBirth')?.value || '',
                maritalStatus: document.getElementById('maritalStatus')?.value || ''
            },
            passportDetails: {
                passportNumber: document.getElementById('passportNumber')?.value || '',
                passportIssueDate: document.getElementById('passportIssueDate')?.value || '',
                passportExpiryDate: document.getElementById('passportExpiryDate')?.value || '',
                passportIssuePlace: document.getElementById('passportIssuePlace')?.value || '',
                passportIssueCountry: document.getElementById('passportIssueCountry')?.value || ''
            },
            travelDetails: {
                purposeOfVisit: document.getElementById('purposeOfVisit')?.value || '',
                entryType: document.getElementById('entryType')?.value || '',
                arrivalDate: document.getElementById('arrivalDate')?.value || '',
                departureDate: document.getElementById('departureDate')?.value || '',
                portOfArrival: document.getElementById('portOfArrival')?.value || '',
                accommodationType: document.getElementById('accommodationType')?.value || '',
                accommodationAddress: document.getElementById('accommodationAddress')?.value || ''
            }
        };
    }
    
    function saveDraft() {
        const user = getCurrentUser();
        const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
        
        const application = {
            id: 'app_' + Date.now(),
            userId: user.id,
            referenceNumber: 'VFS-' + Math.random().toString(36).substr(2, 10).toUpperCase(),
            status: 'draft',
            ...getFormData(),
            createdAt: new Date().toISOString()
        };
        
        applications.push(application);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
        
        alert('Application saved as draft');
    }
    
    function submitApplication() {
        const user = getCurrentUser();
        const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
        
        const application = {
            id: 'app_' + Date.now(),
            userId: user.id,
            referenceNumber: 'VFS-' + Math.random().toString(36).substr(2, 10).toUpperCase(),
            status: 'submitted',
            ...getFormData(),
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        
        applications.push(application);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
        
        window.location.href = `success.html?ref=${application.referenceNumber}`;
    }
    
    showStep(1);
}

function populateFormDropdowns() {
    const dropdowns = {
        'fromCountry': countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join(''),
        'toCountry': countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join(''),
        'visaType': visaTypes.map(v => `<option value="${v.name}">${v.name}</option>`).join(''),
        'nationality': countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join(''),
        'countryOfBirth': countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join(''),
        'passportIssueCountry': countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join(''),
        'gender': genders.map(g => `<option value="${g}">${g}</option>`).join(''),
        'maritalStatus': maritalStatuses.map(m => `<option value="${m}">${m}</option>`).join(''),
        'purposeOfVisit': purposesOfVisit.map(p => `<option value="${p}">${p}</option>`).join(''),
        'entryType': entryTypes.map(e => `<option value="${e}">${e}</option>`).join(''),
        'accommodationType': accommodationTypes.map(a => `<option value="${a}">${a}</option>`).join('')
    };
    
    Object.keys(dropdowns).forEach(id => {
        const select = document.getElementById(id);
        if (select) select.innerHTML = '<option value="">Select</option>' + dropdowns[id];
    });
}

// ===================
// Appointments Page
// ===================
function initAppointmentsPage() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    let currentStep = 1;
    
    // Load user's submitted applications
    const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    const submittedApps = applications.filter(a => a.userId === user.id && a.status === 'submitted');
    
    const appsContainer = document.getElementById('applicationOptions');
    if (appsContainer) {
        if (submittedApps.length === 0) {
            appsContainer.innerHTML = '<p>No submitted applications found. <a href="apply.html">Start a new application</a></p>';
        } else {
            appsContainer.innerHTML = submittedApps.map(app => `
                <label class="application-option" data-id="${app.id}">
                    <input type="radio" name="application" value="${app.id}">
                    <div>
                        <h4>${app.visaType} Visa</h4>
                        <p>Ref: ${app.referenceNumber}</p>
                    </div>
                </label>
            `).join('');
        }
    }
    
    // Center options
    const centersContainer = document.getElementById('centerOptions');
    if (centersContainer) {
        centersContainer.innerHTML = visaCenters.map(center => `
            <label class="center-option" data-id="${center.id}">
                <input type="radio" name="center" value="${center.id}">
                <h4>${center.name}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${center.city}</p>
                <p><i class="fas fa-map"></i> ${center.address}</p>
            </label>
        `).join('');
    }
    
    // Generate dates
    const datesContainer = document.getElementById('dateOptions');
    if (datesContainer) {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                dates.push(date);
            }
        }
        
        datesContainer.innerHTML = dates.slice(0, 14).map(date => `
            <button class="date-option" data-date="${date.toISOString().split('T')[0]}">
                ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
        `).join('');
    }
    
    // Time slots
    const timesContainer = document.getElementById('timeOptions');
    if (timesContainer) {
        timesContainer.innerHTML = timeSlots.map(time => `
            <button class="time-option" data-time="${time}">${time}</button>
        `).join('');
    }
    
    // Event listeners
    document.querySelectorAll('.date-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.date-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    document.querySelectorAll('.time-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    document.getElementById('step1Next')?.addEventListener('click', () => {
        const selected = document.querySelector('input[name="application"]:checked');
        if (!selected) {
            alert('Please select an application');
            return;
        }
        goToStep(2);
    });
    
    document.getElementById('step2Next')?.addEventListener('click', () => {
        const center = document.querySelector('input[name="center"]:checked');
        const date = document.querySelector('.date-option.selected');
        
        if (!center) {
            alert('Please select a visa center');
            return;
        }
        if (!date) {
            alert('Please select a date');
            return;
        }
        goToStep(3);
    });
    
    document.getElementById('step3Next')?.addEventListener('click', () => {
        const time = document.querySelector('.time-option.selected');
        
        if (!time) {
            alert('Please select a time slot');
            return;
        }
        
        // Book appointment
        const appId = document.querySelector('input[name="application"]:checked')?.value;
        const centerId = document.querySelector('input[name="center"]:checked')?.value;
        const date = document.querySelector('.date-option.selected')?.dataset.date;
        const timeValue = time.dataset.time;
        
        const center = visaCenters.find(c => c.id == centerId);
        const app = submittedApps.find(a => a.id === appId);
        
        const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
        
        appointments.push({
            id: 'appt_' + Date.now(),
            userId: user.id,
            applicationId: appId,
            visaType: app?.visaType,
            centerId,
            centerName: center?.name,
            centerCity: center?.city,
            date,
            time: timeValue,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        });
        
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
        
        goToStep(4);
    });
    
    function goToStep(step) {
        currentStep = step;
        
        document.querySelectorAll('.booking-step').forEach((s, index) => {
            s.classList.remove('active', 'completed');
            if (index + 1 < step) s.classList.add('completed');
            if (index + 1 === step) s.classList.add('active');
        });
        
        document.querySelectorAll('.booking-content').forEach((c, index) => {
            c.style.display = index + 1 === step ? 'block' : 'none';
        });
        
        // Show summary on step 4
        if (step === 4) {
            const center = visaCenters.find(c => c.id == document.querySelector('input[name="center"]:checked')?.value);
            const date = document.querySelector('.date-option.selected')?.dataset.date;
            const time = document.querySelector('.time-option.selected')?.dataset.time;
            
            document.getElementById('summaryDate').textContent = date;
            document.getElementById('summaryTime').textContent = time;
            document.getElementById('summaryCenter').textContent = `${center?.name}, ${center?.city}`;
        }
    }
}

// ===================
// Track Page
// ===================
function initTrackPage() {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    
    if (refParam) {
        document.getElementById('trackingInput').value = refParam;
        trackApplication();
    }
    
    document.getElementById('trackBtn')?.addEventListener('click', trackApplication);
    document.getElementById('trackingInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') trackApplication();
    });
    
    function trackApplication() {
        const refNumber = document.getElementById('trackingInput').value.trim();
        if (!refNumber) return;
        
        const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
        const application = applications.find(a => a.referenceNumber === refNumber);
        
        const resultContainer = document.getElementById('trackingResult');
        const errorContainer = document.getElementById('trackingError');
        
        if (errorContainer) errorContainer.style.display = 'none';
        
        if (!application) {
            if (errorContainer) {
                errorContainer.textContent = 'Application not found';
                errorContainer.style.display = 'block';
            }
            if (resultContainer) resultContainer.style.display = 'none';
            return;
        }
        
        if (resultContainer) {
            resultContainer.style.display = 'block';
            
            const stepIndex = ['draft', 'submitted', 'under_process', 'processed', 'ready_for_collection'].indexOf(application.status);
            
            resultContainer.innerHTML = `
                <div class="tracking-status">
                    <div class="status-timeline">
                        <div class="status-step ${stepIndex >= 1 ? 'completed' : stepIndex === 0 ? 'active' : ''}">
                            <div class="status-step-icon"><i class="fas fa-file-alt"></i></div>
                            <span class="status-step-label">Submitted</span>
                        </div>
                        <div class="status-step ${stepIndex >= 2 ? 'completed' : stepIndex === 1 ? 'active' : ''}">
                            <div class="status-step-icon"><i class="fas fa-clock"></i></div>
                            <span class="status-step-label">Under Process</span>
                        </div>
                        <div class="status-step ${stepIndex >= 3 ? 'completed' : stepIndex === 2 ? 'active' : ''}">
                            <div class="status-step-icon"><i class="fas fa-check"></i></div>
                            <span class="status-step-label">Processed</span>
                        </div>
                        <div class="status-step ${stepIndex >= 4 ? 'completed' : stepIndex === 3 ? 'active' : ''}">
                            <div class="status-step-icon"><i class="fas fa-box"></i></div>
                            <span class="status-step-label">Ready for Collection</span>
                        </div>
                    </div>
                </div>
                <div class="tracking-details">
                    <div class="detail-card">
                        <h3>Application Details</h3>
                        <p><span>Visa Type:</span> ${application.visaType}</p>
                        <p><span>From:</span> ${application.fromCountry}</p>
                        <p><span>To:</span> ${application.toCountry}</p>
                        <p><span>Submitted:</span> ${application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div class="detail-card">
                        <h3>Applicant Information</h3>
                        <p><span>Name:</span> ${application.personalDetails?.firstName} ${application.personalDetails?.lastName}</p>
                        <p><span>Passport:</span> ${application.passportDetails?.passportNumber || 'N/A'}</p>
                        <p><span>Nationality:</span> ${application.personalDetails?.nationality || 'N/A'}</p>
                    </div>
                </div>
            `;
        }
    }
}

// ===================
// Centers Page
// ===================
function initCentersPage() {
    const centersContainer = document.getElementById('centersList');
    if (!centersContainer) return;
    
    centersContainer.innerHTML = visaCenters.map(center => `
        <div class="center-card">
            <h3>${center.name}</h3>
            <div class="center-info">
                <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
                <p><i class="fas fa-city"></i> ${center.city}</p>
                <p><i class="fas fa-phone"></i> ${center.phone}</p>
                <p><i class="fas fa-clock"></i> ${center.hours}</p>
            </div>
            <div class="center-services">
                <h4>Available Services</h4>
                <div class="services-tags">
                    ${center.services.map(s => `<span>${s}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ===================
// Admin Page
// ===================
function initAdminPage() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    loadApplications();
    loadUsers();
    
    document.getElementById('tabApplications')?.addEventListener('click', () => switchTab('applications'));
    document.getElementById('tabUsers')?.addEventListener('click', () => switchTab('users'));
    document.getElementById('exportBtn')?.addEventListener('click', exportCSV);
    document.getElementById('adminSearch')?.addEventListener('input', searchData);
    
    function switchTab(tab) {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`#tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
        
        if (tab === 'applications') {
            document.getElementById('applicationsTable').style.display = 'table';
            document.getElementById('usersTable').style.display = 'none';
            document.getElementById('exportBtn').style.display = 'inline-block';
        } else {
            document.getElementById('applicationsTable').style.display = 'none';
            document.getElementById('usersTable').style.display = 'table';
            document.getElementById('exportBtn').style.display = 'none';
        }
    }
    
    function loadApplications() {
        const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        
        const tbody = document.getElementById('applicationsBody');
        if (!tbody) return;
        
        tbody.innerHTML = applications.map(app => {
            const appUser = users.find(u => u.id === app.userId);
            return `
                <tr>
                    <td>${app.referenceNumber}</td>
                    <td>${appUser?.firstName || 'N/A'} ${appUser?.lastName || ''}<br><small>${appUser?.email || ''}</small></td>
                    <td>${app.visaType}</td>
                    <td>${app.fromCountry} → ${app.toCountry}</td>
                    <td><span class="status-badge status-${app.status}">${app.status.replace(/_/g, ' ')}</span></td>
                    <td>${new Date(app.createdAt).toLocaleDateString()}</td>
                    <td class="actions">
                        <a href="#" onclick="updateStatus('${app.id}')">Update</a>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        
        const tbody = document.getElementById('usersBody');
        if (!tbody) return;
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td><span class="status-badge status-${user.role}">${user.role}</span></td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');
    }
    
    function searchData() {
        const search = document.getElementById('adminSearch').value.toLowerCase();
        
        // Filter applications
        document.querySelectorAll('#applicationsBody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
        });
        
        // Filter users
        document.querySelectorAll('#usersBody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
        });
    }
    
    function exportCSV() {
        const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
        
        const headers = ['Reference', 'Status', 'Visa Type', 'From', 'To', 'Date'];
        const rows = applications.map(app => [
            app.referenceNumber,
            app.status,
            app.visaType,
            app.fromCountry,
            app.toCountry,
            new Date(app.createdAt).toLocaleDateString()
        ]);
        
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }
}

function updateStatus(appId) {
    const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    
    const statuses = ['submitted', 'under_process', 'processed', 'ready_for_collection', 'rejected'];
    const currentIndex = statuses.indexOf(app.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    const idx = applications.findIndex(a => a.id === appId);
    applications[idx].status = nextStatus;
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    
    // Refresh
    initAdminPage();
}

// Make updateStatus global
window.updateStatus = updateStatus;
