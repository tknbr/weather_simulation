import React, {Component} from 'react';
import Node from './Node';
import './WeatherSimulation.css';


const TOTAL_N_OF_ROWS = 10;
const TOTAL_N_OF_COLS = 10;

export default class WeatherSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        const nodes = [];
        for(let row = 0; row < TOTAL_N_OF_ROWS; row++) {
            const currentRow = [];
            for(let column = 0; column < TOTAL_N_OF_COLS; column++) {
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    render() {
        const {nodes} = this.state;
        console.log(nodes);

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                        {row.map((node, rowIdx) => {
                            const {typeOfNode} = node;
                            return (
                                <Node
                                    typeOfNode={'air'}
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