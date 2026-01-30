// Supabase configuration
const SUPABASE_URL = "https://gztneesmxwfhdmhqikel.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dG5lZXNteHdmaGRtaHFpa2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjAzNDAsImV4cCI6MjA4MjczNjM0MH0.iWDtkljuQLZFQeLvBrJHVyXNfpu4bJOvvVab3G0eOsA";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Check authentication on page load
async function checkAuth() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    window.location.href = "designer-login.html";
  }
}

// Run auth check
checkAuth();

// Save order update
async function saveUpdate() {
  const orderId = document.getElementById("orderId").value.trim();
  const status = document.getElementById("status").value;
  const note = document.getElementById("note").value.trim();
  const msg = document.getElementById("msg");
  const saveBtn = document.getElementById("saveBtn");

  // Validate input
  if (!orderId) {
    msg.innerText = "⚠️ Order ID is required";
    msg.style.color = "red";
    return;
  }

  // Disable button during save
  saveBtn.disabled = true;
  msg.innerText = "Saving...";
  msg.style.color = "#666";

  try {
    // First, check if order exists
    const { data: existingOrder, error: fetchError } = await supabase
      .from("orders")
      .select("id")
      .eq("order_id", orderId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error("Error checking order: " + fetchError.message);
    }

    if (!existingOrder) {
      msg.innerText = "❌ Order ID not found in system";
      msg.style.color = "red";
      saveBtn.disabled = false;
      return;
    }

    // Update order status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ 
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq("order_id", orderId);

    if (updateError) {
      throw new Error("Error updating order: " + updateError.message);
    }

    // Insert tracking record
    const { error: trackingError } = await supabase
      .from("order_tracking")
      .insert([
        {
          order_id: orderId,
          status: status,
          note: note || null,
          created_at: new Date().toISOString()
        }
      ]);

    if (trackingError) {
      console.error("Tracking insert error:", trackingError);
      // Don't fail the whole operation if tracking fails
    }

    // Success
    msg.innerText = "✅ Status updated successfully";
    msg.style.color = "green";
    document.getElementById("note").value = "";
    document.getElementById("orderId").value = "";

  } catch (error) {
    msg.innerText = "❌ " + error.message;
    msg.style.color = "red";
    console.error(error);
  } finally {
    saveBtn.disabled = false;
  }
}

// Logout function
async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Logout error:", error);
  }
  
  window.location.href = "designer-login.html";
}