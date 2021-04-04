import React, {Component} from 'react'
import './exchanges.css'
import {SweetAlert} from "../util/SweetAlert"
// import BroadcastChannel from 'broadcast-channel'
import Context from "../data/Context"
import {Ticker} from "../component/Ticker/Ticker"
import {TradeBuilder} from "./TradeBuilder"
import {Formatter} from "../util/Formatter"
import $ from "jquery"
import Toggle from "react-toggle"


export class Exchange extends Component {


    static Topper = ({name, thiss}) => {
        return (
            <div id={'exchangeDetails'} style={{opacity: this.state.showSettings===true?1:0}} className={this.state.showSettings===true?'showEx':'dontShowEx'}>
                <div style={{display: 'flex', alignItems: 'center'}}>

                    <img src={'images/exchange/'+name+'.png'} id={'exchangeIconn'} alt={name}  onMouseEnter={()=>{$('#exchangeIconn').css({opacity: this.state.open?1:0.7})}} onMouseLeave={()=>{$('#exchangeIconn').css({opacity: this.state.open?0.8:0.5})}}  style={{
                        height: 22,
                        opacity: thiss.state.open?0.8:0.5,
                        width: 22,
                        padding: 2,
                        transition: '0.5s',
                        margin: 1,
                        // border: this.state.ws !== null && this.state.ws.OPEN ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                    }}/>

                    <span id={'tittleee'} style={{transition: '0.5s', opacity: thiss.state.open?0.8:0.5}} onMouseEnter={()=>{$('#tittleee').css({opacity: this.state.open?1:0.7})}} onMouseLeave={()=>{$('#tittleee').css({opacity: this.state.open?0.8:0.5})}}>{name}</span>

                    <div style={{padding: 4, paddingLeft: 12}}>
                        <Toggle
                            style={{verticalAlign: 'sub', padding: 4}}
                            defaultChecked={thiss.state.open}
                            checked={thiss.state.open}
                            className='soundOn'
                            icons={false}
                            onChange={(e) => {
                                // if (e.target.checked===false) {
                                //     if (this.state.symbolSelected===(exchangeName+symbol)) {
                                //         this.setState({symbolSelected: 0})
                                //     }
                                // }
                                // console.log('CHANGE to ' + e.target.checked)

                                if (e.target.checked === true ) {
                                    // this.setState({ws: new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade/ethusdt@aggTrade')})
                                    // this.state.ws.addEventListener('open', this.state.wsOpen)
                                    // this.state.ws.addEventListener('message', this.state.wsMessage)
                                    // this.state.ws.addEventListener('close', this.state.wsClose)
                                    this.state.wsClose()
                                    console.log('open!')
                                    this.setState({open: true})
                                } else {
                                    console.log('close!')

                                    thiss.state.ws.close()
                                    thiss.setState({closeButtonTime: Date.now()})
                                    thiss.setState({open: false})

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
        )
    }

    static contextType = Context

    static getSymbolMini = (symbol) => {
        return {
            BTCUSD: 'btc',
            ETHUSD: 'eth',
            ETHBTC: 'eth',
            LTCUSD: 'ltc',
            LTCBTC: 'ltc',
            BCHUSD: 'bch',
            BCHBTC: 'bch',
            EOSUSD: 'eos',
            EOSBTC: 'eos',
            XRPUSD: 'xrp',
            XRPBTC: 'xrp',
            BSVUSD: 'bsv',
            BSVBTC: 'bsv',
            NEOUSD: 'neo',
            NEOBTC: 'neo',
            XMRUSD: 'xmr',
            XMRBTC: 'xmr',
            ETPUSD: 'etp',
            ETPBTC: 'etp',
            ETCUSD: 'etc',
            LEOUSD: 'leo',
            LEOBTC: 'leo',
            OMGUSD: 'omg',
            OMGBTC: 'omg',
            IOTAUSD: 'iota',
            IOTABTC: 'iota',
            DASHUSD: 'dash',
            DASHBTC: 'dash',
            ZECUSD: 'zec',
            ZECBTC: 'zec',
            ZRXUSD: 'zrx',
            ZRXBTC: 'zrx',
            FTTUSD: 'ftt',
            TRXUSD: 'trx',
            TRXBTC: 'trx',
            XTZUSD: 'xtz',
            UOSUSD: 'uos',
            QTUMUSD: 'qtum',
            FUNUSD: 'fun',
            FUNBTC: 'fun',
            BATUSD: 'btc'
        }[symbol]
    }


    constructor(props) {
        super(props)

        let tholder = []

        this.state = {

            name: props.name||'noname',

            ws: null,

            off: props.off,

            icon: props.icon,


            trades: []

            // props: props

        }

    }

    componentDidMount() {

        setInterval(()=>{
            // console.log('push trades')

            if (!this.tholder) {
                return
            }

            this.tholder.forEach((thold)=> {

                let total = Math.abs(thold.size)

                let t = [
                    2,
                    thold.symbol,
                    thold.size,
                    thold.price,
                    TradeBuilder.getSlip(thold.lastPrice - thold.firstPrice, thold.symbol),
                    Date.now(),
                    total < 1000 ? 'class1' : total < 10000 ? 'class2' : total < 100000 ? 'class3' : total < 500000 ? 'class4' : total < 1000000 ? 'class5' : 'class6',
                    TradeBuilder.getBg(thold.size),
                    'images/exchange/bitfinex.png',
                    Ticker.getCoinIcon(thold.symbol),
                    Formatter.getKformat(thold.size, 0),
                    thold.price.toFixed(thold.price < 0 ? 8 : 1).toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(","), //<1 for alts
                ]

                // console.log(thold.amt)
                // if (Math.abs(thold.amt) > Bitfinex.amtMins[thold.symbol]) {
                t[12] = (Math.abs(thold.amt) >= 1? Formatter.getKformat(Math.abs(thold.amt), 0):Math.abs(thold.amt).toFixed(1)) + ' ' + Exchange.getSymbolMini(thold.symbol)
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

            this.tholder = []

        },1000)

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

        const socketMessageListener = msg => {
            console.log('onmsg ' + msg)
            this.props.onMessage(msg, this.tholder)
        }

        const socketOpenListener = e => {
            console.log(this.state.name + ' open')
            this.props.onOpen(this.state.ws)

        }

        const socketCloseListener = e => {
            if (this.state.ws) {
                console.error(this.state.name + ' close')
                // SweetAlert.mini(this.state.name + ' ws: close', '', 'bottom', 'error', 700)

            }
            this.setState({ws: new WebSocket(this.props.url)})
            this.state.ws.addEventListener('open', socketOpenListener)
            this.state.ws.addEventListener('message', socketMessageListener)
            this.state.ws.addEventListener('close', socketCloseListener)
        }


        if (this.state.off) {
            return
        }


        setTimeout(yep => socketCloseListener(), 3000)


    }


    render() {

        return (
            <div id={'exchangeDiv'}>

                <div id={'exchangeDetails'}>
                    <div>
                        status: <span style={{color: 'yellowgreen'}}>connected</span>
                    </div>

                    <div>
                        last msg: 1s ago
                    </div>

                    <div>
                        tog off
                    </div>

                </div>

                <img src={this.props.icon} id={'bitmexBottomIcon'} alt={'bitmex'} style={{
                    height: 15,
                    width: 15,
                    padding: 2,
                    margin: 1,
                    border: this.state.ws !== null && this.state.ws.OPEN ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                }}/>
            </div>
        )
    }


}
