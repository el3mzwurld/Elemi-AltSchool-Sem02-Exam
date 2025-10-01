import { Bold, Heading, List, Link, Table, Trash } from "lucide-react";

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

  return (
    <div className="toolbar-container">
      <div className="toolbar-item">
        <Bold color="#e25d5d" onClick={addBold} />
      </div>
      <div className="toolbar-item">
        <Heading color="#e25d5d" onClick={addHeading} />
      </div>
      <div className="toolbar-item">
        <List color="#e25d5d" onClick={addList} />
      </div>
      <div className="toolbar-item">
        <Table color="#e25d5d" onClick={addTable} />
      </div>
      <div className="toolbar-item">
        <Link color="#e25d5d" onClick={addLink} />
      </div>
      <div className="toolbar-item">
        <Trash color="#e25d5d" onClick={clearAll} />
      </div>
    </div>
  );
};
