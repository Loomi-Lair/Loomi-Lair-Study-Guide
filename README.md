# Loomi Lair Study Guide

A comprehensive collection of study guides and notes for the Loomi Lair organization, with a modern web viewer to display markdown content on any device.

## 📚 Overview

This repository contains study materials and technical notes in markdown format, along with a Vue.js web application that makes them accessible through any web browser with full mobile device compatibility.

## ✨ Features

- **Markdown-based content**: Easy to write, edit, and maintain
- **Web viewer**: Modern Vue.js application for browsing guides
- **Mobile-friendly**: Fully responsive design optimized for all devices
- **Search functionality**: Quickly find the guides you need
- **Easy navigation**: Intuitive sidebar and routing
- **Syntax highlighting**: Beautiful code examples in guides

## 🚀 Quick Start

### Viewing the Study Guides

1. Navigate to the viewer directory:
```bash
cd viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173/`

### Adding New Study Guides

1. Create a markdown file in `viewer/public/markdown/`:
```bash
# Example: viewer/public/markdown/python-basics.md
```

2. Add your guide to `viewer/public/markdown/index.json`:
```json
{
  "id": "python-basics",
  "title": "Python Basics",
  "description": "Introduction to Python programming",
  "file": "python-basics.md"
}
```

3. Your guide will automatically appear in the viewer!

## 📖 Available Guides

- **Getting Started**: Introduction to the study guide platform
- **JavaScript Basics**: Fundamental concepts of JavaScript programming
- **Vue.js Fundamentals**: Core concepts and features of Vue.js

## 🛠️ Technology Stack

- **Vue.js 3**: Frontend framework
- **Vue Router**: Navigation and routing
- **Marked**: Markdown parsing and rendering
- **Vite**: Build tool and development server

## 📱 Mobile Compatibility

The viewer is fully optimized for mobile devices with:
- Responsive layout that adapts to any screen size
- Touch-friendly navigation
- Mobile menu with hamburger icon
- Optimized typography for readability

## 🤝 Contributing

We welcome contributions! To add a new study guide:

1. Fork this repository
2. Create your markdown file in `viewer/public/markdown/`
3. Update the `index.json` file
4. Test your changes locally
5. Submit a pull request

## 📝 License

This project is maintained by the Loomi Lair organization for educational purposes.

---

For detailed documentation about the viewer application, see [viewer/README.md](viewer/README.md).