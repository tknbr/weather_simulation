import React, {Component} from 'react';
import Node from './Node';
import './WeatherSimulation.css';


const TOTAL_N_OF_ROWS = 10;
const TOTAL_N_OF_COLS = 15;

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

    weatherSim() {
        // initialize variables for simulation
        //  variable to track day/night (0-6 night, 6-21 day, 21-24 night)?
        let hour = 0;
        let total_n_days = 10;

        //  variable to track nodes to update
        let nodesToUpdate = [];

        // we start at night so we check for water, set wind forces acording to time of day
        for(let i = 0; i < TOTAL_N_OF_COLS; ++i) {
            if (this.state.grid[Math.floor((3*TOTAL_N_OF_ROWS)/4)][i].typeOfNode === "water") {
                // set wind forces
                this.state.grid[Math.floor((3*TOTAL_N_OF_ROWS)/4)-1][i].windNorth = 1;
                this.state.grid[Math.floor((3*TOTAL_N_OF_ROWS)/4)-1][i].windEast = 1;
                this.state.grid[Math.floor((3*TOTAL_N_OF_ROWS)/4)-1][i].windWest = 1;

                nodesToUpdate.push(this.state.grid[Math.floor((3*TOTAL_N_OF_ROWS)/4)-1][i]);
            }
        }

        while (total_n_days >= 0) {
            // compute one iteration

            // update view

            // update hours/total_remaining_days
            if (++hour > 23) {
                hour = 0;
                --total_n_days;
            }
        }

        console.log("simulation finished");
    }

    render() {
        const {grid} = this.state;
        console.log(grid);

        return (
            <>
            <button onClick={() => this.weatherSim()}>
              Start
            </button>
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
                                    windNorth={0}
                                    windSouth={0}
                                    windEast={0}
                                    windWest={0}
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
            </>
        );
    }
}


const initializeGrid = () => {
    // set initial grid state
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
        typeOfNode: row < TOTAL_N_OF_ROWS/4 ? 'water' : 'air',
    }
}

const getNewGridWithSoilToggled = (grid, row, col) => {
    const newGrid = grid.slice();

    // check for type of node clicked
    let node = newGrid[TOTAL_N_OF_ROWS-1-row][col];
    switch (node.typeOfNode) {
        case "water":
        case "air":
            for (let r = TOTAL_N_OF_ROWS-1-row; r < TOTAL_N_OF_ROWS; r++) {
                node = newGrid[r][col];
                const newNode = {
                    ...node,
                    typeOfNode: 'soil',
                };
                newGrid[r][col] = newNode;
            }
            break;
        case "soil":
            for (let r = TOTAL_N_OF_ROWS-1-row; r >= 0; r--) {
                node = newGrid[r][col];
                console.log("r= " + r + " (3*TOTAL_N_OF_ROWS)/4 = " + (3*TOTAL_N_OF_ROWS)/4)
                const newNode = {
                    ...node,
                    typeOfNode: r >= Math.floor((3*TOTAL_N_OF_ROWS)/4) ? 'water' : 'air',
                };
                newGrid[r][col] = newNode;
            }
            break;
        default:
            console.log("Should never reach this point");
            break;

    }
    return newGrid;
};