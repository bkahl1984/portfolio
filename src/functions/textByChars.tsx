function textByChars(text: string) {
  if (!text) return;
  if (text?.trim().length === 0) return text;

  const wordsWithSpaces = text.split(" ").join("# #").split("#");

  return wordsWithSpaces.map((word, index) => {
    return word === " " ? (
      <span key={index} style={{ display: "inline-block" }}>
        {"\u00A0"}
      </span>
    ) : (
      <div key={index} style={{ display: "inline-block" }}>
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
      </div>
    );
  });
}

export default textByChars;
