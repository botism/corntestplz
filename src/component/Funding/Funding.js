import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import Chart from 'chart.js'

export class Funding extends React.Component {

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

        Funding.instances.push(this)


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
            <BaseComponent name={'liqstats'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {
                        return (
                            <div id={'LiqStats'} style={{padding: 4}}>

                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    funding
                                </div>


                            </div>


                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 20}}>

                    LiqStats settings

                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
