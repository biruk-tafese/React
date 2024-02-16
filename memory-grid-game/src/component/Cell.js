import React from 'react';

class Cell extends React.Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }

  handleClick(event) {
    event.preventDefault(); 
    console.log("Clicked");
    if (this.props.gameState === "recall") {
      this.props.recordGuess(this.props.id, this.active());
    }
   
    // if (this.guessState() === undefined &&
    // this.props.gameState === "recall") {
      
    // }
  }
   
  guessState() {
    const { correctGuesses, wrongGuesses } = this.props;
    const cellIdString = String(this.props.id); // Convert id to string
    
    if (correctGuesses && correctGuesses.indexOf(cellIdString) >= 0) {
      return true;
    } else if (wrongGuesses && wrongGuesses.indexOf(cellIdString) >= 0) {
      return false;
    } else {
      return ""; // Return a default value when neither correct nor wrong guess
    }
  }
  
  
  

  render() {
    let className = "cell";
    if (this.props.gameState === "memorize" && this.active()) {
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
