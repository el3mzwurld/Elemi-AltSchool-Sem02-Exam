import { Toolbar } from "../components/toolbar.jsx";
import { TextArea } from "../components/textarea.jsx";
import { Sidebar, SidebarClose } from "lucide-react";
import { useEffect, useState } from "react";
import { marked } from "marked";

const MarkdownApp = () => {
  const templateMd = `# Welcome to elemz.md 👋  
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
`;

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Markdown text state
  const [markdownTxt, setMarkdownTxt] = useState(templateMd);

  const [documents, setDoocuments] = useState([]);
  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("Markdown_Docs")) || [];
    setDoocuments(savedDocs);
    if (savedDocs.length > 0) {
      const latestDocument = savedDocs[savedDocs.length - 1];
      setMarkdownTxt(latestDocument.content);
    } else {
      setMarkdownTxt(templateMd);
    }
  }, []);
  useEffect(() => {
    if (!markdownTxt.trim()) return;
    setDoocuments((prev) => {
      let updatedDocs = [...prev];

      //If there's no document...one should be created....if there's one, store it
      if (updatedDocs.length === 0) {
        updatedDocs.push({
          id: Date.now(),
          name: "untitled.md",
          content: markdownTxt,
          updatedAt: new Date().toISOString(),
        });
        console.log(updatedDocs);
      } else {
        updatedDocs[updatedDocs.length - 1] = {
          ...updatedDocs[updatedDocs - 1],
          content: markdownTxt,
          updatedAt: new Date().toISOString(),
        };
      }

      localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
      return updatedDocs;
    });
  }, [markdownTxt]);

  // Preview type state
  const [previewMode, setPreviewMode] = useState("Preview");

  const parsedHTML = marked(markdownTxt || "");

  //Functions
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const saveFile = () => {
    const unfil = prompt("Please enter a file name:", "Untitled.md");
    if (!unfil) return;

    const fileName = unfil.endsWith(".md") ? unfil : `${unfil}.md`;

    const Doc = {
      id: Date.now(),
      name: fileName,
      content: markdownTxt,
      updatedAt: new Date().toISOString(),
    };

    setDoocuments((prev) => {
      const updatedDocs = [...prev, Doc];
      localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
      return updatedDocs;
    });

    downloadFile(fileName);
  };

  const downloadFile = (file) => {
    if (!file) return;

    const blob = new Blob([markdownTxt], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const clearStorage = () => {
    localStorage.clear("Markdown_Docs");
    location.reload();
  };

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
                <p onClick={saveFile}>.md</p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar_close" onClick={toggleSidebar}>
          <SidebarClose size={30} color="#e25d5d" />
        </div>

        <div className="sidebar_content">
          <ul className="sidebar-content-container">
            <li className="sidebar-content-link">
              <p>DOCUMENTS</p>
              <ul></ul>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-new-doc">
              <button>NEW DOCUMENT</button>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-save-sess">
              <button>SAVE SESSION</button>
            </li>
            <li
              className="sidebar-content-link"
              id="sidebar-btn-clr-doc"
              onClick={clearStorage}
            >
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
            <p>{previewMode.toUpperCase()}</p>
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
