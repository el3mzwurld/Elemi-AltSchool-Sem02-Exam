import { Bold, Heading, List, Link, Table, Trash, Image } from "lucide-react";

interface Props {
  markdown: string;
  setMarkdown: (v: string) => void;
}
export const Toolbar = ({ markdown, setMarkdown }: Props) => {
  const addBold = (): void => {
    setMarkdown(markdown + "**bold text** ");
  };
  // ...

  const addHeading = (): void => {
    setMarkdown(markdown + "\n# ");
  };

  const addList = (): void => {
    setMarkdown(markdown + "\n- ");
  };

  const addLink = (): void => {
    setMarkdown(markdown + "\n[link text](https://) ");
  };

  const addTable = (): void => {
    setMarkdown(
      markdown +
        `\n| Column 1 | Column 2 |\n|----------|----------|\n| Text     | Text     |\n`
    );
  };

  const clearAll = (): void => {
    setMarkdown("");
  };
  const addImage = (): void => {
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
