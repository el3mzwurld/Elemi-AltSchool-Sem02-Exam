import CodeMirror from "@uiw/react-codemirror";
import { markdown as ext } from "@codemirror/lang-markdown";

interface Props {
  markdown: string;
  setMarkdown: (value: string) => void;
}
export const TextArea = ({ markdown, setMarkdown }: Props) => {
  const handleChange = (value: string) => {
    setMarkdown(value);
  };

  return (
    <div className="textarea-container">
      <CodeMirror
        value={markdown}
        height="70vh"
        theme={"dark"}
        extensions={[ext()]}
        onChange={handleChange}
        style={{ fontSize: 12 }}
        className="cm"
      />
    </div>
  );
};
