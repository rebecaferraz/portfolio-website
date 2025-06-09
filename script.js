document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const applyTheme = (theme) => {
    body.className = theme;
    localStorage.setItem("theme", theme);
    if (themeToggleButton) {
      themeToggleButton.innerText = theme === "dark" ? "☀️" : "🌑";
    }
  };
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark") ? "light" : "dark";
      applyTheme(newTheme);
    });
  }
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
