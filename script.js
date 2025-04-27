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
        }, false);
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


    // --- Lightning Bolt Animation (Existing Code) ---
    const boltFrames = [
        // ... (Array of ASCII bolt frames - assuming it's large and unchanged) ...
        `
    /
   /
  /
 /
/
`
        // ... (rest of the frames) ...
    ];

    const boltContainer = document.getElementById('bolt-container');
    const boltPre = document.getElementById('bolt-pre');
    const globalMapsSection = document.getElementById('global-map'); // Section to trigger hiding
    const uhMapsSection = document.getElementById('uh-map'); // Section to trigger hiding

    let frameIndex = 0;
    let animationInterval;
    let isBoltVisible = false; // Track visibility state
    let isAnimating = false; // Prevent multiple intervals
    const animationSpeed = 100; // milliseconds per frame

    // Intersection Observer to detect when maps are visible
    const mapObserverOptions = { // Renamed to avoid conflict
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the map section is visible
    };

    let isGlobalMapVisible = false;
    let isUhMapVisible = false;

    const mapIntersectionCallback = (entries) => { // Renamed to avoid conflict
        let mapsVisible = false;
        entries.forEach(entry => {
            if (entry.target.id === 'global-map') {
                isGlobalMapVisible = entry.isIntersecting;
            }
            if (entry.target.id === 'uh-map') {
                isUhMapVisible = entry.isIntersecting;
            }
        });
        // Determine if *either* map section is currently intersecting
        mapsVisible = isGlobalMapVisible || isUhMapVisible;
        updateBoltDisplay(mapsVisible);
    };

    const mapObserver = new IntersectionObserver(mapIntersectionCallback, mapObserverOptions); // Renamed to avoid conflict
    if (globalMapsSection) mapObserver.observe(globalMapsSection);
    if (uhMapsSection) mapObserver.observe(uhMapsSection);


    function animateBolt() {
        if (!boltPre) return;
        // Ensure boltFrames has content before accessing
        if (boltFrames && boltFrames.length > 0) {
            boltPre.textContent = boltFrames[frameIndex];
            frameIndex = (frameIndex + 1) % boltFrames.length;
        } else {
             boltPre.textContent = ''; // Clear if frames are missing
        }
    }

    function startAnimation() {
        if (!isAnimating && boltContainer) {
            console.log("Starting bolt animation.");
            boltContainer.style.display = 'flex'; // Show container
            // Delay setting opacity to allow display change to register
            setTimeout(() => {
                boltContainer.classList.remove('bolt-hidden'); // Trigger fade-in
                isBoltVisible = true;
                // Check screen width before adding padding
                if (window.innerWidth >= 768) { // Only add padding on non-mobile screens
                    document.body.style.paddingRight = `${boltContainer.offsetWidth}px`;
                    console.log(`Body paddingRight set to: ${document.body.style.paddingRight}`);
                } else {
                     document.body.style.paddingRight = '0px'; // Ensure no padding on mobile
                }
            }, 20); // Small delay

            if (animationInterval) clearInterval(animationInterval); // Clear existing interval if any
            animationInterval = setInterval(animateBolt, animationSpeed);
            isAnimating = true;
        }
    }

    function stopAnimation() {
        if (isAnimating) {
            console.log("Stopping bolt animation.");
            if (boltContainer) {
                boltContainer.classList.add('bolt-hidden'); // Trigger fade-out
                // Remove padding immediately when starting to hide, regardless of screen size
                document.body.style.paddingRight = '0px';
                console.log("Body paddingRight set to 0px.");
            }
            // Use transitionend event to set display:none after fade-out
            const handleTransitionEnd = (event) => {
                 // Ensure the transition is for the bolt container itself and for opacity
                 if (event.target === boltContainer && event.propertyName === 'opacity') {
                    if (boltContainer.classList.contains('bolt-hidden')) {
                        boltContainer.style.display = 'none';
                        console.log("Bolt container display set to none after transition.");
                    }
                    // Clean up listener
                    boltContainer.removeEventListener('transitionend', handleTransitionEnd);
                    // Clear interval here after transition completes
                    if (animationInterval) clearInterval(animationInterval);
                    isAnimating = false;
                    console.log("Cleared animation interval after transition.");
                 }
            };

            if (boltContainer) {
                // Make sure we listen for the transition end
                boltContainer.addEventListener('transitionend', handleTransitionEnd);
            } else {
                // If container somehow doesn't exist, clear interval immediately
                 if (animationInterval) clearInterval(animationInterval);
                 isAnimating = false;
            }

            // Fallback: If transitionend doesn't fire (e.g., element removed or display none interrupts), clear interval after a delay
            setTimeout(() => {
                if (isAnimating) { // Check if still animating (transitionend might not have fired)
                     if (animationInterval) clearInterval(animationInterval);
                     isAnimating = false;
                     console.log("Cleared animation interval via fallback timeout.");
                     // Ensure display is none if transition didn't hide it
                     if (boltContainer && boltContainer.classList.contains('bolt-hidden')) {
                         boltContainer.style.display = 'none';
                     }
                }
            }, 400); // Slightly longer than transition duration (0.3s)

            isBoltVisible = false;
        } else {
             // Ensure interval is cleared if stopAnimation is called when not animating
             if (animationInterval) clearInterval(animationInterval);
             isAnimating = false;
             // Ensure padding is removed if somehow stop is called when not animating but bolt was visible
             document.body.style.paddingRight = '0px';
        }
    }


    // Decide whether to show or hide the bolt based on map visibility and scroll position
    function updateBoltDisplay(mapsAreVisible) {
        const shouldBoltBeVisible = window.scrollY > 100 && !mapsAreVisible; // Show if scrolled down AND maps are NOT visible
        console.log(`Updating Bolt Display: scrollY=${window.scrollY}, mapsVisible=${mapsAreVisible}, shouldBoltBeVisible=${shouldBoltBeVisible}, isBoltVisible=${isBoltVisible}`);

        if (shouldBoltBeVisible && !isBoltVisible) {
            startAnimation();
        } else if (!shouldBoltBeVisible && isBoltVisible) {
            stopAnimation();
        }
    }


    // Initial check in case maps are visible on load
    // Need a slight delay for IntersectionObserver to potentially fire initially
    setTimeout(() => {
         updateBoltDisplay(isGlobalMapVisible || isUhMapVisible);
    }, 100);


    // Re-evaluate bolt display on scroll (combined with header logic listener)
    // The header scroll listener already exists, so we just call updateBoltDisplay from there too.
    // Modify the header scroll listener:
    if (header) { // Check if header exists before modifying listener
        window.removeEventListener('scroll', () => { /* Remove placeholder if needed */ }); // Remove previous simple listener if any conflict
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Header logic
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

            // Bolt logic update
            updateBoltDisplay(isGlobalMapVisible || isUhMapVisible);

        }, false);
    } else {
        // If no header, add a separate scroll listener just for the bolt
         window.addEventListener('scroll', () => {
             updateBoltDisplay(isGlobalMapVisible || isUhMapVisible);
         });
    }


    // Adjust body padding on resize if bolt is visible
    window.addEventListener('resize', () => {
        if (isBoltVisible && boltContainer) {
             // Check screen width on resize as well
             if (window.innerWidth >= 768) {
                document.body.style.paddingRight = `${boltContainer.offsetWidth}px`;
                console.log(`Resized: Body paddingRight updated to: ${document.body.style.paddingRight}`);
             } else {
                 document.body.style.paddingRight = '0px'; // Remove padding on mobile resize
                 console.log(`Resized (Mobile): Body paddingRight set to 0px.`);
             }
        } else {
             document.body.style.paddingRight = '0px';
        }
    });

    console.log("Microgrid page script loaded. All features active.");

});