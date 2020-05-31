import React, {Component} from 'react';
import Node from './Node';
import './WeatherSimulation.css';


let number_of_rows = 15;
let number_of_columns = 40;

export default class WeatherSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        const nodes = [];
        for(let row = 0; row < number_of_rows; row++) {
            const currentRow = [];
            for(let column = 0; column < number_of_columns; column++) {
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
                    return <div>
                        {row.map((node, nodeIdx) => <Node></Node>)}
                    </div>
                })}
            </div>
        );
    }
}