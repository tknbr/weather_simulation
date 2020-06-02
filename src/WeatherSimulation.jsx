import React, {Component} from 'react';
import Node from './Node';
import './WeatherSimulation.css';


const TOTAL_N_OF_ROWS = 10;
const TOTAL_N_OF_COLS = 30;

export default class WeatherSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = initializeGrid();
        this.setState({grid})
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithSoilToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithSoilToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    render() {
        const {grid} = this.state;
        console.log(grid);

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                        {row.map((node, rowIdx) => {
                            const {row, col, typeOfNode} = node;
                            return (
                                <Node
                                    row={row}
                                    col={col}
                                    typeOfNode={typeOfNode}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) =>
                                        this.handleMouseEnter(row, col)
                                    }
                                    onMouseUp={() => this.handleMouseUp()}
                                ></Node>
                            );

                        })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

const initializeGrid = () => {
    const nodes = [];
    for(let row = TOTAL_N_OF_ROWS-1; row >= 0 ; row--) {
        const currentRow = [];
        for(let col = 0; col < TOTAL_N_OF_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        nodes.push(currentRow);
    }
    return nodes;
}

const createNode = (col, row) => {
    return {
        row,
        col,
        typeOfNode: row < (TOTAL_N_OF_ROWS/4) ? 'water' : 'air',
    }
}

const getNewGridWithSoilToggled = (grid, row, col) => {
    const newGrid = grid.slice();

    for (let r = TOTAL_N_OF_ROWS-1-row; r < TOTAL_N_OF_ROWS; r++) {
        const node = newGrid[r][col];
        const newNode = {
            ...node,
            typeOfNode: 'soil',
        };
        newGrid[r][col] = newNode;
    }
    return newGrid;
};