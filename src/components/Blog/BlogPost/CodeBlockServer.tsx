// Code highlight
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import DOMPurify from "isomorphic-dompurify";
import { DropedProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";
import CopyCode from "./CopyCode";

const highlight = (code: string, lng = "javascript") => {
  let language;

  if (lng.toLowerCase() === "typescript") language = "tsx";
  else if (lng.toLowerCase() === "javascript") language = "jsx";
  else language = lng.toLowerCase();

  try {
    const highlightedCode = Prism.highlight(
      code,
      Prism.languages[language],
      language
    );
    return highlightedCode;
  } catch (error) {
    console.warn("Unable to highlight the code with Prism. ", error);
  }
};

const CodeBlockServer = ({
  language,
  children,
  plainText,
  className,
  ...props
}: DropedProps) => {
  const formattedCode = plainText && highlight(plainText, language);
  const sanitizedHtml = formattedCode
    ? DOMPurify.sanitize(formattedCode)
    : null;

  return (
    <pre className={`${className} language-${language}`}>
      {sanitizedHtml ? (
        <code
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml,
          }}
        ></code>
      ) : (
        <code>{plainText}</code>
      )}
      <CopyCode code={plainText} />
    </pre>
  );
};

export default CodeBlockServer;
