import CodeMirror from "@uiw/react-codemirror";
import { markdown as ext } from "@codemirror/lang-markdown";

export const TextArea = ({ markdown, setMarkdown }) => {
  const handleChange = (value) => {
    setMarkdown(value);
  };

  return (
    // <textarea
    //   className="textarea-container"
    //   placeholder="Enter your markdown text here..."
    // ></textarea>
    <div className="textarea-container">
      <CodeMirror
        value={markdown}
        height="580px"
        theme={"dark"}
        extensions={[ext()]}
        onChange={handleChange}
      />
    </div>
  );
};
