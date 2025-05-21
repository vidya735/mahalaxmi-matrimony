async function fetchProfiles() {
  try {
    const res = await fetch('https://mahalaxmi-matrimony.onrender.com/api/profiles');
    const profiles = await res.json();

    const container = document.getElementById('profiles');
    container.innerHTML = '';

    profiles.forEach(profile => {
      const div = document.createElement('div');
      div.className = 'profile-card';

      const imageUrl = profile.photoUrl || 'https://via.placeholder.com/150';

      const name = profile.name || 'Name not provided';
      const age = profile.age || 'N/A';
      const contact = profile.contact || 'N/A';
      const education = profile.education || 'N/A';
      const height = profile.height || 'N/A';
      const location = profile.location || 'N/A';

      div.innerHTML = `
        <img src="${imageUrl}" alt="${name}" />
        <h2>${name}</h2>
        <p>Age: ${age}</p>
        <p>Height: ${height}</p>
        <p>Education: ${education}</p>
        <p>Location: ${location}</p>
        <p>Contact: ${contact}</p>
        <a href="https://wa.me/${contact}" class="whatsapp-btn" target="_blank">Enquire on WhatsApp</a>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading profiles:', err);
  }
}

fetchProfiles();
