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

import {Prices} from '../../data/Prices'


import $ from 'jquery'


import Toggle from 'react-toggle'

import 'rc-input-number/assets/index.css'
import InputNum from 'rc-input-number'

// import $ from 'jquery'
import {TradeBuilder} from "../../exchange/TradeBuilder"
import {SweetAlert} from "../../util/SweetAlert"
import {ContextProvider} from "../../data/ContextProvider"
import * as Swal from "sweetalert2"


export class Ticker extends React.Component {

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


    static getCoinIcon = (symbol) => {

        if (symbol.slice(0, 3) === 'XBT' || symbol.includes('BTCUSD') || symbol.includes('BTCPERP') | symbol.includes('BTC27') || symbol.includes('BTCUSDT') || symbol.includes('BTC-USD')) {
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
        } else {
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

        bitfinex: [
            'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHEUR', 'ETHBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'EOSUSD', 'EOSBTC', 'XRPUSD', 'XRPBTC', 'BSVUSD', 'BSVBTC', 'NEOUSD', 'NEOBTC',
            'XMRUSD', 'XMRBTC', 'LEOUSD', 'LEOBTC', 'OMGUSD', 'OMGBTC', 'IOTAUSD', 'IOTABTC', 'DASHUSD', 'DASHBTC', 'ZECUSD', 'ZECBTC',
            'FTTUSD', 'TRXUSD', 'TRXBTC', 'FUNUSD', 'FUNBTC',


        ],
        coinbase: [
            'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHBTC', 'XRPUSD', 'XRPBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'LINKUSD'
        ],
        bitstamp: [
            'BTCUSD', 'ETHUSD'
        ],
        bybit: [
            'BTCUSD', 'ETHUSD', 'EOSUSD', 'XRPUSD'
        ],
        deribit: [
            'BTCPERPETUAL', 'BTC27DEC19', 'BTC27MAR20', 'ETHPERPETUAL'
        ],
        binance: [
            'BTCUSDT', 'ETHUSDT'
        ],
        FTX: [
            'BTCPERP', 'ETHPERP'
        ],
        OKEx: [
            'BTCUSDT', 'BTCUSD191227', 'BTCUSD191101', 'BTCUSD191025', 'BTCUSDSWAP',
            'ETHUSDT', 'ETHUSD191227', 'ETHUSD191101', 'ETHUSD191025', 'ETHUSDSWAP'
        ],
        // huobi: [
        //     'BTCUSDT', 'ETHUSDT'
        // ],
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

            bitfinex: [
                'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHEUR', 'ETHBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'EOSUSD', 'EOSBTC', 'XRPUSD', 'XRPBTC', 'BSVUSD', 'BSVBTC', 'NEOUSD', 'NEOBTC',
                'XMRUSD', 'XMRBTC', 'LEOUSD', 'LEOBTC', 'OMGUSD', 'OMGBTC', 'IOTAUSD', 'IOTABTC', 'DASHUSD', 'DASHBTC', 'ZECUSD', 'ZECBTC',
                'FTTUSD', 'TRXUSD', 'TRXBTC', 'FUNUSD', 'FUNBTC',
            ],
            coinbase: [
                'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHBTC', 'XRPUSD', 'XRPBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'LINKUSD'

            ],
            bitstamp: [
                'BTCUSD', 'ETHUSD'
            ],
            bybit: [
                'BTCUSD', 'ETHUSD', 'EOSUSD', 'XRPUSD'
            ],
            deribit: [
                'BTCPERPETUAL', 'BTC27DEC19', 'BTC27MAR20', 'ETHPERPETUAL'
            ],
            binance: [
                'BTCUSDT', 'ETHUSDT'
            ],
            FTX: [
                'BTCPERP', 'ETHPERP'
            ],
            OKEx: [
                'BTCUSDT', 'BTCUSD191227', 'BTCUSD191101', 'BTCUSD191025', 'BTCUSDSWAP',
                'ETHUSDT', 'ETHUSD191227', 'ETHUSD191101', 'ETHUSD191025', 'ETHUSDSWAP'
            ],
            // huobi: [
            //     'BTCUSDT', 'ETHUSDT'
            // ],
        }

        let props = {
            id: 'new',
            trades: [],
            history: 200
        }

        Object.keys(exchangeCoins).forEach(key => {
            props[key + 'On'] = false
            exchangeCoins[key].forEach((symbol) => {
                props[key + symbol + 'On'] = false
                props[key + symbol + 'min'] = 5000
            })
        })

        // console.log('props: ' + JSON.stringify(props))

        return (props)

    }


    constructor(props) {
        super(props)


        // console.log('new ticker ' + JSON.stringify(props.trades))

        this.onTogChange = this.onTogChange.bind(this)


        // console.log('tic props')
        // console.log(props)

        this.up = this.up.bind(this)

        this.state = {

            ...props,
            //
            // trades: [
            //     // {}
            // ],

            // trades: [],

            id: props.id,


            lastTrade: 'x',

            exchangeSelected: 'none',

            value: 10000,

            // trades: []

        }

        // console.log('construc addd %%%%%%%%%%%%%%')

        Ticker.instances.push(this)

        // console.log('instances: ' )
        // console.log(Ticker.instances)


        // console.log('bitmexbtusdon: ' + this.state.bitmexXBTUSDOn)
    }


    pushStartTrades = (trades) => {
        this.setState({trades: trades})
    }

    pushTrade = (trade, start) => {

        // console.log('push ' + this.state.id)

        var trades = this.state.trades

        // console.log('trades0 ' + JSON.stringify(trades[0]))
        trades.unshift(trade)
        this.setState({trades: trades})
        // console.log('new state0 ' + JSON.stringify(this.state.trades[0]))

        // SweetAlert.mini('soundon ' + this.state.context.getSound(), '', 'center', '', 2400 )

        if (!start && this.state.context.getSound() === true) {

            if (trade[2] > 500000) {
                Ticker.beeps.buy[1].play()
            } else if (trade[2] > 50000) {
                Ticker.beeps.buy[0].play()
            }

            if (trade[2] < -500000) {
                Ticker.beeps.sell[1].play()
            } else if (trade[2] < -50000) {
                Ticker.beeps.sell[0].play()
            }

        }

        // Ticker.beeps.buy[0].play()

        // console.log('push ' + JSON.stringify(trade))

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

    exchange = [
        '',
        'bitmex',
        'bitfinex',
        'coinbase',
        'bitstamp',
        'bybit',
        'deribit',
        'binance',
        'FTX',
        'OKEx',
        'huobi'

    ]

    componentDidMount() {

        this.setState({selectedSymbol: null})

        setInterval(async () => {
            if (this.state.trades && this.state.trades.length > 200) {
                this.setState({trades: this.state.trades.slice(0, 200)})
            }
        }, 1200)

        // setTimeout(()=>{this.setState({trades: })}, 1000)


        const context = this.context

        this.setState({context: context})

        // console.log('mount cont: ')

        // console.log(context.state)


        if (Ticker.pulled === false) {

            Ticker.pulled = true


            setTimeout(async () => {

                // SweetAlert.mini('loading...', '','center', '', 1700)
                Swal.fire({
                    // type: 'success',
                    position: 'center',
                    // icon: 'success',
                    title: '🌽',
                    showConfirmButton: false,
                    timer: 2000,
                    opacity: 0.2,
                    border: '2px solid white',
                    // imageUrl: 'images/loading2.gif'
                    background: '#25282e url(/images/loading2.gif) no-repeat',
                    backgroundRepeat: 'no-repeat',
                    padding: 160,
                    width: 400,


                })

                $.get('https://corn-cache1.herokuapp.com/all/trades', async (trades) => {
                    // console.log('got:')
                    // console.log(trades)

                    Ticker.instances.forEach((ticker) => {

                        let holdd = []

                        trades.forEach((t) => {

                            // console.log('push trade ' + JSON.stringify(t))

                            if (ticker.state[this.exchange[t[0]] + 'On']) {
                                //bitmex trade, ticker is bitmexOn..
                                if (ticker.state[this.exchange[t[0]] + t[1] + 'On']) {
                                    // on for symbol..

                                    if (Math.abs(t[2]) >= ticker.state[this.exchange[t[0]] + t[1] + 'min']) {
                                        //above min..
                                        // ticker.pushTrade(t, true)
                                        holdd.unshift(t)
                                    }


                                }
                            }

                        })

                        ticker.pushStartTrades(holdd)

                    })


                })
            }, 0)

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
            <div className={'settingItemm'} style={{
                boxShadow: this.state.symbolSelected === (exchangeName + symbol) ? ('0px 0px 5px 3px #ff8b00') : ('0px 0px 0px 0px red'),
                margin: 8,
                opacity: this.state[exchangeName + symbol + 'On'] === true ? 0.81 : 0.4
            }}>
                <div id={'symbolTitle'}
                     style={{
                         opacity: this.state[exchangeName + symbol + 'On'] ? 1 : 0.9,
                         borderRadius: '4px', border: '0px solid #ff8b00'
                     }}>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{display: 'flex', padding: 4, width: '100%'}}
                             onClick={() => {
                                 if (this.state[exchangeName + symbol + 'On'] === false) {
                                     this.setState({[exchangeName + symbol + 'On']: true})
                                 }
                                 this.setState({symbolSelected: this.state.symbolSelected === (exchangeName + symbol) ? 'none' : (exchangeName + symbol)})
                             }}>

                            <img src={Ticker.getCoinIcon(symbol)} alt={'-'} height={20} width={20}
                                 style={{padding: 2}}/>
                            <span>{symbol}</span>
                            <span style={{marginLeft: 8, marginTop: 1, fontSize: 14, opacity: 0.9}}><span
                                style={{opacity: 0.6}}>{'≧ $'}</span>{Formatter.getKformat(this.state[exchangeName + symbol + 'min'], 0)}</span>
                        </div>
                        <div style={{
                            marginLeft: 'auto',
                            paddingRight: 7,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>

                            <label style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Toggle
                                    defaultChecked={this.state[exchangeName + symbol + 'On']}
                                    checked={this.state[exchangeName + symbol + 'On']}
                                    className='bitmexOn'
                                    icons={false}
                                    onChange={(e) => {
                                        if (e.target.checked === false) {
                                            if (this.state.symbolSelected === (exchangeName + symbol)) {
                                                this.setState({symbolSelected: 0})
                                            }
                                        }
                                        this.onTogChange(e, exchangeName + symbol)
                                    }}/>
                            </label>

                        </div>
                    </div>

                    <div id={'symbolBottom'} style={{
                        overflow: this.state.symbolSelected === (exchangeName + symbol) ? 'visible' : 'hidden',
                        height: (this.state.symbolSelected === (exchangeName + symbol) ? '40px' : '0px'),
                        padding: this.state.symbolSelected === (exchangeName + symbol) ? '8px' : '0px',
                        opacity: this.state[exchangeName + symbol + 'On'] ? 1 : 0.2
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
            <div className={'settingItemm ' + (this.state[exchangeName + 'On'] ? 'onnn' : 'offf')} style={{
                margin: this.state.exchangeSelected === (exchangeName) ? 8 : 4,
                boxShadow: this.state.exchangeSelected === (exchangeName) ? ('0px 0px 5px 2px #ffc60b') : ('0px 0px 0px 0px red')
            }}>
                <div id={'exchangeTitle'} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', padding: 4, width: '100%'}} onClick={() => {
                        if (this.state[exchangeName + 'On'] === false) {
                            this.setState({[exchangeName + 'On']: true})
                        }
                        this.setState({exchangeSelected: this.state.exchangeSelected === exchangeName ? 'none' : exchangeName})
                    }}>

                        <img src={'images/exchange/' + exchangeName + '.png'} alt={'-'} height={16} width={20}
                             style={{padding: 2}}/>
                        <span>{exchangeName}</span>
                    </div>
                    <div style={{
                        marginLeft: 'auto',
                        paddingRight: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>

                        <label style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Toggle
                                defaultChecked={this.state[exchangeName + 'On']}
                                checked={this.state[exchangeName + 'On']}
                                className='bitmexOn'
                                icons={false}
                                onChange={(e) => {
                                    if (e.target.checked === false) {
                                        if (this.state.exchangeSelected === exchangeName) {
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

        Object.keys(Ticker.exchangeCoins).forEach(key => {

            let symbols = []

            Ticker.exchangeCoins[key].forEach((symbol) => {
                symbols.push({symbol: symbol})
            })

            exchangeSettings.push((<this.SettingsItem exchangeName={key} symbols={symbols}/>))
        })


        return (
            <BaseComponent name={'ticker'} propss={{
                ...state


            }} comp={
                <Context.Consumer>
                    {context => {

                        return (
                            <div id={'Ticker'} onClick={this.up}>
                                <Table data={this.state.trades} arrowsOn={context.state.arrowsOn}/>
                            </div>
                        )

                        // if (this.state.trades.length>0) {
                        //     return (
                        //         <div id={'Ticker'} onClick={this.up}>
                        //             <Table data={this.state.trades}/>
                        //         </div>
                        //     )
                        // } else {
                        //     return (
                        //         <div id={'startChart'}>
                        //             loading trades..
                        //         </div>
                        //     )
                        // }

                    }}
                </Context.Consumer>
            } compSettings={(
                <div style={{padding: 2, height: 'fit-content', overflow: 'auto'}}>


                    {exchangeSettings}

                    {/*<div style={{padding: 10}}>*/}
                    {/*    <div>history:</div>*/}
                    {/*    <div>*/}
                    {/*        <InputNum*/}
                    {/*            min={10}*/}
                    {/*            max={5000}*/}
                    {/*            step={10}*/}
                    {/*            id={'history'}*/}
                    {/*            value={this.state.history}*/}
                    {/*            style={{width: '95%', fontSize: 18, padding: 4, border: '2px ridge #ff8b00'}}*/}
                    {/*            onChange={(v) => {*/}
                    {/*                this.onChange(v, 'history')*/}
                    {/*            }}*/}
                    {/*            formatter={value => value.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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

const Table = ({data, arrowsOn}) => {
    return (<table className="table1"><Row data={data} arrowsOn={arrowsOn}/></table>)
}


const Row = ({data, arrowsOn}) => {

    const row = data && data[0] ? data.map((data, i) =>
        <tr className={"traderow notranslate " + data[6]} key={i} bgcolor={data[7]}>

            <td className={'rowExchange'} style={{marginRight: 2, marginLeft: 2}}><img className={'icon1'}
                                                                                       style={{verticalAlign: 'super'}}
                                                                                       src={data[8]} alt={'bitmex'}
            /></td>

            <td className={'hovershow'} style={{paddingRight: 4}}>
                {data[8].split('exchange/')[1].split('.')[0]}
            </td>

            <td className={'rowCoin'}><img style={{verticalAlign: 'top'}} src={data[9]} alt={'btc'}
                                           className={'icon2'}/></td>

            {/*'△':'▽'*/}
            <td className={'rowArrow'}>
                <div style={{fontSize: 12}}>{arrowsOn === true ? (data[2] > 0 ? '▲':'▼') : ''}</div>
            </td>

            <td className={'rowSize hoverhide'} style={{marginLeft: 2, paddingTop: 1}}>{data[10]}</td>
            <td className={'rowSize hovershow'} style={{
                marginLeft: 2,
                paddingTop: 1
            }}>{'$' + data[2].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>


            <td style={{
                marginLeft: 7,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: 'Arial',
                paddingRight: 7,
                borderRadius: 5,
                opacity: 0.81
            }}>{data[4]}</td>

            <td style={{marginLeft: 'auto'}}>{}</td>

            {/*<td style={{fontSize: 12}}>{data[1]!=='XBTUSD'?'alt':(Math.abs(data[2])/data[3]).toFixed(1) + ' btc'}</td>*/}

            <td className={'btcAmtt'} style={{fontWeight: 'bold'}}>{data[12]}</td>

            <td style={{paddingLeft: 2, paddingRight: 2, opacity: 0.58, fontSize: 10}}>{data[12] ? '@' : ''}</td>


            <td style={{}} className={'rowPrice'}>{data[11]}</td>


            <td className={'rowTime'} style={{
                paddingLeft: 4,
                paddingRight: 3,
                width: 24,
                display: 'flex',
                justifyContent: 'center'
            }}>{TradeBuilder.getTime(data[5])}</td>

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
    ) : <div className={'notouch'} style={{display: 'flex', justifyContent: 'flex-end', padding: 40, fontSize: 14}}>
        component settings/drag<span style={{paddingLeft: 10, fontWeight: 'bold'}}>↗</span>
    </div>

    return (<tbody id="tbodyy">{row}</tbody>)
}

