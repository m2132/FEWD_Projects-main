import './App.css';
import Gamer from './component/Gamer';
import GamerModel from './models/gamer-model'
import React from 'react'
import AddGamers from './component/add-gamers'


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gamers: [],
      didGameStart: false,
      curGamerIndex: -1,
    }
  }

  changeNumber = fun => {
    const newGamers = this.state.gamers;
    newGamers[this.state.curGamerIndex].number = fun(newGamers[this.state.curGamerIndex].number)
    newGamers[this.state.curGamerIndex].steps++;
    newGamers[this.state.curGamerIndex].score -= 5;
    this.setState({gamers: newGamers});
    if (newGamers[this.state.curGamerIndex].number !== 100) {
      this.nextTurn();
    }
  }

  nextTurn = () => {
    this.setState({curGamerIndex: (this.state.curGamerIndex + 1) % this.state.gamers.length});
  }

  removeGamer = () => {
    const playerIndex = this.state.curGamerIndex;
    const newGamers = this.state.gamers.slice(0, playerIndex).concat(this.state.gamers.slice(playerIndex + 1));

    this.setState({gamers: newGamers});

    this.setState({curGamerIndex: playerIndex === this.state.gamers.length? 0: playerIndex});
  }

  newGame = () => { 

    const gamer = this.state.gamers[this.state.curGamerIndex];
    const history = [...gamer.history, gamer.score];

    const newGamer = new GamerModel(gamer.name, history, true);
    const newGamers = this.state.gamers;
    newGamers[this.state.curGamerIndex] = newGamer;

    this.setState(state => ({...state, gamers: newGamers}));
  }

  addGamer = name => {
    const newGamers = this.state.gamers;
    newGamers.push(new GamerModel(name));

    this.setState({gamers: newGamers});
  }

  startGames = () => {
    this.setState({didGameStart: true});
    this.setState({curGamerIndex: 0});
  }

  render () {
    return (
      <div className="App">
        <AddGamers 
          addGamer={this.addGamer} 
          didGameStart={this.state.didGameStart} 
          startGames={this.startGames} 
          hasUsers={Boolean(this.state.gamers.length)}
        />
        <div id="gamers-container">
          {
            this.state.gamers.map((g, i) => 
              <Gamer 
                {...g} 
                changeNumber={this.changeNumber} 
                isEnable={i === this.state.curGamerIndex}
                removeGamer={this.removeGamer}
                newGame={this.newGame}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;