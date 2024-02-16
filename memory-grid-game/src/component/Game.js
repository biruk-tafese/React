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
    setTimeout(() => {
      this.setState({ gameState: 'memorize' });
      setTimeout(() => this.setState({ gameState: 'recall' }), 3000); // Change to 'recall' after 2 seconds
    }, 3000); 
  }  
   
  
  recordGuess = (cellId, userGuessIsCorrect) => {
    const { wrongGuesses, correctGuesses } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
    } else {
      wrongGuesses.push(cellId);
    }
    this.setState({ correctGuesses, wrongGuesses });
    
  }
  
  render() {
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
            {row.map(cellId => (
              <Cell
           key={cellId}
           id={cellId}
           activeCells={activeCells}
           gameState={this.state.gameState}
           recordGuess={this.recordGuess}
           correctGuesses={this.state.correctGuesses}
          wrongGuesses={this.state.wrongGuesses}
          {...this.state}
/> 
        

            ))
            }
            
          </Row>
        ))}
        <Footer {...this.state} activeCellsCount ={this.props.activeCellsCount} />
      </div>
    );
  }
}

export default Game;
