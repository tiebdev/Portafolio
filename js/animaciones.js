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

  // Solo habilitamos el desplazamiento automático en escritorio
  /*if (window.innerWidth > 768) {
    let lastScrollTop = 0;
    window.addEventListener("wheel", (event) => {
        const direction = event.deltaY > 0 ? "down" : "up";
        let activeSection = null;

        secciones.forEach((seccion, index) => {
            const rect = seccion.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                activeSection = index;
            }
        });

        if (activeSection !== null) {
            if (direction === "down" && activeSection < secciones.length - 1) {
                secciones[activeSection + 1].scrollIntoView({ behavior: "smooth" });
            } else if (direction === "up" && activeSection > 0) {
                secciones[activeSection - 1].scrollIntoView({ behavior: "smooth" });
            }
        }
    });
    }*/
});
