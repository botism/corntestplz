import React from "react";
import {TVChartContainer} from "../TVChartContainer"

import BroadcastChannel from 'broadcast-channel';
const chartLoadChannel = new BroadcastChannel('chartLoad');

export class Chart extends React.Component {
    state = {
        value: null,
        load: false
    };
    setValue = e => {
        this.setState({ value: e.target.value });
    };

    setContainerTitle = () => {
        this.props.glContainer.setTitle(this.state.value);
    };

    startChart = () => {
        this.setState({ load: false });
    }

    componentDidMount() {
        chartLoadChannel.onmessage = msg => {
            if (msg==='load') {
                this.setState({load: true})
            }
        }
    }


    render() {

            if (!this.state.load) {
                return (
                    <TVChartContainer/>
                    )
            } else {
                return (
                    <div>
                        <button style={{backgroundColor: 'grey', height: 100, width: 100}} onClick={this.startChart}>start chart</button>
                    </div>
                    )

            }

    }

}
