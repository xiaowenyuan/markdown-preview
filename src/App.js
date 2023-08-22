import React from 'react';
import './App.css';
import { Marked } from 'marked';
import * as DOMPurify from 'dompurify';

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`\' && lastLine == \'\`\`\`\') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`
const Preview = (props) => {
  return(
    <div id="preview" dangerouslySetInnerHTML={{__html: props.value}} />
  )
}

const Editor = (props) => {
  return(
        <textarea id="editor" value={props.value} onChange={props.onChange}>
        </textarea>
  )
}

const LittleHeader = props => {
  return(
      <h5 className="header" id={`${props.name}-header`}>{props.name}</h5>
  )
}

const App = () => {
  const marked = new Marked();

  marked.use({
    async: false,
    breaks:true,
    pedantic: false,
    gfm: true,
  });

  const [inputValue, setInput] = React.useState(placeholder);
  const [markdown, setMarkdown] = React.useState('');
  const handleInput = (e) => {
    setInput(e.target.value);
  }

  React.useEffect(() => {
    const resultMarked = marked.parse(inputValue);
    setMarkdown(DOMPurify.sanitize(resultMarked));
  }, [inputValue])

  return (
    <div className="App">
      <div className="editor-wrapper">
        <LittleHeader name="Editor" />
        <Editor value={inputValue} onChange={handleInput}/>
      </div>
      <div className="preview-wrapper">
        <LittleHeader name="Markdown" />
        <Preview value={markdown}/>
      </div>
    </div>
  );
}

export default App;
