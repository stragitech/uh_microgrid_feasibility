# Microgrid Dashboard Integration Plan

## Objective

Embed the `MicrogridDashboard` component within the `GlobalMapSection` component, specifically positioned below the Google Map iframe in the "Global Microgrid Examples" section of the website.

## Plan

1.  **Modify `tailwind_dashboard/src/components/GlobalMapSection.tsx`:**
    *   Add an import statement for the `MicrogridDashboard` component at the beginning of the file.
    *   Locate the `div` element that wraps the Google Map iframe (this is the div with `className="relative w-full max-w-screen-xl mx-auto"`).
    *   Insert the `<MicrogridDashboard />` component immediately after the closing `</div>` tag of the iframe wrapper, ensuring it remains within the main container div (`div className="container mx-auto"`).

## Implementation Steps

Once this plan is approved, the next step will be to switch to Code mode and apply the necessary changes to `tailwind_dashboard/src/components/GlobalMapSection.tsx`.