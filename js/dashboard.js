document.addEventListener('DOMContentLoaded', () => {
  // Immediately hide dashboard body
  document.body.style.display = 'none';
  
  // Check authentication status
  fetch('/api/auth/me', { 
    credentials: 'include' // Required for cookies
  })
  .then(res => {
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  })
  .then(user => {
    // Show dashboard after successful auth
    document.body.style.display = '';
    renderUserInfo(user);
    fetchProjects();
  })
  .catch(() => {
    window.location.href = '/login.html';
  });

  // Logout handler
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => window.location.href = '/login.html');
  });
});

function renderUserInfo(user) {
  const userInfoDiv = document.getElementById('user-info');
  if (userInfoDiv) {
    userInfoDiv.innerHTML = `<p>Logged in as: ${user.email}</p>`;
  }
}

function fetchProjects() {
  fetch('/api/projects', {
    credentials: 'include'
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  })
  .then(projects => {
    const list = document.getElementById('projects-list');
    if (list) {
      list.innerHTML = projects.map(project => 
        `<li>${project.name} (${project.status})</li>`
      ).join('');
    }
  })
  .catch(error => {
    console.error('Project load error:', error);
    document.getElementById('projects-list').innerHTML = '<li>Error loading projects</li>';
  });
}