document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section');

    const options = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                // observer.unobserve(entry.target);
            }
            // Optional: Remove class if scrolling back up, uncomment below
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, options);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Mobile Menu Toggle & Overlay ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];
    const header = document.querySelector('header');

    function openMenu() {
        if (mainNav && overlay && header) {
            mainNav.classList.add('is-open');
            overlay.classList.add('is-visible');
            body.classList.add('mobile-menu-open');
            // Ensure header is visible when menu opens
            header.classList.remove('header-hidden');
        }
    }

    function closeMenu() {
        if (mainNav && overlay && header) {
            mainNav.classList.remove('is-open');
            overlay.classList.remove('is-visible');
            body.classList.remove('mobile-menu-open');
            // Re-evaluate header visibility after closing menu
            updateHeaderVisibility();
        }
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu if overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu if a nav link is clicked
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Add a small delay to allow scroll to start before closing menu
                setTimeout(closeMenu, 100);
            });
        });
    }


    // --- Fade Header on Scroll (Simplified Test Logic) ---

    // Define the core logic for header visibility (TEST VERSION)
    function updateHeaderVisibility() {
        const currentScrollY = window.scrollY;

        if (!header) return; // Exit if header doesn't exist

        // TEST: Hide header if scrolled down, regardless of menu state or screen size
        if (currentScrollY > 0) {
            header.classList.add('header-hidden');
        }
        // TEST: Show header only if at the top
        else {
            header.classList.remove('header-hidden');
        }
    }

    // Initial check on load
    updateHeaderVisibility();

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateHeaderVisibility, 50);
    }, { passive: true });

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateHeaderVisibility, 100);
    });


    // --- Optional: JS Smooth scroll ---
    // ... existing commented out code ...

}); 