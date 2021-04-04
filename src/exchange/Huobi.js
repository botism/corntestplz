import React, {Component} from 'react'
import './exchanges.css'
import pako from 'pako'
import {SweetAlert} from "../util/SweetAlert"
// import BroadcastChannel from 'broadcast-channel'
import Context from "../data/Context"
import {Ticker} from "../component/Ticker/Ticker"
import {TradeBuilder} from "./TradeBuilder"
import {Formatter} from "../util/Formatter"

import onClickOutside from "react-onclickoutside"
import Toggle from "react-toggle"
import {Prices} from "../data/Prices"

import $ from 'jquery'


class Huobi extends Component {


    static contextType = Context

    handleClickOutside = evt => {
        if (this.state.showSettings) {
            this.setState({showSettings: false})
        }
    }

    static getSymbolMini = (symbol) => {

        return {
            BTCUSDT: 'btc',
            ETHUSDT: 'eth'


        }[symbol.replace('-', '').replace('-', '')]

    }

    // OKEx: [
    //     'BTC-USDT', 'BTC-USD-191227', 'BTC-USD-191101', 'BTC-USD-191025', 'BTC-USD-SWAP',
    //     'ETH-USDT', 'ETH-USD-191227', 'ETH-USD-191101', 'ETH-USD-191025', 'ETH-USD-SWAP'
    // ]

    static tholder = []

    constructor(props) {
        super(props)

        this.state = {

            name: 'huobi',

            ws: null,


            trades: []

            // props: props

        }

    }

    componentDidMount() {

        setInterval(() => {
            // console.log('push trades' + JSON.stringify(OKEx.tholder))

            Huobi.tholder.forEach((thold) => {


                let total = Math.abs(thold.size)

                let signed = thold.size * (thold.side === true ? 1 : -1)

                let t = [
                    2,
                    thold.symbol,
                    thold.size * (thold.side === true ? 1 : -1),
                    signed,
                    TradeBuilder.getSlip(thold.lastPrice - thold.firstPrice, thold.symbol),
                    // thold.lastPrice + ' - ' + thold.firstPrice + ' = ' + (thold.lastPrice-thold.firstPrice),
                    Date.now(),
                    total < 1000 ? 'class1' : total < 10000 ? 'class2' : total < 100000 ? 'class3' : total < 500000 ? 'class4' : total < 1000000 ? 'class5' : 'class6',
                    TradeBuilder.getBg(signed),
                    'images/exchange/huobi.png',
                    Ticker.getCoinIcon(thold.symbol),
                    Formatter.getKformat(signed, 0),
                    Formatter.commas(thold.price.toFixed(thold.price < 0.01 ? 8 : thold.price < 10 ? 2 : 1)), //<1 for alts)
                ]

                // console.log(thold.amt)
                if (thold.symbol.includes('USDT')) {
                    t[12] = (Math.abs(thold.amt) >= 10 ? Formatter.getKformat(Math.abs(thold.amt), 0) : Math.abs(thold.amt) < 0.1 ? Math.abs(thold.amt).toFixed(2) : Math.abs(thold.amt).toFixed(1)) + ' ' + Huobi.getSymbolMini(thold.symbol)
                } else {
                    t[12] = Huobi.getSymbolMini(thold.symbol)
                }

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
                    // console.log('huobiOn: ' + ticker.state.huobiOn)
                    // console.log('bitmex' + t[1] + 'On: ' + ticker.state['bitmex' + t[1] + 'On'])
                    if (ticker.state[this.state.name + 'On']) {
                        //bitmex trade, ticker is bitmexOn..
                        console.log('state ' + (this.state.name + t[1] + 'On') + ': ' + ticker.state[this.state.name + t[1] + 'On'])
                        if (ticker.state[this.state.name + t[1] + 'On']) {
                            // on for symbol..
                            // console.log('t2size: ' + t[2])
                            if (Math.abs(t[2]) >= ticker.state[this.state.name + t[1] + 'min']) {
                                //above min..
                                // console.log('++++++++pushing ' + JSON.stringify(t))
                                ticker.pushTrade(t)
                            }
                        }
                    }
                })

            })

            Huobi.tholder = []

        }, 369)

        const context = this.context

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


        const socketMessageListener = data => {


            const json = JSON.parse(pako.inflate(data.data, { to: 'string' }))

            if (!json) {
                return
            }

            // console.log('json: ' + JSON.stringify(json))

            if (json.ping) {
                this.state.ws.send(JSON.stringify({ pong: json.ping }))
                return
            } else if (json.tick && json.tick.data && json.tick.data.length) {

                // console.log('msg: ' + JSON.stringify(json.tick.data))
                // return json.tick.data.map((trade) => [
                //     this.id,
                //     trade.ts,
                //     +trade.price,
                //     +trade.amount,
                //     trade.direction === 'buy' ? 1 : 0,
                // ])

            }

            if (!json.ch) return

            let sym = json.ch.split('.trade')[0].split('.')[1].toUpperCase()

            // console.log('sym: ' + sym.split('.trade')[0].split('.')[1])

            let total = 0

            if (!json.tick) return

            let bunch = json.tick.data

            let firstprice = bunch[0].price
            let lastprice = bunch[bunch.length-1].price

            bunch.forEach(trade=>{
                total += trade.amount
            })

            // console.log('total: ' + total)

            let t = {
                symbol: sym,
                price: firstprice,

                //todo get btc price
                //todo
                // size: trade_.product_id.split('-')[1]==='BTC' ? parseFloat(10000*(trade_.size * trade_.price)) : parseFloat(trade_.size * trade_.price),

                // size: trade_.size * trade_.price,

                amt: total,
                size: total*firstprice,
                // size: Math.abs(symbol.split('trades_')[1].slice(-3)==='btc' ? ((trade.amount * trade.price) * 10000)  : (trade.amount * trade.price)),


                timestamp: bunch[0].ts,
                side: bunch[0].direction==='buy',
                exchangeName: "huobi",
                startTime: Date.now(),
                firstPrice: firstprice,
                lastPrice: lastprice
            }
            Huobi.tholder.push(t)



            // let text = pako.inflate(data.data, {
            //     to: 'string'
            // });
            // console.log(text)
            // return
            // let msg = JSON.parse(text);
            // if (msg.ping) {
            //     this.state.ws.send(JSON.stringify({
            //         pong: msg.ping
            //     }));
            // } else if (msg.tick) {
            //     console.log(msg);
            //     // handle(msg);
            // } else {
            //     console.log(text);
            // }
            // var json
            // var data = msg
            //
            // try {
            //     if (data instanceof String) {
            //         json = JSON.parse(data)
            //         // console.log("json", json)
            //     } else {
            //         json = JSON.parse(pako.inflate(data, {to: 'string'}))
            //         // console.log("json",json);
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
            //
            // console.log('json1: ' + JSON.stringify(json))

            // var msg = pako.inflate(event.data)
            //
            // console.log("msg: " + msg)
            // debugger;;

            // console.log("okex trade " + JSON.stringify(event))
            //
            // return

            // if (!json) {
            //     return
            // }

            // var tradeRaw = json
            //
            // // console.log('raw: ' + JSON.stringify(tradeRaw))
            //
            // return
            // // -19T15:15:39.262Z"}
            // // OKEx.js:195 raw: {"side":"sell","trade_id":"4317585","price":"8071.01","qty":"1","instrument_id":"BTC-USD-191227","timestamp":"2019-10-19T15:15:39.262Z"}
            // // OKEx.js:195 raw: {"side":"sell","trade_id":"4317586","price":"8071.01","qty":"1","instrument_id":"BTC-USD-191227","timestamp":"2019-10-19T15:15:39.262Z"}
            // // OKEx.js:195 raw: {"side":"sell","trade_id":"4317587","price":"8071.01","qty":"2","instrument_id":"BTC-
            //
            // let aa = parseFloat(tradeRaw.size)
            // let pp = parseFloat(tradeRaw.price)
            //
            // let amount
            // let size
            //
            //
            // if (tradeRaw.size) {
            //
            //     if (tradeRaw.instrument_id.includes('SWAP')) {
            //         amount = parseInt(tradeRaw.size)
            //         size = parseInt(tradeRaw.size) * (tradeRaw.instrument_id.includes('BTC-USD') ? 100 : 10)
            //     } else {
            //         amount = aa
            //         size = (aa * pp).toFixed(0)
            //     }
            //
            //     // console.log('amt: ' + aa + ' p: ' + pp + ' size: ' + size)
            // } else {
            //     amount = parseInt(tradeRaw.qty)
            //     size = parseInt(tradeRaw.qty) * (tradeRaw.instrument_id.includes('BTC-USD') ? 100 : 10)
            // }
            //
            // let t = {
            //     symbol: tradeRaw.instrument_id,
            //     price: pp,
            //
            //     //todo get btc price
            //     //todo
            //     // size: trade_.product_id.split('-')[1]==='BTC' ? parseFloat(10000*(trade_.size * trade_.price)) : parseFloat(trade_.size * trade_.price),
            //
            //     // size: trade_.size * trade_.price,
            //
            //     amt: amount,
            //     size: size,
            //     // size: Math.abs(symbol.split('trades_')[1].slice(-3)==='btc' ? ((trade.amount * trade.price) * 10000)  : (trade.amount * trade.price)),
            //
            //
            //     timestamp: tradeRaw.timestamp,
            //     side: tradeRaw.side === 'buy',
            //     exchangeName: "huobi",
            //     startTime: Date.now(),
            //     firstPrice: pp,
            //     lastPrice: pp
            // }

            // console.log(JSON.stringify(trade_))


            // console.log(JSON.stringify(t))
            //
            // let updated = false
            //
            //
            // Huobi.tholder.forEach((thold) => {
            //     if (thold.timestamp === t.timestamp && thold.symbol === t.symbol && thold.side === t.side) {
            //         // console.log('update' + thold.timestamp)
            //         thold.amt += t.amt
            //         thold.size += t.size
            //         thold.lastPrice = t.lastPrice
            //         // console.log('new tholder: ' + JSON.stringify(Bitstamp.tholder))
            //         // console.log('new slip last:' + thold.lastPrice + 'fir ' + thold.firstPrice + '-- '  + (thold.lastPrice-thold.firstPrice))
            //         updated = true
            //     }
            // })

            // if (!updated)




            // let trade = Start.okexTrade(tradeRaw)
            // // console.log(trade[0],okexMinMarket)
            // console.log(trade[0])
            //
            // if (trade[0].size >= okexMinMarket) {
            //     trades = trade.concat(trades)
            // }


            // console.log('msg: ')
            //
            // console.log(msg.data)
            //
            //
            // // return
            //
            // let trade_ = msg.data
            // if (trade_ == null || trade_.event !== "trade") {
            //     return
            // }
            //
            // let symbol = trade_.channel
            //
            //
            // // console.log(symbol)
            //
            //
            // // return
            //
            // let trade = trade_.data
            //
            //
            //
            // // return
            //
            // let t = {
            //     symbol: symbol.split('trades_')[1].toUpperCase(),
            //     price: trade.price,
            //
            //     //todo get btc price
            //     //todo
            //     // size: trade_.product_id.split('-')[1]==='BTC' ? parseFloat(10000*(trade_.size * trade_.price)) : parseFloat(trade_.size * trade_.price),
            //
            //
            //     // size: trade_.size * trade_.price,
            //     size: Math.abs(symbol.split('trades_')[1].slice(-3)==='btc' ? ((trade.amount * trade.price) * 10000)  : (trade.amount * trade.price)),
            //     timestamp: trade.timestamp,
            //     side: trade.type===0,
            //     exchangeName: "bitstamp",
            //     startTime: Date.now(),
            //     amt: trade.amount,
            //     firstPrice: trade.price,
            //     lastPrice: trade.price
            // }
            //
            // // console.log(JSON.stringify(trade_))
            //
            //
            // console.log(JSON.stringify(t))
            //
            // let updated = false
            //
            //
            // OKEx.tholder.forEach((thold) => {
            //     if (thold.time === t.time && thold.symbol===t.symbol && thold.side === t.side) {
            //         // console.log('update' + thold.timestamp)
            //         thold.amt += t.amt
            //         thold.size += t.size
            //         thold.lastPrice = t.lastPrice
            //         // console.log('new tholder: ' + JSON.stringify(Bitstamp.tholder))
            //         // console.log('new slip last:' + thold.lastPrice + 'fir ' + thold.firstPrice + '-- '  + (thold.lastPrice-thold.firstPrice))
            //         updated = true
            //     }
            // })
            //
            // if (!updated) OKEx.tholder.push(t)
            //


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
            console.log('Huobi open')

            this.setState({open: true})
            //
            this.state.ws.send("{\n" +
                "  \"sub\": \"market.btcusdt.trade.detail\",\n" +
                "  \"id\": \"btcusdt\"\n" +
                "}")

            this.state.ws.send("{\n" +
                "  \"sub\": \"market.ethusdt.trade.detail\",\n" +
                "  \"id\": \"ethusdt\"\n" +
                "}")


        }

        const socketCloseListener = e => {


            if (this.state.ws) {
                console.error('Huobi close')
                this.setState({open: false})
            }

            if (this.state.closeButtonTime > Date.now() - 1000) {
                return
            }

            setTimeout(() => {
                this.setState({wsOpen: socketOpenListener})
                this.setState({wsMessage: socketMessageListener})
                this.setState({wsClose: socketCloseListener})
                if (Prices.savee.huobiOn === true) {
                    let wss = new WebSocket('wss://api.huobi.pro/ws')
                    wss.binaryType = 'arraybuffer'
                    this.setState({ws: wss})
                    this.state.ws.addEventListener('open', this.state.wsOpen)
                    this.state.ws.addEventListener('message', this.state.wsMessage)
                    this.state.ws.addEventListener('close', this.state.wsClose)
                }
            }, 1000)


            //
            // let wss = new WebSocket('wss://real.okex.com:8443/ws/v3')
            // wss.binaryType = 'arraybuffer'
            //
            // this.setState({ws: wss})
            //
            // // this.state.ws = new WebSocket('wss://okexcomreal.bafang.com:8443/ws/v3?compress=true')
            // // this.state.ws.binaryType =
            // this.state.ws.addEventListener('open', socketOpenListener)
            // this.state.ws.addEventListener('message', socketMessageListener)
            // this.state.ws.addEventListener('close', socketCloseListener)


            // if (this.state.ws) {
            //     console.error(this.state.name + ' close')
            //     SweetAlert.mini(this.state.name + ' ws: close', '', 'bottom', 'error', 700)
            //
            // }
            // this.setState({ws: new WebSocket('wss://real.okex.com:8443/ws/v3')})
            // .addEventListener('open', socketOpenListener)
            // this.state.ws.addEventListener('message', socketMessageListener)
            // this.state.ws.addEventListener('close', socketCloseListener)
        }


        // if (this.state.off) {
        //     return
        // }


        setTimeout(yep => socketCloseListener(), 3000)


    }


    render() {

        return (
            <div id={'exchangeDiv'}>

                <div id={'exchangeDetails'}

                     onMouseEnter={() => {
                         if (this.state.showSettings) {
                             $('.showEx').css({opacity: this.state.open ? 1 : 0.81})

                         }
                     }} onMouseLeave={() => {
                    if (this.state.showSettings) {

                        $('.showEx').css({opacity: this.state.open ? 0.8 : 0.75})
                    }
                }}


                     style={{
                         pointerEvents: this.state.showSettings ? 'all' : 'none',
                         opacity: this.state.showSettings === true ? 1 : 0
                     }}
                     className={this.state.showSettings === true ? 'showEx' : 'dontShowEx'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <img src={'images/exchange/huobi.png'} id={'exchangeIconn'} alt={'OKEx'}
                             onMouseEnter={() => {
                                 $('#exchangeIconn').css({opacity: this.state.open ? 1 : 0.7})
                             }} onMouseLeave={() => {
                            $('#exchangeIconn').css({opacity: this.state.open ? 0.8 : 0.5})
                        }} style={{
                            height: 22,
                            opacity: this.state.open ? 0.8 : 0.5,
                            width: 22,
                            padding: 2,
                            transition: '0.5s',
                            margin: 1,
                            // border: this.state.ws !== null && this.state.ws.OPEN ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                        }}/>

                        <span id={'tittleee'} className={'hoverrActive'} style={{transition: '0.5s'}}>huobi</span>

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


                                    // this.state.context.set({bybitOn: e.target.checked})
                                    Prices.savee.huobiOn = e.target.checked
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

                <img src={'images/exchange/huobi.png'} id={'bitmexBottomIcon'} alt={'huobi'} onClick={() => {
                    this.setState({showSettings: !this.state.showSettings})
                }} style={{
                    height: 15,
                    width: 15,
                    padding: 2,
                    margin: 1,
                    border: this.state.open === true ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                }}/>
            </div>
        )
    }


}


export default onClickOutside(Huobi)
