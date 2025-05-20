document.addEventListener("DOMContentLoaded", () => {
  fetch("https://mahalaxmi-matrimony.onrender.com/profiles")
    .then(response => response.json())
    .then(profiles => {
      const container = document.getElementById("profiles-container");
      if (!container) return;

      if (profiles.length === 0) {
        container.innerHTML = "<p>No profiles uploaded yet.</p>";
        return;
      }

      profiles.reverse().forEach(profile => {
        const card = document.createElement("div");
        card.className = "profile-card";

        card.innerHTML = `
          <img src="${profile.imageUrl}" alt="${profile.name}" />
          <h3>${profile.name}</h3>
          <p>Age: ${profile.age}</p>
          <p>Contact: <a href="https://wa.me/${profile.contact}" target="_blank">WhatsApp</a></p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error fetching profiles:", err);
      document.getElementById("profiles-container").innerHTML =
        "<p>Failed to load profiles.</p>";
    });
});
