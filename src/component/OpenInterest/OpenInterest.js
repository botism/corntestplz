import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import Chart from 'chart.js'

export class OpenInterest extends React.Component {

    static contextType = Context

    static instances = []

    static getStartingProps = () => {
        return {
            id: 'new'
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
        }

        OpenInterest.instances.push(this)


    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }

    componentDidMount() {


        const context = this.context

        this.setState({context: context})


        let intt = setInterval(()=>{
            if (this.state.id==='new') {

            } else {
                var ctx = document.getElementById('myChart' + this.state.id).getContext('2d')
                var stackedBar = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['','','','','','','','','','','','','','','','','','','','','','','','',],
                        datasets: [{
                            data: [500000,500000,500000,500000,500000,500000,500000,500000,500000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000,750000],
                            label: "1h",
                            borderColor: "#3e95cd",
                            fill: false
                        }
                        ]
                    },
                    options: {
                        // title: {
                        //     display: true,
                        //     text: 'World population per region (in millions)'
                        // }
                    }
                });

                clearInterval(intt)
            }
        },1000)


    }


    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    render() {

        return (
            <BaseComponent name={'openinterest'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {
                        return (
                            <div id={'OpenInterest'} style={{height: '100%', padding: 4}}>

                                <div style={{display: 'flex', justifyContent: 'space-evenly', padding: 4}}>
                                    <div>
                                    </div>

                                    <div style={{opacity: 0.5, fontSize: 14}}>
                                        bitmex open interest
                                    </div>

                                    <div>
                                    </div>
                                </div>

                                <canvas id={'myChart'+this.state.id} style={{height: '100%', width: '100%'}}></canvas>

                            </div>


                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 20}}>

                    OpenInterest settings

                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
