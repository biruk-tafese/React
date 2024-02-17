import React from 'react';

class Cell extends React.Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }

  guessState() {
    const { correctGuesses, wrongGuesses } = this.props;
    if (correctGuesses && correctGuesses.indexOf(this.props.id) >= 0) {      
      return true;
    } else if (wrongGuesses && wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }
  
 
  handleClick = () => {
    if (this.guessState() === undefined && this.props.gameState === "recall") {
      this.props.recordGuess(this.props.id, this.active());
    }

  }
  
   

  render() {
    let className = "cell";
    if (this.props.showActiveCells && this.active()) {
    className += " active";
    }
    className += " guess-" + this.guessState();
    return (
    <div className={className} onClick={this.handleClick.bind(this)}>
    </div>
    );
    }
}

export default Cell;
