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

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            squares : Array(9).fill(null),
            isXnext : true,
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        if(checkWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.isXnext ? 'X' : 'O';
        this.setState({
            squares : squares,
            isXnext : !this.state.isXnext,
        });
    }
    renderSquare(i){
        return <Square value={this.state.squares[i]} onCLick={()=>this.handleClick(i)}/>;
    }
    render(){
        const winner = checkWinner(this.state.squares);
        var status;
        if(winner){
            status = "Winner : " + winner;
        }
        else{
            status = 'Next Player : ' + (this.state.isXnext ? 'X' : 'O');
        }
        return(
            <div className='flex flex-col h-screen justify-start items-center'>
                <div className="status text-2xl m-20">
                    {status}
                </div>
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
    render(){
        return(
            <Board/>
        );
    }
}



export default Game;