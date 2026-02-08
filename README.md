# Lab Website

## Development & Build

```bash
# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Production build
npm run build

# Preview build output
npm run preview
```

## Configuration

All configurations are managed via JSON files in the `src/configs/` directory. Images are placed in the `public/img/` directory and referenced in JSON using `/img/xxx.png` paths.

### `app.json` - Website Basic Info
```json
{
  "logo": "W",           // Text inside the top-left box
  "labName": "Lab Name"  // Lab name
}
```

### `home.json` - Homepage Content
```json
{
  "heroTitle": "Lab Name",           // Main title
  "heroSubtitle": "Research Vision", // Subtitle
  "ctaText": "Learn More",           // Button text
  "highlights": ["...", "...", "..."], // Highlights (3 items)
  "news": [                          // Latest news
    { "date": "2026-02", "title": "..." }
  ],
  "email": "contact@lab.edu",        // Contact email
  "address": "Address"               // Address
}
```

### `projects.json` - Project List
```json
{
  "title": "Projects",
  "items": [
    {
      "title": "...",                  // Project name
      "desc": "...",                   // Project description
      "link": "http://example.com/",   // Project link
      "img": "/img/placeholder.png"    // Project image
    }
  ]
}
```

### `people.json` - Team Members
```json
{
  "title": "Our Team",
  "principalInvestigatorTitle": "Principal Investigator",
  "principalInvestigator": {
    "name": "...",                     // Name
    "role": "...",                     // Title
    "bio": "...",                      // Bio
    "email": "http://example.com/",    // Email link
    "website": "http://example.com/",  // Personal website
    "avatar": "/img/placeholder.png"   // Avatar
  },
  "sections": [                        // Other member groups
    {
      "title": "PhD Students",
      "people": [
        {
          "name": "...",
          "role": "...",
          "avatar": "/img/placeholder.png"
        }
      ]
    }
  ]
}
```

### `publications.json` - Publications
```json
{
  "title": "Publications",
  "years": ["All", "2026", "2025", "2024"],  // Year filter
  "areas": ["All", "Computer Vision", ...],  // Area filter
  "items": [
    {
      "title": "...",                        // Paper title
      "authors": "...",                      // Authors
      "venue": "...",                        // Conference/Journal
      "year": "2025",                        // Year
      "area": "Computer Vision",             // Area
      "links": {                             // Links
        "paper": "http://example.com/",
        "code": "http://example.com/",
        "project": "http://example.com/"
      },
      "img": "/img/placeholder.png"          // Thumbnail
    }
  ]
}
```

### `awards.json` - Awards & Honors
```json
{
  "title": "Awards",
  "items": [
    {
      "title": "...",                  // Award name
      "desc": "...",                   // Award description
      "img": "/img/placeholder.png",   // Award image
      "link": "http://example.com/"    // Related link
    }
  ]
}
```
