import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import {Formatter} from "../../util/Formatter"

import Toggle from 'react-toggle'
import './Chart.css'

import 'rc-input-number/assets/index.css'
import InputNum from 'rc-input-number'
import {TVChartContainer} from "../TVChartContainer"
export class Chart extends React.Component {

    static contextType = Context

    static instances = []

    static getStartingProps = () => {
        return {
            id: 'new',
            symbol: 'XBT-USD bitmex',
            interval: '15',
            hideTabs: false,

            drawings: []
        }
    }

    constructor(props) {
        super(props) // todo SAVE DRAWINGS ICON 㔔㔔㔔㔔㔔

        this.state = {
            id: props.id,

            symbol: props.symbol,
            interval: props.interval,

            hideTabs: props.hideTabs,
            started: false,

            drawings: props.drawings,
        }

        Chart.instances.push(this)

        console.log('chart constructor, state: ')
        console.log(this.state)


    }

    componentWillUnmount() {
        console.log('UNMOUNTT')
    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }


    componentDidMount() {


        const context = this.context

        this.setState({context: context})

    }


    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    render() {

        return (
            <BaseComponent name={'chart'} propss={{
                id: this.state.id,
                symbol: this.state.symbol,
                hideTabs: this.state.hideTabs,
                interval: this.state.interval,
                drawings: this.state.drawings,
                changeSymbol: (s)=>{
                    this.setState({symbol: s})
                },
                changeInterval: (i)=>{
                    this.setState({interval: i})
                    // console.log('interval now ' + this.state.interval)
                },
                setDrawings: (drawings) => {
                    this.setState({drawings: drawings})
                },
                getDrawings: () => {
                    return this.state.drawings
                }
            }} comp={
                <Context.Consumer>
                    {context => {
                        if (this.state.started) {
                            return (
                                <TVChartContainer id={this.state.id} symbol={this.state.symbol} drawings={this.state.drawings} interval={this.state.interval} setDrawings={(drawings) => {
                                    this.setState({drawings: drawings})
                                }} changeSymbol={(s)=>{
                                    this.setState({symbol: s})
                                }} changeInterval={(i)=>{
                                    this.setState({interval: i})
                                }}/>
                            )
                        } else {
                            return (
                                <div onClick={()=>{this.setState({started: true})}} id={'startChart'}>start chart</div>
                            )
                        }
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 2}}>

                        <div className={'settingItemm'} style={{margin: 20}} onClick={()=>{
                            this.setState({hideTabs: true})
                            console.log('set to ' + this.state.hideTabs)
                            setTimeout(()=>{
                                this.setState({hideTabs: false})
                            },10000)
                        }}>
                            hide tabs
                        </div>


                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
