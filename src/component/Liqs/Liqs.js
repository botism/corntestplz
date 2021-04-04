import React from 'react'
import './Ticker.css'
import {BaseComponent} from "../BaseComponent"
import Context from "../../data/Context"
import {Formatter} from "../../util/Formatter"


import UIfx from 'uifx'
import sell1 from '../../sounds/1.wav'
import sell2 from '../../sounds/4.wav'

import buy1 from '../../sounds/5.wav'
import buy2 from '../../sounds/7.wav'
import buy3 from '../../sounds/8.wav'





import Toggle from 'react-toggle'

import 'rc-input-number/assets/index.css'
import InputNum from 'rc-input-number'

// import $ from 'jquery'
import {TradeBuilder} from "../../exchange/TradeBuilder"
import $ from "jquery"



import {Ticker} from '../Ticker/Ticker'
import {Prices} from "../../data/Prices"


export class Liqs extends React.Component {

    static contextType = Context

    static instances = []

    static pulled = false

    static beeps = {
        buy: [
            new UIfx(buy1),
            new UIfx(buy2)
        ],
        sell: [
            new UIfx(sell1),
            new UIfx(sell2)
        ]
    }

    Table = ({data, arrowsOn}) => {
        return (<table className="table1"><this.Row data={data} arrowsOn={arrowsOn}/></table>)
    }

    Row = ({data, arrowsOn}) => {

        // console.log(Prices.XBTUSD)

        const row = data&&data[0] ? data.map((data, i) =>
            <tr className={"traderow notranslate " + getClassName(data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD))} key={i} style={{display: (data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD))>this.state[data.exchangeName+data.symbol+'min']?'flex':'none'}} bgcolor={TradeBuilder.getBg((data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD))*(data.side===true?1:-1))}>

                {/*<td>{'id ' + data.id.slice(0,3) + ' size ' + data.size + ' symbol ' + data.symbol + ' highest ' + data.highestAmount + ' deleted ' + data.deleted }</td>*/}

                <td className={'rowExchange'} style={{marginRight: 2, marginLeft: 2}}><img id={Math.abs(data.size)>0?'arthuriconspin':''} src={Math.abs(data.size>0)?'images/arthursmall.png':data.exchangeIcon} alt={'bitmex'}
                                                                                           height={20} width={20}/></td>

                <td className={'rowCoin'}><img style={{verticalAlign: 'top'}} src={data.symbolIcon} alt={'btc'} height={16}
                                               width={16}/></td>


                <td className={'rowArrow'}><div style={{display: 'flex', justifyContent: 'center', fontSize: 12}}>{arrowsOn===true?(data.side===true?'▲':'▼'):''}</div></td>


                <td className={'rowSize hoverhide'} style={{marginLeft: 4, paddingTop: 1}}>{Formatter.getKformat(data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD), 0)} <span style={{fontSize: 'small', opacity: 0.63, height: 30, wordWrap: 'hide'}}>liq.</span></td>

                <td className={'rowSize hovershow'} style={{marginLeft: 4, paddingTop: 1}}>{'$'+parseInt(data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span style={{fontSize: 'small', opacity: 0.63, height: 30, wordWrap: 'hide'}}>liq.</span></td>

                {/*<td className={'rowSize hovershow'} style={{*/}
                {/*    marginLeft: 2,*/}
                {/*    paddingTop: 1*/}
                {/*}}>{'$' + ((data.symbol.includes('XBT')?data.highestAmount:data.symbol.includes('ETHUSD')?data.highestAmount*((data.price*.000001)*(data.xbt?data.xbt:Prices.XBTUSD)) : (data.highestAmount * data.price) * (data.xbt?data.xbt:Prices.XBTUSD)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</td>*/}

                {/*<td style={{marginLeft: 7, fontSize: 10, fontWeight: 700, fontFamily: 'monospace',  paddingRight: 2, borderRadius: 5, opacity: 0.81}}>{data[4]}</td>*/}

                <td style={{marginLeft: 'auto'}}>{}</td>



                <td style={{fontSize: 12, paddingRight: 2, paddingLeft: 2, display: 'flex', fontWeight: 'bold'}}>{data.size>0?('active: ' + Formatter.getKformat(data.size,0) + (data.symbol==='XBTUSD'?'':'/' + Formatter.getKformat(data.highestAmount,0))):''}</td>

                {/*/!*<td style={{fontSize: 12}}>{data[1]!=='XBTUSD'?'alt':(Math.abs(data[2])/data[3]).toFixed(1) + ' btc'}</td>*!/*/}

                <td className={'rowPrice'} style={{fontWeight: 'bold', paddingLeft: 2, paddingRight: 2}}>{data.size===0?data.symbol.includes('XBT')?'':Formatter.getKformat(data.highestAmount, 0):''}</td>

                <td className={'rowPrice'} style={{fontSize: 12}}>{data.symbol}</td>

                <td style={{paddingLeft: 2, paddingRight: 2, paddingBottom: 1, opacity: 0.58, fontSize: 8}}>{data.size>0||data.display!==''?'@':''}</td>


                <td className={'rowPrice'} style={{}}>{
                    // data.firstPrice!==data.price?(data.firstPrice + ' > ' + data.price):
                    data.price}</td>



                <td className={'rowTime'} style={{paddingLeft: 4, paddingRight: 4}}>{TradeBuilder.getTime(data.timestamp)}</td>

                {/*<td>{JSON.stringify(data)}</td>*/}
                {/*<td id="tradeIcon">{'@'}</td>*/}
                {/*<td id="tradeSize">{'10k'}</td>*/}
                {/*<td width="100%" id="spacer">{""}</td>*/}
                {/*<td id="slip">{'+1'}</td>*/}
                {/*<td id="btcAmt">{'5 btc'}</td>*/}
                {/*<td id="atSign">{'@'}</td>*/}
                {/*<td id="tradePrice">{'10405.0'}</td>*/}
                {/*<td id="elapsedTime" width="100%">{'<1m'}</td>*/}
            </tr>
        ) : <div style={{display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 20, opacity: 0.2, fontWeight: 'bold'}}>liqs</div>

        return (<tbody id="tbodyy">{row}</tbody>)


    }


    static getCoinIcon = (symbol) => {

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

    static exchangeCoins = {
        bitmex: [
            'XBTUSD', 'XBTZ19', 'XBTH20',
            'ETHUSD', 'ETHZ19',
            'LTCZ19',
            'BCHZ19',
            'XRPZ19', 'XRPH20', 'XRPUSD',
            'ADAZ19',
            'EOSZ19',
            'TRXZ19'
        ],

    }

    static getStartingProps = () => {

        let exchangeCoins = {
            bitmex: [
                'XBTUSD', 'XBTZ19', 'XBTH20',
                'ETHUSD', 'ETHZ19',
                'LTCZ19',
                'BCHZ19',
                'XRPZ19', 'XRPH20', 'XRPUSD',
                'ADAZ19',
                'EOSZ19',
                'TRXZ19'
            ],
        }

        let props = {
            id: 'new',
            trades: [],

        }

        Object.keys(exchangeCoins).forEach(key => {
            props[key+'On'] = false
            exchangeCoins[key].forEach((symbol)=>{
                props[key+symbol+'On'] = false
                props[key+symbol+'min'] = 0
            })
        })

        // console.log('liq props: ' + JSON.stringify(props))

        return(props)

    }


    constructor(props) {
        super(props)

        Liqs.instances.push(this)

        this.onTogChange = this.onTogChange.bind(this)


        // console.log('tic props')
        // console.log(props)

        this.up = this.up.bind(this)

        this.state = {

            ...props,

            // trades: [],
            // trades: [
            //     {}
            //     // {
            //     //     exchangeName: "bitmex",
            //     //     symbol: 'XBTUSD',
            //     //     id: 'idddd',
            //     //     action: 'insert',
            //     //     side: true,
            //     //     price: 9000,
            //     //     firstPrice: 8000,
            //     //     size: 500,
            //     //     update: "",
            //     //     liq: true,
            //     //     startSize: 50000,
            //     //     highestAmount: 50000,
            //     //     deleted: false,
            //     //     startTime: Date.now(),
            //     //     exchangeIcon: 'images/exchange/bitmex.png',
            //     //     symbolIcon: 'images/coin/btc2.png',
            //     //     timestamp: Date.now()
            //     // },
            //     // {
            //     //     exchangeName: "bitmex",
            //     //     symbol: 'XBTUSD',
            //     //     id: 'idddd',
            //     //     action: 'insert',
            //     //     side: true,
            //     //     price: 9000,
            //     //     firstPrice: 8900,
            //     //     size: 500,
            //     //     update: "",
            //     //     liq: true,
            //     //     startSize: 50000,
            //     //     highestAmount: 1000000,
            //     //     deleted: false,
            //     //     startTime: Date.now(),
            //     //     exchangeIcon: 'images/exchange/bitmex.png',
            //     //     symbolIcon: 'images/coin/btc2.png',
            //     //     timestamp: Date.now()-10000
            //     // }
            // ],

            id: props.id,


            lastTrade: 'x',

            exchangeSelected: 'none',

            value: 10000,

            // trades: []

        }

        // console.log(this.state)


        // console.log('bitmexbtusdon: ' + this.state.bitmexXBTUSDOn)
    }




    pushMessage = (liq) => {

        // console.log('liqs id ' + this.state.id + ' got liq ' + JSON.stringify(liq) )

        // return


        if (liq[0].action === "insert") {

            if (liq[0].side) {
                Ticker.beeps.buy[1].play()
                setTimeout(()=>{Ticker.beeps.buy[1].play()}, 100)
            } else {
                Ticker.beeps.sell[1].play()
                setTimeout(()=>{Ticker.beeps.sell[1].play()}, 100)

            }


            if (this.state.trades == null) {
                // this.state.trades = liq
                this.setState({trades: liq})
                // console.log('start liq, trades: ' + JSON.stringify(this.state.trades))
            } else {
                // this.state.trades = liq.concat(this.state.trades)
                this.setState({trades: liq.concat(this.state.trades)})
                // console.log('insert, trades: ' + JSON.stringify(this.state.trades))

                // this.tradeBeep(liq[0])

            }
        } else if (liq[0].action === "update") {
            for (let i = 0; i < this.state.trades.length; i++) {
                if (this.state.trades[i].id === liq[0].id) {
                    // console.log('\nsame id.. ' + JSON.stringify(liq[0]))
                    console.log('\n got update id ' + liq[0].id.slice(0,5) + ' size: ' + liq[0].size)
                    var old = [...this.state.trades];
                    let oldsize = parseInt(old[i].size)
                    // let oldusd = old[i].usd
                    if (liq[0].size !== 0 && !isNaN(liq[0].size)) {
                        console.log('size not null, update sizes')
                        // this.state.trades[i].size = liq.size
                        old[i].size = parseInt(liq[0].size)
                        // old[i].usd = liq[0].usd

                        console.log('oldsize: ' + oldsize + ' newsize: ' + old[i].size + ' >: ' + (old[i].size > oldsize))
                        // console.log('new size: ' + old[i].size + ' new usd: '  + old[i].usd)

                        this.setState({trades: old})

                        // console.log('updated1, trades: ' + JSON.stringify(this.state.trades))
                    }
                    if (!isNaN(liq[0].size) && (old[i].size > oldsize) && !isNaN(oldsize)) {

                        console.log('size higher than oldsize, update highest' )

                        old[i].highestAmount = parseInt(old[i].highestAmount) + (parseInt(old[i].size)-parseInt(oldsize))

                        // console.log('set highestUSD to ' + parseInt(old[i].highestUSD) + ' + ( ' + parseInt(old[i].usd) + ' - ' + parseInt(oldusd) )

                        // old[i].highestUSD = parseInt(old[i].highestUSD) + (parseInt(old[i].usd)-parseInt(oldusd))

                        // old = old.splice(i, 1)[0].concat(old)

                        this.setState({trades: old})

                        console.log('updated ' + JSON.stringify(old[i]))
                        console.log('new highestamt: ' + old[i].highestAmount)

                        // console.log('updated2, trades: ' + JSON.stringify(this.state.trades))
                    }
                    if (liq[0].price > 0 && !isNaN(liq[0].price)) {
                        // this.state.trades[i].price = liq.price

                        let old = this.state.trades.slice()
                        old[i].price = liq[0].price
                        this.setState({trades: old})

                        // console.log('updated3, trades: ' + JSON.stringify(this.state.trades))

                    }

                    // console.log(liquidations[i].id + " updated, newsize: " + liquidations[i].size + " highestsize: " + liquidations[i].highestAmount)

                    // if (liquidations[i].highestAmount > 1000000) {
                    //
                    //     let liqToTop = [liquidations[i]]
                    //     console.log("moving liq to top: " + JSON.stringify(liqToTop))
                    //     liquidations = liquidations.splice(i, 1)
                    //     liquidations = liqToTop.concat(liquidations)
                    //
                    //     console.log("new liquidations: " + JSON.stringify(liquidations))
                    // }
                }
            }
        } else if (liq[0].action === "delete") {
            for (let i = 0; i < this.state.trades.length; i++) {
                if (this.state.trades[i].id === liq[0].id) {
                    // liquidations[i].deleted = true
                    // liquidations[i].size = 0
                    // liquidations[i].endTime = Date.now()

                    let old = this.state.trades.slice()

                    old[i].deleted = true
                    old[i].size = 0
                    old[i].endTime = Date.now()
                    this.setState({trades: old})

                    // console.log('deleted, trades: ' + JSON.stringify(this.state.trades))

                }
            }
        }

    }

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            }
        })
    }

    changeId = (id) => {
        this.setState({id: id})
        // console.log('new tic id ' + this.state.id)
    }

    componentDidMount() {

        // console.log('liqs start ' + JSON.stringify(this.state.trades))

        this.setState({selectedSymbol: null})

        setInterval(() => {
            if (this.state.trades&&this.state.trades.length > 200) {
                this.setState({trades: this.state.trades.slice(0, 150)})
            }
        }, 1000)

        // setTimeout(()=>{this.setState({trades: })}, 1000)


        const context = this.context

        this.setState({context: context})

        // console.log('mount cont: ')

        // console.log(context.state)




        if (Liqs.pulled === false) {

            Liqs.pulled = true

            setTimeout(async ()=>{

                $.get('https://corn-cache1.herokuapp.com/all/liqs', async (liqs)=>{
                    console.log('got:')
                    console.log(liqs)

                    Liqs.instances.forEach((liqsC)=>{

                        console.log('instance ' + liqsC.state.id)

                        let liqhold = []

                        liqs.forEach((t)=>{



                            if (liqsC.state['bitmexOn']) {
                                //bitmex trade, ticker is bitmexOn..
                                // console.log('symbol: ' + t.symbol + ' state: ' + liqsC.state['bitmex' + t.symbol + 'On'])
                                if (liqsC.state['bitmex' + t.symbol + 'On']) {
                                    // on for symbol..

                                    if (Math.abs(t.highestAmount)>=liqsC.state['bitmex' + t.symbol + 'min']) {
                                        //above min..
                                        liqhold.unshift(t)
                                        // if (this.state.trades == null) {
                                        //     // this.state.trades = liq
                                        //     // liqsC.setState({trades: [t]})
                                        //
                                        //     // console.log('start liq, trades: ' + JSON.stringify(this.state.trades))
                                        // } else {
                                        //     // this.state.trades = liq.concat(this.state.trades)
                                        //     // liqsC.setState({trades: [t].concat(liqsC.state.trades)})
                                        //     // console.log('insert, trades: ' + JSON.stringify(this.state.trades))
                                        //
                                        //     // this.tradeBeep(liq[0])
                                        //
                                        // }
                                    }


                                }
                            }

                        })

                        liqsC.setState({trades: liqhold})
                    })
                })
            },300)

        }




    }

    up() {
        // console.log('up ' + this.state.count)
        this.setState({count: this.state.count + 1})

        // console.log('count: ' + this.state.count)
    }

    onTogChange = (e, name) => {
        let n = name + 'On'
        // console.log('set ' + n + ' to ' + e.target.checked)
        this.setState({[n]: e.target.checked})


    }

    onChange = (v, n) => {
        console.log('onChange: ' + v + ' n: ' + n)
        this.setState({[n]: v})
    }

    SymbolItem = ({exchangeName, symbol}) => {
        return (
            <div className={'settingItemm'} style={{boxShadow:this.state.symbolSelected === (exchangeName+symbol) ? ('0px 0px 5px 3px #ff8b00'):('0px 0px 0px 0px red'),margin: 8, opacity: this.state[exchangeName+symbol+'On'] === true ? 0.81 : 0.4}}>
                <div id={'symbolTitle'}
                     style={{
                         opacity: this.state[exchangeName + symbol + 'On'] ? 1 : 0.9,
                         borderRadius: '4px', border: '0px solid #ff8b00'
                     }} >
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{display: 'flex', padding: 4, width: '100%'}}
                             onClick={() => {if (this.state[exchangeName+symbol+'On']===false) {this.setState({[exchangeName+symbol+'On']: true})}
                                 this.setState({symbolSelected: this.state.symbolSelected === (exchangeName+symbol) ? 'none' : (exchangeName+symbol)})}}>

                            <img src={Liqs.getCoinIcon(symbol)} alt={'-'} height={20} width={20}
                                 style={{padding: 2}}/>
                            <span>{symbol}</span>
                            <span style={{marginLeft: 8, marginTop: 1, fontSize: 14, opacity: 0.9}}><span
                                style={{opacity: 0.6}}>{'≧ $'}</span>{Formatter.getKformat(this.state[exchangeName + symbol + 'min'], 0)}</span>
                        </div>
                        <div style={{marginLeft: 'auto', paddingRight: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                            <label style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Toggle
                                    defaultChecked={this.state[exchangeName + symbol + 'On']}
                                    checked={this.state[exchangeName + symbol + 'On']}
                                    className='bitmexOn'
                                    icons={false}
                                    onChange={(e) => {
                                        if (e.target.checked===false) {
                                            if (this.state.symbolSelected===(exchangeName+symbol)) {
                                                this.setState({symbolSelected: 0})
                                            }
                                        }
                                        this.onTogChange(e, exchangeName + symbol)
                                    }}/>
                            </label>

                        </div>
                    </div>

                    <div id={'symbolBottom'} style={{
                        overflow: this.state.symbolSelected === (exchangeName+symbol) ? 'visible' : 'hidden',
                        height: (this.state.symbolSelected === (exchangeName+symbol) ? '40px' : '0px'),
                        padding: this.state.symbolSelected === (exchangeName+symbol) ? '8px' : '0px',
                        opacity: this.state[exchangeName+symbol + 'On'] ? 1 : 0.2
                    }}>
                        <InputNum
                            min={0}
                            max={10000000}
                            step={10000}
                            id={exchangeName + symbol + 'min'}
                            value={this.state[exchangeName + symbol + 'min']}
                            style={{width: '100%', fontSize: 18, padding: 4, border: '2px ridge #ff8b00'}}
                            onChange={(v) => {
                                this.onChange(v, exchangeName + symbol + 'min')
                            }}
                            formatter={value => value.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")}
                        />

                    </div>

                </div>
            </div>

        )
    }

    SettingsItem = ({exchangeName, symbols}) => {

        return (
            <div className={'settingItemm ' + (this.state[exchangeName+'On']?'onnn':'offf')} style={{margin: this.state.exchangeSelected === (exchangeName) ? 8:4,boxShadow:this.state.exchangeSelected === (exchangeName) ? ('0px 0px 5px 2px #ffc60b'):('0px 0px 0px 0px red')}}>
                <div id={'exchangeTitle'} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', padding: 4, width: '100%'}} onClick={() => {
                        if (this.state[exchangeName+'On']===false) {this.setState({[exchangeName+'On']: true})}
                        this.setState({exchangeSelected: this.state.exchangeSelected === exchangeName ? 'none' : exchangeName})
                    }}>

                        <img src={'images/exchange/' + exchangeName + '.png'} alt={'-'} height={16} width={20}
                             style={{padding: 2}}/>
                        <span>{exchangeName}</span>
                    </div>
                    <div style={{marginLeft: 'auto', paddingRight: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                        <label style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Toggle
                                defaultChecked={this.state[exchangeName + 'On']}
                                checked={this.state[exchangeName + 'On']}
                                className='bitmexOn'
                                icons={false}
                                onChange={(e) => {
                                    if (e.target.checked===false) {
                                        if (this.state.exchangeSelected===exchangeName) {
                                            this.setState({exchangeSelected: 0})
                                        }
                                    }
                                    this.onTogChange(e, exchangeName)
                                }}/>
                        </label>

                    </div>
                </div>

                <div id={'bitmexExpand'} style={{
                    overflowY: this.state.exchangeSelected === exchangeName ? 'scroll' : 'hidden',
                    height: this.state.exchangeSelected === exchangeName ? '36vh' : 0,
                    opacity: this.state[exchangeName + 'On'] ? 1 : 0.2,
                    margin: this.state.exchangeSelected === exchangeName ? 4 : 0,

                }}>

                    {symbols.map((symbol) => {
                        return <this.SymbolItem exchangeName={exchangeName} symbol={symbol.symbol}/>
                    })}

                </div>
            </div>
        )
    }

    render() {

        // console.log('ren! count ' + this.state.count)

        // let count = this.state.count

        let state = {...this.state}

        state.glContainer = null
        state.glEventHub = null

        let exchangeSettings = []

        Object.keys(Liqs.exchangeCoins).forEach(key => {

            let symbols = []

            Liqs.exchangeCoins[key].forEach((symbol)=>{symbols.push({symbol: symbol})})

            exchangeSettings.push((<this.SettingsItem exchangeName={key} symbols={symbols} />))
        })


        return (
            <BaseComponent name={'liqs'} propss={{
                ...state


            }} comp={
                <Context.Consumer>
                    {context => {


                        return (
                            <div id={'Liqs'} onClick={this.up}>

                                <this.Table data={this.state.trades} arrowsOn={context.state.arrowsOn}/>

                            </div>
                        )



                        // if (this.state.trades.length>0) {
                        //     return (
                        //         <div id={'Liqs'} onClick={this.up}>
                        //             <this.Table data={this.state.trades}/>
                        //         </div>
                        //     )
                        // } else {
                        //     return (
                        //         <div id={'startChart'}>
                        //             loading liquidations..
                        //         </div>
                        //     )
                        // }
                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 2, height: 'fit-content', overflow: 'auto'}}>

                    {exchangeSettings}

                    {/*<this.SettingsItem exchangeName={'bitmex'}*/}
                    {/*                   symbols={[{symbol: 'XBTUSD'},*/}
                    {/*                       {symbol: 'XBTU19'},*/}
                    {/*                       {symbol: 'XBTZ19'},*/}
                    {/*                       {symbol: 'ETHUSD'},*/}
                    {/*                       {symbol: 'ETHU19'},*/}
                    {/*                       {symbol: 'LTCU19'},*/}
                    {/*                       {symbol: 'XRPU19'},*/}
                    {/*                       {symbol: 'BCHU19'},*/}
                    {/*                       {symbol: 'ADAU19'},*/}
                    {/*                       {symbol: 'EOSU19'},*/}
                    {/*                       {symbol: 'TRXU19'},*/}


                    {/*                       ]}/>*/}

                    {/*<this.SettingsItem exchangeName={'bitfinex'} symbols={[{symbol: 'BTCUSD'}]}/>*/}

                </div>
            )} onChangeId={this.changeId}/>
        )
    }


}



const getClassName = (amt) => {
    let sabs = Math.abs(amt)
    return sabs<1000?'class1':sabs<10000?'class2':sabs<100000?'class3':sabs<200000?'class35':sabs<500000?'class4':sabs<1000000?'class5':sabs<10000000?'class6':'class7'
}




