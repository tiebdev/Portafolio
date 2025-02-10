document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const navbar = document.querySelector("nav");

    menuIcon.addEventListener("click", function () {
        mobileMenu.classList.toggle("show");
    });

    // 🔹 Corrige el scroll cuando se hace clic en un enlace del menú hamburguesa
    document.querySelectorAll("#mobile-menu a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Evita el salto brusco

            // Cerrar la hamburguesa
            mobileMenu.classList.remove("show");

            // Seleccionar la sección correspondiente
            const targetSection = document.querySelector(this.getAttribute("href"));

            if (targetSection) {
                setTimeout(() => { 
                    const navbarHeight = navbar ? navbar.offsetHeight : 0; 
                    const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; // 🔹 Ajuste manual

                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }); 
            }
        });
    });
});
