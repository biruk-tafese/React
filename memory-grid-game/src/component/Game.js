import React from 'react';
import _ from "lodash";
import Row from './Row';
import Cell from './Cell';
import Footer from './Footer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "ready",
      wrongGuesses: [],
      correctGuesses: []
    };
  }
   
  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
    this.setState({ gameState: 'memorize' }, () => {
    this.recallTimerId = setTimeout(
    this.startRecallMode.bind(this),
       2000 );
       });
     }, 2000);
    }
    componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    this.finishGame();
    }


  startRecallMode() {
    this.setState({ gameState: 'recall'}, ()=> {
      this.secondRemaining = this.props.timeoutSeconds;
      setInterval( ()=> {
         if(--this.secondRemaining === 0) {
            this.setState( {gameState: 'lost'});
         }
      });
    })

    this.playTimerId = setInterval( ()=> {
       if(--this.secondRemaining === 0){
         this.setState( {gameState: this.finishGame("lost")});
       }
    }, 1000)
  }
    
  finishGame(gameState) {
    clearInterval(this.playTimerId);
    return gameState;
  }

  recordGuess = (cellId, userGuessIsCorrect) => {
    const { wrongGuesses, correctGuesses } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);

      if (correctGuesses.length === this.props.activeCellsCount) {
        this.setState({ gameState: "Won" });
        this.setState({gameState: this.finishGame("won")})
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        this.setState({ gameState: "lost" });
        this.setState({gameState: this.finishGame("lost")});
      }
    }
    this.setState({ correctGuesses, wrongGuesses });
  }

  
 
  render() {
   let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0;

    let matrix = [];
    for (let r = 0; r < this.props.rows; r++) {
      let row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }
      matrix.push(row);
    }

    let flatMatrix = _.flatten(matrix);
    let activeCells = _.sampleSize(flatMatrix, this.props.activeCellsCount);

    return (
      <div className='grid'>
        {matrix.map((row, ri) => (
          
          <Row key={ri}>
          {row.map(cellId => {
    return (
        <Cell
          key={cellId}
          id={cellId}
          showActiveCells = {showActiveCells}
          activeCells={activeCells}
          gameState={this.state.gameState}
          recordGuess={this.recordGuess}
          correctGuesses={this.state.correctGuesses}
          wrongGuesses={this.state.wrongGuesses}
          {...this.state}
        /> 
        );
      })}
       
          </Row>
        ))}
        <Footer {...this.state} 
                activeCellsCount ={this.props.activeCellsCount}
                playAgain={this.props.createNewGame} />
      </div>
    );
  }

  
}


// Default props
Game.defaultProps = {
  allowedWrongAttempts: 2,
  timeoutSeconds: 10000
};

export default Game;
