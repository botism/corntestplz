import React from 'react'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import './Radio.css'

import YouTube from 'react-youtube';

export class Radio extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            id: props.id,

            comp: (
                <div>hi</div>
            ),

            vid: 'jJ9Xk-VoGqo',

            lastTrade: 'x'
        }
    }

    static getStartingProps = () => {
        return {
            // id: 9000000*Math.random().toFixed(0),
            id: 'new',
            bitmexOn: true,

        }
    }


    componentDidMount() {

        // const context = this.context


    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }


    render() {

        // console.log('ren! count ' + this.state.count)

        let count = this.state.count

        return (
            <BaseComponent name={'radio'} propss={{id: this.state.id, setty: 'hi', count: count}} comp={
                <Context.Consumer>
                    {context => {

                        const opts = {
                            height: '0',
                            width: '0',
                            playerVars: { // https://developers.google.com/youtube/player_parameters
                                autoplay: 1
                            }
                        };

                        return (
                            <div id={'Radio'}>
                                <YouTube
                                    videoId={this.state.vid}
                                    opts={opts}
                                    onEnd={()=>{this.setState({vid: 'NW59IsQkGmA'})}}
                                    playerVars={{ // https://developers.google.com/youtube/player_parameters
                                        autoplay: 0
                                    }}
                                    // onReady={this._onReady}
                                />
                            </div>
                        )
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 2}}>

                    <div className={'settingItemm'}>
                        <div id={'exchangeTitle'}>
                            <img src={'images/exchange/bitmex22n.png'} alt={'-'} height={16} width={20} style={{padding: 2}} />
                            <span>bitmex</span>
                        </div>

                        <div id={'bitmexExpand'}>
                            <hr style={{opacity: 0.3}}/>

                            <div style={{padding: 3, border: '1px solid white'}} onClick={this.up}>
                                {count}
                            </div>

                            <div style={{padding: 2, display: 'flex'}}>
                                symbols:
                            </div>

                            <div style={{padding: 2, display: 'flex'}}>
                                min. size:
                            </div>


                        </div>
                    </div>
                    <div className={'settingItemm'}>

                        <div id={'exchangeTitle'} >
                            <img src={'images/exchange/bitmex22n.png'} alt={'-'} height={16} width={20} style={{padding: 2}} />
                            bitfinex
                        </div>


                        <div id={'bitmexExpand'}>
                            <hr/>

                            <div>
                                symbols:
                            </div>

                            <div>
                                min. size:
                            </div>


                        </div>
                    </div>


                    <div className={'settingItemm'}>

                        <div id={'exchangeTitle'} >
                            <img src={'images/exchange/bitmex22n.png'} alt={'-'} height={16} width={20} style={{padding: 2}} />
                            coinbase
                        </div>


                        <div id={'bitmexExpand'}>
                            <hr/>



                            <div>
                                symbols:
                            </div>

                            <div>
                                min. size:
                            </div>


                        </div>
                    </div>
                </div>
            )} onChangeId={this.changeId}/>
        )
    }
}
