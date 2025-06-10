document.addEventListener("DOMContentLoaded", () => {
  // EFEITO 1: HEADER MUDA DE ESTILO COM O SCROLL
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

  // EFEITO 2: ANIMAÇÃO FADE-IN AO ROLAR
  const faders = document.querySelectorAll(".fade-in");
  if (faders.length > 0) {
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };
    const appearOnScroll = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });
  }

  // EFEITO 3: TROCA DE TEMA (DARK/LIGHT)
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

  // BÔNUS: ATUALIZAR ANO NO RODAPÉ
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
