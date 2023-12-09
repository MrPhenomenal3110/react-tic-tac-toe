import React from 'react';
import ReactDOM from 'react-dom';
import './game.css'

function Square(props){
    return(
        <button className="square p-0 m-0 w-24 h-24 border border-black rounded-xl shadow-xl" onClick={props.onCLick}
        >
        {props.value}
        </button>
    )
}

class Board extends React.Component{
    renderSquare(i){
        return <Square value={this.props.squares[i]} onCLick={()=>this.props.onClick(i)}/>;
    }
    render(){
        return(
            <div className='flex flex-col h-screen justify-start items-center'>
                <div className="flex row m-0 p-0">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="flex row m-0 p-0">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="flex row m-0 p-0">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history : [{
                squares : Array(9).fill(null),
            }],
            stepNumber : 0,
            isXnext : true,
        };
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(checkWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.isXnext ? 'X' : 'O';
        this.setState({
            history : history.concat([
                {squares : squares}
            ]),
            stepNumber : history.length,
            isXnext : !this.state.isXnext
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber : step,
            isXnext : (step%2) === 0
        });
    }
    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = checkWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move ? "Go to Move #" + move:
            "Go to Game Start";
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        });

        let status;
        if(winner){
            status = "Winner : " + winner;
        }
        else{
            status = "Next Player : " + (this.state.isXnext ? 'X' : 'O');
        }
        return(
            <div className="game">            
                <div className="game-board">
                    <Board 
                    squares = {current.squares}
                    onClick = {(i)=>{this.handleClick(i)}}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function checkWinner(squares){
    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i = 0; i < wins.length; i++){
        const [a,b,c] = wins[i];
        if(squares[a] && squares[b] === squares[c] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


export default Game;