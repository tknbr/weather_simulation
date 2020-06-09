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

        //  auxiliar grid used to track progress
        const grid = this.state.grid.slice();

        // first create a case where there is no night or day. Lets asume it's always sunny and try to figure out the wind
        // we know that sun affects land in between (3*TOTAL_N_OF_ROWS)/4 & TOTAL_N_OF_ROWS/4
        for (let currentRow = Math.floor(TOTAL_N_OF_ROWS/4); currentRow <= Math.floor((3*TOTAL_N_OF_ROWS)/4); currentRow++) {
            for (let currentCol = 0; currentCol < TOTAL_N_OF_COLS; ++currentCol) {
                if (grid[currentRow][currentCol].typeOfNode === "air" && grid[currentRow+1][currentCol].typeOfNode === "soil") {
                    grid[currentRow][currentCol].windNorth = 1;
                    nodesToUpdate.push(grid[currentRow][currentCol]);
                    document.getElementById(`node-${TOTAL_N_OF_ROWS-1-currentRow}-${currentCol}`).className = 'node node_cloud';
                }
            }
        }

        while (nodesToUpdate.length > 0) {
            let node = nodesToUpdate.shift();
            console.log(node);
            let balance = nodeBalance(node);
            if (balance === 0){
                // node is balanced, do nothing
                continue;
            } else if (balance > 0) {
                // node has high preasure
            } else {
                // node has low preasure
                switch (getLowPreasureSource(grid, node.row, node.col)) {
                    case 'north':
                        // north is the source
                        break;
                    case 'south':
                        // south is the source
                        break;
                    case 'east':
                        // east is the source
                        break;
                    case 'west':
                        // west is the source
                        break;
                    default:
                        // none is the source
                        break;
                }
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
                        {row.map((node, nodeIdx) => {
                            const {row, col, typeOfNode} = node;
                            return (
                                <Node
                                    key={nodeIdx}
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
}

const nodeBalance = (node) => {
    let sumOfWinds = node.windNorth + node.windSouth + node.windWest + node.windEast;
    if (sumOfWinds > 0) {
        return 1;
    } else if (sumOfWinds < 0) {
        return -1;
    } else {
        return 0;
    }
}

const getLowPreasureSource = (grid, row, col) => {
    return 'none';
}