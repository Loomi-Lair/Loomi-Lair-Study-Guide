# Loomi Lair Study Guide Viewer

A modern, mobile-responsive web application built with Vue.js to display markdown study guides and notes.

## Features

- 📱 **Mobile Responsive**: Fully optimized for mobile devices with touch-friendly navigation
- 📝 **Markdown Support**: Renders markdown files with syntax highlighting for code blocks
- 🔍 **Search Functionality**: Quick search to find guides by title or description
- 🎨 **Clean UI**: Modern, intuitive interface with smooth transitions
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds
- 🧭 **Easy Navigation**: Sidebar navigation and breadcrumbs for seamless browsing

## Tech Stack

- **Vue.js 3**: Progressive JavaScript framework with Composition API
- **Vue Router**: Client-side routing for single-page application
- **Marked**: Fast markdown parser and renderer
- **Vite**: Next-generation frontend build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the viewer directory:
```bash
cd viewer
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
viewer/
├── public/
│   └── markdown/          # Markdown study guide files
│       ├── index.json     # Index of all available guides
│       ├── getting-started.md
│       ├── javascript-basics.md
│       └── vue-fundamentals.md
├── src/
│   ├── router/
│   │   └── index.js       # Vue Router configuration
│   ├── views/
│   │   ├── Home.vue       # Home page with guide listing
│   │   └── MarkdownViewer.vue  # Markdown rendering view
│   ├── App.vue            # Root component
│   └── main.js            # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Adding New Study Guides

1. Create a new markdown file in `public/markdown/`:
```bash
# Example: my-new-guide.md
```

2. Update `public/markdown/index.json` to include the new guide:
```json
{
  "id": "my-new-guide",
  "title": "My New Guide",
  "description": "Description of the guide",
  "file": "my-new-guide.md"
}
```

3. The guide will automatically appear in the application!

## Markdown Features Supported

- Headers (H1-H6)
- Bold, italic, and strikethrough text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Links and images
- Blockquotes
- Horizontal rules
- Tables

## Mobile Compatibility

The application is fully responsive and includes:
- Mobile-friendly navigation menu (hamburger menu)
- Touch-optimized interface
- Responsive typography and spacing
- Optimized for various screen sizes (phones, tablets, desktops)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

To contribute new study guides:
1. Add your markdown file to `public/markdown/`
2. Update `index.json` with your guide information
3. Test locally to ensure proper rendering
4. Submit a pull request

## License

This project is part of the Loomi Lair organization study materials.
