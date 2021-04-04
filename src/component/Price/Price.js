import React from 'react'
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






export class Price extends React.Component {

    static contextType = Context

    static instances = []

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
            'XBTUSD', 'XBTU19', 'XBTZ19', 'XBTH20',
            'ETHUSD', 'ETHU19','ETHZ19',
            'LTCU19', 'LTCZ19',
            'BCHU19', 'BCHZ19',
            'XRPU19', 'XRPZ19', 'XRPH20', 'XRPUSD',
            'ADAU19', 'ADAZ19',
            'EOSU19', 'EOSZ19',
            'TRXU19', 'TRXZ19'
        ],

        bitfinex: [
            'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHEUR', 'ETHBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'EOSUSD','EOSBTC', 'XRPUSD','XRPBTC', 'BSVUSD', 'BSVBTC', 'NEOUSD', 'NEOBTC',
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
            'BTCUSD', 'ETHUSD'
        ],
        binance: [
            'BTCUSDT', 'ETHUSDT'
        ],
        FTX: [
            'BTCPERP', 'ETHPERP'
        ]
    }

    static getStartingProps = () => {

        let exchangeCoins = {
            bitmex: [
                'XBTUSD', 'XBTU19', 'XBTZ19', 'XBTH20',
                'ETHUSD', 'ETHU19','ETHZ19',
                'LTCU19', 'LTCZ19',
                'BCHU19', 'BCHZ19',
                'XRPU19', 'XRPZ19', 'XRPH20', 'XRPUSD',
                'ADAU19', 'ADAZ19',
                'EOSU19', 'EOSZ19',
                'TRXU19', 'TRXZ19'
            ],

            bitfinex: [
                'BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHEUR', 'ETHBTC', 'LTCUSD', 'LTCBTC', 'BCHUSD', 'BCHBTC', 'EOSUSD','EOSBTC', 'XRPUSD','XRPBTC', 'BSVUSD', 'BSVBTC', 'NEOUSD', 'NEOBTC',
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
                'BTCUSD', 'ETHUSD'
            ],
            binance: [
                'BTCUSDT', 'ETHUSDT'
            ],
            FTX: [
                'BTCPERP', 'ETHPERP'
            ]
        }

        let props = {
            id: 'new',
            trades: []
        }

        Object.keys(exchangeCoins).forEach(key => {
            props[key+'On'] = false
            exchangeCoins[key].forEach((symbol)=>{
                props[key+symbol+'On'] = false
                props[key+symbol+'min'] = 0
            })
        })

        // console.log('props: ' + JSON.stringify(props))

        return(props)

    }


    constructor(props) {
        super(props)

        Price.instances.push(this)


        console.log('new price ' + JSON.stringify(props.trades))

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

            id: props.id,

            xbt: 5,

            lastTrade: 'x',

            exchangeSelected: 'none',

            value: 10000,

            // trades: []

        }

        // console.log(this.state)


        // console.log('bitmexbtusdon: ' + this.state.bitmexXBTUSDOn)
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

        const context = this.context

        this.setState({context: context})

        // console.log('mount cont: ')

        // console.log(context.state)


        // setInterval(()=>{this.setState({xbt: this.state.xbt+1})},5000)

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

                            <img src={Price.getCoinIcon(symbol)} alt={'-'} height={20} width={20}
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

        Object.keys(Price.exchangeCoins).forEach(key => {

            let symbols = []

            Price.exchangeCoins[key].forEach((symbol)=>{symbols.push({symbol: symbol})})

            exchangeSettings.push((<this.SettingsItem exchangeName={key} symbols={symbols} />))
        })


        return (
            <BaseComponent name={'ticker'} propss={{
                ...state


            }} comp={
                <Context.Consumer>
                    {context => {
                        return (
                            <div id={'Ticker'} onClick={this.up}>
                                prices: {context.state.XBTUSD}
                            </div>
                        )
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

const Table = ({data}) => {
    return (<table className="table1"><Row data={data}/></table>)
}


const Row = ({data}) => {

    const row = data[0] ? data.map((data, i) =>
        <tr className={"traderow " + data[6]} key={i} bgcolor={data[7]}>

            {/*<td className={'rowExchange'} style={{marginRight: 2, marginLeft: 2}}><img src={data[8]} alt={'bitmex'}*/}
            {/*                                                                           height={20} width={20}/></td>*/}

            {/*<td className={'rowCoin'}><img style={{verticalAlign: 'top'}} src={data[9]} alt={'btc'} height={16}*/}
            {/*                               width={16}/></td>*/}

            {/*<td className={'rowSize'} style={{marginLeft: 4, paddingTop: 1}}>{data[10]}</td>*/}

            {/*<td style={{marginLeft: 7, fontSize: 10, fontWeight: 700, fontFamily: 'Arial',  paddingRight: 2, borderRadius: 5, opacity: 0.81}}>{data[4]}</td>*/}

            {/*<td style={{marginLeft: 'auto'}}>{}</td>*/}

            {/*/!*<td style={{fontSize: 12}}>{data[1]!=='XBTUSD'?'alt':(Math.abs(data[2])/data[3]).toFixed(1) + ' btc'}</td>*!/*/}

            {/*<td style={{fontSize: 10,  opacity: 0.58}}>{data[12]}</td>*/}

            {/*<td style={{paddingLeft: 2, paddingRight: 2, opacity: 0.58, fontSize: 10}}>{data[12]?'@':''}</td>*/}


            {/*<td className={'rowPrice'}>{data[11]}</td>*/}



            {/*<td className={'rowTime'} style={{paddingLeft: 4, paddingRight: 4}}>{TradeBuilder.getTime(data[5])}</td>*/}

            {/*/!*<td>{JSON.stringify(data)}</td>*!/*/}
            {/*<td id="tradeIcon">{'@'}</td>*/}
            {/*<td id="tradeSize">{'10k'}</td>*/}
            {/*<td width="100%" id="spacer">{""}</td>*/}
            {/*<td id="slip">{'+1'}</td>*/}
            {/*<td id="btcAmt">{'5 btc'}</td>*/}
            {/*<td id="atSign">{'@'}</td>*/}
            {/*<td id="tradePrice">{'10405.0'}</td>*/}
            {/*<td id="elapsedTime" width="100%">{'<1m'}</td>*/}
        </tr>
    ) : <div style={{display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 20, opacity: 0.2, fontWeight: 'bold'}}>pri</div>

    return (<tbody id="tbodyy">{row}</tbody>)
}

