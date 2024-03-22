"use client";

import { useState } from "react";

import type { Snippet } from "@prisma/client";

// You can use both ways of importing. Doesn't matter!
// import { editSnippet } from "@/server-actions";
import * as serverActions from "@/server-actions";

import Editor from "@monaco-editor/react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string | undefined) {
    setCode(value || "");
  }

  const editSnippetAction = serverActions.editSnippet.bind(
    null,
    snippet.id,
    code
  );

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
