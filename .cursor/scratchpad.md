# UH Microgrid Educational Website Project

## Background and Motivation

The University of Houston (UH) community and the public lack a centralized resource detailing the feasibility, benefits, and implementation pathways for microgrid technology, particularly for the UH campus. This hinders informed discussion and potential action towards enhancing campus energy resilience and sustainability. This project aims to create an interactive, informative website for a class group project to address this gap. The website will educate visitors about microgrids, visualize existing global microgrids and potential UH implementations using interactive maps, and provide structured information on technology, funding, and policy. The goal is to encourage informed discussion and potential action regarding microgrid implementation at UH. The technical stack involves Firebase hosting, a Node.js backend, and the Google Maps API for interactive maps.

The user expected a gallery of UH images below the UH map (`#uh-map`) within the `#uh-microgrid` section. This gallery has not yet been implemented, leading to confusion about broken formatting. The goal is now to **create** this UH-specific gallery.

User wants to adjust map size (currently too wide) and back up the lightning bolt effect files before potentially removing it later.

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
11. **Extracting relevant content, images, and resources from provided documents and integrating them logically and comprehensively into the website structure, ensuring a balanced perspective.**
12. **Obtaining usable image URLs for UH-specific visuals (Central Plant, tunnels) mentioned in the report.**
13. **UH Gallery Implementation:** The `#uh-microgrid` section currently lacks the expected image gallery. Need to implement this gallery, requiring confirmation of the plan and the specific image assets from the user. The desired "collage" style likely refers to a responsive grid layout.

*   **Map Sizing:** Finding the right `max-width` for map containers to leave comfortable scrolling space on desktop without being too small. Using a percentage (`95%`) seems like a good approach.
*   **Backup Process:** Identifying all relevant code snippets (HTML, CSS, JS) for the lightning bolt effect and saving them clearly in a designated backup location.

## High-level Task Breakdown

*(Focus on MVP first)*

1.  **Phase 1: Project Setup & Basic Structure**
    *   ~~Task 1.1: Initialize Project Repository & Basic File Structure~~ *(Completed by user)*
    *   ~~Task 1.2: Set up Firebase Project & Initialize Firebase Hosting~~ *(Completed by user)*
    *   Task 1.3: Create Basic Website Layout & Navigation (Static).
        *   *Status:* Partially Complete. Basic layout, navigation, section animations, responsive mobile menu implemented. Header scroll behavior (fade on scroll) works on desktop but not reliably on mobile; debugging paused.
        *   *Success Criteria (Met):* Simple header, nav, footer, sections implemented. Basic UH colors/fonts placeholders. Smooth scrolling works. Sections animate in on scroll. Includes responsive design adjustments for mobile (hamburger menu, adjusted spacing/typography/header height). Mobile menu uses a smoother slide-in animation.
        *   *Success Criteria (Pending):* Header fades out/in correctly on mobile scroll.

2.  **Phase 2: Static Content Implementation (Revised Scope)**
    *   Task 2.1: Populate "About Microgrids" Section.
        *   *Status:* Content added, pending user review/approval.
    *   Task 2.2: Populate and Enhance Static Content Sections (**Revision 2 - Major Expansion**).
        *   *Status:* **Needs Rework**. Previous implementation deemed insufficient.
        *   *Success Criteria:* Review `Partial_Report_v1.md` thoroughly.
            *   Expand `#about` significantly (Components, Challenges, more detail on What/Why/How, balanced view).
            *   Create new `#case-studies` section summarizing SRJC, UT Austin, Bronx Zoo (including challenges & table).
            *   Create new `#uh-focus` section detailing current Central Plant and the microgrid proposal (potential, components, cost, benefits, challenges).
            *   Create new `#funding-policy` section summarizing funding sources, programs, and policy aspects.
            *   Add brief context to `#global-map` and `#uh-map` (verify).
            *   Update `#resources` to include all relevant links from the report.
            *   Ensure content flows logically, uses appropriate HTML structure, and presents a balanced view of microgrids.
    *   Task 2.3: Create/Update Image Collage Section.
        *   *Status:* Implemented (Basic), **Needs UH Images**.
        *   *Success Criteria:* Maintain existing gallery structure. **Obtain and add direct URLs for UH Central Plant/tunnel images if possible.** Style appropriately within the collage. *(Blocked pending image URLs)*.

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
*   [ ] Task 2.1: Populate "About Microgrids" Section *(Superseded)*
*   [x] Task 2.2: Populate and Enhance Static Content Sections (**Revision 2 - Implemented, pending review**)
*   [x] Task 2.3: Create General Image Collage Section *(Implemented)*
*   [x] Task 2.4: Create UH Image Collage Section *(Corrected image paths/filenames based on user-provided list, pending review)*
*   [x] Task 3.3: Implement Global Microgrid Map (**Embed Google My Maps**)
*   [x] Task 3.4: Implement UH Campus Map (**Embed Google My Maps**)
*   [ ] Task 4.1: Implement UH Map Toggleable Layers *(N/A)*
*   [ ] Task 4.2: Refine Map Pop-up Information *(N/A)*
*   [ ] Task 4.3: Integrate Node.js backend (if needed) *(Likely N/A)*
*   [x] Task 5.1: Finalize all website content
*   [ ] Task 5.2: Apply consistent styling (Full UH Branding)
*   [ ] Task 5.3: Final Testing & Deployment
*   [x] **Task 4: Remove Generic Image Gallery**
*   [ ] **Task 5: Plan Visual Enhancements** *(Skipped for now)*
*   [ ] **Task 6: Implement Approved Visual Enhancements** *(Skipped for now)*
*   [x] **Task 7: Implement Scrolling ASCII Animation** *(Adjusted)*
    *   [x] Subtask 7.1: Add HTML Element & CSS
    *   [x] Subtask 7.2: Implement Basic Scrolling Movement (JS)
    *   [x] Subtask 7.3: Implement Visibility Logic (JS) *(Threshold adjusted)*
    *   [x] Subtask 7.4: Implement Responsiveness
*   [x] **Task 8: Add Static ASCII Diagrams** (Grid-Connected & Island Mode)
*   [x] **Task 9: Add and Style Case Studies Section** (from Markdown)
*   [x] **Task 10: Debug Missing Content / Large Gap Below Maps** *(Fixed)*
*   [x] **Task 11: Adjust ASCII Diagram Size / Layout** *(No changes needed)*
*   [ ] **Task 12: Identify and Revert Incorrect Image Formatting**~~ *(Superseded)*
*   [x] **Task 13: Implement UH-Specific Image Gallery** *(Completed)*
    *   Subtask 13.1: Confirm with the user: Add a **new gallery** of UH images inside `#uh-microgrid`, styled as a responsive grid/collage?
    *   Subtask 13.2: Request image file paths/names from the user for the UH gallery (user to place files in `images/`).
    *   Subtask 13.3: (Executor) Add HTML structure for the gallery within `#uh-microgrid` in `index.html`.
    *   Subtask 13.4: (Executor) Create scoped CSS rules in `style.css` for the gallery layout and image styling.
    *   Subtask 13.5: (Executor) Test gallery layout and responsiveness.
    *   Success Criteria: A gallery of UH images appears below the UH map, styled in a responsive grid format, using the images provided by the user.
*   [x] **Task 14: Adjust Map Size** *(Completed)*
    *   Subtask 14.1: Identify CSS rule affecting map width (`max-width` on `.map-container`). *(Done)*
    *   Subtask 14.2: Reintroduce `max-width` and set it to `95%`. *(Done)*
    *   Subtask 14.3: (Executor) Implement CSS change. *(Done)*
    *   Subtask 14.4: Request user verification. *(Pending)*
    *   Success Criteria: Embedded maps display slightly narrower than full width, leaving space on the sides for scrolling on desktop. *(Achieved, pending verification)*
*   [x] **Task 15: Backup Lightning Bolt Effect** *(Completed)*
    *   Subtask 15.1: (Executor) Create `/backup` directory if needed. *(Done)*
    *   Subtask 15.2: (Executor) Copy `script.js` to `/backup/script_bolt_backup.js`. *(Done)*
    *   Subtask 15.3: (Executor) Extract bolt HTML from `index.html` to `/backup/index_bolt_snippet.html`. *(Done)*
    *   Subtask 15.4: (Executor) Extract bolt CSS from `style.css` to `/backup/style_bolt_snippet.css`. *(Done)*
    *   Subtask 15.5: (Executor) Report completion of backup. *(Done)*
    *   Success Criteria: The `/backup` folder contains the three specified files with the relevant code for the lightning bolt effect. *(Achieved)*
*   [ ] **Task 16: Remove Lightning Bolt Effect** *(Reverted)*
*   [ ] **Task 17: Fix Missing Main Content Bug** *(Resolved by Revert)*
*   [ ] **Task 18 (Placeholder): Implement Visual Enhancements**

## Executor's Feedback or Assistance Requests

*   Need font files or links for UH fonts (League Gothic, Milo, Crimson).
*   Header fade-on-scroll works on desktop but not mobile. Debugging paused.
*   **Corrected the `src` attributes for the UH image collage (Task 2.4) using the exact filenames and `.jpeg` extension provided by the user.**
*   **Ready for review: Please verify the UH images now display correctly.**
*   Task 4 complete. Please verify that the generic image gallery is gone and the UH gallery still looks correct.
*   Waiting for user input on specific visual enhancements (Task 5). Options proposed by Planner:
    *   More pronounced fade-in/slide-in effects for sections?
    *   Subtle background color shifts between sections?
    *   Interactive hover effects on links or buttons?
*   Confirmed `⚡` symbol for Task 7.
*   Subtask 7.1 complete. Please verify the pulsating `⚡` symbol appears fixed on the right side (on desktop view) and is hidden on mobile view. It will not move with scroll yet.
*   Ready to proceed with Subtask 7.2 (implementing scroll movement).
*   Adjusted ASCII bolt color to UH Gold (`#F6BE00`).
*   Adjusted map `IntersectionObserver` threshold to `0.01` for more precise hiding/showing around the map sections.
*   Please test the color change and the timing of the bolt disappearing/reappearing when scrolling near the map sections.
*   Added HTML placeholders (`<figure>`, `<img>`, `<figcaption>`) and CSS styling for the two diagrams requested in the "How do they Work?" section.
*   **Action Required by User:** You need to create the actual diagram images (`grid-connected-mode.svg` and `island-mode.svg`, or other formats like .png/.jpg if preferred, updating the `src` attribute accordingly) and place them in the `images/` folder. The diagrams should visually represent the concepts described in the text and the `alt` attributes.
*   Please review the placement and placeholder styling on the page.
*   Populated the `#case-studies` section with content from the provided Markdown file.
*   Structured the content using HTML cards (`div.case-study-card`).
*   Added CSS for a responsive grid layout and styling of the cards and their content.
*   Please review the Case Studies section for content accuracy, visual presentation, and responsiveness.
*   **Attempted to fix missing content below `#uh-map` by ensuring relevant parent elements (`#global-map`, `#uh-map`, `main`) have `overflow: visible;`.**
*   **Please check again if the content below the UH map (starting with the "University of Houston Microgrid" section) is now visible.**
*   If the content is still missing, please open your browser's Developer Console (usually by pressing F12) and let me know if there are any errors reported in the "Console" tab. This could indicate a JavaScript issue.
*   **Plan Confirmation & Assets Needed for Task 13:** My apologies for the misunderstanding! It appears the image gallery you expected in the "University of Houston Microgrid" section (`#uh-microgrid`) hasn't been built yet.
    *   **Confirm:** Shall I proceed with **creating** a new image gallery in this section specifically for UH pictures?
    *   **Confirm:** Should it be styled in a responsive grid (collage) format, similar to the old gallery we removed?
    *   **Action Needed:** If yes to both, please provide the **list of image file names** (e.g., `uh-campus-power.jpg`, `uh-solar-array.png`, etc.) that you want included. Please ensure these image files exist in your `images/` folder.
*   Removed the `max-width: 900px;` rule from `.map-container` in `style.css` to allow the embedded maps to take up more horizontal space, likely restoring their previous size.
*   **Please check the Global Map and UH Map sections again.** Are the maps back to the size you remember?

*   Plan is ready for execution:
    1.  Adjust map container `max-width` to `95%` in `style.css`.
    2.  Create backup files for the lightning bolt effect in a `/backup` folder.
*   Requesting permission to proceed with these two tasks in Executor mode.

## Lessons

*   **UH Branding:**
    *   Primary Colors: Red (`#C8102E`), Cream (`#FFF9D9`). Use Red as the main color.
    *   Fonts: Headline (League Gothic), Secondary (Milo), Body (Crimson).
    *   Check accessibility contrast ratios when pairing colors.
*   **Google Maps API:** Use API key during development for data gathering. Store map data statically (JSON/GeoJSON) for the public site to minimize API calls and costs. API key available in `.env`.
*   **Content Sources:** `context/Partial_Report.md` (primary), `context/Microgrid_Funding_for_UH.txt` (funding info, use cautiously).
*   **Data Storage:** Use JSON or GeoJSON for map point data.
*   When using local images, double-check relative paths and exact filenames (case-sensitive with extension). Use browser developer tools (Console tab) to debug 404 errors for missing resources.
*   If paths/names are confirmed correct, consider other factors: folder name typos, file extensions, file integrity, browser security (`file:///`), local server issues, permissions, cache, extensions.
*   Systematic troubleshooting (simplifying the problem, checking browser tools) is key to diagnosing persistent issues.
*   **Crucially: Do not guess filenames. Always use the exact filenames provided or ask the user to confirm them.**
*   `IntersectionObserver` `threshold` value significantly impacts when the callback triggers. A small value (like `0.01` or `0.0`) makes it trigger almost immediately upon entering/leaving the viewport, while `1.0` requires the entire element to be visible.
*   Use `<figure>` and `<figcaption>` for images that require a caption for semantic HTML.
*   Provide descriptive `alt` text for images, crucial for accessibility and SEO.
*   When adding image placeholders, basic styling (`max-width`, `border`, `background-color`, `aspect-ratio`) helps visualize where the final image will go and how it might scale.
*   Using CSS Grid (`display: grid` with `repeat(auto-fit, minmax(Xpx, 1fr))`) is an effective way to create responsive card layouts that automatically adjust the number of columns based on available width.
*   Structuring content semantically within cards (using appropriate headings, lists, paragraphs) improves readability and maintainability.
*   When transferring content from Markdown, ensure links are correctly formatted as HTML `<a>` tags and consider simplifying or combining multiple links if appropriate for the web layout.
*   **When content unexpectedly disappears, check `overflow` properties on parent elements and ensure heights/positioning are correct.**
*   **The common iframe aspect-ratio technique (`height: 0; padding-bottom: X%; position: relative;` on container, `position: absolute;` on iframe) requires `overflow: hidden;` on the container, but this should only affect content *inside* that specific container.**
*   Verify the actual content and structure of a section before assuming styling issues are the cause of missing expected elements. The element might need to be created first.
*   Changes to one element's style can sometimes inadvertently affect others if selectors are not specific enough or if layout properties interact. Always review surrounding elements after making changes.
*   The `max-width` property is often used to constrain the size of fluid elements like embedded maps or images. Adjusting or removing it is key to controlling their maximum size.
*   Iterative refinement of layout properties like `max-width` is common. Using percentages can provide better flexibility across screen sizes than fixed pixel values.
*   Creating backups of specific features before removal or major changes is good practice. Isolate relevant HTML, CSS, and JS components.
*   Using percentages for `max-width` (like `95%`) combined with `margin: auto` is a common technique for centering content while leaving consistent side margins.
*   Removing features requires careful deletion of corresponding code across HTML, CSS, and JavaScript to avoid orphaned elements, unused styles, or script errors.
*   Avoid setting `overflow: hidden` (especially `overflow-x: hidden`) or `display: flex` directly on the `<body>` element unless absolutely necessary and fully understood, as it can easily lead to unexpected content clipping or layout issues. Standard block layout usually suffices for the body.
*   Removing features, especially those involving JavaScript that interacts with layout (like body padding or visibility toggling), can be complex. If removal causes major issues, reverting might be necessary before attempting removal again with a different strategy or more thorough debugging.
*   Clear communication is key when performing reverts or undoing actions to ensure the desired state is achieved. 