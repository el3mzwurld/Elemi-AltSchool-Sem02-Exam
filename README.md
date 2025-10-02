# ✅ elemz.md — Markdown Preview Application

A fully functional Markdown editor and previewer built with **React**, featuring real-time rendering, live syntax highlighting, local file import/export, persistent storage, error boundaries, and responsive layout.

## 🚀 Project Overview

This application allows users to:

- Write Markdown in an editor
- Preview the rendered HTML in real time
- Switch between **Raw**, **Preview**, and **HTML** view modes
- Save and load Markdown files locally
- Maintain a document history using **Local Storage**
- Import `.md` files from the device
- Download the current markdown as a file
- Navigate with routing support
- Recover from rendering errors via an **Error Boundary**
- Handle undefined routes with a **custom 404 page**

---

## 🛠️ Tech Stack

| Feature             | Technology Used          |
| ------------------- | ------------------------ |
| Framework           | React (Vite)             |
| Routing             | React Router             |
| Markdown Parsing    | marked.js                |
| Syntax Highlighting | CodeMirror               |
| State Management    | React useState/useEffect |
| Styling             | Vanilla CSS + BEM        |
| Icons               | Lucide React             |
| Storage             | LocalStorage             |

---

## 📂 Folder Structure (Simplified)

```
src/
├── components/
│ ├── toolbar.jsx
│ ├── textarea.jsx
│ ├── errorboundary.jsx
├── pages/
│ ├── home.jsx
│ ├── notfound.jsx
│ ├── errortest.jsx
├── routes/
│ └── router.jsx
├── assets
 |  ├── img
 |  ├── styles
 |      └──  global.css
├── App.jsx
├── main.jsx
├── index.css
```

---

## ✅ Core Features (Implemented)

### ✅ Markdown Input & Real-Time Preview

- Users type in a custom text editor powered by CodeMirror
- Markdown is parsed using `marked`
- Live preview displayed side-by-side

### ✅ View Modes

- `Preview` → Rendered markdown
- `Raw` → Original markdown text
- `HTML` → HTML code output

### ✅ Responsive Design

- Desktop: Split layout (editor | preview)
- Mobile: Stacked layout

### ✅ Toolbar (UX Enhancement)

Quick insert options:

- Headings
- Bold
- List
- Link
- Table
- Clear
- Image-URL input

### ✅ File Operations

✔ Import `.md` files  
✔ Download current file  
✔ Auto-save to storage

### ✅ Local Storage Persistence

- Session is auto-saved
- Document history kept
- ‘New Document’ creates fresh markdown with template

### ✅ Error Handling

- ErrorBoundary component catches UI crashes
- Custom `/error` test route triggers error
- Fallback UI provided
- Custom 404 page for undefined routes

### ✅ Accessibility & ARIA

- Semantic elements: `<main>`, `<nav>`, `<section>`, `<aside>`
- `aria-label`, `role`, `tabIndex`, `aria-live`


---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd <project-folder>

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

| Command           | Purpose                       |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start development environment |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview production build      |

# Deployment ⬆️

---

[Hosted on Vercel : ](https://elemi-alt-school-sem02-exam.vercel.app/)
