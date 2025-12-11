// Import the necessary Firebase functions
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { auth } from './firebase-config.js';

// --- Hardcoded Admin Email ---
// Only this email address will be allowed to log in as an admin.
const ADMIN_EMAIL = "your-admin-email@example.com"; // <-- IMPORTANT: Change this to your actual admin email

// Get elements from the DOM
const adminLoginForm = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

// Listen for the form submission
adminLoginForm.addEventListener('submit', async (event) => {
    // Prevent the default form refresh
    event.preventDefault();

    // Get admin inputs
    const email = emailInput.value;
    const password = passwordInput.value;

    // --- Admin Email Check ---
    // Check if the entered email matches the allowed admin email.
    if (email !== ADMIN_EMAIL) {
        alert('Access Denied. You are not an authorized administrator.');
        return; // Stop the login process
    }

    try {
        // Use Firebase to sign in the admin
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Admin has been signed in successfully
        const user = userCredential.user;
        console.log('Admin successfully logged in!', user);

        // Show a success message and redirect to the admin dashboard
        alert('Welcome, Admin! Redirecting to your dashboard.');
        window.location.href = 'admin.html';

    } catch (error) {
        // Handle any errors that occurred during login
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error('Admin Login Error:', errorCode, errorMessage);
        
        // Display a user-friendly error message
        alert(`Admin login failed: ${errorMessage}`);
    }
});

