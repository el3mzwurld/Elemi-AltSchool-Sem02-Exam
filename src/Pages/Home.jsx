import { Toolbar } from "../components/toolbar.jsx";
import { TextArea } from "../components/textarea.jsx";
import { Sidebar, SidebarClose } from "lucide-react";
import { useState } from "react";
import { marked } from "marked";

const MarkdownApp = () => {
  // States

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Markdown text state
  const [markdownTxt, setMarkdownTxt] = useState(`# Welcome to elemz.md 👋  
Your lightweight, live Markdown editor!

This demo shows how to use **different Markdown features**.  
Feel free to edit or remove anything as you type!

---

## 🔤 Text Formatting

**Bold Text**  
Use double asterisks or underscores:  
\`**bold text**\` or \`__bold text__\`

*Italic Text*  
Use single asterisks or underscores:  
\`*italic text*\` or \`_italic text_\`

***Bold & Italic***  
\`***bold and italic***\`

~~Strikethrough~~  
\`~~strikethrough~~\`

> Blockquotes  
Use \`>\` at the start of the line:
\`> This is a quote\`

Inline \`code\`  
Wrap text in backticks:  
\`console.log("Hello")\`

\`\`\`
Code Block  
Use triple backticks:
\`\`\`js
function greet() {
  console.log("Hello, Markdown!");
}
\`\`\`
\`\`\`

---

## 📌 Headings

Use \`#\` symbols (1–6):

\`# Heading 1\`  
\`## Heading 2\`  
\`### Heading 3\`  
\`#### Heading 4\`  
\`##### Heading 5\`  
\`###### Heading 6\`

---

## ✅ Lists

### • Unordered Lists
Use \`-\`, \`*\`, or \`+\`:
- Item 1  
- Item 2  
  - Nested Item

### • Ordered Lists
Use numbers:
1. First item  
2. Second item  
3. Third item

---

## 🔗 Links
Syntax: \`[link text](url)\`  
Example:  
[Visit Google](https://google.com)

---

## 🖼️ Images
Syntax: \`![alt text](image-url)\`  
Example:  
![Markdown Example](https://via.placeholder.com/200)

---

## 🧱 Tables
\`\`\`
| Name     | Role     | Age |
|----------|----------|-----|
| Alice    | Designer | 24  |
| Bob      | Developer| 27  |
| Charlie  | Writer   | 22  |
\`\`\`

| Name     | Role     | Age |
|----------|----------|-----|
| Alice    | Designer | 24  |
| Bob      | Developer| 27  |
| Charlie  | Writer   | 22  |

---

## 📍 Horizontal Rule
Use three or more:  
\`---\`  
\`***\`

---

## ✅ Task Lists
\`\`\`
- [x] Write markdown  
- [ ] Add preview toggle  
- [ ] Connect toolbar buttons
\`\`\`

- [x] Write markdown  
- [ ] Add preview toggle  
- [ ] Connect toolbar buttons

---

## 🎉 You're all set!
Start typing on the left — your preview updates instantly!
`);

  // Preview type state
  const [previewMode, setPreviewMode] = useState("Preview");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const parsedHTML = marked(markdownTxt);

  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav">
          <div className="nav_logo">
            <div className="side-logo" onClick={toggleSidebar}>
              <Sidebar color="#e25d5d" size={20} className="ico" />
            </div>
            <h2> elemz.md</h2>
          </div>
          <div className="nav_dropdowns">
            <div className="nav_dropdowns_item">
              <p>{previewMode}</p>

              <div className="nav_dropdowns_item_menu">
                <p onClick={() => setPreviewMode("Preview")}>Preview</p>
                <p onClick={() => setPreviewMode("Raw")}>Raw</p>
                <p onClick={() => setPreviewMode("HTML")}>HTML </p>
              </div>
            </div>
            <div className="nav_dropdowns_item">
              <p>Import</p>

              <div className="nav_dropdowns_item_menu">
                <p>.md</p>
              </div>
            </div>
            <div className="nav_dropdowns_item">
              <p>Save as</p>

              <div className="nav_dropdowns_item_menu">
                <p>.pdf</p>
                <p>.html</p>
                <p>.md</p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-close" onClick={toggleSidebar}>
          <SidebarClose size={30} color="#e25d5d" />
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-content-container">
            <li className="sidebar-content-link">
              <p>DOCUMENTS</p>
              <ul>
                <li></li>
                <li></li>
              </ul>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-new-doc">
              <button>NEW DOCUMENT</button>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-save-sess">
              <button>SAVE SESSION</button>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-clr-doc">
              <p>DELTE ALL DOCUMENTS</p>
            </li>
          </ul>
        </div>
      </div>

      <main className="main">
        {/* Body of the mkd application */}
        <section className="editor-container">
          <Toolbar markdown={markdownTxt} setMarkdown={setMarkdownTxt} />
          {/* Tool bar to give a few quick access options to users */}
          <TextArea markdown={markdownTxt} setMarkdown={setMarkdownTxt} />
          {/* Text area to allow users type their markdown text */}
        </section>
        <section className="preview-container">
          <div className="preview-language">
            <p>{previewMode}</p>
            <p>PREVIEW</p>
          </div>
          <div className="preview-content">
            {/* Raw, Preview, HTML */}
            {previewMode === "Raw" && <pre>{markdownTxt}</pre>}
            {previewMode === "Preview" && (
              <div dangerouslySetInnerHTML={{ __html: parsedHTML }}></div>
            )}
            {previewMode === "HTML" && <pre>{parsedHTML}</pre>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarkdownApp;
