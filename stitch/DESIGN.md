# Design System: High-End Editorial Minimalism

This document defines the visual and structural language for a premium, high-legibility productivity experience. By moving beyond the generic "SaaS template" look, we employ sophisticated tonal layering, editorial typography, and intentional white space to create a sanctuary for focus.

---

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
The goal is to evoke the feeling of a clean, high-end physical workspace—premium paper, soft natural light, and a sense of quiet organization. We break the rigid, boxed-in grid of traditional to-do apps by using **intentional asymmetry** and **tonal depth** rather than hard lines.

The experience must feel "breathable." We prioritize negative space (whitespace) as a functional element that guides the eye, ensuring the user feels calm, not cluttered.

---

## 2. Color & Surface Philosophy
The palette is built on a foundation of "Soft Grays" with a singular, high-authority accent color (`tertiary`).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or containment. 
Boundaries are defined exclusively through background color shifts. For example, a task list sitting on `surface` (#f8f9fa) should be contained within a `surface-container-low` (#f1f4f6) region. This creates a softer, more sophisticated transition that feels integrated rather than partitioned.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent sheets. 
- **Base Layer:** `surface` (#f8f9fa).
- **Secondary Grouping:** `surface-container-low` (#f1f4f6).
- **Interactive Elements (Cards):** `surface-container-lowest` (#ffffff) to provide a subtle "pop" against the gray background.

### The "Glass & Gradient" Rule
To elevate CTAs beyond flat boxes, use subtle linear gradients for the `tertiary` action color—transitioning from `tertiary` (#0053dc) to `tertiary_container` (#3e76fe). Floating action buttons (FABs) or modals should utilize **Glassmorphism**: a background of `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur to allow underlying content to bleed through softly.

---

## 3. Typography: Editorial Authority
We use a dual-font system to balance character with functional clarity.

*   **Display & Headlines (Manrope):** Used for headers and category titles. Manrope’s geometric yet warm nature provides an "Editorial" feel. Use `headline-lg` for daily overviews to create a strong visual anchor.
*   **Body & Labels (Inter):** Used for task descriptions and metadata. Inter is chosen for its exceptional x-height and legibility at small sizes.

**The Typographic "Soul":** 
High contrast in scale is encouraged. Pair a `display-sm` date header with `body-sm` metadata to create a clear hierarchy that doesn't rely on bolding everything.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container` background. The contrast in hex value provides all the "elevation" needed for standard tasks.
*   **Ambient Shadows:** For floating elements (Modals, Popovers), use extra-diffused shadows:
    *   *Offset:* 0px 8px
    *   *Blur:* 32px
    *   *Color:* `on_surface` (#2b3437) at **4% opacity**.
*   **The Ghost Border Fallback:** If a task requires a boundary (e.g., in high-glare environments), use a "Ghost Border": `outline_variant` at **15% opacity**. Never use 100% opaque outlines.

---

## 5. Components

### Buttons & CTAs
*   **Primary Action (Add Task):** Use `tertiary` (#0053dc) with a `full` (pill) roundedness. Label should be `on_tertiary` (#faf8ff).
*   **Secondary Action:** Use `surface-container-high` (#e2e9ec) with `on_surface` text. No border.
*   **Tertiary (Ghost):** Plain text using `primary` (#555f70) with a subtle `surface-variant` hover state.

### Input Fields
*   **Minimalist Entry:** No bottom line or box. Use `body-lg` text directly on the `surface`. Use a blinking cursor in the `tertiary` color to signal focus.
*   **Contextual Inputs:** For dates/tags, use `surface-container-lowest` chips with `sm` (0.25rem) rounding.

### Task Lists & Cards
*   **The Divider Forbid:** Never use horizontal lines to separate tasks. Use `spacing-4` (1rem) of vertical white space or a subtle shift to `surface-container-low` on hover.
*   **Checkboxes:** Use `md` (0.75rem) rounded corners for the checkbox itself. When checked, the box should transition to `primary` (#555f70), and the task text should shift to `outline` (#737c7f) with a strike-through.

### Additional Signature Components
*   **The "Focus Drawer":** A full-height side sheet using `surface_container_lowest` with a `xl` (1.5rem) left-side radius, appearing to slide "over" the workspace to edit task details.
*   **Progress Micro-Gradients:** A thin 4px bar at the top of the screen using a gradient from `tertiary_dim` to `tertiary_fixed` to show daily completion without occupying significant real estate.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Align headers to the far left while keeping the task list slightly indented to create a modern, editorial rhythm.
*   **Trust the White Space:** If the UI feels "empty," increase the `spacing` values rather than adding more borders or boxes.
*   **Use Subtle Tones:** Use `on_surface_variant` (#586064) for secondary info (time created, category) to keep the primary task description the focal point.

### Don’t:
*   **Don't use pure black:** Use `on_background` (#2b3437) for text. Pure black is too harsh for this "Soft Minimalist" system.
*   **Don't use standard "Card" shadows:** Avoid heavy, 15%+ opacity shadows that make the UI feel like a 2014 material design app.
*   **Don't crowd the edges:** Maintain a minimum padding of `spacing-6` (1.5rem) from the screen edges to keep the "Atelier" feel.