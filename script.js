document.addEventListener("DOMContentLoaded", () => {
  async function fetchGitHubProjects() {
    const username = "rebecaferraz"; 
    const projectsGrid = document.getElementById("github-projects-grid");

    if (!projectsGrid) return;

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
      );
      const repos = await response.json();

      projectsGrid.innerHTML = "";

      repos.slice(0, 6).forEach((repo) => {

        if (repo.name === username) return;

        const projectCard = document.createElement("div");
        projectCard.className = "project-item fade-in";

        projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sem descrição disponível."}</p>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub →</a>
            `;
        projectsGrid.appendChild(projectCard);
      });
    } catch (error) {
      projectsGrid.innerHTML =
        "<p>Não foi possível carregar os projetos no momento.</p>";
      console.error("Erro ao buscar projetos do GitHub:", error);
    }
  }
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
  fetchGitHubProjects();
});
