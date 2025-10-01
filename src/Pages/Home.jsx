import { Toolbar } from "../components/toolbar.jsx";
import { TextArea } from "../components/textarea.jsx";
import { Sidebar, SidebarClose } from "lucide-react";
import { useState } from "react";
import { marked } from "marked";

const MarkdownApp = () => {
  const simpletext = `# Welcome to elemz.md!

This is a live **Markdown Editor**.

## Quick Tips:
- Type markdown on the left
- Preview appears on the right
- Use the toolbar to insert:
  - Headings
  - Bold text
  - Lists
  - Links
  - Tables

Happy writing! 🚀
`;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [markdownTxt, setMarkdownTxt] = useState(simpletext);
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
              <p>Preview</p>

              <div className="nav_dropdowns_item_menu">
                <p>Text</p>
                <p>HTML</p>
              </div>
            </div>
            <div className="nav_dropdowns_item">
              <p>Import</p>

              <div className="nav_dropdowns_item_menu">
                <p>Text</p>
                <p>HTML</p>
                <p>PDF</p>
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
            <p>Raw Text</p>
            <p>PREVIEW</p>
          </div>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: parsedHTML }}
          >
            {/* All the preview text will show here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarkdownApp;
