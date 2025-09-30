// Theme Toggle + Animations
document.addEventListener("DOMContentLoaded", () => {
  // === Theme Toggle Button ===
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.textContent = "Dark";
  document.body.appendChild(themeToggle);

  // Apply saved theme or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "Light";
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeToggle.textContent = "Light";
      localStorage.setItem("theme", "light");
    } else {
      themeToggle.textContent = "Dark";
      localStorage.setItem("theme", "dark");
    }
  });

  // === Active Nav Link Highlight ===
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (
      a.getAttribute("href") === currentPage ||
      (currentPage === "" && a.getAttribute("href") === "index.html")
    ) {
      a.classList.add("active");
    }
  });

  // === Smooth Scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // === Page Load Fade-In ===
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // === Scroll Animations using IntersectionObserver ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.2 }
  );

  // Target elements that need animation
  document.querySelectorAll(
    ".hero h1, .hero h2, .hero p, .hero .contact-info, .hero-buttons, .stats, .exp-card, .edu-card, .cert-card, .project-card, .skills li"
  ).forEach((el) => {
    observer.observe(el);
  });
});
