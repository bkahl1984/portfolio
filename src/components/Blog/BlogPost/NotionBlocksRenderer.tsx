import CodeBlockServer from "@/components/Blog/BlogPost/CodeBlockServer";
import {
  Render,
  NotionBlock,
  withContentValidation,
} from "@9gustin/react-notion-render";

const NotionBlocksRenderer = ({ blocks }: { blocks: NotionBlock[] }) => {
  return (
    <Render
      blocks={blocks}
      useStyles
      classNames
      emptyBlocks
      simpleTitles
      blockComponentsMapper={{
        code: withContentValidation(CodeBlockServer),
      }}
    />
  );
};

export default NotionBlocksRenderer;
