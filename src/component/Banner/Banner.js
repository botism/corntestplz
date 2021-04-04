import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import {Formatter} from "../../util/Formatter"

import Toggle from 'react-toggle'

import $ from 'jquery'

import 'rc-input-number/assets/index.css'
import InputNum from 'rc-input-number'

export class Banner extends React.Component {

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

        Banner.instances.push(this)


    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }

    componentDidMount() {


        const context = this.context

        this.setState({context: context})

        setTimeout(() => {

            $('#welcomeearrow').css({opacity: 1, rotate: '-1deg'})

        }, 1400)


        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        }, 2000)

        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 1, rotate: '-1deg'})
        }, 2500)


        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        }, 3000)

        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 1, rotate: '-1deg'})
        }, 3500)


        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        }, 4000)

    }


    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    render() {

        return (
            <BaseComponent name={'banner'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {

                        return (
                            <div id={'Banner'} style={{height: '100%', width: '100%'}}>

                            </div>


                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 20}}>

                    hit the X tab to remove the welcome message

                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
