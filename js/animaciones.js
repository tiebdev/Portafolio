document.addEventListener("DOMContentLoaded", function () {
  const secciones = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
          }
      });
  }, { threshold: 0.3 });

  secciones.forEach(seccion => {
      observer.observe(seccion);
  });
});
