document.addEventListener("DOMContentLoaded", function(){
    
    let burger = document.querySelector(".nav-icon");
    let dy = 0;

    /* Обробка події "Click" для елемента '.nav-icon' */
    /* 1. По кліку ініціюється перемикання (вкл./викл.)  */
    /*    класу '.open' для '.navbar' та для самого '.nav-icon' */
    /* 2. Також створюється додатковий елемент '.overlay'  */

    burger.addEventListener("click", (e) => {
        burger.classList.toggle("open");
        let navbar = document.querySelector(".navbar");
        let overlay = document.querySelector(".navbar .overlay");
        navbar.classList.toggle("open");
        
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        } else {
            let overlay_div = document.createElement("div");
            overlay_div.classList.add("overlay");
            navbar.insertBefore(overlay_div, navbar.firstChild);
            
            overlay_div.addEventListener("click", (e) => {
                closeMenu(navbar, burger, overlay_div);
            });
        }
    });

    // Function to close menu
    function closeMenu(navbar, burger, overlay) {
        navbar.classList.remove("open");
        burger.classList.remove("open");
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        }
    }

    /* Для усіх елементів з класом '.nav-link' (пункти головного меню) */
    /* ініціюється обробка події "click" */

    let navlinks = document.querySelectorAll(".nav-link");

    navlinks.forEach((link) => {
        link.addEventListener("click", (evt) => {
            evt.preventDefault(); // Prevent default anchor behavior
            
            let targetId = link.getAttribute("href");
            let targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close menu first
                let navbar = document.querySelector(".navbar");
                let overlay = document.querySelector(".navbar .overlay");
                if (overlay) {
                    closeMenu(navbar, burger, overlay);
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* Додати функцію обробки для події 'Scroll' */
    /* При скролі вгору, якщо позиція все ще більше, ніж 60px від верхнього краю */
    /* Додавати клас '.topfixed' для елемента "nav"*/

    
    window.addEventListener('scroll', function() {

        let navbox = document.querySelector("nav");
        let y = window.scrollY;
        
        if (y < dy && y > 60) {
            if (!navbox.classList.contains("topfixed"))
            navbox.classList.add("topfixed");
        } else {
            if (navbox.classList.contains("topfixed"))
                navbox.classList.remove("topfixed");
        }
        dy = y;
      });

    /* Зміна класу для <nav> по скролу вгору */
});

