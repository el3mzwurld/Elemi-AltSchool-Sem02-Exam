import { Bold, Heading, List, Link, Table, Trash } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-item">
        <Bold color="#e25d5d" />
      </div>
      <div className="toolbar-item">
        <Heading color="#e25d5d" />
      </div>
      <div className="toolbar-item">
        <List color="#e25d5d" />
      </div>
      <div className="toolbar-item">
        <Table color="#e25d5d" />
      </div>
      <div className="toolbar-item">
        <Link color="#e25d5d" />
      </div>
      <div className="toolbar-item">
        <Trash color="#e25d5d" />
      </div>
    </div>
  );
};
