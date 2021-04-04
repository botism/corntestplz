import React, {Component} from 'react'
import './exchanges.css'
import {SweetAlert} from "../util/SweetAlert"
// import BroadcastChannel from 'broadcast-channel'
import Context from "../data/Context"
import {Ticker} from "../component/Ticker/Ticker"
import {TradeBuilder} from "./TradeBuilder"
import {Formatter} from "../util/Formatter"
import {Prices} from '../data/Prices'
import $ from "jquery"
import Toggle from "react-toggle"
import onClickOutside from "react-onclickoutside"

class Coinbase extends Component {


    handleClickOutside = evt => {
        if (this.state.showSettings) {
            this.setState({showSettings: false})
        }
    }


    static contextType = Context




    static amtMins = {
        BTCUSD: 1,

        LINKUSD: 1,


        ETHUSD: 1,
        ETHBTC: 1,
        LTCUSD: 1,
        LTCBTC: 1,
        BCHUSD: 1,
        BCHBTC: 1,
        EOSUSD: 1,
        EOSBTC: 1,
        XRPUSD: 1,
        XRPBTC: 1,
        BSVUSD: 1,
        BSVBTC: 1,
        NEOUSD: 1,
        NEOBTC: 1,
        XMRUSD: 1,
        XMRBTC: 1,
        ETPUSD: 1,
        ETPBTC: 1,
        ETCUSD: 1,
        LEOUSD: 1,
        LEOBTC: 1,
        OMGUSD: 1,
        OMGBTC: 1,
        IOTAUSD: 1,
        IOTABTC: 1,
        DASHUSD: 1,
        DASHBTC: 1,
        ZECUSD: 1,
        ZECBTC: 1,
        ZRXUSD: 1,
        ZRXBTC: 1,
        FTTUSD: 1,
        TRXUSD: 1,
        TRXBTC: 1,
        XTZUSD: 1,
        UOSUSD: 1,
        QTUMUSD: 1,
        FUNUSD: 1,
        FUNBTC: 1,
        BATUSD: 1
    }

    static getSymbolMini = (symbol) => {

        return {
            BTCUSD: 'btc',
            BTCEUR: 'btc-eur',
            ETHUSD: 'eth',
            ETHEUR: 'eth-eur',
            LINKUSD: 'link',

            ETHBTC: 'ethbtc',
            LTCUSD: 'ltc',
            LTCBTC: 'ltcbtc',
            BCHUSD: 'bch',
            BCHBTC: 'bchbtc',
            EOSUSD: 'eos',
            EOSBTC: 'eosbtc',
            XRPUSD: 'xrp',
            XRPBTC: 'xrpbtc',
            BSVUSD: 'bsv',
            BSVBTC: 'bsvbtc',
            NEOUSD: 'neo',
            NEOBTC: 'neobtc',
            XMRUSD: 'xmr',
            XMRBTC: 'xmrbtc',
            ETPUSD: 'etp',
            ETPBTC: 'etpbtc',
            ETCUSD: 'etc',
            LEOUSD: 'leo',
            LEOBTC: 'leobtc',
            OMGUSD: 'omg',
            OMGBTC: 'omgbtc',
            IOTAUSD: 'iota',
            IOTABTC: 'iotabtc',
            DASHUSD: 'dash',
            DASHBTC: 'dashbtc',
            ZECUSD: 'zec',
            ZECBTC: 'zecbtc',
            ZRXUSD: 'zrx',
            ZRXBTC: 'zrxbtc',
            FTTUSD: 'ftt',
            TRXUSD: 'trx',
            TRXBTC: 'trxbtc',
            XTZUSD: 'xtz',
            UOSUSD: 'uos',
            QTUMUSD: 'qtum',
            FUNUSD: 'fun',
            FUNBTC: 'funbtc',
            BATUSD: 'btc'
        }[symbol]

    }

    static tholder = []

    constructor(props) {
        super(props)
        const context = this.context
        // this.setState({})
        this.state = {

            name: 'coinbase',
            context: context,
            ws: null,

            lastMessage: Date.now(),

            open: false,

            trades: []

            // props: props

        }

    }

    componentDidMount() {



        setInterval(()=>{
            // console.log('push trades')


            if (this.state.lastMessage>(Date.now()-200)) {
                // console.log('recente msg return')
                return
            }



            Coinbase.tholder.forEach((thold)=> {


                let total = Math.abs(thold.size)

                let signed = thold.size * (thold.side===true?1:-1)

                let t = [
                    2,
                    thold.symbol,
                    thold.size * (thold.side===true?1:-1),
                    signed,
                    TradeBuilder.getSlip(thold.lastPrice - thold.firstPrice, thold.symbol),
                    Date.now(),
                    total < 1000 ? 'class1' : total < 10000 ? 'class2' : total < 100000 ? 'class3' : total < 500000 ? 'class4' : total < 1000000 ? 'class5' : 'class6',
                    TradeBuilder.getBg(signed),
                    'images/exchange/coinbase.png',
                    Ticker.getCoinIcon(thold.symbol),
                    Formatter.getKformat(thold.size, 0),
                    Formatter.commas(thold.price.toFixed(thold.price < 0.01 ? 8 : thold.price < 10 ? 2 : 1)), //<1 for alts
                ]

                // console.log(thold.amt)
                // if (Math.abs(thold.amt) > Bitfinex.amtMins[thold.symbol]) {
                t[12] = (Math.abs(thold.amt) >= 10? Formatter.getKformat(Math.abs(thold.amt), 0):Math.abs(thold.amt).toFixed(1)).replace('.0','') + ' ' + Coinbase.getSymbolMini(thold.symbol)
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

            Coinbase.tholder = []

        },700)

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


        const socketMessageListener = msg => {




            let tradeRaw = JSON.parse(msg.data)
            if (tradeRaw == null || tradeRaw.type !== "match") {
                return
            }

            // console.log(tradeRaw)



            let t = {
                symbol: tradeRaw.product_id.replace('-',''),
                price: parseFloat(tradeRaw.price),

                //todo get btc price
                //todo
                // size: tradeRaw.product_id.split('-')[1]==='BTC' ? parseFloat(10000*(tradeRaw.size * tradeRaw.price)) : parseFloat(tradeRaw.size * tradeRaw.price),


                // size: tradeRaw.size * tradeRaw.price,
                size: Math.abs(tradeRaw.product_id.split('-')[1]==='BTC' ? ((parseFloat(tradeRaw.size) * parseFloat(tradeRaw.price)) * Prices.XBTUSD)  : (parseFloat(tradeRaw.size * tradeRaw.price))),
                timestamp: tradeRaw.time,
                side: tradeRaw.side==='sell',
                exchangeName: "coinbase",
                startTime: Date.now(),
                amt: parseFloat(tradeRaw.size),
                firstPrice: parseFloat(tradeRaw.price),
                lastPrice: parseFloat(tradeRaw.price)
            }

            // console.log(JSON.stringify(trade))


            // console.log(JSON.stringify(t))

            let updated = false


            Coinbase.tholder.forEach((thold) => {
                if (thold.timestamp === t.timestamp && thold.symbol===t.symbol && thold.side === t.side) {
                    // console.log('update' + thold.timestamp)
                    thold.amt += t.amt
                    thold.size += t.size
                    thold.lastPrice = t.lastPrice
                    // console.log('new tholder: ' + JSON.stringify(Bitfinex.tholder))
                    // console.log('new slip last:' + thold.lastPrice + 'fir ' + thold.firstPrice + '-- '  + (thold.lastPrice-thold.firstPrice))
                    updated = true
                }
            })

            if (!updated) Coinbase.tholder.push(t)



            this.setState({lastMessage: Date.now()})



            // let trade = Coinbase.coinbaseTrade(tradeRaw)
            //
            // // console.log("trade: " + JSON.stringify(trade))
            //
            // // console.log("trade size: " + trade.size)
            //
            // if (Coinbase.tholder[0] != null && Coinbase.tholder[0].timestamp === trade.timestamp && Coinbase.tholder[0].side === (trade.side === "sell")) {
            //
            //     Coinbase.tholder[0].btcAmt = parseFloat(Coinbase.tholder[0].btcAmt) + parseFloat(trade.btcAmt)
            //     Coinbase.tholder[0].size = parseFloat(Coinbase.tholder[0].size) + parseFloat(trade.size)
            //     Coinbase.tholder[0].lastPrice = parseFloat(trade.price)
            //     // this.tradeBeep(trade[0])
            // } else if (parseFloat(trade[0].size) >= coinbaseMinMarket) {
            //
            //     if ((parseFloat(trade[0].size) > 500000 && Math.abs(parseFloat(trade.btcAmt)) < 30)) {
            //     } else if (trades == null) {
            //         trades = trade
            //     } else {
            //         trades = trade.concat(trades)
            //
            //         this.tradeBeep(trade[0])
            //
            //     }
            // }

        }

        const socketOpenListener = e => {
            console.log(this.state.name + ' open')
            this.setState({open: true})

            // SweetAlert.mini('finex ws: open', '', 'bottom', 'success', 700)

            // this.state.ws.send("{\n" +
            //     "  \"event\": \"subscribe\",\n" +
            //     "  \"channel\": \"trades\",\n" +
            //     "  \"pair\": \"BTCUSD\"\n" +
            //     "}")
            //
            //
            // this.state.ws.send("{\n" +
            //     "  \"event\": \"subscribe\",\n" +
            //     "  \"channel\": \"trades\",\n" +
            //     "  \"pair\": \"ETHUSD\"\n" +
            //     "}")

            let ss = ['BTCUSD', 'ETHUSD', 'ETHBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'EOSUSD','EOSBTC', 'XRPUSD','XRPBTC', 'BSVUSD', 'BSVBTC', 'NEOUSD', 'NEOBTC',
                'XMRUSD', 'XMRBTC', 'ETPUSD', 'ETPBTC', 'ETCUSD', 'ETCUSD', 'LEOUSD', 'LEOBTC', 'OMGUSD', 'OMGBTC', 'IOTAUSD', 'IOTABTC', 'DASHUSD', 'DASHBTC', 'ZECUSD', 'ZECBTC',
                'ZRXUSD', 'ZRXBTC', 'FTTUSD', 'TRXUSD', 'TRXBTC', 'XTZUSD', 'UOSUSD', 'QTUMUSD', 'FUNUSD', 'FUNBTC', 'BATUSD'
            ].forEach((symbol)=>{

            })

            this.state.ws.send("{\"type\": \"subscribe\", \"product_ids\": [\"BTC-USD\",\"BCH-BTC\",\"BCH-USD\",\"LTC-USD\",\"LTC-BTC\",\"XRP-USD\",\"XRP-BTC\",\"LINK-USD\",\"BTC-EUR\",\"ETH-EUR\",\"ETH-USD\"],\"channels\": [\"matches\"]}")

        }

        const socketCloseListener = e => {
            if (this.state.ws) {
                console.error(this.state.name + ' close')
                this.setState({open: false})

                // SweetAlert.mini(this.state.name + ' ws: close', '', 'bottom', 'error', 700)

            }



            if (this.state.closeButtonTime > Date.now()-1000) {
                return
            }

            setTimeout(()=>{
                this.setState({wsOpen: socketOpenListener})
                this.setState({wsMessage: socketMessageListener})
                this.setState({wsClose: socketCloseListener})
                if (Prices.savee.coinbaseOn === true) {

                    this.setState({ws: new WebSocket('wss://ws-feed.pro.coinbase.com')})
                    this.state.ws.addEventListener('open', this.state.wsOpen)
                    this.state.ws.addEventListener('message', this.state.wsMessage)
                    this.state.ws.addEventListener('close', this.state.wsClose)
                }
            },1000)

            // this.setState({ws: new WebSocket('wss://ws-feed.pro.coinbase.com')})
            // this.state.ws.addEventListener('open', socketOpenListener)
            // this.state.ws.addEventListener('message', socketMessageListener)
            // this.state.ws.addEventListener('close', socketCloseListener)
        }


        if (this.state.off) {
            return
        }

            socketCloseListener()


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
                    }}}

                     style={{pointerEvents: this.state.showSettings?'all':'none', opacity: this.state.showSettings === true ? 1 : 0}}
                     className={this.state.showSettings === true ? 'showEx' : 'dontShowEx'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <img src={'images/exchange/coinbase.png'} id={'exchangeIconn'} alt={'coinbase'}
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

                        <span id={'tittleee'} className={'hoverrActive'} style={{transition: '0.5s'}}>coinbase</span>

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


                                    Prices.savee.coinbaseOn = e.target.checked
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


                <img src={'images/exchange/coinbase.png'} id={'bitmexBottomIcon'} alt={'coinbase'} onClick={() => {
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

export default onClickOutside(Coinbase)
