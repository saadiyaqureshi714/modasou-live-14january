// Supabase configuration
const SUPABASE_URL = "https://gztneesmxwfhdmhqikel.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dG5lZXNteHdmaGRtaHFpa2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjAzNDAsImV4cCI6MjA4MjczNjM0MH0.iWDtkljuQLZFQeLvBrJHVyXNfpu4bJOvvVab3G0eOsA";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Login function
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");
  const loginBtn = document.getElementById("loginBtn");

  // Validate inputs
  if (!email || !password) {
    msg.innerText = "Please enter both email and password";
    msg.style.color = "red";
    return;
  }

  // Disable button and show loading
  loginBtn.disabled = true;
  msg.innerText = "Logging in...";
  msg.style.color = "#666";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      throw error;
    }

    // Success
    msg.innerText = "Login successful ✅";
    msg.style.color = "green";
    
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);

  } catch (error) {
    msg.innerText = "❌ " + error.message;
    msg.style.color = "red";
    console.error("Login error:", error);
    loginBtn.disabled = false;
  }
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const inputs = document.querySelectorAll('input');
  
  // Add click listener to button
  loginBtn.addEventListener('click', login);
  
  // Allow Enter key to submit
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        login();
      }
    });
  });
});