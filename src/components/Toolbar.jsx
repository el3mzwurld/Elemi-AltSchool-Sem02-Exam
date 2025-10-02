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
      <div className="toolbar-container-item" onClick={addBold}>
        <Bold size={15} color="#e25d5d" aria-label="Bold" />
      </div>
      <div className="toolbar-container-item" onClick={addHeading}>
        <Heading size={15} color="#e25d5d" aria-label="Header" />
      </div>
      <div className="toolbar-container-item" onClick={addList}>
        <List size={15} color="#e25d5d" />
      </div>
      <div className="toolbar-container-item" onClick={addTable}>
        <Table size={15} color="#e25d5d" />
      </div>
      <div className="toolbar-container-item" onClick={addLink}>
        <Link size={15} color="#e25d5d" />
      </div>
      <div className="toolbar-container-item" onClick={clearAll}>
        <Trash size={15} color="#e25d5d" />
      </div>
      <div className="toolbar-container-item" onClick={addImage}>
        <Image size={15} color="#e25d5d" />
      </div>
    </div>
  );
};
