import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import {Formatter} from "../../util/Formatter"

import Toggle from 'react-toggle'

import $ from 'jquery'

import 'rc-input-number/assets/index.css'
import InputNum from 'rc-input-number'
export class Spacer extends React.Component {

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

        Spacer.instances.push(this)


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


        setTimeout(()=>{
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        },2000)

        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 1, rotate: '-1deg'})
        }, 2500)


        setTimeout(()=>{
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        },3000)

        setTimeout(() => {
            $('#welcomeearrow').css({opacity: 1, rotate: '-1deg'})
        }, 3500)


        setTimeout(()=>{
            $('#welcomeearrow').css({opacity: 0.49, rotate: '0deg'})
        },4000)

    }


    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    render() {

        return (
            <BaseComponent name={'spacer'} propss={{
                id: this.state.id,
            }} comp={
                <Context.Consumer>
                    {context => {
                        return (
                            <div id={'Spacer'} style={{fontFamily: 'Sarala'}}>
                                {/*<div id={'welcomeearrow'} className={'notouch'} style={{display: 'flex', justifyContent: 'flex-end', padding: 40}} onMouseEnter={()=>{$('#welcomeearrow').css({opacity: 0.9})}} onMouseLeave={()=>{$('#welcomeearrow').css({opacity: this.state.up?0.9:0.5})}}>*/}
                                {/*    settings<span style={{paddingLeft: 10}}>🡭</span>*/}
                                {/*</div>*/}

                                <div className={'titleWelcome'} style={{display: 'flex', justifyContent: 'center', padding: 30}}>
                                    {/*old site: <a href={'/old.html'}>corn.lol/old.html</a>*/}
                                </div>

                                {/*<div>*/}
                                {/*<img src={'images/subway.jpg'} alt={'subway'}/>*/}
                                {/*</div>*/}

                                {/*<div className={'titleWelcome'} style={{pointerEvents: 'all', display: 'flex', justifyContent: 'flex-end', padding: 10, paddingRight: 40}}>*/}
                                {/*    contact: <a href={'mailto:boppleton@corn.lol'}>boppleton@corn.lol</a>*/}
                                {/*</div>*/}

                                {/*<div id={'welcomee'} style={{transition: '0.7s'}}>*/}


                                {/*    <div style={{display: 'flex', letterSpacing: 1, justifyContent: 'center', opacity: 0.7}}>*/}

                                {/*        welcome to the <span style={{color: '#ffc60b', letterSpacing: 2, paddingLeft: 4, paddingRight: 4}}>corn terminal</span> alpha test!*/}
                                {/*    </div>*/}

                                {/*    <div style={{display: 'flex', justifyContent: 'center', padding: 10, opacity: 0.54, fontSize: 'small'}}>*/}
                                {/*        old site: <a href={'/old'} style={{color: 'white', marginLeft: 6}}>corn.lol/old</a>*/}
                                {/*    </div>*/}

                                {/*    /!*<div className={'noselect'} style={{display: 'flex', justifyContent: 'center', padding: 10, opacity: 0.54, fontSize: 'small'}}>*!/*/}
                                {/*    /!*    contact: <a href={'mailto:boppleton@corn.lol'} style={{color: 'white', marginLeft: 6}}>boppleton@corn.lol</a>*!/*/}
                                {/*    /!*</div>*!/*/}



                                {/*    <div id={'logoDiv'} style={{display: 'flex', justifyContent: 'center'}}>*/}
                                {/*        <img src={"images/cornicon.png"} alt={"corn.lol"} id={"loginicon"} height={36} width={36}/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}



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
