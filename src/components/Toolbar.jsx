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
      <div className="toolbar-item" onClick={addBold}>
        <Bold color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={addHeading}>
        <Heading color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={addList}>
        <List color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={addTable}>
        <Table color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={addLink}>
        <Link color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={clearAll}>
        <Trash color="#e25d5d" />
      </div>
      <div className="toolbar-item" onClick={addImage}>
        <Image color="#e25d5d" />
      </div>
    </div>
  );
};
