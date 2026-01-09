
document.addEventListener("DOMContentLoaded", async () => {

  const sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    alert("Session ID missing");
    return;
  }

  async function saveService2(type, imageUrl = "", notes = "") {
    const { data, error } = await supabase
      .from("service_1")
      .update({
        service2_type,
        service2_image_url: imageUrl,
        service2_notes: notes,
        service2_submitted_at: new Date().toISOString()
      })
      .eq("session_id", sessionId)
      .select();

    if (error || data.length === 0) {
      console.error(error);
      alert("Service 2 data not saved ❌");
    } else {
      alert("Service 2 saved successfully ✅");
    }
  }

  document.getElementById("service2SubmitBtn")?.addEventListener("click", () => {
    saveService2("default");
  });

  document.getElementById("videoSubmitBtn")?.addEventListener("click", () => {
    saveService2("video");
  });

  document.getElementById("designSubmitBtn")?.addEventListener("click", () => {
    const img = document.getElementById("designPreview")?.src || "";
    saveService2("design", img);
  });

  document.getElementById("googleSubmitBtn")?.addEventListener("click", () => {
    const url = document.getElementById("googleImageUrl")?.value || "";
    saveService2("google", url);
  });

});
</script>
