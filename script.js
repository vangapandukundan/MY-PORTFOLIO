// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.textContent = 'Dark';
  document.body.appendChild(themeToggle);

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme on load
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = 'Light';
  } else {
    themeToggle.textContent = 'Dark';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Update button text and save preference
    if (document.body.classList.contains('light-theme')) {
      themeToggle.textContent = 'Light';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.textContent = 'Dark';
      localStorage.setItem('theme', 'dark');
    }
  });

  // Highlight active nav link based on current page
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((a) => {
    // Remove any existing active class
    a.classList.remove("active");

    // Highlight correct link based on file name
    if (a.getAttribute("href") === currentPage || 
        (currentPage === "" && a.getAttribute("href") === "index.html")) {
      a.classList.add("active");
    }
  });

  // Smooth scroll for anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
