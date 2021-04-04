import React, {Component} from 'react'
import './exchanges.css'
import {SweetAlert} from "../util/SweetAlert"
// import BroadcastChannel from 'broadcast-channel'
import '../index.css'
import Context from "../data/Context"
import {Ticker} from "../component/Ticker/Ticker"
import {TradeBuilder} from "./TradeBuilder"
import {Formatter} from "../util/Formatter"
import $ from 'jquery'
import {Liqs} from "../component/Liqs/Liqs"
import {Prices} from '../data/Prices'
import UIfx from 'uifx'
import beepMp3 from '../sounds/1.wav'
import BroadcastChannel from "broadcast-channel"
import Toggle from "react-toggle"

import onClickOutside from "react-onclickoutside"
const beeep = new UIfx(beepMp3)
const channelTrade = new BroadcastChannel('bitmexTrade')

// const channelBitmexTrade = new BroadcastChannel('channelBitmexTrade')


class Bitmex extends Component {


    handleClickOutside = evt => {
        if (this.state.showSettings) {
            this.setState({showSettings: false})
        }
    }

    static contextType = Context

    static that
    static on = false

    static lastPriceUpdate = Date.now()

    static isOn() {
        try {
            return Bitmex.that.state.open
        } catch (e) {
            return false
        }
    }

    constructor(props) {
        super(props)

        Bitmex.that = this

        this.state = {

            name: 'bitmex',

            ws: null,

            open: false,

            off: props.off,

            icon: props.icon,

            close: false

            // props: props

        }

    }

    beep = (trade) => {
        console.log('beep')

        beeep.play()




    }


    getCoinIcon = (symbol) => {

        if (symbol.slice(0,3)==='XBT' || symbol.includes('BTCUSD') || symbol.includes('BTCPERP') || symbol.includes('BTCUSDT')) {
            return 'images/coin/btc2.png'
        } else if (symbol.includes('ETH') || symbol.includes('ETHEUR') || symbol.includes('ETHPERP')) {
            return 'images/coin/eth.svg'
        } else if (symbol.includes('XRP')) {
            return 'images/coin/xrp.svg'
        } else if (symbol.includes('BCH')) {
            return 'images/coin/bch.png'
        } else if (symbol.includes('EOS')) {
            return 'images/coin/eos.svg'
        } else if (symbol.includes('LTC')) {
            return 'images/coin/ltc.svg'
        } else if (symbol.includes('TRX')) {
            return 'images/coin/trx.png'
        } else if (symbol.includes('ADA')) {
            return 'images/coin/ada.png'
        } else if (symbol.includes('LEO')) {
            return 'images/coin/leo.svg'
        } else if (symbol.includes('BTCEUR')) {
            return 'images/coin/btc2.png'
        } else if (symbol.includes('LINK')) {
            return 'images/coin/link.png'
        }
        else {
            return 'images/coin/ada.png'
        }
    }

    componentDidMount() {



        const context = this.context

        this.setState({context: context})

        // setInterval(()=>{
        //     let trades = context.state.trades
        //
        // //     if (trades.length > 50) {
        // //         trades.pop()
        // //
        // //         context.setTrades(trades)
        // //
        // //         // console.log('context trades')
        // //         // console.log(context.state.trades)
        // //     }
        // // },1000)

        const socketMessageListener = msg => {

            $('#exchangeIconn').css({opacity: 1})

            setTimeout(()=>{
                $('#exchangeIconn').css({opacity: 0.7})
            },200)


            let tradeRaw = JSON.parse(msg.data)
            if (tradeRaw.data == null) return



            if (tradeRaw.table === "trade") {






                let t1 = tradeRaw.data[0]
                let t2 = tradeRaw.data[tradeRaw.data.length - 1]

                if (t2.symbol==='XBTUSD' && t2.price !== Prices.XBTUSD && Bitmex.lastPriceUpdate<Date.now()-500) {
                    Prices.XBTUSD = t2.price
                    document.title = t2.price.toFixed(1).replace('.0', '')
                    Bitmex.lastPriceUpdate = Date.now()
                }

                // if (this.state.context.state[t2.symbol]!== t2.price) {
                //     this.state.context.setPrice(t2.symbol, t2.price)
                // }

                // if (Prices[t2.symbol]!== t2.price) {
                //     Prices[t2.symbol] = t2.price
                // }


                // console.log(tradeRaw)

                let total = 0
                tradeRaw.data.forEach(t => total += t.size)

                let signedTrade = t1.side === 'Buy'?total:total*-1

                if (t1.symbol.includes('USD')||t1.symbol.includes('19')||t1.symbol.includes('20')) {
                    channelTrade.postMessage({
                        symbol: t1.symbol,
                        id: t1.id,
                        timestamp: Date.now(), //todo change to exact timestmp from ws
                        price: t2.price,
                        size: total,

                    })
                }


                let totall = 0

                // console.log('xbtusd: ' + Prices.XBTUSD)

                if (t1.symbol.includes('XBT')) {
                    // signedTrade = signedTrade
                } else if (t1.symbol.includes('ETHUSD')) {
                    // console.log('st: ' + signedTrade + ' price: ' + t1.price + ' new: ' + ((signedTrade*t1.price)*10000))



                    signedTrade = signedTrade* ((t1.price*.000001)*Prices.XBTUSD)

                } else if (t1.symbol.includes('XRPUSD')) {

                    signedTrade = signedTrade*((t1.price*0.0002)*Prices.XBTUSD)
                } else {
                    signedTrade = (signedTrade*t1.price)*Prices.XBTUSD
                    // console.log('set signed with ' + Prices.XBTUSD)
                }
                // else if (t1.symbol.includes('ETHUSD')) {
                //     signedTrade = (signedTrade*t1.price)
                // }

                if (true) {
                    // console.log(t1.symbol)
                    // if (t1.side === 'Sell') total *= -1

                    let sabs = Math.abs(signedTrade)

                    let t = [
                        1,
                        t1.symbol,
                        signedTrade,
                        t1.price,
                        TradeBuilder.getSlip(t2.price-t1.price, t1.symbol),
                        Date.now(),
                        sabs<1000?'class1':sabs<10000?'class2':sabs<100000?'class3':sabs<200000?'class35':sabs<500000?'class4':sabs<1000000?'class5':'class6',
                        TradeBuilder.getBg(signedTrade),
                        'images/exchange/bitmex.png',
                        Ticker.getCoinIcon(t1.symbol),
                        Formatter.getKformat(signedTrade, 0),
                        Formatter.commas(t1.price.toFixed(t1.price<0.01?8:t1.price<0.5?4:1)), //<1 for alts
                    ]


                    if (!t1.symbol.includes('USD')) {
                        t[12] = t1.symbol.includes('XBT') ? t1.symbol : (Formatter.getKformat(total, 0) + ' ' + t1.symbol)
                    } else if (t1.symbol.includes('XRPUSD')) {
                        t[12] = Formatter.getKformat(total, 0) + ' ' + t1.symbol
                    } else {
                        t[12] = ''
                    }



                    // this.beep(t)


                    // console.log('new trade ' + JSON.stringify(t))

                    // console.log('context got trade ' + JSON.stringify(t))
                    // console.log('instances:')
                    // console.log(Ticker.instances)

                    // let beeped = false

                    // console.log('\nt symbol: ' + t[1] + ' signed ' + t[2])

                    Ticker.instances.forEach((ticker)=>{

                        // console.log('ticker ' + ticker.state.id)

                        // console.log('bitmexOn: ' + ticker.state.bitmexOn)

                        // console.log('bitmex' + t[1] + 'On: ' + ticker.state['bitmex' + t[1] + 'On'])

                        if (ticker.state['bitmexOn']) {
                            //bitmex trade, ticker is bitmexOn..
                            if (ticker.state['bitmex' + t[1] + 'On']) {
                                // on for symbol..

                                if (Math.abs(t[2])>=ticker.state['bitmex' + t[1] + 'min']) {
                                    //above min..
                                    ticker.pushTrade(t)
                                }


                            }
                        }

                    })

                    // context.addTrade(t)
                    // channelBitmexTrade.postMessage(t)

                }


            } else if (tradeRaw.table === 'liquidation') {

                // console.log('\nliq msg:')
                // console.log(JSON.stringify(tradeRaw.action) + ' - ' + JSON.stringify(tradeRaw.data))


                for (let i = 0; i < tradeRaw.data.length; i++) {

                    // console.log("\n\nliq message " + tradeRaw.action + JSON.stringify(tradeRaw.data[i]))

                    let msgg = tradeRaw.data[i]

                    let liq = []

                    let s = parseFloat(msgg.leavesQty).toFixed(0)

                    liq.push({
                        exchangeName: "bitmex",
                        timestamp: Date.now(),
                        symbol: msgg.symbol,
                        id: msgg.orderID,
                        action: tradeRaw.action,
                        side: msgg.side === "Buy",
                        price: msgg.price,
                        firstPrice: msgg.price,
                        size: s,
                        update: "",
                        liq: true,
                        startSize: s,
                        highestAmount: s,
                        deleted: false,
                        startTime: Date.now(),
                        exchangeIcon: 'images/exchange/bitmex.png',
                        symbolIcon: Ticker.getCoinIcon(msgg.symbol),
                        usd: msgg.symbol.includes('XBT')?s:msgg.symbol.includes('ETHUSD')?s*((msgg.price*.000001)*Prices.XBTUSD) :msgg.symbol.includes('XRPUSD')?s*((msgg.price*.0002)*Prices.XBTUSD) : (s * msgg.price) * this.state.context.state.XBTUSD,
                    })

                    // console.log('set ' + msgg.symbol + ' to ' + msgg.symbol.includes('XBTUSD')?s:msgg.symbol.includes('ETHUSD')?s*2 : (s * msgg.price) * this.state.context.state.XBTUSD)

                    liq[0].highestUSD = liq[0].usd

                    // console.log("size: " + liq.size + " highestsize: " + liq.highestAmount)

                    // console.log('gonna send ' + JSON.stringify(liq))

                    Liqs.instances.forEach((liqs)=>{

                        // console.log('liq instance.. bitmexon? ' + liqs.state['bitmexOn'] )

                        // console.log('with sym ' + ('bitmex' + liq[0].symbol + 'On') + ' ---- ' + (liqs.state['bitmex' + liq[0].symbol + 'On']))

                        // console.log('ticker ' + ticker.state.id)

                        // console.log('bitmexOn: ' + ticker.state.bitmexOn)

                        // console.log('bitmex' + t[1] + 'On: ' + ticker.state['bitmex' + t[1] + 'On'])

                        if (liqs.state['bitmexOn']) {
                            //bitmex trade, ticker is bitmexOn..
                            if (liqs.state['bitmex' + liq[0].symbol + 'On']) {
                                // on for symbol..

                                liqs.pushMessage(liq)


                            }
                        }

                    })



                }


            }
        }

        const socketOpenListener = e => {
            console.log('mex open')
            this.setState({open: true})

            // SweetAlert.mini('bitmex ws: open', '', 'bottom', 'success', 700)
        }

        const socketCloseListener = e => {

            if (this.state.ws) {
                console.error('mex close')
                this.setState({open: false})
                // SweetAlert.mini('bitmex ws: close', '', 'bottom', 'error', 700)

            }

            if (this.state.close===true) {
                this.setState({close: false})
                return
            }

            if (this.state.closeButtonTime > Date.now()-1000) {
                return
            }

            setTimeout(()=>{

                this.setState({wsOpen: socketOpenListener})
                this.setState({wsMessage: socketMessageListener})
                this.setState({wsClose: socketCloseListener})
                if (Prices.savee.bitmexOn === true) {

                    this.setState({ws: new WebSocket('wss://www.bitmex.com/realtime?subscribe=trade,liquidation')})
                    this.state.ws.addEventListener('open', this.state.wsOpen)
                    this.state.ws.addEventListener('message', this.state.wsMessage)
                    this.state.ws.addEventListener('close', this.state.wsClose)
                }
            },1000)



        }


        if (this.state.off) {
            return
        }

            socketCloseListener()


    }




    render() {

        return (
            <div>

                <div id={'exchangeDetails'}

                    //  onMouseEnter={() => {
                    //      if (this.state.showSettings) {
                    //          $('.showEx').css({opacity: this.state.open ? 1 : 0.81})
                    //
                    //      }
                    //  }} onMouseLeave={() => {
                    // if (this.state.showSettings) {
                    //
                    //     $('.showEx').css({opacity: this.state.open ? 0.8 : 0.75})
                    // }}}

                    onMouseEnter={()=>{}}

                     style={{marginTop: -52, pointerEvents: this.state.showSettings?'all':'none',opacity: this.state.showSettings===true?1:0 }} className={this.state.showSettings===true?'showEx':'dontShowEx'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <img src={'images/exchange/bitmex.png'} id={'exchangeIconn'} alt={'bitmex'}    style={{
                            height: 22,
                            opacity: this.state.open?0.8:0.5,
                            width: 22,
                            padding: 2,
                            transition: '0.5s',
                            margin: 1,
                            // border: this.state.ws !== null && this.state.ws.OPEN ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                        }}/>

                        <span id={'tittleee'} className={'hoverrActive'} style={{transition: '0.5s'}} >bitmex</span>

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


                                    this.state.context.set({bitmexOn: e.target.checked})
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


                <img onClick={(e)=>{
                    // e.stopPropagation()
                    this.setState({showSettings: !this.state.showSettings})
                    // if (this.state.close) {
                    //
                    // }
                    // this.setState({close: true})
                    // this.state.ws.close()
                }} src={this.state.icon} id={'bitmexBottomIcon'} alt={'bitmex'} style={{
                    height: 15,
                    width: 15,
                    padding: 2,
                    margin: 1,
                    background: 'black',
                    border: this.state.open === true ? '2px ridge rgba(95,255,66,0.8)' : '2px ridge rgba(255,95,66,0.8)'
                }}/>
            </div>
        )
    }


}

export default onClickOutside(Bitmex)
