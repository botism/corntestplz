// import {SRboxes} from "../srboxes"
// import $ from "jquery"
// import BroadcastChannel from "broadcast-channel"
// import {Bars} from "../../Firemap/bars"
// import Swal from "../../Firemap"
// const channelBars = new BroadcastChannel('bars');

import $ from 'jquery'

import {Bars} from "../../../data/Bars/Bars.jsx"

var rp = require('request-promise').defaults({json: true})

const api_root = 'https://min-api.cryptocompare.com'
const history = {}

export default {
    history: history,

    // async getBars(symbolInfo, resolution, startTime, endTime, onHistoryCallback, onErrorCallback, firstDataRequest) {
    // 	// ...
    // 	const [base, quote] = symbolInfo.name.split(/[/]/);
    // 	let bars = [];
    // 	let series;
    // 	do {
    // 		series = await fetch(`https://min-api.cryptocompare.com/data/${path}?fsym=${base}&tsym=${quote}&toTs=${endTime}&limit=${limit}`).then(res => res.json());
    // 		if (series.Response === 'Error') {
    // 			onErrorCallback(series.Message);  // TODO: https://github.com/tradingview/charting_library/issues/3143
    // 		}
    // 		bars = bars.concat(series.Data.map(candleCryptoCompare2TradingView));
    // 		endTime = series.TimeFrom;
    // 	} while (series.TimeFrom > startTime);
    // 	onHistoryCallback(bars.sort((a, b) => a.time - b.time), { noData: bars.length === 0 });
    // }

    getBars: function (symbolInfo, resolution, from, to, first, limit) {

        // console.log("getbars symbolinfo " + )

        // if (!first) {


        // let symbol = symbolInfo.name.split(' ')[0].replace('-', '')
        //
        // return $.get("http://localhost:8080/http://localhost:3001/" + symbol + '/' + (resolution % 60 === 0 ? 'h1' : 'm1'), function (data) {
        //
        //     var bars = data.map(el => {
        //
        //         if (new Date(el[0]).toISOString()) {
        //
        //
        //             return {
        //                 time: el[0]/1000,
        //                 open: el[1],
        //                 high: el[2],
        //                 low: el[3],
        //                 close: el[4],
        //                 volume: el[5]
        //             }
        //         } else {
        //             return {}
        //         }
        //
        //
        //     })
        //     if (first) {
        //         var lastBar = bars[bars.length - 1]
        //         history[symbolInfo.name] = {lastBar: lastBar}
        //
        //     }
        //
        //     return bars
        //
        // })

        if (symbolInfo.name.includes('binance')) {

            let se = symbolInfo.name.split(' ')

            let sym = se[0].split('-')

            const qs = {
                symbol: sym[0] + sym[1],
                interval: resolution === "1" ? "1m" : resolution === "60" ? "1h" : "1d",
                startTime: from * 1000,
                endTime: to * 1000,
                limit: 1000
            }

            console.log("qs: " + JSON.stringify(qs))

            if (first) {
                qs.startTime = from * 1000
            }

            return rp({
                url:
                    'https://murmuring-temple-63807.herokuapp.com/' +
                    'https://api.binance.com/api/v1/klines',
                qs,
            })
                .then(data => {

                    let data1 = data

                    data1.pop()

                    // console.log("got first data, len " + data.length + ": " + JSON.stringify(data1))

                    const qs = {
                        symbol: sym[0] + 'BTC',
                        interval: resolution === "1" ? "1m" : "1h",
                        startTime: data1[data1.length - 1][0],
                        endTime: to * 1000,
                        limit: 1000
                    }

                    console.log("qs: " + JSON.stringify(qs))


                    let bars1 = data1

                    return rp({
                        url:
                            `https://murmuring-temple-63807.herokuapp.com/` +
                        'https://api.binance.com/api/v1/klines',
                        qs,
                    })
                        .then(data => {

                            // console.log("got 2nd data, len " + data.length + ": " + JSON.stringify(data))

                            data = bars1.concat(data)

                            // console.log("bars1.concat(data): " + JSON.stringify(data))

                            if (data.Response && data.Response === 'Error') {
                                console.log('CryptoCompare API error:', data.Message)
                                return []
                            }

                            if (data.length) {


                                var bars = data.map(el => {

                                    if (new Date(el[0]).toISOString()) {


                                        return {
                                            time: el[0],
                                            open: el[1],
                                            high: el[2],
                                            low: el[3],
                                            close: el[4],
                                            volume: el[5]
                                        }
                                    } else {
                                        return {}
                                    }


                                })
                                if (first) {
                                    var lastBar = bars[bars.length - 1]
                                    history[symbolInfo.name] = {lastBar: lastBar}

                                }


                                // console.log("barslen: " + bars.length)
                                // console.log("start time: " + bars[0].time + ": " + new Date(bars[0].time).toISOString())
                                // console.log("end time: " + bars[bars.length-1].time + ": " + new Date(bars[bars.length-1].time).toISOString())


                                // SRboxes.printBoxes(bars)

                                // SRboxes.addBars(symbolInfo, bars, resolution)


                                // Bars.addBars(symbolInfo, bars, resolution)

                                console.log("adding bars res " + resolution)
                                console.log(bars)


                                let bin = resolution === '1' ? '1m' : resolution === '5' ? '5m' : resolution === '60' ? '1h' : '1d'

                                console.log("bin " + bin)

                                Bars.add(sym[0]+'BTC', bin, bars)


                                // todo: check if lasttime is correct then return bars, if not return another .then

                                return bars
                            } else {
                                return []
                            }
                        })

                })


        } else {


            //     return
            // }

            console.log("getbars symbolinfo: " + JSON.stringify(symbolInfo) + " from: " + new Date(from * 1000).toISOString() + " to: " + new Date(to * 1000).toISOString() + "gap: " + ((to - from) / 60000) + " first? " + first + " limit " + limit + 'res: ' + resolution)

            let symbol = symbolInfo.name.split(' ')[0].replace('-', '')

            console.log("getbars symbol " + symbol)

            console.log("res: " + resolution)

            return rp({
                url:
                    `https://murmuring-temple-63807.herokuapp.com/` +
                `https://corn-cache1.herokuapp.com/` + symbol + '/' + (resolution === '1D' ? 'd1' : resolution % 60 === 0 ? 'h1' : resolution % 5 === 0 ? 'm5' : 'm1'),
            })
                .then(data => {

                    console.log('got bars ')
                    console.log(data)
                    if (data.length) {
                        var bars = data.map(el => {
                            // console.log("add bar, " + JSON.stringify(el[0] - (symbolInfo.name.includes('bitmex') ? 60000 * resolution : 0)))
                            return {
                                time: el[0]-(60000*(resolution==='1D'?1440:resolution)), //TradingView requires bar time in ms
                                low: el[3],
                                high: el[2],
                                open: el[1],
                                close: el[4],
                                volume: el[5]
                            }
                        })
                        if (first) {
                            var lastBar = bars[bars.length - 1]

                            console.log("set history lastbar name " + symbolInfo.name + " lastbar: " + JSON.stringify(lastBar))

                            history[symbolInfo.name] = {lastBar: lastBar}
                            // console.log("firstsbars start time: " + bars[0].time + ": " + new Date(bars[0].time).toISOString())
                            // console.log("firstsbars end time: " + bars[bars.length-1].time + ": " + new Date(bars[bars.length-1].time).toISOString())
                        }

                        // SRboxes.printBoxes(bars)

                        // SRboxes.addBars(symbolInfo, bars, resolution)

                        // Bars.addBars(symbolInfo, bars, resolution)


                        // console.log("bars: " + JSON.stringify(bars))

                        // channelBars.postMessage({bars: bars, symbolInfo: symbolInfo, resolution: resolution})


                        //todo modulo for 15m tfs etc
                        let bin = resolution === '1' ? '1m' : resolution === '5' ? '5m' : resolution === '60' ? '1h' : '1d'

                        console.log("bin " + bin)

                        Bars.add(symbolInfo.name.split(' ')[0].replace('-', ''), bin, bars)


                        return bars
                    } else {
                        return []
                    }
                })


        }
    }
    // var es = symbolInfo.ticker.split(' ')
    // var split_symbol = es[0].split('-')
    //
    //     console.log("getbars " + es + " from " + from + " to " + to)
    //
    //     let qs = {}
    //
    //     return rp({
    //         url: `http://localhost:8080/https://www.bitmex.com/api/v1/trade/bucketed?binSize=1m&partial=true&symbol=XBTUSD&count=100&reverse=true`,
    //         qs,
    //     })
    //         .then(data => {
    //
    //             console.log("bardata: ")
    //             console.log(data)
    //
    //             if (data.Response && data.Response === 'Error') {
    //                 console.log('bitmex API error:', data.Message)
    //                 return []
    //             }
    //
    //             if (data.length) {
    //
    //
    //                 var bars = data.map(el => {
    //
    //                     if (new Date(el[0]).toISOString()) {
    //
    //
    //                         return {
    //                             time: el[0],
    //                             open: el[1],
    //                             high: el[2],
    //                             low: el[3],
    //                             close: el[4],
    //                             volume: el[5]
    //                         }
    //                     } else {
    //                         return {}
    //                     }
    //
    //
    //                 })
    //                 if (first) {
    //                     var lastBar = bars[bars.length - 1]
    //                     history[symbolInfo.name] = {lastBar: lastBar}
    //
    //                 }
    //
    //
    //                 // console.log("barslen: " + bars.length)
    //                 // console.log("start time: " + bars[0].time + ": " + new Date(bars[0].time).toISOString())
    //                 // console.log("end time: " + bars[bars.length-1].time + ": " + new Date(bars[bars.length-1].time).toISOString())
    //
    //
    //                 // SRboxes.printBoxes(bars)
    //
    //                 // SRboxes.addBars(symbolInfo, bars, resolution)
    //
    //
    //                 // Bars.addBars(symbolInfo, bars, resolution)
    //
    //
    //                 // todo: check if lasttime is correct then return bars, if not return another .then
    //
    //                 return bars
    //             } else {
    //                 return []
    //             }
    //         })

    // const url = resolution === '1D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
    // const qs = {
    //     e: es[1],
    //     fsym: split_symbol[0] + split_symbol[1],
    //     tsym: split_symbol[1],
    //     toTs: to ? to : '',
    //     limit: limit ? limit : 2000,
    //     // aggregate: 1//resolution
    // }
    // // console.log({qs})
    //
    // return rp({
    //     url: `${api_root}${url}`,
    //     qs,
    // })
    //     .then(data => {
    //
    //         if (data.Response && data.Response === 'Error') {
    //             console.log('CryptoCompare API error:', data.Message)
    //             return []
    //         }
    //         if (data.Data.length) {
    //             var bars = data.Data.map(el => {
    //                 return {
    //                     time: el.time * 1000, //TradingView requires bar time in ms
    //                     low: el.low,
    //                     high: el.high,
    //                     open: el.open,
    //                     close: el.close,
    //                     volume: el.volumefrom * el.close
    //                 }
    //             })
    //             if (first) {
    //                 var lastBar = bars[bars.length - 1]
    //                 history[symbolInfo.name] = {lastBar: lastBar}
    //                 // console.log("firstsbars start time: " + bars[0].time + ": " + new Date(bars[0].time).toISOString())
    //                 // console.log("firstsbars end time: " + bars[bars.length-1].time + ": " + new Date(bars[bars.length-1].time).toISOString())
    //             }
    //
    //             // SRboxes.printBoxes(bars)
    //
    //             // SRboxes.addBars(symbolInfo, bars, resolution)
    //
    //             // Bars.addBars(symbolInfo, bars, resolution)
    //
    //
    //             // console.log("bars: " + JSON.stringify(bars))
    //
    //             // channelBars.postMessage({bars: bars, symbolInfo: symbolInfo, resolution: resolution})
    //
    //
    //             //todo modulo for 15m tfs etc
    //             let bin = resolution === '1' ? '1m' : resolution === '5' ? '5m' : resolution === '60' ? '1h' : '1d'
    //
    //             console.log("bin " + bin)
    //
    //             Bars.add(symbolInfo.name.split(' ')[0].replace('-', ''), bin, bars)
    //
    //
    //             return bars
    //         } else {
    //             return []
    //         }
    //     })


}
