import './App.css';
import React from 'react'
import LetterPorps from './models/letter-props';
import HeaderLine from './components/header-line';
import ToolBar from './components/toolbar';
import Document from './components/document'
import rangy from 'rangy';
import StatusBar from './components/status-bar'
import { ranges, langs } from './components/keyboard'

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

window.rangy = rangy;

function getSelectedNodes() {
  let selectedNodes = [];
  let sel = rangy.getSelection();
  for (let i = 0; i < sel.rangeCount; ++i) {
    selectedNodes = selectedNodes.concat(sel.getRangeAt(i).getNodes());
  }
  return selectedNodes;
}

function changeObjProp(obj, key, value) {
  if (value instanceof Function) {
    value = value(obj[key])
  }
  obj[key] = value;
  return obj;
}

const textLetter = {
  ...new LetterPorps(),
  text: 'a',
  color: 'red'
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'document',
      textAlign: 'left',
      nextLetter: new LetterPorps(),
      text: [],
      background: 'white',
      lang: 'upperCase',
      isUpperCase: false,
      showKeyBoard: false,
      selectedText: [0, 0],
    }

    document.addEventListener('selectionchange', () => {
      let nodes = getSelectedNodes();
      if (nodes.length === 0) {
        this.setState({ selectedText: [0, 0] })
        return;
      }
      else if (nodes.length % 2) return;
      // console.log(nodes)
      this.setState({ selectedText: [+nodes[0].dataset.index, +nodes[nodes.length - 2].dataset.index + 1] })
    });

    document.addEventListener('keypress', event => {
      if (event.key === 'Shift' && event.altKey) {
        console.log(event)
        this.setState(state => ({ ...state, lang: langs[(langs.indexOf(state.lang) + 1) % langs.length] }))
        console.log(this.state)
      }
    })
  }

  addLetter = letter => {
    this.setState({ text: this.state.text.concat({ ...clone(this.state.nextLetter), text: letter }) })
  }

  removeLetter = () => {
    this.setState({ text: this.state.text.slice(0, -1) })
  }

  changeGeneral = (key, value) => {
    this.setState({ [key]: value })
  }

  changeSelected = (key, value) => {
    const [start, end] = this.state.selectedText;
    if (start === end) {
      this.setState({ nextLetter: changeObjProp(this.state.nextLetter, key, value) });
      return;
    }

    this.setState({
      text: this.state.text.slice(0, start).concat(this.state.text.slice(start, end).map(l => changeObjProp(l, key, value))).concat(this.state.text.slice(end))
    })
  }

  open = details => {
    this.setState(details);
  }

  setName = name => {
    this.setState({name})
  }

  render() {
    return (
      <div>
        <HeaderLine details={this.state} open={this.open} setName={this.setName} />
        <ToolBar details={this.state} changeGeneral={this.changeGeneral} changeSelected={this.changeSelected} />
        <Document
          text={this.state.text}
          addLetter={this.addLetter}
          removeLetter={this.removeLetter}
          bg={this.state.background}
          textAlign={this.state.textAlign}
          dir={this.state.lang === 'hebrew' ? 'rtl' : 'ltr'}
          nextLetterSize={this.state.nextLetter.fontSize}
        />
        <StatusBar
          lang={this.state.lang}
          lettersCount={this.state.text.length}
          addLetter={this.addLetter}
          removeLetter={this.removeLetter}
          changeGeneral={this.changeGeneral}
        />
      </div>
    )
  }
}


export default App;
