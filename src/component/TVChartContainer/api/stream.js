// api/stream.js
import historyProvider from './historyProvider.js'
import Swal from 'sweetalert2'
import BroadcastChannel from "broadcast-channel"

import {BinanceChartSocket} from "../../../data/sockets/BinanceChartSocket"
// import {Firemap} from "../../Firemap"
// import {ActiveSymbol} from "../../../data/ActiveSymbol"

// we use Socket.io client to connect to cryptocompare's socket.io stream
// var io = require('socket.io-client')
// var socket_url = 'wss://streamer.cryptocompare.com'
// var socket = io(socket_url)
// keep track of subscriptions
var _subs = []

const channelSymbolChange = new BroadcastChannel('symbolChange')

const channelTrade = new BroadcastChannel('bitmexTrade')



export default {


    subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {

        console.log("subscribe bars ")

        console.log(symbolInfo)


        //todo BINANCE unsub/sub instead of close/open

        if (symbolInfo.name.includes('binance')) {
            console.log("binance subscribe " + JSON.stringify(symbolInfo.name) + "res: " + resolution)

            if (BinanceChartSocket.socket) {
                console.log("terminating socket")
                console.log(BinanceChartSocket.socket)
                BinanceChartSocket.socket.close(1000)
            }

            // var socket = this.socket
            const socketMessageListener = (event) => {

                let trade = JSON.parse(event.data)
                if (trade === null || trade.e !== "aggTrade") {
                    return
                }

                // console.log("trade msg: " + JSON.stringify(trade))

                const data = {
                    sub_type: parseInt(0, 10),
                    exchange: "Binance",
                    to_sym: symbolInfo.name,
                    from_sym: "undefined~undefined",
                    trade_id: 'binance_trade_id',
                    ts: new Date(trade.T).getTime() / 1000,
                    volume: parseFloat(trade.q),
                    price: parseFloat(trade.p)
                }
                //


                // ActiveSymbol.setBid(e.data[e.data.length-1].price)

                // console.log("sett bid to " + ActiveSymbol.getBid())

                // console.log("time: " + data.ts)

                const channelString = `${data.sub_type}~${data.to_sym}~${data.from_sym}`

                console.log("channelstring: " + channelString)

                // 0~XBT-USD bitmex~undefined~undefined

                // console.log("subs: " + JSON.stringify(_subs))

                const sub = _subs.find(e => e.channelString === channelString)

                if (sub) {
                    // disregard the initial catchup snapshot of trades for already closed candles
                    if (data.ts < sub.lastBar.time / 1000) {
                        return
                    }

                    //todo figure out uodatebar for current symbolsub


                    var _lastBar = updateBar(data, sub)

                    // console.log("recentbar: " + JSON.stringify(_lastBar))

// send the most recent bar back to TV's realtimeUpdate callback
                    sub.listener(_lastBar)
                    // update our own record of lastBar
                    sub.lastBar = _lastBar
                }

            }

            const socketOpenListener = (event) => {
                console.log('binance open')
                console.log(event)
            }

            const socketCloseListener = (event) => {
                console.log("close event ")
                console.log(event)
                if (BinanceChartSocket.socket) {
                    console.error('binance close')
                }

                if (event) {
                    if (event.code===1000) {
                        return
                    }
                }

                BinanceChartSocket.socket = new WebSocket('wss://stream.binance.com:9443/ws/' + symbolInfo.name.split(' ')[0].replace('-', '').toLowerCase() + '@aggTrade')
                BinanceChartSocket.socket.addEventListener('open', socketOpenListener)
                BinanceChartSocket.socket.addEventListener('message', socketMessageListener)
                BinanceChartSocket.socket.addEventListener('close', socketCloseListener)


            }

            socketCloseListener()

        }

        // channelSymbolChange.postMessage(symbolInfo.name.includes(' ') ? symbolInfo.name.split(' ')[0] : symbolInfo.name)

        const channelString = createChannelString(symbolInfo)
        // socket.emit('SubAdd', {subs: [channelString]})

        var newSub = {
            channelString,
            uid,
            resolution,
            symbolInfo,
            lastBar: historyProvider.history[symbolInfo.name].lastBar,
            listener: updateCb,
        }
        _subs.push(newSub)

        console.log('new _subs:')
        console.log(_subs)

    },
    unsubscribeBars: function (uid) {
        var subIndex = _subs.findIndex(e => e.uid === uid)
        if (subIndex === -1) {
            //console.log("No subscription found for ",uid)
            return
        }
        var sub = _subs[subIndex]
        // socket.emit('SubRemove', {subs: [sub.channelString]})
        _subs.splice(subIndex, 1)
    }
}


channelTrade.onmessage = msg => {

    if ( !(msg.symbol=== 'XBTUSD' || msg.symbol==='ETHUSD' || msg.symbol==='XRPUSD' || msg.symbol.includes('19') || msg.symbol.includes('20') )) {
        return
    }

    // console.log("updaing trade with msg " + JSON.stringify(msg))

    const data = {
        sub_type: parseInt(0, 10),
        exchange: "Bitmex",
        to_sym: msg.symbol[0] + msg.symbol[1] +msg.symbol[2] + '-' + msg.symbol[3] +msg.symbol[4] +msg.symbol[5] + " bitmex",
        from_sym: "undefined~undefined",
        trade_id: msg.id,
        ts: new Date(msg.timestamp).getTime() / 1000,
        volume: msg.size,
        price: msg.price
    }
    //


    // ActiveSymbol.setBid(e.data[e.data.length-1].price)

    // console.log("sett bid to " + ActiveSymbol.getBid())

    // console.log("time: " + data.ts)

    const channelString = `${data.sub_type}~${data.to_sym}~${data.from_sym}`

    // console.log("channelstring: " + channelString)

    // 0~XBT-USD bitmex~undefined~undefined

    // console.log("subs: " + JSON.stringify(_subs))

    // const sub = _subs.find(e => e.channelString === channelString)

    _subs.forEach((sub)=>{
        // console.log('sub: ' + JSON.stringify(sub))
        if (sub.channelString===channelString) {
            // disregard the initial catchup snapshot of trades for already closed candles
            // if (data.ts < sub.lastBar.time / 1000) {
            //     return
            // }

            //todo figure out uodatebar for current symbolsub


            var _lastBar = updateBar(data, sub)

            // console.log("recentbar: " + JSON.stringify(_lastBar))

// send the most recent bar back to TV's realtimeUpdate callback
            sub.listener(_lastBar)
            // update our own record of lastBar
            sub.lastBar = _lastBar
        }
    })



}


// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {
    var lastBar = sub.lastBar
    let resolution = sub.resolution
    if (resolution.includes('D')) {
        // 1 day in minutes === 1440
        resolution = 1440
    } else if (resolution.includes('W')) {
        // 1 week in minutes === 10080
        resolution = 10080
    }
    var coeff = resolution * 60
    // console.log({coeff})
    var rounded = Math.floor(data.ts / coeff) * coeff
    var lastBarSec = lastBar.time / 1000
    var _lastBar

    if (rounded > lastBarSec) {
        // create a new candle, use last close as open **PERSONAL CHOICE**
        _lastBar = {
            time: rounded * 1000,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: data.price,
            volume: data.volume
        }

    } else {
        // update lastBar candle!
        if (data.price < lastBar.low) {
            lastBar.low = data.price
        } else if (data.price > lastBar.high) {
            lastBar.high = data.price
        }

        lastBar.volume += data.volume
        lastBar.close = data.price
        _lastBar = lastBar
    }
    return _lastBar
}


// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo) {
    var channel = symbolInfo.name.split(/[:/]/)
    const exchange = channel[0] === 'GDAX' ? 'Coinbase' : channel[0]
    const to = channel[2]
    const from = channel[1]
    // subscribe to the CryptoCompare trade channel for the pair and exchange
    return `0~${exchange}~${from}~${to}`
}
