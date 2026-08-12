# Portfolio Section Guide

## Overview
Your website now includes a fully functional portfolio section showcasing the **Makueni School Complex** project with a beautiful photo gallery.

## What's Been Added

### 1. Project Data
Located in: `src/data/site.ts`

The Makueni School project has been added to the projects array:
- **Type**: Commercial
- **Location**: Makueni County
- **Year**: 2025
- **Duration**: 8 months
- **Budget**: KSh 32M
- **Trades**: Architecture, masonry, roofing, plastering, flooring, painting, electrical, plumbing, landscaping

### 2. Photo Gallery Component
Located in: `src/components/ProjectGallery.tsx`

Features:
- Grid layout with hover effects
- Click to open full-screen lightbox
- Navigation between images (prev/next buttons)
- Keyboard navigation (arrow keys, escape to close)
- Image captions
- Responsive design

### 3. Image Files
Your photos are located in: `src/assets/`

Filenames:
- `makueni-school-aerial-view.jpg` - Aerial view with mountains
- `makueni-school-exterior-front.jpg` - Building exterior
- `makueni-school-interior-classroom.jpg` - Classroom interior
- `makueni-funpark.jpg` - Playground and courtyard

### 4. Portfolio Pages Updated
- **Portfolio Index** (`src/routes/portfolio/index.tsx`): Shows Makueni School in the project grid
- **Project Detail Page** (`src/routes/portfolio/$slug.tsx`): Shows full gallery for Makueni School

## How to View

1. Navigate to `/portfolio` to see all projects
2. Click on "Makueni School Complex" to view the detailed page
3. The gallery displays all 4 photos in a grid
4. Click any photo to open the lightbox viewer
5. Use arrow buttons or keyboard to navigate between photos

## How to Add More Projects

### Step 1: Add Photos
Save project photos in `src/assets/` with descriptive names:
```
project-name-description.jpg
```

### Step 2: Update Data File
Edit `src/data/site.ts` and add a new project to the `projects` array:

```typescript
{
  slug: "project-slug",
  title: "Project Title",
  type: "Commercial", // or "Residential" or "Civil"
  location: "Location Name",
  year: 2025,
  duration: "X months (planned X)",
  budget: "KSh XXM",
  image: "image-key",
  brief: "Project description...",
  trades: ["trade-slug-1", "trade-slug-2"],
  testimonial: { 
    quote: "Client quote...", 
    author: "Client Name",
    role: "Client Role" 
  },
}
```

### Step 3: Import Photos (if using gallery)
In `src/routes/portfolio/$slug.tsx`, import your project photos:

```typescript
import projectPhoto1 from "@/assets/project-photo-1.jpg";
import projectPhoto2 from "@/assets/project-photo-2.jpg";
```

### Step 4: Add to Images Map
Add the main project image to the `images` object:

```typescript
const images: Record<string, string> = { 
  residential, 
  commercial, 
  civil, 
  makueni: makueniAerial,
  yourproject: projectPhoto1  // Add this
};
```

### Step 5: Create Gallery (Optional)
If you want a gallery like Makueni School, add a gallery array in the `CaseStudy` component:

```typescript
const yourProjectGalleryImages = [
  {
    src: projectPhoto1,
    alt: "Description",
    caption: "Photo caption",
  },
  // Add more photos...
];
```

And add a condition:
```typescript
const isYourProject = project.slug === "your-project-slug";
```

## Design Features

### Gallery Features
- **Grid Layout**: 2 columns on tablet, 3 on desktop
- **Hover Effects**: Images scale up slightly
- **Captions**: Show on hover
- **Lightbox**: Full-screen viewing with navigation
- **Accessibility**: Keyboard navigation and ARIA labels

### Project Detail Features
- **Hero Section**: Project type, location, year
- **Stats Bar**: Timeline, budget, location, completion year
- **Trades Delivered**: Links to related services
- **Client Testimonial**: Featured quote
- **Project Highlights**: Custom content area (for Makueni: scope and features)

## Filtering

The portfolio index includes filters:
- **By Type**: All, Residential, Commercial, Civil
- **By Location**: Dropdown with all project locations
- **By Year**: Dropdown with completion years

## SEO & Meta Tags

Each project page includes:
- Dynamic page title
- Meta description
- Open Graph tags
- Twitter card tags

## Mobile Responsive

All portfolio components are fully responsive:
- Stack on mobile
- 2-column grid on tablet
- 3-column grid on desktop
- Touch-friendly lightbox controls

## Need Help?

To modify styles, look for these Tailwind classes:
- `surface-card` - Card background
- `eyebrow` - Small uppercase labels
- `container-x` - Content container with padding
- Hover states use `group-hover:` prefix

---

**Note**: Make sure your images are optimized for web (compressed JPEGs, ideally under 500KB each) for best performance.
