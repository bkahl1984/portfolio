import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import calcReadingTime from "./calcReadingTime";

const richTextSumStr = (rich_text: RichTextItemResponse[]) => {
  return rich_text
    .map(({ plain_text }) => {
      return plain_text;
    })
    .join(" ");
};

export function calcBlocksReadingTime(
  blocks: BlockObjectResponse[],
  wordsPerMinute = 225
) {
  const allText = blocks.reduce((sumStr, block) => {
    const blockObject = block as BlockObjectResponse;

    if (
      blockObject.type === "paragraph" &&
      blockObject.paragraph?.rich_text?.length > 0
    ) {
      const { rich_text } = blockObject.paragraph;
      return sumStr + " " + richTextSumStr(rich_text);
    }

    if (blockObject.type === "code") {
      const { rich_text } = blockObject.code;
      return sumStr + " " + richTextSumStr(rich_text);
    }

    return sumStr;
  }, "");

  const readingTime = calcReadingTime(allText, wordsPerMinute);

  return readingTime;
}
