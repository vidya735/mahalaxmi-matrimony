async function loadProfiles() {
  try {
    const res = await fetch('https://mahalaxmi-matrimony.onrender.com/profiles');
    const data = await res.json();
    const profilesDiv = document.getElementById('profiles');
    profilesDiv.innerHTML = '';

    if (data.length === 0) {
      profilesDiv.innerHTML = '<p>No profiles found.</p>';
      return;
    }

    data.forEach(profile => {
      const age = getAge(profile.dob);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${profile.photo}" alt="${profile.name}">
        <div class="info">
          <p><strong>Name:</strong> ${profile.name}</p>
          <p><strong>DOB:</strong> ${profile.dob}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Gender:</strong> ${profile.gender}</p>
          <p><strong>Caste:</strong> ${profile.caste}</p>
          <p><strong>Location:</strong> ${profile.location}</p>
          <a class="whatsapp-button" href="https://wa.me/${profile.contact}" target="_blank">Enquire on WhatsApp</a>
        </div>
      `;
      profilesDiv.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load profiles:', err);
    document.getElementById('profiles').innerHTML = '<p>Error loading profiles.</p>';
  }
}

function getAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

loadProfiles();
