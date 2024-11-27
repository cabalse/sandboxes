import {
  MDXEditor,
  SandpackConfig,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
  imagePlugin,
  InsertImage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const imageAutoComplete = ["testimage.jpg"];

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

function App() {
  const [value, setValue] = useState("Test");

  return (
    <MDXEditor
      markdown={value}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertImage />
            </DiffSourceToggleWrapper>
          ),
        }),
        imagePlugin({
          imageUploadHandler: (file) => {
            const previewURL = URL.createObjectURL(file);
            return Promise.resolve(previewURL);
          },
          imageAutocompleteSuggestions: imageAutoComplete,
          imagePreviewHandler: async (arg) => {
            return Promise.resolve(arg);
          },
        }),
        diffSourcePlugin({
          viewMode: "rich-text",
          diffMarkdown: value,
        }),
      ]}
    />
  );
}

export default App;
