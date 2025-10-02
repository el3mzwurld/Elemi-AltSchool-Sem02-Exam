import { Toolbar } from "../components/Toolbar.jsx";
import { TextArea } from "../components/TextArea.jsx";
import { Sidebar, SidebarClose } from "lucide-react";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { Link } from "react-router-dom";
import loading_img from "../assets/img/loading_img.svg";

const MarkdownApp = () => {
  // Template markdown string
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
  // Preview type state
  const [previewMode, setPreviewMode] = useState("Preview");
  //Documents state
  const [documents, setDocuments] = useState([]);
  //Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Mount and Update effects
  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("Markdown_Docs")) || [];
    setDocuments(savedDocs);

    if (savedDocs.length > 0) {
      const latestDocument = savedDocs[savedDocs.length - 1];
      setMarkdownTxt(latestDocument.content);
    } else {
      setMarkdownTxt(templateMd);
    }
  }, []);
  useEffect(() => {
    if (!markdownTxt.trim()) return;
    setDocuments((prev) => {
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
          ...updatedDocs[updatedDocs.length - 1],
          content: markdownTxt,
          updatedAt: new Date().toISOString(),
        };
      }

      localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
      return updatedDocs;
    });
  }, [markdownTxt]);

  //Markdown parser
  const parsedHTML = marked(markdownTxt || "");

  //Helper Functions

  // Open/Close sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  // Save current file to local storage
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

    setDocuments((prev) => {
      const updatedDocs = [...prev, Doc];
      localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
      return updatedDocs;
    });
  };
  // Download .md file
  const downloadFile = () => {
    const unfil = prompt("Please enter a file name:", "Untitled.md");
    if (!unfil) return;

    const file = unfil.endsWith(".md") ? unfil : `${unfil}.md`;

    if (!file) return;

    const blob = new Blob([markdownTxt], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  // Clear documents from local storage
  const clearStorage = () => {
    localStorage.clear("Markdown_Docs");
    location.reload();
  };
  // Create New document
  const initDoc = () => {
    const untitledCounter = documents.filter((doc) =>
      doc.name.startsWith("untitled" || "Untitled")
    ).length;

    const newDocument = {
      id: Date.now(),
      name:
        untitledCounter === 0
          ? "untitled.md"
          : `untitled(${untitledCounter}).md`,
      content: templateMd,
      updatedAt: new Date().toISOString(),
    };

    setDocuments((prev) => {
      const updatedDocs = [...prev, newDocument];
      localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
      return updatedDocs;
    });

    setMarkdownTxt("");
    toggleSidebar();
  };
  // Render document from sidebar
  const renderDoc = (id) => {
    const doc = documents.find((d) => d.id === id);

    if (doc) {
      setMarkdownTxt(doc.content);
    }
  };
  // Import .md file from local device
  const importLocal = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    //Check if the file is a .md file
    if (!file.name.endsWith(".md")) {
      setMarkdownTxt("Invalid File, Import a markdown file");
      return;
    }
    setIsLoading(true);
    console.log(isLoading);
    const reader = new FileReader();

    reader.onload = (e) => {
      setTimeout(() => {
        const importedContent = e.target.result;
        setMarkdownTxt(importedContent);

        const newDoc = {
          id: Date.now(),
          name: file.name,
          content: importedContent,
          updatedAt: new Date().toISOString(),
        };

        setDocuments((prev) => {
          const updatedDocs = [...prev, newDoc];
          localStorage.setItem("Markdown_Docs", JSON.stringify(updatedDocs));
          return updatedDocs;
        });

        setIsLoading(false);
        event.target.value = "";
      }, 5000);
    };

    reader.onerror = () => {
      console.log("Error reading file");
      setIsLoading(false);
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav" aria-label="Main navigation">
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
                <p
                  onClick={() => {
                    document.getElementById("mdFileInput").click();
                  }}
                >
                  .md
                </p>
              </div>
            </div>
            <div className="nav_dropdowns_item">
              <p>Download</p>

              <div className="nav_dropdowns_item_menu">
                <p onClick={downloadFile}>.md</p>
                <input
                  type="file"
                  accept=".md"
                  name=""
                  style={{ display: "none" }}
                  id="mdFileInput"
                  onChange={importLocal}
                />
              </div>
            </div>
            <div className="nav_dropdowns_item">
              <Link to="/error">Trigger error</Link>
            </div>
          </div>
        </nav>
      </header>

      <aside
        className={`sidebar ${isSidebarOpen ? "active" : ""}`}
        role="complementary"
        aria-label="Document History Sidebar"
      >
        <div className="sidebar_close" onClick={toggleSidebar}>
          <SidebarClose size={30} color="#e25d5d" />
        </div>

        <div className="sidebar_content">
          <ul className="sidebar-content-container">
            <li className="sidebar-content-link">
              <p>DOCUMENTS</p>
              <ul role="list">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <li
                      className="sidebar-content-link-item"
                      key={doc.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${doc.name}`}
                      onClick={() => {
                        toggleSidebar();
                        renderDoc(doc.id);
                      }}
                    >
                      {doc.name}
                    </li>
                  ))
                ) : (
                  <li key={null} className="sidebar-content-link-item empty">
                    No saved documents
                  </li>
                )}
              </ul>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-new-doc">
              <button
                onClick={initDoc}
                role="button"
                aria-label="Create new Document"
              >
                NEW DOCUMENT
              </button>
            </li>
            <li className="sidebar-content-link" id="sidebar-btn-save-sess">
              <button
                onClick={saveFile}
                role="button"
                aria-label="Save document"
              >
                SAVE SESSION
              </button>
            </li>
            <li
              className="sidebar-content-link"
              id="sidebar-btn-clr-doc"
              role="button"
              aria-label="Remove all documents from history"
              onClick={clearStorage}
            >
              <p>DELTE ALL DOCUMENTS</p>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main">
        {/* Body of the mkd application */}
        {isLoading ? (
          <div
            className="main-isLoading"
            role="status"
            aria-live="polite"
            aria-label="Loading Document"
          >
            <img src={loading_img} alt="Loading" aria-label="Loading Image" />
          </div>
        ) : (
          <>
            {" "}
            <section
              className="editor-container"
              aria-label="Markdown editor section"
            >
              <Toolbar markdown={markdownTxt} setMarkdown={setMarkdownTxt} />
              {/* Tool bar to give a few quick access options to users */}
              <TextArea markdown={markdownTxt} setMarkdown={setMarkdownTxt} />
              {/* Text area to allow users type their markdown text */}
            </section>
            <section
              className="preview-container"
              aria-label="Markdown Preview section"
            >
              <div className="preview-language">
                <p>{previewMode.toUpperCase()}</p>
                <p>PREVIEW</p>
              </div>
              <div className="preview-content">
                {/* Raw, Preview, HTML */}
                {previewMode === "Raw" && (
                  <pre role="textbox" aria-label="Raw Markdown text preview">
                    {markdownTxt}
                  </pre>
                )}
                {previewMode === "Preview" && (
                  <div
                    dangerouslySetInnerHTML={{ __html: parsedHTML }}
                    role="textbox"
                    aria-label="Styled preview"
                  ></div>
                )}
                {previewMode === "HTML" && (
                  <pre role="textbox" aria-label="HTML text preview">
                    {parsedHTML}
                  </pre>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MarkdownApp;
