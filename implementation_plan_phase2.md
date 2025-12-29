# Phase 2 Implementation Plan: Accountability Infrastructure

> **Goal**: Expand `publicrecord.fyi` from a simple upload tool to a comprehensive resource hub for the "Brushfires of Freedom" movement.

## 1. Database Schema Update
We need to support structured categorization for submissions.

-   **New Column**: `category` (TEXT, NOT NULL, DEFAULT 'general')
-   **Categories**:
    -   `alpr_camera` (ALPR Camera Location)
    -   `policy` (Contracts & Policies)
    -   `tracking` (Public Official Vehicle Tracking)
    -   `violation` (Policy Violations)
    -   `other` (Other Surveillance Records)

**Migration SQL**:
```sql
ALTER TABLE submissions ADD COLUMN category TEXT NOT NULL DEFAULT 'general';
-- Optional: Validation check
ALTER TABLE submissions ADD CONSTRAINT check_category CHECK (category IN ('general', 'alpr_camera', 'policy', 'tracking', 'violation', 'other'));
```

## 2. New Page: `/resources`
A static resource hub with copy-pasteable templates.

-   **Sections**:
    -   **FOIA Templates**: Accordion or code blocks for "ALPR Contracts" and "Official Tracking".
    -   **State Guide**: Tiered list (Tier 1: CT, MO, NC, FL).
    -   **Policy Failures**: Static content regarding LAPD and others.

## 3. Upload Flow Updates
-   **UI Changes**:
    -   Add Category Selector (Radio/Tiles).
    -   **"Only for the Bold" Interaction**: If `tracking` is selected, show warning modal/callout and specific fields.
    -   **New Fields**:
        -   `offical_name` (Repurpose existing field for "Target Official Name").
        -   `title` (Repurpose existing field for "Official Title").
        -   `jurisdiction` (Map to existing `state` + new metadata).
-   **Server Action**:
    -   Accept `category` from form data.
    -   Validate based on category.

## 4. Homepage Restructuring
-   **Hero**: Update text with Greenwald quote.
-   **Banner**: High-visibility "Washington Ruling" alert.
-   **Pipeline Section**: 3-step visualization (Map -> FOIA -> Track).
-   **Sheriff Story**: "It's Working" testimonial section.

## 5. About Page Updates
-   **Legal**: Add "Legal Foundation" (Washington ruling) and "Institute for Justice" sections.
-   **Movement**: Add DFlock and Brushfires tour references.

## Verification
-   **Schema**: Run SQL in Supabase.
-   **Build**: Ensure strict types are updated (may need to regenerate `database.types.ts` or manually patch).
-   **Content**: Visual check of all new sections.
-   **Flow**: Test uploading a "Tracking" record and verifying it appears in feed.
