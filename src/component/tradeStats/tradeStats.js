import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import Chart from 'chart.js'

export class TradeStats extends React.Component {

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

        TradeStats.instances.push(this)


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
                    type: 'bar',
                    data: {
                        labels: ['','','','','','','','','','','','','','','','','','','','','','','','',],
                        datasets: [{
                            type: 'bar',
                            label: 'xbtusd short liqs',
                            backgroundColor: "green",
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2566965, 1958473, 1204524, 50000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2566965, 1958473, 1204524, 50000],
                        }, {
                            type: 'bar',
                            label: 'xbtusd long liqs',
                            backgroundColor: "red",
                            data: [0, -504954, -200498, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -504954, -200498, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
                        },

                            {
                                type: 'bar',
                                label: 'ethusd short liqs',
                                backgroundColor: "darkgreen",
                                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 286965, 19573, 120464, 1080, 0, 0, 0, 0, 0, 0, 0, 0, 0, 286965, 19573, 120464, 1080],
                            }, {
                                type: 'bar',
                                label: 'ethusd long liqs',
                                backgroundColor: "darkred",
                                data: [0, -500, -4000, 0, 0, 0, 0, -40600, 0, 0, 0, 0,0, -500, -4000, 0, 0, 0, 0, -40600, 0, 0, 0, 0, ]
                            }

                        ]
                    },

                    options: {
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var value = data.datasets[0].data[tooltipItem.index];
                                    value = value.toString();
                                    value = value.split(/(?=(?:...)*$)/);
                                    value = value.join(',');
                                    return data.datasets[0].label + ': $' + value;
                                }
                            } // end callbacks:
                        },

                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{

                                stacked: true
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    userCallback: function(value, index, values) {
                                        value = value.toString();
                                        value = value.split(/(?=(?:...)*$)/);
                                        value = value.join(',');
                                        return value;
                                    }
                                },
                                stacked: true
                            }]
                        }
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
            <BaseComponent name={'tradestats'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {
                        return (
                            <div id={'TradeStats'} style={{height: '100%', padding: 4}}>

                                <div style={{display: 'flex', justifyContent: 'space-evenly', padding: 4}}>
                                    {/*<div>*/}
                                    {/*    buy: <span style={{fontSize: 18, color: 'red'}}>10m</span>*/}
                                    {/*</div>*/}

                                    <div style={{opacity: 0.5, fontSize: 14}}>
                                        market orders
                                    </div>

                                    {/*<div>*/}
                                    {/*    sell: <span style={{fontSize: 18, color: 'green', fontWeight: 800}}>120m</span>*/}
                                    {/*</div>*/}
                                </div>

                                <canvas id={'myChart'+this.state.id} style={{height: '100%', width: '100%'}}></canvas>

                                {/*<div style={{display: 'flex', flexDirection: 'column'}}>*/}

                                {/*    <div style={{display: 'flex', justifyContent: 'center'}}>*/}
                                {/*        <span style={{opacity: 0.7}}>total liquidations</span>*/}
                                {/*    </div>*/}

                                {/*    <div style={{display: 'flex', justifyContent: 'space-evenly', padding: 2, margin: 2, border: '1px solid white', borderRadius: 5}}>*/}
                                {/*        <div>*/}
                                {/*            <img src={'images/exchange/bitmex.png'} style={{height: 22, width: 22, padding: 2}} alt={'bitmex'}/>*/}
                                {/*        </div>*/}
                                {/*        <div>*/}
                                {/*            <img src={'images/coin/btc.png'} style={{height: 22, width: 22, padding: 2}} alt={'bitcoin'}/>*/}
                                {/*        </div>*/}

                                {/*        <div style={{display: 'flex'}}>*/}
                                {/*            <div style={{padding: 3}}>1h:</div>*/}
                                {/*            <div style={{background: 'green', padding: 3}}>*/}
                                {/*                500k*/}
                                {/*            </div>*/}
                                {/*            <div style={{background: 'red', padding: 3}}>*/}
                                {/*                2m*/}
                                {/*            </div>*/}
                                {/*        </div>*/}

                                {/*        <div style={{display: 'flex'}}>*/}
                                {/*            <div style={{padding: 3}}>24h:</div>*/}
                                {/*            <div style={{background: 'green', padding: 3}}>*/}
                                {/*                500k*/}
                                {/*            </div>*/}
                                {/*            <div style={{background: 'red', padding: 3}}>*/}
                                {/*                2m*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}

                            </div>


                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 20}}>

                    TradeStats settings

                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
