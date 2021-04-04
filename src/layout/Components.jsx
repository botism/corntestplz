import React from 'react'
import {GoldenLayoutComponent} from "./goldenLayoutComponent"
import {BaseComponent} from '../component/BaseComponent'
import {Prices} from '../data/Prices'

import {golden} from '../data/golden'
import {Ticker} from "../component/Ticker/Ticker"
import {Radio} from "../component/Radio/Radio"
import {Spacer} from "../component/Spacer/Spacer"
import {Liqs} from "../component/Liqs/Liqs"
import {LiqStats} from "../component/LiqStats/LiqStats"

import {Chart} from "../component/Chart/Chart"
import {Price} from "../component/Price/Price"
import Context from "../data/Context"
import {TradeStats} from "../component/tradeStats/tradeStats"
import {OpenInterest} from "../component/OpenInterest/OpenInterest"
import {Funding} from "../component/Funding/Funding"

import {Banner} from "../component/Banner/Banner"

let $ = window.jquery


class Components extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)
        const context = this.context

        console.log('start components.....')

        this.state = {
            borderWidth: 5,

            context: context
        }

        setTimeout(() => {
            $('.lm_goldenlayout').css({opacity: 1})
        }, 700)
    }


    render() {
        return (


            <GoldenLayoutComponent
                htmlAttrs={{style: {height: "96vh", width: "calc(100vw - 6px)", marginLeft: 4}}}
                config={{
                    settings: {hasHeaders: false},
                    dimensions: {borderWidth: 5},

                    content: [

                        {
                            type: 'row',
                            height: 20,
                            content: [
                                {
                                    title: "connected",
                                    type: "react-component",
                                    width: 50,
                                    component: "ticker",
                                    props: {
                                        ...Ticker.getStartingProps(),
                                        id: 'start1left-nomob',
                                        nomob: true,

                                        bitmexOn: true,
                                        bitmexETHUSDOn: true,
                                        bitmexETHUSDmin: 10000,
                                        bitmexETHZ19On: true,
                                        bitmexETHZ19min: 10000,

                                        bitfinexOn: true,

                                        bitfinexETHUSDOn: true,
                                        bitfinexETHUSDmin: 5000,
                                        bitfinexETHEUROn: true,
                                        bitfinexETHEURmin: 5000,
                                        bitfinexETHBTCOn: true,
                                        bitfinexETHBTCmin: 5000,

                                        coinbaseOn: true,
                                        coinbaseETHUSDOn: true,
                                        coinbaseETHUSDmin: 5000,
                                        coinbaseETHEUROn: true,
                                        coinbaseETHEURmin: 25000,

                                        bitstampOn: true,
                                        bitstampETHUSDOn: true,
                                        bitstampETHUSDmin: 5000,

                                        bybitOn: true,
                                        bybitETHUSDOn: true,
                                        bybitETHUSDmin: 10000,

                                        deribitOn: true,
                                        deribitETHUSDOn: true,
                                        deribitETHUSDmin: 10000,

                                        ftxOn: true,
                                        FTXETHPERPOn: true,
                                        FTXETHPERPmin: 10000,

                                        binanceOn: true,
                                        binanceETHUSDOn: true,
                                        binanceETHUSDmin: 10000,
                                    }
                                },

                                {
                                    title: "connected",
                                    height: 20,
                                    type: "react-component",
                                    component: "liqs",
                                    props: {
                                        ...Liqs.getStartingProps(),
                                        id: 'startliqleft-nomob',
                                        nomob: true,
                                        bitmexOn: true,
                                        bitmexETHUSDOn: true,
                                        bitmexETHUSDmin: 5000,
                                        bitmexETHZ19On: true,
                                        bitmexETHZ19min: 5000,
                                        bitmexLTCZ19On: true,
                                        bitmexLTCZ19min: 5000,
                                        bitmexBCHZ19On: true,
                                        bitmexBCHZ19min: 5000,
                                        bitmexXRPZ19On: true,
                                        bitmexXRPZ19min: 5000,
                                        bitmexADAZ19On: true,
                                        bitmexADAZ19min: 5000,
                                        bitmexEOSZ19On: true,
                                        bitmexEOSZ19min: 5000,
                                        bitmexTRXZ19On: true,
                                        bitmexTRXZ19min: 5000,

                                    }
                                },
                            ]
                        },


                        // {
                        //     type: 'row',
                        //     content: [
                        //         {
                        //             type: 'row',
                        //             content: [
                        //
                        //                 {
                        //                     type: 'column',
                        //                     width: 25,
                        //                     content: [
                        //
                        //                         // {
                        //                         //     title: "connected",
                        //                         //     type: "react-component",
                        //                         //     component: "chart",
                        //                         //     props: {
                        //                         //         ...Chart.getStartingProps(),
                        //                         //         id: 'startchartbtc1',
                        //                         //         symbol: 'XBT-USD bitmex',
                        //                         //         interval: 1,
                        //                         //         nobob: true
                        //                         //     }
                        //                         // },
                        //                         {
                        //                             title: "connected",
                        //                             height: 30,
                        //                             type: "react-component",
                        //                             component: "chart",
                        //                             props: {
                        //                                 ...Chart.getStartingProps(),
                        //                                 id: 'startcharteth15-nomob',
                        //                                 symbol: 'ETH-USD bitmex',
                        //                                 interval: 15,
                        //                                 nomob: true
                        //                             }
                        //                         },
                        //
                        //                         {
                        //                             type: 'row',
                        //                             height: 20,
                        //                             content: [
                        //                                 {
                        //                                     title: "connected",
                        //                                     type: "react-component",
                        //                                     width: 50,
                        //                                     component: "ticker",
                        //                                     props: {
                        //                                         ...Ticker.getStartingProps(),
                        //                                         id: 'start1left-nomob',
                        //                                         nomob: true,
                        //
                        //                                         bitmexOn: true,
                        //                                         bitmexETHUSDOn: true,
                        //                                         bitmexETHUSDmin: 10000,
                        //                                         bitmexETHZ19On: true,
                        //                                         bitmexETHZ19min: 10000,
                        //
                        //                                         bitfinexOn: true,
                        //
                        //                                         bitfinexETHUSDOn: true,
                        //                                         bitfinexETHUSDmin: 5000,
                        //                                         bitfinexETHEUROn: true,
                        //                                         bitfinexETHEURmin: 5000,
                        //                                         bitfinexETHBTCOn: true,
                        //                                         bitfinexETHBTCmin: 5000,
                        //
                        //                                         coinbaseOn: true,
                        //                                         coinbaseETHUSDOn: true,
                        //                                         coinbaseETHUSDmin: 5000,
                        //                                         coinbaseETHEUROn: true,
                        //                                         coinbaseETHEURmin: 25000,
                        //
                        //                                         bitstampOn: true,
                        //                                         bitstampETHUSDOn: true,
                        //                                         bitstampETHUSDmin: 5000,
                        //
                        //                                         bybitOn: true,
                        //                                         bybitETHUSDOn: true,
                        //                                         bybitETHUSDmin: 10000,
                        //
                        //                                         deribitOn: true,
                        //                                         deribitETHUSDOn: true,
                        //                                         deribitETHUSDmin: 10000,
                        //
                        //                                         ftxOn: true,
                        //                                         FTXETHPERPOn: true,
                        //                                         FTXETHPERPmin: 10000,
                        //
                        //                                         binanceOn: true,
                        //                                         binanceETHUSDOn: true,
                        //                                         binanceETHUSDmin: 10000,
                        //                                     }
                        //                                 },
                        //
                        //                                 {
                        //                                     title: "connected",
                        //                                     height: 20,
                        //                                     type: "react-component",
                        //                                     component: "liqs",
                        //                                     props: {
                        //                                         ...Liqs.getStartingProps(),
                        //                                         id: 'startliqleft-nomob',
                        //                                         nomob: true,
                        //                                         bitmexOn: true,
                        //                                         bitmexETHUSDOn: true,
                        //                                         bitmexETHUSDmin: 5000,
                        //                                         bitmexETHZ19On: true,
                        //                                         bitmexETHZ19min: 5000,
                        //                                         bitmexLTCZ19On: true,
                        //                                         bitmexLTCZ19min: 5000,
                        //                                         bitmexBCHZ19On: true,
                        //                                         bitmexBCHZ19min: 5000,
                        //                                         bitmexXRPZ19On: true,
                        //                                         bitmexXRPZ19min: 5000,
                        //                                         bitmexADAZ19On: true,
                        //                                         bitmexADAZ19min: 5000,
                        //                                         bitmexEOSZ19On: true,
                        //                                         bitmexEOSZ19min: 5000,
                        //                                         bitmexTRXZ19On: true,
                        //                                         bitmexTRXZ19min: 5000,
                        //
                        //                                     }
                        //                                 },
                        //                             ]
                        //                         },
                        //
                        //                         {
                        //                             title: "banner",
                        //                             height: 23,
                        //                             type: "react-component",
                        //                             component: "banner",
                        //                             props: {
                        //                                 id: 'banner1-nomob',
                        //                                 nomob: true,
                        //                             }
                        //                         },
                        //
                        //                         {
                        //                             title: "connected",
                        //                             type: "react-component",
                        //                             width: 22,
                        //                             component: "liqstats",
                        //                             props: {
                        //                                 ...LiqStats.getStartingProps(),
                        //                                 id: 'start1liqsstats-nomob',
                        //                                 nomob: true,
                        //                             }
                        //                         },
                        //
                        //
                        //
                        //                         //
                        //
                        //
                        //
                        //
                        //                     ]
                        //                 },
                        //
                        //                 {
                        //                     type: 'column',
                        //                     content: [
                        //                         {
                        //                             title: "connected",
                        //                             height: 7,
                        //                             type: "react-component",
                        //                             component: "spacer",
                        //                             props: {
                        //                                 id: 'spacer1-nomob',
                        //                                 nomob: true,
                        //                             }
                        //                         },
                        //                         {
                        //                             title: "connected",
                        //                             type: "react-component",
                        //                             height: 67,
                        //                             component: "chart",
                        //                             props: {
                        //                                 ...Chart.getStartingProps(),
                        //                                 id: 'startchartbtc1h-nomob',
                        //                                 symbol: 'XBT-USD bitmex',
                        //                                 interval: 60,
                        //                                 nomob: true
                        //                             }
                        //                         },
                        //                         {
                        //                             type: 'row',
                        //                             height: 7,
                        //                             content: [
                        //                                 {
                        //                                     title: "connected",
                        //                                     width: 70,
                        //                                     type: "react-component",
                        //                                     component: "spacer",
                        //                                     props: {
                        //                                         id: 'spacer1-nomob',
                        //                                         nomob: true,
                        //                                     }
                        //                                 },
                        //
                        //                             ]
                        //                         }
                        //                     ]
                        //                 }
                        //             ]
                        //         },
                        //
                        //         {
                        //             type: 'column',
                        //             width: 20,
                        //             content: [
                        //                 {
                        //                     title: "connected",
                        //                     height: 75,
                        //                     type: "react-component",
                        //                     component: "ticker",
                        //                     props: {
                        //                         ...Ticker.getStartingProps(),
                        //                         id: 'start1',
                        //                         bitmexOn: true,
                        //                         bitmexXBTUSDOn: true,
                        //                         bitmexXBTUSDmin: 150000,
                        //                         bitmexXBTZ19On: true,
                        //                         bitmexXBTZ19min: 150000,
                        //                         bitmexXBTH20On: true,
                        //                         bitmexXBTH20min: 150000,
                        //                         bitfinexOn: true,
                        //                         bitfinexBTCUSDOn: true,
                        //                         bitfinexBTCUSDmin: 25000,
                        //                         bitfinexBTCEUROn: true,
                        //                         bitfinexBTCEURmin: 25000,
                        //                         coinbaseOn: true,
                        //                         coinbaseBTCUSDOn: true,
                        //                         coinbaseBTCUSDmin: 25000,
                        //                         coinbaseBTCEUROn: true,
                        //                         coinbaseBTCEURmin: 25000,
                        //
                        //                         bitstampOn: true,
                        //                         bitstampBTCUSDOn: true,
                        //                         bitstampBTCUSDmin: 25000,
                        //
                        //                         bybitOn: true,
                        //                         bybitBTCUSDOn: true,
                        //                         bybitBTCUSDmin: 150000,
                        //
                        //                         deribitOn: true,
                        //                         deribitBTCUSDOn: true,
                        //                         deribitBTCUSDmin: 150000,
                        //
                        //
                        //                         FTXOn: true,
                        //                         FTXBTCPERPOn: true,
                        //                         FTXBTCPERPmin: 150000,
                        //
                        //                         binanceOn: true,
                        //                         binanceBTCUSDOn: true,
                        //                         binanceBTCUSDmin: 150000,
                        //
                        //                         OKExOn: true,
                        //                         OKExBTCUSDTOn: true,
                        //                         OKExBTCUSDTmin: 25000,
                        //
                        //                         OKExBTCUSD191227On: true,
                        //                         OKExBTCUSD191227min: 150000,
                        //
                        //                         OKExBTCUSD191101On: true,
                        //                         OKExBTCUSD191101min: 150000,
                        //
                        //                         OKExBTCUSD191025On: true,
                        //                         OKExBTCUSD191025min: 150000,
                        //
                        //                         OKExBTCUSDSWAPOn: true,
                        //                         OKExBTCUSDSWAPmin: 150000,
                        //
                        //
                        //                         bitmexETHUSDOn: true,
                        //                         bitmexETHUSDmin: 150000,
                        //                         bitmexETHZ19On: true,
                        //                         bitmexETHZ19min: 150000,
                        //
                        //                         bitfinexETHUSDOn: true,
                        //                         bitfinexETHUSDmin: 25000,
                        //                         bitfinexETHEUROn: true,
                        //                         bitfinexETHEURmin: 25000,
                        //                         bitfinexETHBTCOn: true,
                        //                         bitfinexETHBTCmin: 25000,
                        //
                        //                         coinbaseETHUSDOn: true,
                        //                         coinbaseETHUSDmin: 25000,
                        //                         coinbaseETHEUROn: true,
                        //                         coinbaseETHEURmin: 25000,
                        //
                        //
                        //                         bitstampETHUSDOn: true,
                        //                         bitstampETHUSDmin: 25000,
                        //
                        //
                        //                         bybitETHUSDOn: true,
                        //                         bybitETHUSDmin: 150000,
                        //
                        //
                        //                         deribitETHUSDOn: true,
                        //                         deribitETHUSDmin: 150000,
                        //
                        //
                        //                         FTXETHPERPOn: true,
                        //                         FTXETHPERPmin: 150000,
                        //
                        //
                        //                         binanceETHUSDOn: true,
                        //                         binanceETHUSDmin: 150000,
                        //
                        //                     }
                        //                 },
                        //
                        //                 {
                        //                     title: "connected",
                        //                     type: "react-component",
                        //                     component: "liqs",
                        //                     props: {
                        //                         ...Liqs.getStartingProps(),
                        //                         id: 'start4',
                        //                         bitmexOn: true,
                        //                         bitmexXBTUSDOn: true,
                        //                         bitmexXBTUSDmin: 200000,
                        //                         bitmexXBTZ19On: true,
                        //                         bitmexXBTZ19min: 200000,
                        //                         bitmexXBTH20On: true,
                        //                         bitmexXBTH20min: 200000,
                        //                         bitmexETHUSDOn: true,
                        //                         bitmexETHUSDmin: 200000,
                        //                         bitmexETHZ19On: true,
                        //                         bitmexETHZ19min: 200000,
                        //                         bitmexLTCZ19On: true,
                        //                         bitmexLTCZ19min: 200000,
                        //                         bitmexBCHZ19On: true,
                        //                         bitmexBCHZ19min: 200000,
                        //                         bitmexXRPZ19On: true,
                        //                         bitmexXRPZ19min: 200000,
                        //                         bitmexADAZ19On: true,
                        //                         bitmexADAZ19min: 200000,
                        //                         bitmexEOSZ19On: true,
                        //                         bitmexEOSZ19min: 200000,
                        //                         bitmexTRXZ19On: true,
                        //                         bitmexTRXZ19min: 200000,
                        //
                        //                     }
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // }
                    ]

                }}

                registerComponents={myLayout => {

                    function register(name, class_, props) {

                        console.log('register ' + name)

                        myLayout.registerComponent(name, class_)
                        var newConfig = {
                            title: name,
                            type: "react-component",
                            component: name,
                            props: props
                        }
                        myLayout.createDragSource(document.getElementById("footeradd" + name), newConfig)


                    }

                    let w = $(window)
                    w.resize(function () {
                        myLayout.updateSize(w.width(), w.height())
                        let small = w.width() < 600
                        // $('.footerButton').width(small?'4%':'fit-content')
                        // $('.footerButton').css('font-size', small?0:16)
                        // $('#titleTextDiv1').css({display: small ? 'none' : 'flex'})
                        // $('.footerExchange').css({display: small ? 'none' : 'flex'})
                    })

                    myLayout.on('initialised', function () {

                        // console.log('initt')

                        // console.log(JSON.stringify(localStorage.getItem('savedState')))

                        let small = w.width() < 800
                        // $('.footerButton').width(small?'4%':'fit-content')
                        // $('.footerButton').css('font-size', small?0:16)
                        // $('#titleTextDiv1').css({display: small ? 'none' : 'flex'})
                        // $('.footerExchange').css({display: small ? 'none' : 'flex'})


                        console.log('small: ' + small)
                        if (small) {
                            golden.myLayout._getAllContentItems().forEach((c, i) => {

                                try {
                                    console.log('item1 ' + c.config.props.id + ' inc ' + c.config.props.id.includes('spacer'))
                                    if (c.config.props.nomob === true) {
                                        c.container._contentElement.animate({opacity: 0}, 200, undefined, () => {
                                            c.container.close()
                                        })
                                    }
                                } catch (e) {
                                }
                            })
                        }

                        setTimeout(() => {
                            Chart.instances.forEach((chart) => {
                                console.log('chart: ')
                                console.log(chart)
                                console.log('started: ' + chart.state.started)
                                chart.setState({started: true})
                            })


                        }, 200)


                        setTimeout(() => {
                            $('#AppMiddle').css({opacity: 1})
                        }, 1700)


                        setTimeout(() => {

                            $('#footerr').css({opacity: 0.95})
                            $('#AppFooter').css({height: 35})


                            setTimeout(() => {
                                $('#addComponent').css({opacity: 0.5})
                            }, 700)
                            setTimeout(() => {
                                $('#addLayout').css({opacity: 0.5})
                            }, 800)
                            setTimeout(() => {
                                $('#addSettings').css({opacity: 0.5})
                            }, 900)


                            $('#welcomee').addClass('hovery')
                        }, 3000)

                    })

                    myLayout.on('stateChanged', function () {
                        // console.log('statechanged')
                        try {
                            localStorage.setItem('savedState', JSON.stringify(myLayout.toConfig()))
                        } finally {
                        }
                    })

                    setInterval(() => {
                        // console.log(JSON.stringify(myLayout.toConfig()))
                        try {
                            localStorage.setItem('savedState', JSON.stringify(myLayout.toConfig())
                                // +'globalsplit' + JSON.stringify(Prices.savee)
                            )
                        } finally {
                        }
                    }, 800)

                    console.log('registerming...')


                    register('base', BaseComponent, {id: 'new'})

                    register('ticker', Ticker, Ticker.getStartingProps())

                    register('spacer', Spacer, Spacer.getStartingProps())

                    register('radio', Radio, Radio.getStartingProps())

                    register('liqs', Liqs, Liqs.getStartingProps())


                    register('chart', Chart, Chart.getStartingProps())

                    register('liqstats', LiqStats, LiqStats.getStartingProps())

                    register('tradestats', TradeStats, TradeStats.getStartingProps())

                    register('openinterest', OpenInterest, OpenInterest.getStartingProps())

                    register('funding', Funding, Funding.getStartingProps())

                    register('banner', Banner, Banner.getStartingProps())


                    register('price', Price, {id: 'new'})

                    // register('chart', Chart, {id: 'new'})

                    console.log('registered, make laout')

                    golden.myLayout = myLayout

                }}
            />
        )
    }
}

export {Components}
