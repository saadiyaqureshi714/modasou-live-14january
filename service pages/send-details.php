<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $whatsapp = htmlspecialchars($_POST['whatsapp']);
    $address = htmlspecialchars($_POST['address']);
    $pincode = htmlspecialchars($_POST['pincode']);

    // ADMIN EMAIL
    $to = "shanthilakshmi@modasou.com"; // 🔴 CHANGE THIS
    $subject = "New Order Completed – Client Details";

    $message = "
    ORDER COMPLETED

    Name: $name
    WhatsApp: $whatsapp
    Address: $address
    Pincode: $pincode
    ";

    $headers = "From: noreply@modasou.com";

    mail($to, $subject, $message, $headers);

    // WHATSAPP AUTO MESSAGE
    $whatsappMessage = urlencode(
      "A MODASOU specialist will connect with you shortly to assist with pricing details"
    );

    // REDIRECT TO THANK YOU PAGE
    header("Location: thankyou.html?whatsapp=$whatsapp&msg=$whatsappMessage");
    exit();
}
?>
