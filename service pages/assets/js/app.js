
// ================= Supabase Setup =================
const SUPABASE_URL = "https://gztneesmxwfhdmhqikel.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dG5lZXNteHdmaGRtaHFpa2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjAzNDAsImV4cCI6MjA4MjczNjM0MH0.iWDtkljuQLZFQeLvBrJHVyXNfpu4bJOvvVab3G0eOsA";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================= Session ID Setup =================
let sessionId = localStorage.getItem("session_id");
if (!sessionId) {
  sessionId = crypto.randomUUID(); // generate unique ID
  localStorage.setItem("session_id", sessionId);
}

// ================= EmailJS Setup =================
(function(){
  emailjs.init("V5fGF5JF2JAOD_AcW"); // replace with EmailJS public key
})();
