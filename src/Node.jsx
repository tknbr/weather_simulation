import React, {Component} from 'react';

import './Node.css'

export default class Node extends Component {

    /** TYPE OF NODE
     *  1 -> air
     *  2 -> water
     *  3 -> soil
     */


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            //row,
            //col,
            typeOfNode,
        } = this.props;

        let extraClassName = '';
        switch (typeOfNode) {
            case 'air':
                extraClassName = `node node_air`;
                break;
            case 'water':
                extraClassName = `node node_water`;
                break;
            case 'soil':
                extraClassName = `node node_soil`;
                break;
            default:
                extraClassName = `node node_air`;
                break;
        }

        return(
            <div
                className={extraClassName}
            ></div>

        );
    }

}