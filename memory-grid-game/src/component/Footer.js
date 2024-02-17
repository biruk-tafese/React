import React from "react";

class Footer extends React.Component {

    remainingCount() {
      if (this.props.gameState !== "recall")
      {
         return null;
      }
      return(
         <div className="remainingCount">
             {this.props.activeCellsCount - this.props.correctGuesses.length}
         </div>
      )
    }

    PlayAgainButton() {
        if (["won", "lost"].indexOf(this.props.gameState) >= 0) {
          return (
            <button className="play-again-button"
              onClick={this.props.playAgain}>
                Play Again
             </button>
          )
        }
    }
    
    resetGame() {
      this.setState( {
         gameState:"ready",
         wrongGuess: [],
         correctGuesses: []
      }, ()=> {
          //invok the timers to change gameState
      })
    }

   render() {
      return (
        <div className="footer">
           <div className="hint">
             <h1>
             {this.props.hints[this.props.gameState]}
             </h1>
              <h3>{this.remainingCount()}</h3>
              
              {this.PlayAgainButton()}
           </div>
           
        </div>
      )
   }
}


Footer.defaultProps = {
    hints: {
        ready: "Get Ready",
        memory: "Memorize",
        recall: "Recall",
        won:"well played",
        lost: "Game Over"
    }
}

export default Footer;