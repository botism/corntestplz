import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import Chart from 'chart.js'
import $ from "jquery"
import {Formatter} from "../../util/Formatter"

export class LiqStats extends React.Component {

    static contextType = Context

    static pulled = false

    static liqbars

    static instances = []

    static getStartingProps = () => {
        return {
            id: 'new',
            liqbars: [],
            lastBars: [],

            chart: null,

            legend: false,

            long24: 0,
            short24: 0
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            id: props.id,

            ...props,
        }

        LiqStats.instances.push(this)


    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }

    getColor = (symbol, green) => {

        try {
            return {
                XBTUSD: ['lightgreen', 'red'],
                ETHUSD: ['green', 'orange']
            }[symbol][green]
        } catch (e) {
            return ['darkgreen', 'darkred'][green]
        }

    }


    componentDidMount() {


        const context = this.context

        this.setState({context: context})

        if (LiqStats.pulled === false) {

            LiqStats.pulled = true

            setTimeout(async () => {

                $.get('https://corn-cache1.herokuapp.com/liqbars', async (liqbars) => {
                    // console.log('got:')
                    console.log(liqbars)

                    this.setState({liqbars: liqbars})
                })
            }, 300)

            setInterval(() => {
                $.get('https://corn-cache1.herokuapp.com/liqbars', async (liqbars) => {
                    // console.log('got:')
                    console.log(liqbars)

                    this.setState({liqbars: liqbars})
                })
            }, 60000)
        }

        let intt = setInterval(() => {
            if (this.state.id === 'new' || this.state.liqbars === []) {

            } else {

                if (!document.getElementById('myChart' + this.state.id)) return

                this.setState({lastbars: this.state.liqbars})
                var ctx = document.getElementById('myChart' + this.state.id).getContext('2d')


                let datasets = []

                this.setState({lastbars: ['no']})

                const datasetload = ['XBTUSD',
                    'ETHUSD',
                    'XBTZ19', 'XBTH20', 'ETHZ19', 'ADAZ19', 'BCHZ19',
                    'EOSZ19', 'LTCZ19', 'TRXZ19', 'EOSZ19', 'XRPZ19', 'XRPUSD',].forEach(symbol => {
                    datasets.push({
                        type: 'bar',
                        label: symbol + ' short liqs',
                        backgroundColor: this.getColor(symbol, 0),
                        // data: this.state.liqbars[symbol].map(bar => bar[1]),
                    }, {
                        type: 'bar',
                        label: symbol + ' long liqs',
                        backgroundColor: this.getColor(symbol, 1),
                        // data: this.state.liqbars[symbol].map(bar => bar[2])
                    })
                })

                var stackedBar = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
                        datasets: datasets,

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    var value = Math.abs(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
                                    value = value.toString()
                                    value = value.split(/(?=(?:...)*$)/)
                                    value = value.join(',')
                                    return data.datasets[tooltipItem.datasetIndex].label + ': $' + value + (tooltipItem.index===23?' (<1 hour ago)':' (~' + (24-tooltipItem.index) + ' hours ago)')
                                }
                            } // end callbacks:
                        },

                        legend: {

                            display: this.state.legend,
                            position: 'bottom'
                        },
                        scales: {
                            xAxes: [{

                                stacked: true
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    userCallback: function (value, index, values) {
                                        value = value.toString()
                                        value = value.split(/(?=(?:...)*$)/)
                                        value = value.join(',')
                                        return value
                                    }
                                },
                                stacked: true
                            }]
                        }
                    }
                })

                this.setState({chart: stackedBar})

                clearInterval(intt)

                setInterval(() => {

                    if (JSON.stringify(this.state.lastbars) === JSON.stringify(this.state.liqbars)) {
                        return
                    } else {
                        // console.log('diff bars!')
                    }


                    let long24 = 0

                    let short24 = 0

                    console.log('iqbars: ' + JSON.stringify(this.state.liqbars))

                    let liqbars = this.state.liqbars

                    for (var key in liqbars) {
                        if (liqbars.hasOwnProperty(key)) {
                            liqbars[key].forEach((bar)=>{
                                short24 += bar[1]
                                long24 += Math.abs(bar[2])
                            })
                        }
                    }

                        // this.state.liqbars.forEach((symbar)=>{
                    //     symbar.forEach((bar)=>{
                    //         long24 += bar[1]
                    //         short24 += Math.abs(bar[2])
                    //     })
                    // })

                        this.setState({long24: long24, short24: short24})



                    this.setState({lastbars: this.state.liqbars})

                    let datasets = []

                    const datasetload = ['XBTUSD',
                        'ETHUSD',
                        'XBTZ19', 'XBTH20', 'ETHZ19', 'ADAZ19', 'BCHZ19',
                        'EOSZ19', 'LTCZ19', 'TRXZ19', 'EOSZ19', 'XRPZ19'].forEach(symbol => {

                        if (!this.state.liqbars || !this.state.liqbars[symbol]) return

                            datasets.push({
                                type: 'bar',
                                label: symbol + ' short liqs',
                                backgroundColor: this.getColor(symbol, 0),
                                data: this.state.liqbars[symbol].map(bar => bar[1]),
                            }, {
                                type: 'bar',
                                label: symbol + ' long liqs',
                                backgroundColor: this.getColor(symbol, 1),
                                data: this.state.liqbars[symbol].map(bar => bar[2])
                            })
                    })

                    this.state.chart.destroy()


                    var stackedBar = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
                            datasets: datasets,

                        },

                        options: {

                            responsive: true,

                            maintainAspectRatio: false,

                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                        value = value.toString().replace('-','')
                                        value = value.split(/(?=(?:...)*$)/)
                                        value = value.join(',')
                                        return data.datasets[tooltipItem.datasetIndex].label + ': $' + value + (tooltipItem.index===23?' (<1 hour ago)':' (~' + (23-tooltipItem.index) + ' hours ago)')
                                    }
                                } // end callbacks:
                            },

                            legend: {
                                display: this.state.legend,
                                position: 'bottom'

                            },
                            scales: {
                                xAxes: [{

                                    stacked: true
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        userCallback: function (value, index, values) {
                                            value = value.toString()
                                            value = value.split(/(?=(?:...)*$)/)
                                            value = value.join(',')
                                            return value
                                        }
                                    },
                                    stacked: true
                                }]
                            }
                        }
                    })

                    this.setState({chart: stackedBar})

                }, 5000)
            }
        }, 1000)


    }


    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    loadChart = () => {
        this.state.chart.destroy()

        var ctx = document.getElementById('myChart' + this.state.id).getContext('2d')


        let datasets = []

        const datasetload = ['XBTUSD',
            'ETHUSD',
            'XBTZ19', 'XBTH20', 'ETHZ19', 'ADAZ19', 'BCHZ19',
            'EOSZ19', 'LTCZ19', 'TRXZ19', 'EOSZ19', 'XRPZ19'].forEach(symbol => {

            if (!this.state.liqbars || !this.state.liqbars[symbol]) return

            datasets.push({
                type: 'bar',
                label: symbol + ' short liqs',
                backgroundColor: this.getColor(symbol, 0),
                data: this.state.liqbars[symbol].map(bar => bar[1]),
            }, {
                type: 'bar',
                label: symbol + ' long liqs',
                backgroundColor: this.getColor(symbol, 1),
                data: this.state.liqbars[symbol].map(bar => bar[2])
            })
        })

        var stackedBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
                datasets: datasets,

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                            value = value.toString().replace('-','')
                            value = value.split(/(?=(?:...)*$)/)
                            value = value.join(',')
                            return data.datasets[tooltipItem.datasetIndex].label + ': $' + value + (tooltipItem.index===23?' (<1 hour ago)':' (~' + (23-tooltipItem.index) + ' hours ago)')
                        }
                    } // end callbacks:
                },

                legend: {
                    display: this.state.legend,
                    position: 'bottom'

                },
                scales: {
                    xAxes: [{

                        stacked: true
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (value, index, values) {
                                value = value.toString()
                                value = value.split(/(?=(?:...)*$)/)
                                value = value.join(',')
                                return value
                            }
                        },
                        stacked: true
                    }]
                }
            }
        })

        this.setState({chart: stackedBar})
    }

    render() {

        return (
            <BaseComponent name={'liqstats'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {


                        return (

                            <div id={"Log"} style={{height: '100%'}}>

                                <div id={"tradesTitle"}>

                                    <div style={{display: 'flex'}}>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', fontSize: 12}}>
                                            <div className={'sidebarTitle'} style={{color: '#74A1E6', fontSize: 16}}>liquidations <span style={{opacity: 0.5, fontSize: 'smaller'}}>{' - 24h'}</span></div>


                                            <div style={{marginLeft: 'auto', marginRight: 8}}>
                                                <span style={{opacity: 0.7}}>long:</span> <span style={{fontSize: 14, color: 'orangered', fontWeight: 800}}>{Formatter.getKformat(this.state.long24, 0)}</span>
                                            </div>

                                            <div style={{marginRight: 4}}>
                                                <span style={{opacity: 0.7}}>short:</span> <span style={{fontSize: 14, color: 'greenyellow', fontWeight: 800}}>{Formatter.getKformat(this.state.short24, 0)}</span>
                                            </div>


                                        </div>
                                    </div>


                                    <hr style={{marginTop: 2, opacity: 0.1}}/>
                                </div>



                                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>



                                    <div id={'LiqStats'} style={{height: '100%', padding: 10}}>

                                        <div style={{display: 'flex', justifyContent: 'space-evenly', padding: 4}}>

                                        </div>

                                        <div style={{margin: -12, height: '90%', width: '100%'}}>
                                            <canvas id={'myChart' + this.state.id}/>

                                        </div>

                                        <div style={{opacity: 0.3, fontSize: 12, padding: 10, width: '95%', display: 'flex', justifyContent: 'flex-end'}} onClick={()=>{
                                            this.setState({legend: this.state.legend !== true})

                                            this.loadChart()
                                        }}>
                                            {this.state.legend===false?'- ':'+ '}symbols
                                        </div>


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


                                </div>


                            </div>





                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 20}}>

                    {JSON.stringify(this.state.liqbars)}

                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
