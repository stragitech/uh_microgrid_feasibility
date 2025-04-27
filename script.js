document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');
    const navLinks = mainNav.querySelectorAll('a'); // Get all links in the nav

    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            overlay.classList.toggle('is-visible', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('mobile-menu-open', isOpen); // Prevent body scroll when menu is open
        });

        overlay.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            overlay.classList.remove('is-visible');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('mobile-menu-open');
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                    overlay.classList.remove('is-visible');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('mobile-menu-open');
                }
            });
        });
    }

    // --- Header Hide/Show on Scroll ---
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels to scroll before hiding header

    if (header) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling Down
                header.classList.add('header-hidden');
            } else {
                // Scrolling Up or near top
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, { passive: true }); // Use passive listener for scroll performance
    } 

    // --- Section Fade-In Animation ---
    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
            // Optional: Remove class if it scrolls out of view
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    };

    const sectionObserver = new IntersectionObserver(sectionCallback, sectionObserverOptions);
    sections.forEach(section => {
        if (section) { // Check if section exists
             sectionObserver.observe(section);
        }
    });


    // --- Combined Scroll Listener for Header --- 
    if (header) { // Check if header exists
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Header logic
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        }, { passive: true }); // Use passive listener for scroll performance
    } 


    // --- Resize Listener --- 
    window.addEventListener('resize', () => {
        // No bolt-related logic needed here anymore
        // console.log("Window resized.");
    });


    // --- Initial Checks --- 
    // Initial check for header visibility (in case page loads scrolled down)
    if (header && window.scrollY > scrollThreshold) {
        header.classList.add('header-hidden');
        lastScrollTop = window.scrollY;
    }

    console.log("Microgrid page script loaded. Header, menu, and section animations active.");

});