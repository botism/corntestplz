import React, {Component} from 'react'
import './exchanges.css'
import {SweetAlert} from "../util/SweetAlert"
// import BroadcastChannel from 'broadcast-channel'
import '../index.css'
import Context from "../data/Context"
import {Ticker} from "../component/Ticker/Ticker"
import {TradeBuilder} from "./TradeBuilder"
import {Formatter} from "../util/Formatter"
import Toggle from "react-toggle"
import $ from "jquery"
import {Prices} from '../data/Prices'

import onClickOutside from "react-onclickoutside"


class Binance extends Component {

    handleClickOutside = evt => {
        if (this.state.showSettings) {
            this.setState({showSettings: false})
        }
    }

    static contextType = Context


    static getSymbolMini = (symbol) => {

        return {
            BTCUSDT: 'btc',
            ETHUSDT: 'eth'
        }[symbol]

    }

    static tholder = []

    constructor(props) {
        super(props)


        this.state = {

            name: 'binance',

            ws: null,

            open: false,

            closeButtonTime: Date.now(),


            showSettings: false,

            trades: []

            // props: props

        }

    }

    componentDidMount() {

        setInterval(() => {
            // console.log('push trades')

            Binance.tholder.forEach((thold) => {


                let total = Math.abs(thold.size)

                let signed = thold.size * (thold.side === true ? 1 : -1)

                let t = [
                    4,
                    thold.symbol,
                    thold.size * (thold.side === true ? 1 : -1),
                    signed,
                    TradeBuilder.getSlip(thold.lastPrice - thold.firstPrice, thold.symbol),
                    Date.now(),
                    total < 1000 ? 'class1' : total < 10000 ? 'class2' : total < 100000 ? 'class3' : total < 500000 ? 'class4' : total < 1000000 ? 'class5' : 'class6',
                    TradeBuilder.getBg(signed),
                    'images/exchange/binance.png',
                    Ticker.getCoinIcon(thold.symbol),
                    Formatter.getKformat(thold.size, 0),
                    Formatter.commas(thold.price.toFixed(thold.price < 0.01 ? 8 : thold.price < 10 ? 2 : 1)), //<1 for alts
                ]

                // console.log(thold.amt)
                // if (Math.abs(thold.amt) > Bitfinex.amtMins[thold.symbol]) {
                t[12] = (Math.abs(thold.amt) >= 1 ? Formatter.getKformat(Math.abs(thold.amt), 0) : Math.abs(thold.amt).toFixed(2)) + ' ' + Binance.getSymbolMini(thold.symbol)
                // }


                //
                //
                // let total = Math.abs(thold.size)
                //
                // let t = [
                //     2,
                //     thold.symbol,
                //     thold.size,
                //     thold.price,
                //     TradeBuilder.getSlip(thold.lastPrice - thold.firstPrice, thold.symbol),
                //     Date.now(),
                //     total < 1000 ? 'class1' : total < 10000 ? 'class2' : total < 100000 ? 'class3' : total < 500000 ? 'class4' : total < 1000000 ? 'class5' : 'class6',
                //     TradeBuilder.getBg(signed),
                //     'images/exchange/coinbase.png',
                //     Ticker.getCoinIcon(thold.symbol),
                //     Formatter.getKformat(thold.size, 0),
                //     thold.price.toFixed(thold.price < 0 ? 8 : 1).toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(","), //<1 for alts
                // ]
                //
                // console.log(thold.amt)
                // // console.log(thold.amt)
                // // if (thold.amt > Coinbase.amtMins[thold.symbol]) {
                // // t[12] = (thold.amt >= 1? Formatter.getKformat(thold.amt, 0):thold.amt.toFixed(1)) + ' ' + Coinbase.getSymbolMini(thold.symbol)
                //
                // t[12] = thold.amt.toFixed(3) + ' ' + Coinbase.getSymbolMini(thold.symbol)


                // }


                // console.log('new trade ' + JSON.stringify(t))
                // console.log('context got trade ' + JSON.stringify(t))
                // console.log('instances:')
                // console.log(Ticker.instances)
                Ticker.instances.forEach((ticker) => {
                    // console.log('ticker ' + ticker.state.id)
                    // console.log('bitmexOn: ' + ticker.state.bitmexOn)
                    // console.log('bitmex' + t[1] + 'On: ' + ticker.state['bitmex' + t[1] + 'On'])
                    if (ticker.state[this.state.name + 'On']) {
                        //bitmex trade, ticker is bitmexOn..
                        if (ticker.state[this.state.name + t[1] + 'On']) {
                            // on for symbol..
                            if (Math.abs(t[2]) >= ticker.state[this.state.name + t[1] + 'min']) {
                                //above min..
                                // console.log('++++++++pushing ' + JSON.stringify(t))
                                ticker.pushTrade(t)
                            }
                        }
                    }
                })

            })

            Binance.tholder = []

        }, 369)

        const context = this.context

        this.setState({context: context})

        // setInterval(()=>{
        //     let trades = context.state.trades
        //
        //     if (trades.length > 50) {
        //         trades.pop()
        //
        //         context.setTrades(trades)
        //
        //         // console.log('context trades')
        //         // console.log(context.state.trades)
        //     }
        // },1000)

        // symbol: "BTCUSD",
        //     price: tradeRaw.price,
        //     size: Math.abs(tradeRaw.amount * tradeRaw.price),
        //     timestamp: tradeRaw.timestamp,
        //     side: tradeRaw.type === 0,
        //     exchangeName: "bitstamp",
        //     startTime: Date.now(),
        //     btcAmt: tradeRaw.amount,
        //     firstPrice: tradeRaw.price,
        //     lastPrice: tradeRaw.price


        const socketMessageListener = msg => {


            // console.log('msg: ' + JSON.stringify(msg))


            let trade_ = JSON.parse(msg.data)
            if (trade_ == null || trade_.e !== "aggTrade") {
                return
            }

            // let symbol = trade_.channel


            // console.log(symbol)


            // return

            // let trade = trade_.data

            // console.log(JSON.stringify(trade_))


            let pr = parseFloat(trade_.p)
            let btcSize = parseFloat(trade_.q)
            let totalSize = btcSize * pr


            let symbol = trade_.s


            let t = {
                symbol: symbol,
                price: pr,

                //todo get btc price
                //todo
                // size: trade_.product_id.split('-')[1]==='BTC' ? parseFloat(10000*(trade_.size * trade_.price)) : parseFloat(trade_.size * trade_.price),


                // size: trade_.size * trade_.price,
                size: Math.abs(symbol.slice(-3) === 'btc' ? ((totalSize) * 10000) : totalSize),
                timestamp: trade_.T,
                side: !trade_.m,
                exchangeName: "binance",
                startTime: Date.now(),
                amt: btcSize,
                firstPrice: pr,
                lastPrice: pr
            }

            // console.log(JSON.stringify(trade_))


            // console.log(JSON.stringify(t))

            let updated = false


            Binance.tholder.forEach((thold) => {
                if (thold.timestamp === t.timestamp && thold.symbol === t.symbol && thold.side === t.side) {
                    // console.log('update' + thold.timestamp)
                    thold.amt += t.amt
                    thold.size += t.size
                    thold.lastPrice = t.lastPrice
                    // console.log('new tholder: ' + JSON.stringify(Binance.tholder))
                    // console.log('new slip last:' + thold.lastPrice + 'fir ' + thold.firstPrice + '-- '  + (thold.lastPrice-thold.firstPrice))
                    updated = true
                }
            })

            if (!updated) Binance.tholder.push(t)


            // let trade_ = Coinbase.coinbaseTrade(trade_)
            //
            // // console.log("trade_: " + JSON.stringify(trade_))
            //
            // // console.log("trade_ size: " + trade_.size)
            //
            // if (Coinbase.tholder[0] != null && Coinbase.tholder[0].timestamp === trade_.timestamp && Coinbase.tholder[0].side === (trade_.side === "sell")) {
            //
            //     Coinbase.tholder[0].btcAmt = parseFloat(Coinbase.tholder[0].btcAmt) + parseFloat(trade_.btcAmt)
            //     Coinbase.tholder[0].size = parseFloat(Coinbase.tholder[0].size) + parseFloat(trade_.size)
            //     Coinbase.tholder[0].lastPrice = parseFloat(trade_.price)
            //     // this.tradeBeep(trade_[0])
            // } else if (parseFloat(trade_[0].size) >= coinbaseMinMarket) {
            //
            //     if ((parseFloat(trade_[0].size) > 500000 && Math.abs(parseFloat(trade_.btcAmt)) < 30)) {
            //     } else if (trades == null) {
            //         trades = trade_
            //     } else {
            //         trades = trade_.concat(trades)
            //
            //         this.tradeBeep(trade_[0])
            //
            //     }
            // }

        }

        const socketOpenListener = e => {
            console.log(this.state.name + ' open')
            this.setState({open: true})

            // SweetAlert.mini('binance ws: open', '', 'bottom', 'success', 700)

            // let ss = [ 'btcusd', 'ethusd'    ].forEach((symbol)=>{
            //     this.state.ws.send("{\n" +
            //         "    \"event\": \"bts:subscribe\",\n" +
            //         "    \"data\": {\n" +
            //         "        \"channel\": \"live_trades_"+symbol+"\"\n" +
            //         "    }\n" +
            //         "}")
            // })

            // this.state.ws.send("{\"type\": \"subscribe\", \"product_ids\": [\"BTC-USD\",\"BCH-BTC\",\"BCH-USD\",\"LTC-USD\",\"LTC-BTC\",\"XRP-USD\",\"XRP-BTC\",\"LINK-USD\",\"BTC-EUR\",\"ETH-EUR\",\"ETH-USD\"],\"channels\": [\"matches\"]}")

        }

        const socketCloseListener = e => {
            if (this.state.ws) {
                console.error(this.state.name + ' close')
                this.setState({open: false})

                // SweetAlert.mini(this.state.name + ' ws: close', '', 'bottom', 'error', 700)

            }

            if (this.state.closeButtonTime > Date.now() - 1000) {
                return
            }

            setTimeout(() => {

                this.setState({wsOpen: socketOpenListener})
                this.setState({wsMessage: socketMessageListener})
                this.setState({wsClose: socketCloseListener})
                if (Prices.savee.binanceOn === true) {
                    this.setState({ws: new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade/ethusdt@aggTrade')})
                    this.state.ws.addEventListener('open', this.state.wsOpen)
                    this.state.ws.addEventListener('message', this.state.wsMessage)
                    this.state.ws.addEventListener('close', this.state.wsClose)
                }
            }, 1000)


        }


        if (this.state.off) {
            return
        }


        setTimeout(yep => {
                socketCloseListener()

        }, 3000)


    }


    render() {

        return (
            <div id={'exchangeDiv'}>

                <div id={'exchangeDetails'}
                     onMouseEnter={() => {
                         $('.showEx').css({opacity: this.state.open ? 1 : 0.81})
                     }} onMouseLeave={() => {
                    $('.showEx').css({opacity: this.state.open ? 0.8 : 0.75})
                }}
                     style={{
                         pointerEvents: this.state.showSettings ? 'all' : 'none',
                         opacity: this.state.showSettings === true ? 1 : 0
                     }} className={this.state.showSettings === true ? 'showEx' : 'dontShowEx'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <img src={'images/exchange/binance.png'} id={'exchangeIconn'} alt={'binance'} style={{
                            height: 22,
                            // opacity: this.state.open ? 0.8 : 0.5,
                            width: 22,
                            padding: 2,
                            transition: '0.5s',
                            margin: 1,
                            // border: this.state.ws !== null && this.state.ws.OPEN ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                        }}/>

                        <span id={'tittleee'} style={{transition: '0.5s'}}
                              className={'hoverrActive'}>binance</span>

                        <div style={{padding: 4, paddingLeft: 12}}>
                            <Toggle
                                style={{verticalAlign: 'sub', padding: 4}}
                                defaultChecked={this.state.open}
                                checked={this.state.open}
                                className='soundOn'
                                icons={false}
                                onChange={(e) => {
                                    // if (e.target.checked===false) {
                                    //     if (this.state.symbolSelected===(exchangeName+symbol)) {
                                    //         this.setState({symbolSelected: 0})
                                    //     }
                                    // }
                                    // console.log('CHANGE to ' + e.target.checked)

                                    this.state.context.set({binanceOn: e.target.checked})

                                    if (e.target.checked === true) {
                                        // this.setState({ws: new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade/ethusdt@aggTrade')})
                                        // this.state.ws.addEventListener('open', this.state.wsOpen)
                                        // this.state.ws.addEventListener('message', this.state.wsMessage)
                                        // this.state.ws.addEventListener('close', this.state.wsClose)
                                        this.state.wsClose()
                                        console.log('open!')
                                        this.setState({open: true})
                                    } else {
                                        console.log('close!')

                                        this.state.ws.close()
                                        this.setState({closeButtonTime: Date.now()})
                                        this.setState({open: false})

                                    }

                                    // this.setState({soundOn: e.target.checked})
                                    // Prices.soundOn = e.target.checked
                                    // context.set({soundOn: e.target.checked})
                                    // this.setState({soundOn: e.target.checked})
                                    // setTimeout(()=>{console.log('new soundon ' + Prices.soundOn)},1000)
                                }}/>
                        </div>


                        {/*status: <span style={{color: 'yellowgreen'}}>connected</span>*/}
                    </div>

                </div>

                <img
                    onClick={() => {
                        console.log('clic')
                        this.setState({showSettings: !this.state.showSettings})

                    }}
                    src={'images/exchange/binance.png'} id={'bitmexBottomIcon'} alt={'binance'} style={{
                    height: 15,
                    width: 15,
                    padding: 2,
                    transition: '0.5s',
                    margin: 1,
                    border: this.state.open === true ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                }}/>
            </div>
        )
    }


}

export default onClickOutside(Binance)
