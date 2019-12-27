import React from 'react';

/** wanted to set that main div in center of the body */

const rowWrapperDiv = {
    lineHeight: '0px'
}

const boxStyle = {
    height: '50px',
    width: '50px',
    margin: '4px',
    display: 'inline-block',
    position: 'relative',
    borderRadius: '4px',
    background: 'linear-gradient(to bottom left, grey, #ffffff)'
}

const circleStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'black',
}

const triangleStyle = {
    height: '0px',
    width: '0px',
    borderBottom: '30px solid black',
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
}

const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

export default class Box extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }

    boxClicked(index) {
        if(this.props.boardData[index] === '' && this.props.winner === undefined)
            this.props.addNewEntryOnBoard(index)
    }

    renderRow(startIndex, endIndex) {
        const row = []
        for(let i = startIndex; i <= endIndex; i++) {
            const newBox =
                    <div key={i} style={boxStyle} onClick={() => this.boxClicked(i)}>
                        <div style={contentStyle}>
                            {this.props.boardData[i] === 0 && <div style={circleStyle}></div>}
                            {this.props.boardData[i] === 1 && <div style={triangleStyle}></div>}
                        </div>
                    </div>
            row.push(newBox)
        }
        return row
    }

    render() {
        let squareBox = []
        for(let i=0;i<9;i++) {
            const isRowLastElement = ((i+1)%3) === 0
            if(isRowLastElement) {
                const row = <div style={rowWrapperDiv}> {this.renderRow(i-2 , i)} </div>
                squareBox.push(row)
            }
        }
        return squareBox
    }
}