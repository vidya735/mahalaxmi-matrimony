function contactOnWhatsApp() {
  const message = "Hello, I'm interested in this biodata from Mahalaxmi Matrimony. Please share more details.";
  const phoneNumber = "919812345678"; // Replace with your number
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
