import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}
export default function TextEditor({ value, onChange }: TextEditorProps) {
  const ref = useRef<any>(null);
  const initialValue = value;

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TEXT_EDITOR_TOKEN}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(evt, editor) => (ref.current = editor)}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | insertfile image media link ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(text, editor) => {
          onChange(text);
        }}
      />
    </>
  );
}
