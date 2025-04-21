// dashboard.js

// Utility: Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
  }
  
  // Utility: Remove token and redirect to login
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  }
  
  // Check authentication before showing dashboard
  document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token) {
      logout();
      return;
    }
  
    // Optionally: Validate token with a backend endpoint
    fetch('/api/auth/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then(user => {
        // Show dashboard only after successful auth
        document.getElementById('dashboard-body').style.display = '';
        renderUserInfo(user);
        fetchProjects(token);
      })
      .catch(() => {
        logout();
      });
  
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
  });
  
  // Render user info
  function renderUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Name:</strong> ${user.name || ''}</p>
    `;
  }
  
  // Fetch and render projects
  function fetchProjects(token) {
    fetch('/api/projects', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(projects => {
        const list = document.getElementById('projects-list');
        list.innerHTML = '';
        projects.forEach(project => {
          const li = document.createElement('li');
          li.textContent = `${project.name} (${project.status})`;
          list.appendChild(li);
        });
      })
      .catch(err => {
        document.getElementById('projects-list').innerHTML = '<li>Error loading projects.</li>';
      });
  }
  