import Context from './Context'
import React from 'react'

import {Prices} from '../data/Prices'

export class ContextProvider extends React.Component {


    constructor(props) {
        super(props)

        let cornContext = localStorage.getItem('cornContext')

        if (cornContext) {
            console.log('yep, ')
            console.log(cornContext)
            this.state = {
                ...JSON.parse(cornContext)
            }
        } else {
            this.state = {
                XBTUSD: 8400,
                soundOn: true,
                arrowsOn: false,

                binanceOn: true,
                bitfinexOn: true,
                bitmexOn: true,
                bitstampOn: true,
                bybitOn: true,
                coinbaseOn: true,
                deribitOn: true,
                FTXOn: true,
                OKExOn: true,
            }
        }

        Prices.savee = this.state

        console.log('set savee to ' + JSON.stringify(Prices.savee))

        Prices.soundOn = this.state.soundOn


        setInterval(()=>{

            Prices.savee = this.state

            // console.log('set savee to ' + JSON.stringify(Prices.savee))

            localStorage.setItem('cornContext', JSON.stringify(this.state))

            // localStorage.setItem('savedState', JSON.stringify(myLayout.toConfig())+'globalsplit' + JSON.stringify(this.state.context.getSave()))

        },2000)
    }

    render() {
        return (
            <Context.Provider
                value={{
                    state: this.state,

                    set: (obj) => {
                        console.log('set ' + JSON.stringify(obj))
                        this.setState(obj)
                        setTimeout(()=>{
                            console.log('new state ' + (JSON.stringify(this.state)))
                        },1000)
                    },
                    getSound: () => {
                        return this.state.soundOn
                    },

                    getSave: () => {
                        return this.state
                    },

                    addTrade: (t) => {
                        // const trades = this.state.trades
                        // trades.unshift(t)
                        // this.setState({trades})

                        // console.log('context got trade ' + JSON.stringify(t))
                        // console.log('instances:')
                        // console.log(Ticker.instances)


                    },

                    setPrice: (symbol, price) => {
                        // console.log('setprice ' + symbol + ' price')
                        this.setState({[symbol]: price})
                        // console.log(this.state[symbol])
                    },

                    uptest: () => {
                        const trades = Object.assign({}, this.state.trades)
                        trades.test.push(['hii', Math.random()])
                        this.setState({trades})
                    },

                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}
