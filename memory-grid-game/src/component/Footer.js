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
   render() {
      return (
        <div className="footer">
           <div className="hint">
             <h1>
             {this.props.hints[this.props.gameState]}
             </h1>
              <h3>{this.remainingCount()}</h3>
           </div>
        </div>
      )
   }
}


Footer.defaultProps = {
    hints: {
        ready: "Get Ready",
        memory: "Memorize",
        recall: "Recall"
    }
}

export default Footer;