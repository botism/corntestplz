import * as React from 'react'
import {Component} from 'react'
import './index.css'
import Datafeed from './api/'
import $ from 'jquery'
import App from "../../App"
import BroadcastChannel from "broadcast-channel"
import {Printer} from "../../util/Printer"
import {Prices} from "../../data/Prices"

const channelMouseUp = new BroadcastChannel('channelMouseUp');

class TVChartContainer extends React.PureComponent {

    static defaultProps = {
        symbol: 'XBT-USD bitmex',
        interval: '60',
        containerId: 'tv_chart_container_main',
        libraryPath: '/charting_library/',
        // chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,

        studiesOverrides: {
            "relative strength index.Plot.color": "#e741ff",
            "relative strength index.Plot.linewidth": 2,
            "relative strength index.UpperLimit.color": "#1C1D26",
            "relative strength index.LowerLimit.color": "#1C1D26",
            "relative strength index.Hlines Background.color": "#1C1D26",

            // "fisher transform.Level.color": "rgba(28,29,38,0)",


        },
    }

    constructor(props) {
        super(props)

        console.log('pppropsss')
        console.log(this.props)

        this.state = {
            id: this.props.id,
            symbol: this.props.symbol,
            interval: this.props.interval,
            changeSymbol: this.props.changeSymbol,
            changeInterval: this.props.changeInterval,
            drawings: this.props.drawings,
            setDrawings: this.props.setDrawings,
            getDrawings: this.props.getDrawings
        }

        console.log('statedrawings: ' + JSON.stringify(this.state.drawings))
    }

    componentDidMount() {

        if (this.props.id==='new') return

        console.log("didmount containerid: " + this.props.containerId + this.props.id)



        let cig = (PineJS) => {
            return Promise.resolve([


                //bar colorer
                {
                    name: "Bar Colorer Demo",
                    metainfo: {
                        _metainfoVersion: 42,

                        id: "BarColoring@tv-basicstudies-1",

                        name: "BarColoring",
                        description: "Bar Colorer Demo",
                        shortDescription: "BarColoring",
                        scriptIdPart: "",
                        is_price_study: true,
                        is_hidden_study: false,
                        isCustomIndicator: true,

                        isTVScript: false,
                        isTVScriptStub: false,
                        defaults: {
                            precision: 4,
                            palettes: {
                                palette_0: {
                                    // palette colors
                                    // change it to the default colors that you prefer,
                                    // but note that the user can change them in the Style tab
                                    // of indicator properties
                                    colors: [
                                        { color: "#FFFF00" },
                                        { color: "#0000FF" }
                                    ]
                                }
                            }
                        },
                        inputs: [],
                        plots: [{
                            id: "plot_0",

                            // plot type should be set to 'bar_colorer'
                            type: "bar_colorer",

                            // this is the name of the palette that is defined
                            // in 'palettes' and 'defaults.palettes' sections
                            palette: "palette_0"
                        }],
                        palettes: {
                            palette_0: {
                                colors: [
                                    { name: "Color 0" },
                                    { name: "Color 1" }
                                ],

                                // the mapping between the values that
                                // are returned by the script and palette colors
                                valToIndex: {
                                    100: 0,
                                    200: 1
                                }
                            }
                        }
                    },
                    constructor: function() {
                        this.main = function(context, input) {
                            this._context = context;
                            this._input = input;

                            var valueForColor0 = 100;
                            var valueForColor1 = 200;

                            // perform your calculations here and return one of the constants
                            // that is specified as a key in 'valToIndex' mapping
                            var result =
                                Math.random() * 100 % 2 > 1 ? // we randomly select one of the color values
                                    valueForColor0 : valueForColor1;

                            return [result];
                        }
                    }
                }
                ,



            ]);
        }




        const widgetOptions = {

            debug: false,
            theme: "Dark",
            custom_css_url: "./index.css",
            symbol: this.state.symbol,
            datafeed: Datafeed,
            interval: this.props.interval,
            favorites: ["1m", "15m", "1h", "2h", "4h", "6h", "12h", "1d"],
            container_id: this.props.containerId + this.props.id,
            containerId: this.props.containerId + this.props.id,
            library_path: this.props.libraryPath,
            locale: getLanguageFromURL() || 'en',
            disabled_features: ['display_market_status', 'header_compare', 'border_around_the_chart', 'control_bar', 'study_market_minimized'
                , 'header_chart_type'],
            // enabled_features: ['move_logo_to_main_pane'],
            charts_storage_url: this.props.chartsStorageUrl,
            charts_storage_api_version: this.props.chartsStorageApiVersion,
            client_id: this.props.clientId,
            user_id: this.props.userId,
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
            loading_screen: {backgroundColor: "rgba(0,0,0,0.22)", foregroundColor: "rgb(132,40,159)"},

            indicators_file_name : 'indicator.js',


            overrides: {



                "linetoolfibretracement.extendLines": true,
                "linetooltrendline.linecolor": 'rgba(255,62,249,0.71)',
                "linetooltrendline.linewidth": 2,
                "linetoolrectangle.color": 'rgb(52,153,88)',
                "linetoolrectangle.fillBackground": true,
                "linetoolrectangle.backgroundColor": 'rgba(27,153,34,0.29)',
                "linetoolrectangle.linewidth": 1.0,
                "linetoolrectangle.snapTo45Degrees": true,
                "linetoolrectangle.transparency": 50,

                // linetoolrectangle: {
                // 	"linetoolrectangle.color": 'rgba( 21, 56, 153, 1)',
                // 	"linetoolrectangle.fillBackground": true,
                // 	"linetoolrectangle.backgroundColor": 'rgba( 21, 56, 153, 0.5)',
                // 	"linetoolrectangle.linewidth": 1.0,
                // 	"linetoolrectangle.snapTo45Degrees":true,
                // 	"linetoolrectangle.transparency": 50
                // },

                "symbolWatermarkProperties.color": "rgba(86,86,86,0)",
                "paneProperties.crossHairProperties.color": "#b73699",

                "paneProperties.topMargin": 10,
                "paneProperties.bottomMargin": 15,
                "scalesProperties.lineColor": "#3b3d50",
                "scalesProperties.textColor": "#676c6e",
                "scalesProperties.fontSize": 16,

                "timeScale.rightOffset": 500,

                "mainSeriesProperties.style": 1,

                // Candles styles
                "mainSeriesProperties.candleStyle.upColor": "#79C14C",
                "mainSeriesProperties.candleStyle.downColor": "#ff1733",
                "mainSeriesProperties.candleStyle.drawWick": true,
                "mainSeriesProperties.candleStyle.drawBorder": true,
                // "mainSeriesProperties.candleStyle.borderColor": "#fffce8",
                "mainSeriesProperties.candleStyle.borderUpColor": "#527035",
                "mainSeriesProperties.candleStyle.borderDownColor": "#D25927",
                "mainSeriesProperties.candleStyle.wickUpColor": 'rgba(248,248,250,0.5)',
                "mainSeriesProperties.candleStyle.wickDownColor": 'rgba(248,248,250,0.5)',
                "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,

                "mainSeriesProperties.showCountdown": true,
                "mainSeriesProperties.visible": true,
                "mainSeriesProperties.showPriceLine": false,
                "mainSeriesProperties.priceLineWidth": 1,

                "paneProperties.background": "#1C1D26",
                "paneProperties.horzGridProperties.color": "#1C1D26",
                "paneProperties.vertGridProperties.color": "#1C1D26",


                "paneProperties.legendProperties.showStudyArguments": false,
                "paneProperties.legendProperties.showStudyTitles": true,
                "paneProperties.legendProperties.showStudyValues": false,
                "paneProperties.legendProperties.showSeriesTitle": false,
                "paneProperties.legendProperties.showSeriesOHLC": false,
                "paneProperties.legendProperties.showLegend": false,
                "paneProperties.legendProperties.showBarChange": false,
                "paneProperties.legendProperties.showOnlyPriceSource": true,

                "scalesProperties.backgroundColor": "#ffffff",

            }
        }
        let widget= window.tvWidget

        try {

            widget = window.tvWidget = new window.TradingView.widget(widgetOptions)

            widget.onChartReady(() => {



                // let book = [
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127050,
                //         "side": "Sell",
                //         "size": 614088,
                //         "price": 8729.5
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127100,
                //         "side": "Sell",
                //         "size": 115235,
                //         "price": 8729
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127150,
                //         "side": "Sell",
                //         "size": 118023,
                //         "price": 8728.5
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127200,
                //         "side": "Sell",
                //         "size": 28565,
                //         "price": 8728
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127250,
                //         "side": "Sell",
                //         "size": 1926269,
                //         "price": 8727.5
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127300,
                //         "side": "Buy",
                //         "size": 105410,
                //         "price": 8727
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127350,
                //         "side": "Buy",
                //         "size": 44795,
                //         "price": 8726.5
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127400,
                //         "side": "Buy",
                //         "size": 1513,
                //         "price": 8726
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127450,
                //         "side": "Buy",
                //         "size": 23209,
                //         "price": 8725.5
                //     },
                //     {
                //         "symbol": "XBTUSD",
                //         "id": 8799127500,
                //         "side": "Buy",
                //         "size": 9591,
                //         "price": 8725
                //     }
                // ]
                //
                // let now = Date.now()/1000
                //
                // book.forEach((bookrow, i, arr)=>{
                //     let id = widget.chart().createMultipointShape([
                //         {
                //             time: now
                //             , price: bookrow.price
                //         }
                //     ], {
                //         shape: 'text',
                //         // color: bid?"#83ff59":"#ff2a31",
                //         disableSelection: false,
                //         zOrder: "bottom",
                //
                //         overrides: {
                //             text: "                          " + 500000 + "       " + book.price + "                            -",
                //             fontsize: 8,
                //             color: book.size < 500000 ? "#585858" : book.size < 1000000 ? 'rgb(253,253,255)' : "#e5e642",
                //             fillBackground: true,
                //             borderColor: book.size < 2500000 ? 'green' : book.size < 5000000 ? "#feff3c" : "#ffff22",
                //             backgroundColor: 'green',
                //             drawBorder: true,
                //             linewidth: book.size < 5000000 ? 1.0 : 3.0,
                //             transparency: 0,
                //             font: "Arial",
                //             fixedSize: true,
                //             bold: book.size >= 1000000
                //         }
                //     })
                //
                //     widget.chart().getShapeById(id).setProperties({text: bookrow.size})
                // })


















                // widget.chart().createStudy('Relative Strength Index', false, false, [9])




                // widget.chart().createStudy('Fisher Transform', false, false, [10])



                // widget.chart().createStudy('Test Indicator v1.0', false, false);


                //get initial drawings

                setTimeout(()=>{

                    let drawings = this.state.drawings

                    console.log('drawingssss: ')
                    console.log(drawings)

                    // return

                    if (drawings===undefined) return

                    drawings.forEach((drawing)=>{

                        let properties = JSON.parse(drawing.properties)
                        let points = JSON.parse(drawing.points)

                        console.log('prop points')
                        console.log(properties)
                        console.log(points)


                        let shape = widget.chart().createMultipointShape(points, {
                            shape: drawing.name,
                            overrides: {properties}
                        })

                        let shapee = widget.chart().getShapeById(shape)

                        console.log('set to ' + properties.text)
                        shapee.setProperties({text: properties.text, linecolor: properties.linecolor, color: properties.color, backgroundColor: properties.backgroundColor})
                    })

                },1000)

                setInterval(()=>{

                    try {

                        let drawings = widget.chart().getAllShapes()

                        let drawingDetails = []

                        drawings.forEach((drawing)=>{
                            // console.log('id ' + drawing.id + ': ')
                            // console.log(widget.chart().getShapeById(drawing.id).getProperties())
                            drawingDetails.push({
                                color: widget.chart().getShapeById(drawing.id).getProperties().color,
                                backgroundColor: widget.chart().getShapeById(drawing.id).getProperties().backgroundColor,
                                text: widget.chart().getShapeById(drawing.id).getProperties().text,
                                linecolor: widget.chart().getShapeById(drawing.id).getProperties().linecolor,
                                name: drawing.name, properties: JSON.stringify(widget.chart().getShapeById(drawing.id).getProperties()),
                                points: JSON.stringify(widget.chart().getShapeById(drawing.id).getPoints()),
                                transparency: JSON.stringify(widget.chart().getShapeById(drawing.id).getProperties().transparency),
                            })
                        })

                        this.props.setDrawings(drawingDetails)

                        // console.log('set drawings to ')
                        // console.log(drawingDetails)
                    } catch (e) {

                    }

                },2000)




                console.log("widget.onchartready")

                Printer.setChart(widget.chart())

                // Printer.startKoba()
                setTimeout(()=>{Printer.startKoba('XBTUSD')}, 1000)


                // setInterval(()=>{
                //     // let drawings = widget.chart().getAllShapes()
                //     // console.log('drawings loop ' + JSON.stringify(drawings))
                //
                //
                //     drawings.forEach((d)=>{
                //         let ps = widget.chart().getShapeById(d.id).getProperties()
                //
                //         // console.log(ps)
                //     })
                //
                //     this.state.setDrawings(drawings)
                // },3000)

                $("#tv_chart_container_main" + this.props.id).delay(100).animate({opacity: 1}, 400)

                this.setState({loading: false})


                widget.chart().crossHairMoved(function (e) {

                    Prices.chartHover = e

                })

                let that = this

                widget.chart().onIntervalChanged().subscribe(this, function(s, obj) {
                    // console.log('calloing changein')
                    this.state.changeInterval(s)
                })

                widget.chart().onSymbolChanged().subscribe(this,function (s, obj) {

                    let newsym = s.name.split(' ')[0].replace('-', '')

                    // console.log("sym change, " + newsym + 'this id ' + that.state.id)

                    // console.log(this.state)
                    // this.state.changeSymbol(newsym)

                    // console.log('chart id ' + this.state.id + ' sym change to ' + s.name)

                    this.state.changeSymbol(s.name)

                    // this.props.context.setSymbol(s)


                    // console.log("PRINTING CONTEXT")

                    // console.log(this.props.context.state)

                    //todo PRINT MAP ON onREADY
                    // setTimeout(async()=>{
                    //     await Printer.getChart().removeAllShapes()
                    //     await Printer.startKoba(s.name.split(' ')[0].replace('-', ''))
                    // }, 2000)
                    //
                })


                widget.subscribe("chart_load_requested", function (e) {
                    console.log("CHARTLOADDDDDrequestted")

                })

                widget.subscribe("mouse_down", function (e) {
                    // console.log("mousedown, e: " + JSON.stringify(e))
                    // channelMouseUp.postMessage(e)
                })

                widget.subscribe("mouse_up", function (e) {
                    // console.log("mouseup, e: " + JSON.stringify(e))
                    channelMouseUp.postMessage(Prices.chartHover)

                    // console.log("mouse price " + ActiveSymbol.getChartHover().price)



                })


            })
        } catch (e) {
            console.log('tv errorrrrr')
        }

        // this.props.context.setMainChartWidget(widget)




    }

    render() {

        return (
            <div id={"tvchartmain"}
                 style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>

                {/*<div onClick={()=>{this.setState({leftExpand: !this.state.leftExpand})}} style={{transition: '0.3s', width: this.state.leftExpand?400:40, height: '100%', background: 'rgba(20, 23, 36, 1)', color: 'cornflowerblue', display: 'flex', flexDirection: 'column'}}>*/}

                {/*    <div className={'chartItem1'} style={{height: 40, width: 34, margin: 5, display: 'flex', justifyContent: 'center'}}>*/}
                {/*        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 28}}>*/}
                {/*            🖶*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={{height: 20, width: 40, margin: 6, marginTop: -3, display: 'none', justifyContent: 'center'}}>*/}
                {/*        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 28}}>*/}
                {/*            ❑*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!*<div style={{height: 20, width: 40, margin: 6, marginTop: -3, display: 'flex', justifyContent: 'center'}}>*!/*/}
                {/*    /!*    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 28}}>*!/*/}
                {/*    /!*        🖶*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*    /!*<div style={{height: 20, width: 40, margin: 6, marginTop: -3, display: 'flex', justifyContent: 'center'}}>*!/*/}
                {/*    /!*    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 28}}>*!/*/}
                {/*    /!*        🖶*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*    /!*<div style={{height: 20, width: 40, margin: 6, marginTop: -3, display: 'flex', justifyContent: 'center'}}>*!/*/}
                {/*    /!*    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 28}}>*!/*/}
                {/*    /!*        🖶*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*</div>*/}

                    <div
                        id={'tv_chart_container_main' + this.props.id}
                        className={'TVChartContainer'}
                        style={{display: 'block', opacity: 0}}
                    />

            </div>

        )
    }
}


// class TVChartContainer extends Component {
//
//     constructor(props) {
//         super(props)
//
//         console.log('props: ' + JSON.stringify(props))
//
//     }
//
//     render() {
//         return (
//             <TVChartContainerC props={{...this.props}} />
//             // {/*<this.state.context.Consumer>*/}
//             // {/*    {context => (<TVChartContainerC context={context}/>)}*/}
//             // {/*</this.state.context.Consumer>*/}
//         )
//     }
// }

export {TVChartContainer}



function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)')
    const results = regex.exec(window.location.search)
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
