import { Bold, Heading, List, Link, Table, Trash, Image } from "lucide-react";

export const Toolbar = ({ markdown, setMarkdown }) => {
  const addBold = () => {
    setMarkdown(markdown + "**bold text** ");
  };

  const addHeading = () => {
    setMarkdown(markdown + "\n# ");
  };

  const addList = () => {
    setMarkdown(markdown + "\n- ");
  };

  const addLink = () => {
    setMarkdown(markdown + "\n[link text](https://) ");
  };

  const addTable = () => {
    setMarkdown(
      markdown +
        `\n| Column 1 | Column 2 |\n|----------|----------|\n| Text     | Text     |\n`
    );
  };

  const clearAll = () => {
    setMarkdown("");
  };
  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    const alt = prompt("Enter alt text (optional):") || "image";

    setMarkdown(markdown + `\n![${alt}](${url})\n`);
  };

  return (
    <div className="toolbar-container">
      <div
        className="toolbar-container-item"
        onClick={addBold}
        role="button"
        aria-label="add Bold text"
      >
        <Bold size={15} color="#e25d5d" aria-label="Bold" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={addHeading}
        role="button"
        aria-label="add Header"
      >
        <Heading size={15} color="#e25d5d" aria-label="Header" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={addList}
        role="button"
        aria-label="add List"
      >
        <List size={15} color="#e25d5d" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={addTable}
        role="button"
        aria-label="add Table"
      >
        <Table size={15} color="#e25d5d" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={addLink}
        role="button"
        aria-label="add Link"
      >
        <Link size={15} color="#e25d5d" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={clearAll}
        role="button"
        aria-label="remove all text"
      >
        <Trash size={15} color="#e25d5d" />
      </div>
      <div
        className="toolbar-container-item"
        onClick={addImage}
        role="button"
        aria-label="add Image"
      >
        <Image size={15} color="#e25d5d" />
      </div>
    </div>
  );
};
