document.addEventListener("DOMContentLoaded", function () {
  const secciones = document.querySelectorAll("section");
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0; // Altura de la barra de navegación
  let isScrolling = false;

  // Observer para animaciones de entrada**
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
          }
      });
  }, { threshold: 0.3 });

  secciones.forEach(seccion => observer.observe(seccion));

  function scrollToSection(target) {
    if (!target) return;
    
    // Calculamos la posición real asegurándonos de que la sección queda en el centro
    const offsetTop = target.offsetTop - (window.innerHeight / 2) + (target.offsetHeight / 2);
    
    window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
    });
  }

  // Corrección: Asegurar que la página cargue bien**
  window.onload = function () {
      const hash = window.location.hash;
      const target = hash && document.querySelector(hash) ? document.querySelector(hash) : document.getElementById("inicio");
      scrollToSection(target);
  };

  // Capturar clics en la barra de navegación**
  document.querySelectorAll("nav a").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetSection = document.querySelector(this.getAttribute("href"));
          scrollToSection(targetSection);
      });
  });

  // Scroll automático con la rueda del mouse**
  if (window.innerWidth > 768) {
      let lastScrollTime = 0;
      window.addEventListener("wheel", function (event) {
          if (isScrolling) return;

          const now = Date.now();
          if (now - lastScrollTime < 500) return;

          let activeSectionIndex = 0;
          secciones.forEach((seccion, index) => {
              const rect = seccion.getBoundingClientRect();
              if (rect.top >= -navbarHeight && rect.top < window.innerHeight / 2) {
                  activeSectionIndex = index;
              }
          });

          if (event.deltaY > 0 && activeSectionIndex < secciones.length - 1) {
              scrollToSection(secciones[activeSectionIndex + 1]);
          } else if (event.deltaY < 0 && activeSectionIndex > 0) {
              scrollToSection(secciones[activeSectionIndex - 1]);
          }

          lastScrollTime = now;
      });
  }
});