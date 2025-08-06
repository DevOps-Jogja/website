# DevOps Jogja Static Assets

This directory contains static assets for the DevOps Jogja website.

## Directory Structure

```
static/
├── css/
│   ├── input.css          # Tailwind CSS source
│   └── output.css         # Compiled CSS (generated)
├── js/
│   └── main.js           # Custom JavaScript
├── images/
│   ├── blog/             # Blog post images
│   ├── event/            # Event images
│   ├── banner.jpg        # Main banner image
│   └── favicon.ico       # Website favicon
└── organizer/            # Organizer profile photos
```

## Adding Images

### Blog Images
- Place blog post featured images in `images/blog/`
- Reference them in blog post frontmatter: `featured_image: "your-image.jpg"`
- Recommended size: 1200x630px

### Event Images
- Place event images in `images/event/`
- Reference them in event frontmatter: `featured_image: "event-image.jpg"`
- Recommended size: 1200x630px

### Organizer Photos
- Place organizer photos in `organizer/`
- Reference them in `content/organizer.yaml`: `photo: "organizer-name.jpg"`
- Recommended size: 400x400px (square)

## Image Guidelines

- Use WebP format when possible for better performance
- Optimize images before uploading
- Use descriptive filenames
- Keep file sizes under 500KB for web performance
