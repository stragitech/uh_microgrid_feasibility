# UH Microgrid Educational Website Project

## Background and Motivation

The University of Houston (UH) community and the public lack a centralized resource detailing the feasibility, benefits, and implementation pathways for microgrid technology, particularly for the UH campus. This hinders informed discussion and potential action towards enhancing campus energy resilience and sustainability. This project aims to create an interactive, informative website for a class group project to address this gap. The website will educate visitors about microgrids, visualize existing global microgrids and potential UH implementations using interactive maps, and provide structured information on technology, funding, and policy. The goal is to encourage informed discussion and potential action regarding microgrid implementation at UH. The technical stack involves Firebase hosting, a Node.js backend, and the Google Maps API for interactive maps.

## Key Challenges and Analysis

1.  **Google Maps API Integration:** Requires obtaining API keys, managing potential costs/usage limits, and implementing complex features like custom markers, pop-ups, and toggleable layers for the UH map. **Update:** An API key is available. To minimize public usage costs, the plan is to use the API during development to gather necessary location data/coordinates and then store this data statically (e.g., in JSON/GeoJSON files) to be loaded by the website, rather than making live API calls for every visitor.
2.  **Data Acquisition:**
    *   **Global Microgrids:** Sourcing accurate and comprehensive data (locations, details) is needed. **Update:** A strategy for storing this data (likely JSON/GeoJSON) needs to be defined. AI assistance might be used for populating this data structure.
    *   **UH Campus Map:** Sourcing data for building outlines, potential solar/battery locations, and Central Plant info is critical. Access to specific UH data might be required. **Update:** Similar to global data, a static data structure (JSON/GeoJSON) is recommended.
3.  **Content Creation & Accuracy:** Developing engaging, accurate, and well-researched content requires effort. **Update:** Primary content sources are `context/Partial_Report.md` (main fallback) and `context/Microgrid_Funding_for_UH.txt` (use with caution, verify sources, focus on funding). Team members are collaborating on research.
4.  **Interactive Map Complexity:** Implementing toggleable layers on the UH map requires careful data management and front-end development using the static data.
5.  **Backend Integration (Node.js):** The exact backend requirements need clarification. Keeping it simple initially is advisable, potentially only using Node.js for build processes or specific API interactions during development, not for serving core content if Firebase Hosting suffices.
6.  **Team Collaboration & Workflow:** Clear task division, communication, and version control are essential. **Update:** The project uses Git/GitHub, and the user will manage merges.
7.  **Scope Management:** Focusing on an MVP first is recommended.
8.  **Design Implementation:** Adhering to UH branding guidelines (colors, typography) requires careful CSS implementation.
9.  **Ensuring responsive design across different screen sizes, especially for interactive elements and image galleries.**
10. **Obtaining and integrating official UH branding elements (fonts, specific colors).**
11. **Extracting relevant content and image assets from provided documents.**

## High-level Task Breakdown

*(Focus on MVP first)*

1.  **Phase 1: Project Setup & Basic Structure**
    *   ~~Task 1.1: Initialize Project Repository & Basic File Structure~~ *(Completed by user)*
    *   ~~Task 1.2: Set up Firebase Project & Initialize Firebase Hosting~~ *(Completed by user)*
    *   Task 1.3: Create Basic Website Layout & Navigation (Static).
        *   *Status:* Partially Complete. Basic layout, navigation, section animations, responsive mobile menu implemented. Header scroll behavior (fade on scroll) works on desktop but not reliably on mobile; debugging paused.
        *   *Success Criteria (Met):* Simple header, nav, footer, sections implemented. Basic UH colors/fonts placeholders. Smooth scrolling works. Sections animate in on scroll. Includes responsive design adjustments for mobile (hamburger menu, adjusted spacing/typography/header height). Mobile menu uses a smoother slide-in animation.
        *   *Success Criteria (Pending):* Header fades out/in correctly on mobile scroll.

2.  **Phase 2: Static Content Implementation**
    *   Task 2.1: Populate "About Microgrids" Section.
        *   *Status:* Content added, pending user review/approval.
    *   Task 2.2: Populate and Enhance Static Content Sections.
        *   *Status:* Implemented, pending review.
        *   *Success Criteria:* Extract resource links/text from `Partial_Report_v1.md` and add them to the `#resources` section in `index.html`, likely using a list format.
    *   Task 2.3: Create Image Collage Section.
        *   *Status:* Implemented, pending review.
        *   *Success Criteria:* Identify image URLs in `Partial_Report_v1.md`. Create a new `<section id="gallery">` before `#global-map`. Add identified images using `<img>` tags within a container. Apply CSS (Grid or Flexbox) to create a responsive collage layout (e.g., auto-fitting columns). Images display correctly and responsively.

3.  **Phase 3: Interactive Maps (Revised Approach)**
    *   ~~Task 3.1: Define Data Structure for Map Points (JSON/GeoJSON).~~ *(No longer needed - My Maps used)*
    *   ~~Task 3.2: Integrate Google Maps API - Basic Map Display (Dev only).~~ *(No longer needed - My Maps used)*
    *   Task 3.3: Implement Global Microgrid Map (**Embed Google My Maps**).
        *   *Status:* Completed.
        *   *Success Criteria:* Google My Maps embedded, displays correctly, maintains 16:9 aspect ratio, scales appropriately using ~90% width.
    *   Task 3.4: Implement UH Campus Map (**Embed Google My Maps**).
        *   *Status:* Completed.
        *   *Success Criteria:* Google My Maps for UH embedded, displays correctly using the same styling and scaling as the global map (16:9 ratio, ~90% width).

4.  **Phase 4: Advanced Map Features & Interactivity**
    *   ~~Task 4.1: Implement UH Map Toggleable Layers.~~ *(Handled by My Maps interface)*
    *   ~~Task 4.2: Refine Map Pop-up Information.~~ *(Handled by My Maps interface)*
    *   Task 4.3: Integrate Node.js backend (if needed). *(Likely not needed now)*

5.  **Phase 5: Content Finalization, Styling & Deployment**
    *   Task 5.1: Finalize all website content based on team research and context files.
    *   Task 5.2: Apply consistent styling adhering fully to UH branding guidelines (colors, typography - League Gothic, Milo, Crimson). Ensure accessibility contrast ratios.
    *   Task 5.3: Final Testing & Deployment to Firebase.

## Project Status Board

*   [x] Task 1.1: Initialize Project Repository & Basic File Structure
*   [x] Task 1.2: Set up Firebase Project & Initialize Firebase Hosting
*   [/] Task 1.3: Create Basic Website Layout & Navigation *(Partially Complete - Header scroll issue)*
*   [ ] Task 2.1: Populate "About Microgrids" Section *(Superseded by 2.2)*
*   [x] Task 2.2: Populate and Enhance Static Content Sections *(Implemented, pending review)*
*   [x] Task 2.3: Create Image Collage Section *(Implemented, pending review)*
*   [x] Task 3.3: Implement Global Microgrid Map (**Embed Google My Maps**)
*   [x] Task 3.4: Implement UH Campus Map (**Embed Google My Maps**)
*   [ ] Task 4.1: Implement UH Map Toggleable Layers *(N/A)*
*   [ ] Task 4.2: Refine Map Pop-up Information *(N/A)*
*   [ ] Task 4.3: Integrate Node.js backend (if needed) *(Likely N/A)*
*   [ ] Task 5.1: Finalize all website content
*   [ ] Task 5.2: Apply consistent styling (Full UH Branding)
*   [ ] Task 5.3: Final Testing & Deployment

## Executor's Feedback or Assistance Requests

*   Need font files or links for UH fonts (League Gothic, Milo, Crimson).
*   Header fade-on-scroll works on desktop but not mobile. Debugging paused.
*   **Tasks 2.2 (Static Content Enhancement) and 2.3 (Image Gallery) are implemented based on `Partial_Report_v1.md` and ready for review.**

## Lessons

*   **UH Branding:**
    *   Primary Colors: Red (`#C8102E`), Cream (`#FFF9D9`). Use Red as the main color.
    *   Fonts: Headline (League Gothic), Secondary (Milo), Body (Crimson).
    *   Check accessibility contrast ratios when pairing colors.
*   **Google Maps API:** Use API key during development for data gathering. Store map data statically (JSON/GeoJSON) for the public site to minimize API calls and costs. API key available in `.env`.
*   **Content Sources:** `context/Partial_Report.md` (primary), `context/Microgrid_Funding_for_UH.txt` (funding info, use cautiously).
*   **Data Storage:** Use JSON or GeoJSON for map point data. 