"use client";

import { useState, useEffect, ReactNode } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";

type CodeBlockClientProps = {
  className?: string;
  children: ReactNode;
};

const CodeBlockClient = ({
  className,
  children,
  ...rest
}: CodeBlockClientProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className={className}>
      <code {...rest}>{children}</code>
    </pre>
  );
};

export default CodeBlockClient;
