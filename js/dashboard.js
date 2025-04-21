// dashboard.js

// Utility: Get JWT from localStorage
function getToken() {
    return localStorage.getItem('token');
  }
  
  // Utility: Remove JWT and redirect to login
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  }
  
  // Show dashboard only if token is valid
  document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token) {
      logout();
      return;
    }
  
    // Validate token with backend (recommended)
    fetch('/api/auth/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid or expired token');
        return res.json();
      })
      .then(user => {
        // Show dashboard after successful validation
        document.body.style.display = '';
        renderUserInfo(user);
        fetchProjects(token);
      })
      .catch(() => {
        logout();
      });
  
    // Attach logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }
  });
  
  // Render user info section
  function renderUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    if (userInfoDiv) {
      userInfoDiv.innerHTML = `
        <p><strong>Email:</strong> ${user.email || user.userId || ''}</p>
      `;
    }
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
        if (list) {
          list.innerHTML = '';
          projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `${project.name} (${project.status})`;
            list.appendChild(li);
          });
        }
      })
      .catch(() => {
        const list = document.getElementById('projects-list');
        if (list) list.innerHTML = '<li>Error loading projects.</li>';
      });
  }
  