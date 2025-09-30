import { Toolbar } from "../components/Toolbar";
import { TextArea } from "../components/TextArea";
import { Sidebar, SidebarClose } from "lucide-react";
import { useState, useEffect } from "react";
const MarkdownApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
      </div>

      <main className="main">
        {/* Body of the mkd application */}
        <section className="editor-container">
          <Toolbar />
          {/* Tool bar to give a few quick access options to users */}
          <TextArea />
          {/* Text area to allow users type their markdown text */}
        </section>
        <section className="preview-container">
          <div className="preview-language">
            <p>Raw Text</p>
            <p>PREVIEW</p>
          </div>
          <div className="preview-content">
            {/* All the preview text will show here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarkdownApp;
