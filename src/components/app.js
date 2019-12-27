import React from 'react';
import Box from './box';

const container = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const boardStyle = {
    backgroundColor: '#ffffff'
}

let turn = 0; // let's hardcode this for right now, values would be 0, 1.
let emptyBox = 9
let winner
const moves = [
    {
        startIndex: 0,
        moveDirection: [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
    },
    {
        startIndex: 1,
        moveDirection: [{x: 0, y: 1}]
    },
    {
        startIndex: 2,
        moveDirection: [{x: 0, y: 1}, {x: -1, y: 1}]
    },
    {
        startIndex: 3,
        moveDirection: [{x: 1, y: 0}]
    },
    {
        startIndex: 6,
        moveDirection: [{x: 1, y: 0}]
    },
]

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.boardData = new Array(9)
        this.boardData.fill('')
        this.addNewEntryOnBoard = this.addNewEntryOnBoard.bind(this)
    }

    flipTurn() {
        turn = 1-turn
    }

    checkBingo() {
        let bingo = false
        for (let i=0;i<moves.length && !bingo;i++) {
            const moveInfoObject = moves[i];
            const startIndex = moveInfoObject.startIndex
            const moveDirection = moveInfoObject.moveDirection
            for (let j=0;j<moveDirection.length && !bingo;j++){
                const move = moveDirection[j]
                const initialContent = this.boardData[startIndex]
                let index = startIndex
                const indexIncrement = move.x + (move.y)*3
                let allSame = true
                for (let k=0;k<3 && allSame;k++){
                    if(initialContent === '' || initialContent !== this.boardData[index]) allSame = false
                    index += indexIncrement
                }
                if(allSame) bingo = true
            }
        }
        return bingo
    }

    addNewEntryOnBoard(index) {
        this.boardData[index] = turn
        emptyBox--
        const bingo = this.checkBingo()
        if (bingo){
            winner = turn
        }else{
            emptyBox && this.flipTurn()
        }
        this.props.renderBoard()
    }

    render () {
        return (
            <div style={container}>
                <div style={boardStyle}>
                    <Box
                        boardData={this.boardData}
                        turn={turn}
                        winner={winner}
                        addNewEntryOnBoard={this.addNewEntryOnBoard}
                    />
                </div>
                {winner !== undefined ? `winner: ${winner}` : !emptyBox ? `Draw` :  `turn: ${turn}`}
            </div>
        )
    }
}

