// // import {BitmexTradeBuilder} from "../../connections/BitmexWebsocket/BitmexTradeBuilder"
// import Swal from 'sweetalert2'
// import BroadcastChannel from "broadcast-channel"
// import {Formatter} from "../../utils/Formatter"
// // import {Firemap} from "../Firemap"
//
// class SRboxes {
//
//     static chart
//
//     static bars1m = []
//
//     static bars15m = []
//
//     static bars1h = []
//
//     static bars1d = []
//
//     static bookIDs = []
//
//     static getBoxes1 = (chart) => {
//
//         // console.log("date.now: " + Date.now())
//         // chart.createMultipointShape([{ time: 1551334490357 / 1000, price: 3751.00 },{ time: (1552334490357 / 1000), price: 3900.00 }], { shape: 'rectangle', disableSelection: true });
//
//
//     }
//
//
//     static printRectangles(period, rectangles) {
//
//
//         // console.log("bars15m current bar: " + this.bars15m[this.bars15m.length-1].time + " behind that: " + this.bars15m[this.bars15m.length-2].time)
//
//         for (let i = 0; i < rectangles.length; i++) {
//             let stime = (rectangles[i].startTime / 1000)
//             let etime = (rectangles[i].endTime / 1000)
//             // console.log("etime: " + etime + "gap: " + (1552935600-etime))
//
//             // let endtime = parseInt(1552860900000+(1*900000))
//
//             // console.log("printing with stime: " + stime + " edtime: " + etime + " period: " + period)
//
//             this.chart.createMultipointShape([
//                 {
//                     time: stime
//                         - (10 * 900)
//                     , price: rectangles[i].bottom
//                 },
//                 {
//                     time: etime
//                         + (i === rectangles.length - 1 ? ((500 * 900)) : ((20 * 900)))
//                     , price: rectangles[i].top
//                 }
//             ], {
//                 shape: 'rectangle', disableSelection: true, overrides: {
//                     color: "rgba(0,0,0,0)",
//                     backgroundColor: period === "15m" ? "#2d9c30" : period === "60m" ? "#3cd341" : "#cbff50",
//                     transparency: 85 //136, 211, 212, .2
//                 }
//             })
//
//             this.chart.createMultipointShape([
//                 {
//                     time: stime
//                         - (10 * 900)
//                     , price: rectangles[i].chortBottom
//                 },
//                 {
//                     time: etime
//                         + (i === rectangles.length - 1 ? (period === "15m" ? (100 * 900) : period === "60m" ? (500 * 900) : (5000 * 900)) : (period === "15m" ? (20 * 900) : period === "60m" ? (20 * 900) : (20 * 900)))
//                     , price: rectangles[i].chortTop
//                 }
//             ], {
//                 shape: 'rectangle', disableSelection: true, overrides: {
//                     color: "rgba(0,0,0,0)",
//                     backgroundColor: period === "15m" ? "#9d2c30" : period === "60m" ? "#d33c41" : "#ff408d",
//                     transparency: 85 //136, 211, 212, .2
//                 }
//             })
//         }
//
//
//     }
//
//     static makeBarsPrint() {
//         this.make15mBars()
//     }
//
//     static printBoxes(bars) {
//
//
//         // this.chart.createMultipointShape([{time: 1551334490357 / 1000, price: 3751.00}, {
//         //     time: (1552334490357 / 1000),
//         //     price: 3900.00
//         // }], {shape: 'rectangle', disableSelection: true})
//
//
//     }
//
//     static getChart() {
//         return this.chart
//     }
//
//     static setChart(iChartWidgetApi) {
//
//
//         this.chart = iChartWidgetApi
//
//         // console.log("^^^^^ " + new Date(1552945600 * 1000))
//
//
//         // this.chart.createMultipointShape([
//         //     {time: (1552805600), price: 3800},
//         //     {time: 1552935600, price: 3802}
//         // ], {
//         //     shape: 'rectangle', disableSelection: true, overrides: {
//         //         color: "rgba(0,0,0,0)", backgroundColor: "#f6f9f3", transparency: 50 //136, 211, 212, .2
//         //     }
//         // })
//         //
//         // this.chart.createMultipointShape([
//         //     {time: 1552855600, price: 3805},
//         //     {time: (1552860900000+(20*900000))/1000, price: 3809}
//         // ], {
//         //     shape: 'rectangle', disableSelection: true, overrides: {
//         //         color: "rgba(0,0,0,0)", backgroundColor: "#f6f9f3", transparency: 50 //136, 211, 212, .2
//         //     }
//         // })
//
//     }
//
//
//     static make15mBars() {
//
//         var firstCandle = null
//         var next1mI = null
//
//         for (let i = 0; i < 20; i++) {
//             //first bar
//             let time = new Date(this.bars1m[i].time)
//
//
//             if (firstCandle === null && (time.getMinutes() % 15 === 0 || time.getMinutes() === 0)) {
//                 firstCandle = this.bars1m[i]
//                 next1mI = i + 1
//
//                 this.bars15m.push(firstCandle)
//
//             }
//
//
//         }
//
//         let currentDiff = 0
//
//         for (let i = next1mI; i < this.bars1m.length; i++) {
//             // console.log("current bar: " + JSON.stringify(this.bars15m[this.bars15m.length-1]) + " bar " + i + ": " + JSON.stringify(bars1m[i]))
//             currentDiff += 60000
//
//             if (currentDiff === 900000) {
//                 // console.log("new bar-")
//                 let newBar = this.bars1m[i]
//                 this.bars15m.push(newBar)
//                 currentDiff = 0
//             } else {
//                 // console.log("add to bar- ")
//                 let currentBar = this.bars15m[this.bars15m.length - 1]
//
//                 currentBar.close = this.bars1m[i].close
//
//             }
//         }
//
//
//         for (let i = 0; i < this.bars15m.length; i++) {
//             // console.log("bar " + new Date(this.bars15m[i].time) + ": " + JSON.stringify(this.bars15m[i]))
//         }
//         //
//         // let firstBar = this.bars15m[0]
//         // let lastBar = this.bars15m[this.bars15m.length - 1]
//
//         // console.log("FIRSTBAR: " + JSON.stringify(firstBar) + " LASTBAR: " + JSON.stringify(lastBar))
//
//
//         let highestClose = 0
//         let lowestClose = 1000000
//
//         for (let i = 0; i < this.bars15m.length; i++) {
//             if (this.bars15m[i].close > highestClose) {
//                 highestClose = this.bars15m[i].close
//             }
//             if (this.bars15m[i].close < lowestClose) {
//                 lowestClose = this.bars15m[i].close
//             }
//         }
//
//
//         // console.log("making rect, firstbar time: " + new Date(firstBar.time) + " last bar: " + new Date(lastBar.time))
//         // this.chart.createMultipointShape(
//         //     [
//         //         {time: firstBar.time / 1000, price: lowestClose},
//         //         {time: (lastBar.time / 1000), price: highestClose}
//         //         ],
//         //     {shape: 'rectangle', disableSelection: true})
//
//         this.printMurreys("1d", this.bars1d, 16)
//         this.printMurreys("1d", this.bars1d, 32)
//         this.printMurreys("1d", this.bars1d, 64)
//         this.printMurreys("1d", this.bars1d, 128)
//         this.printFutureMurreys("1d", this.bars1d, 64)
//         this.printFutureMurreys("1d", this.bars1d, 128)
//         this.printFutureMurreys("1d", this.bars1d, 192)
//         this.printFutureMurreys("1d", this.bars1d, 192)
//
//         this.printMurreys("15m", this.bars15m, 32)
//         this.printMurreys("15m", this.bars15m, 64)
//         this.printMurreys("15m", this.bars15m, 128)
//         this.printMurreys("15m", this.bars15m, 192)
//         this.printFutureMurreys("15m", this.bars15m, 64)
//         this.printFutureMurreys("15m", this.bars15m, 128)
//         this.printFutureMurreys("15m", this.bars15m, 192)
//
//         this.printMurreys("60m", this.bars1h, 64)
//         this.printMurreys("60m", this.bars1h, 128)
//         this.printMurreys("60m", this.bars1h, 192)
//         this.printMurreys("60m", this.bars1h, 256)
//         this.printMurreys("60m", this.bars1h, 512)
//         this.printFutureMurreys("60m", this.bars1h, 64)
//         this.printFutureMurreys("60m", this.bars1h, 128)
//         this.printFutureMurreys("60m", this.bars1h, 192)
//         this.printFutureMurreys("60m", this.bars1h, 256)
//         this.printFutureMurreys("60m", this.bars1h, 512)
//
//
//         // this.printMurreys(this.bars1d, 64)
//         //
//         // this.printMurreys(this.bars1d, 128)
//
//
//     }
//
//     static printFutureMurreys(period, bars, len) {
//
//         // console.log("print futuremurrey " + period + " " + len)
//
//         let rectangles = []
//
//         for (let i = len + 1; i < bars.length; i++) {
//
//             let high = 0
//             let low = 1000000
//
//             for (let j = i - len; j < i; j++) {
//                 high = bars[j].close > high ? bars[j].close : high
//                 low = bars[j].close < low ? bars[j].close : low
//             }
//
//             let murreys = this.getMurreys(high, low)
//
//             // console.log("got murrey 0: " + murreys.zero )
//
//             var nextmurrey
//
//             while (true) {
//
//                 // console.log("bar: " + bars[i])
//
//                 high *= 1.002
//                 low *= .998
//
//                 // console.log("trying with high: " + high + " low: " + low)
//
//                 nextmurrey = this.getMurreys(high, low)
//
//                 if (murreys.eight !== nextmurrey.eight || murreys.minus3 !== nextmurrey.minus3) {
//                     // console.log("new murrey!  0 went from " + murreys.zero + " to " + nextmurrey.zero)
//                     break
//                 }
//             }
//
//             murreys = nextmurrey
//
//
//             if (murreys.zero) {
//                 if (rectangles.length === 0) {
//                     rectangles.push({
//                         top: murreys.zero,
//                         bottom: murreys.minus3,
//                         chortTop: murreys.plus3,
//                         chortBottom: murreys.eight,
//                         startTime: bars[i].time,
//                         endTime: bars[i].time
//                     })
//                 } else if (rectangles[rectangles.length - 1].top === murreys.zero
//                     && rectangles[rectangles.length - 1].bottom === murreys.minus3) {
//                     //if stretch same frame
//                     rectangles[rectangles.length - 1].endTime = bars[i].time
//                 } else {
//                     //new rectangle
//                     rectangles.push({
//                         top: murreys.zero,
//                         bottom: murreys.minus3,
//                         chortTop: murreys.plus3,
//                         chortBottom: murreys.eight,
//                         startTime: bars[i].time,
//                         endTime: bars[i].time
//                     })
//                 }
//             }
//
//
//         }
//
//         this.printRectangles(period, rectangles)
//
//
//     }
//
//     static printMurreys(period, bars, len) {
//
//         //15m128
//
//
//         let rectangles = []
//
//         for (let i = len + 1; i < bars.length; i++) {
//
//             let high = 0
//             let low = 1000000
//
//             for (let j = i - len; j < i; j++) {
//                 high = bars[j].close > high ? bars[j].close : high
//                 low = bars[j].close < low ? bars[j].close : low
//             }
//             let murreys = this.getMurreys(high, low)
//
//             if (murreys.zero) {
//                 if (rectangles.length === 0) {
//                     rectangles.push({
//                         top: murreys.zero,
//                         bottom: murreys.minus3,
//                         chortTop: murreys.plus3,
//                         chortBottom: murreys.eight,
//                         startTime: bars[i].time,
//                         endTime: bars[i].time
//                     })
//                 } else if (rectangles[rectangles.length - 1].top === murreys.zero
//                     && rectangles[rectangles.length - 1].bottom === murreys.minus3) {
//                     //if stretch same frame
//                     rectangles[rectangles.length - 1].endTime = bars[i].time
//                 } else {
//                     //new rectangle
//                     rectangles.push({
//                         top: murreys.zero,
//                         bottom: murreys.minus3,
//                         chortTop: murreys.plus3,
//                         chortBottom: murreys.eight,
//                         startTime: bars[i].time,
//                         endTime: bars[i].time
//                     })
//                 }
//             }
//
//
//         }
//
//         this.printRectangles(period, rectangles)
//
//
//     }
//
//     static getMurreys(high, low) {
//
//         //murrrey range of current bar
//
//         //
//         // let frame = 192
//         // let mult = 1
//
// //-- defines
//         let logTen = Math.log(10)
//         let log8 = Math.log(8)
//         let log2 = Math.log(2)
//         // let lookback = Math.round(frame * mult)
//
// //-- determine price values based on ignore wick selection
// //         let uPrice = high
// //         let lPrice = low
//
// //-- find highest/lowest price over specified lookback
//         let vLow = low
//         let vHigh = high
//         let vDist = vHigh - vLow
// //-- if low price is < 0 then adjust accordingly
//         let tmpHigh = vLow < 0 ? (0 - vLow) : vHigh
//         let tmpLow = vLow < 0 ? ((0 - vLow) - vDist) : vLow
//
// //-- determine if price shift is in place
//         let shift = vLow < 0 ? true : false
//
// //-- calculate scale frame
//         let sfVar = Math.log(0.4 * tmpHigh) / logTen - Math.floor(Math.log(0.4 * tmpHigh) / logTen)
//         let SR = tmpHigh > 25 ? (sfVar > 0 ? Math.exp(logTen * (Math.floor(Math.log(0.4 * tmpHigh) / logTen) + 1)) : Math.exp(logTen * (Math.floor(Math.log(0.4 * tmpHigh) / logTen)))) : 100 * Math.exp(log8 * (Math.floor(Math.log(0.005 * tmpHigh) / log8)))
//         let nVar1 = (Math.log(SR / (tmpHigh - tmpLow)) / log8)
//         let nVar2 = nVar1 - Math.floor(nVar1)
//         let N = nVar1 <= 0 ? 0 : (nVar2 === 0 ? Math.floor(nVar1) : Math.floor(nVar1) + 1)
//
// //-- calculate scale interval and temporary frame top and bottom
//         let SI = SR * Math.exp(-(N) * log8)
//         let M = Math.floor(((1.0 / log2) * Math.log((tmpHigh - tmpLow) / SI)) + 0.0000001)
//         let I = Math.round(((tmpHigh + tmpLow) * 0.5) / (SI * Math.exp((M - 1) * log2)))
//
//         let Bot = (I - 1) * SI * Math.exp((M - 1) * log2)
//         let Top = (I + 1) * SI * Math.exp((M - 1) * log2)
//
// //-- determine if frame shift is required
//         let doShift = ((tmpHigh - Top) > 0.25 * (Top - Bot)) || ((Bot - tmpLow) > 0.25 * (Top - Bot))
//
//         let ER = doShift === true ? 1 : 0
//
//         let MM = ER === 0 ? M : (ER === 1 && M < 2) ? M + 1 : 0
//         let NN = ER === 0 ? N : (ER === 1 && M < 2) ? N : N - 1
//
// //-- recalculate scale interval and top and bottom of frame, if necessary
//         let finalSI = ER === 1 ? (SR * Math.exp(-(NN) * log8)) : SI
//         let finalI = ER === 1 ? Math.round(((tmpHigh + tmpLow) * 0.5) / (finalSI * Math.exp((MM - 1) * log2))) : I
//         let finalBot = ER === 1 ? (finalI - 1) * finalSI * Math.exp((MM - 1) * log2) : Bot
//         let finalTop = ER === 1 ? (finalI + 1) * finalSI * Math.exp((MM - 1) * log2) : Top
//
// //-- determine the increment
//         let Increment = (finalTop - finalBot) / 8
//
// //-- determine the absolute top
//         let absTop = shift === true ? -(finalBot - (3 * Increment)) : finalTop + (3 * Increment)
//
// //-- create our Murrey line variables based on absolute top and the increment
//         let Plus38 = absTop
//         let Plus28 = absTop - Increment
//         let Plus18 = absTop - (2 * Increment)
//         let EightEight = absTop - (3 * Increment)
//         let SevenEight = absTop - (4 * Increment)
//         let SixEight = absTop - (5 * Increment)
//         let FiveEight = absTop - (6 * Increment)
//         let FourEight = absTop - (7 * Increment)
//         let ThreeEight = absTop - (8 * Increment)
//         let TwoEight = absTop - (9 * Increment)
//         let OneEight = absTop - (10 * Increment)
//         let ZeroEight = absTop - (11 * Increment)
//         let Minus18 = absTop - (12 * Increment)
//         let Minus28 = absTop - (13 * Increment)
//         let Minus38 = absTop - (14 * Increment)
//
//         let murreys = {
//             minus3: Minus38,
//             minus2: Minus28,
//             minus1: Minus18,
//             zero: ZeroEight,
//             one: OneEight,
//             two: TwoEight,
//             three: ThreeEight,
//             four: FourEight,
//             five: FiveEight,
//             six: SixEight,
//             seven: SevenEight,
//             eight: EightEight,
//             plus1: Plus18,
//             plus2: Plus28,
//             plus3: Plus38
//         }
//
//         return murreys
//     }
//
//     static addBars(symbol, bars, resolution) {
//
//
//         if (resolution === "1" && this.bars1m.length < 8000) {
//             this.bars1m = bars.concat(this.bars1m)
//         } else if (resolution === "60" && this.bars1h.length < 4000) {
//             this.bars1h = bars.concat(this.bars1h)
//         } else if (resolution === "1D" && this.bars1d.length < 2000) {
//             this.bars1d = bars.concat(this.bars1d)
//         }
//     }
//
//     static clearChart() {
//         // let allshapes = this.chart.getAllShapes()
//
//         // console.log("allshapes: " + JSON.stringify(allshapes))
//
//         if (this.chart) {
//             this.chart.removeAllShapes()
//
//         }
//
//     }
//
//     static clearRectangles() {
//
//         if (this.chart) {
//
//             let allshapes = this.chart.getAllShapes()
//
//             // console.log("allshapes: " + JSON.stringify(allshapes))
//
//             for (let i = 0; i < allshapes.length; i++) {
//                 if (allshapes[i].name === "rectangle")
//                     this.chart.removeEntity(allshapes[i].id)
//             }
//         }
//
//
//     }
//
//     static roundTo(thiss, num) {
//         var resto = thiss % num
//         if (resto <= (num / 2)) {
//             return thiss - resto
//         } else {
//             return thiss + num - resto
//         }
//     }
//
//     static drawOrders(bid, orders) {
//
//         //clear all
//
//         // console.log("draworders")
//
//         let group = {
//             totalQty: 0,
//             upperPrice: 0,
//             lowerPrice: 0
//         }
//
//
//         SRboxes.clearDrawingsList(SRboxes.bookIDs)
//         SRboxes.bookIDs = []
//
//
//         // console.log("\n\n---- start")
//
//         let step = 1
//
//         for (let i = 0; i < orders.length; i++) {
//
//             // console.log("ORDER: " )
//             // console.log(orders[i])
//
//             let qty = orders[i].size
//             let price = orders[i].price
//
//             let side = orders[i].side
//
//             //SINGLE
//             SRboxes.bookIDs.push(printBox(this, qty, price, side))
//
//             //GROUPING
//             // console.log(i + " order: " + JSON.stringify(orders[i]))
//             //
//             // // if first order and under 1mil, add to group
//             // if (group.totalQty===0 && qty < 500000) {
//             //     group.totalQty = qty
//             //     group.lastPrice = price
//             //     group.firstPrice = price
//             //
//             //     // console.log("new group, " + group.totalQty + " @ " + group.lowerPrice)
//             //
//             //     //if first order and over 1mil, print single bar
//             // } else if (group.totalQty===0 && qty > 500000) {
//             //
//             //     // console.log("print mil and current group")
//             //
//             //     //print mil order
//             //     SRboxes.bookIDs.push(printBox(this, qty, price))
//             //
//             //
//             //     //also print current group
//             //     if (group.totalQty > 0) {
//             //         // SRboxes.bookIDs.push(printBox(this, group.totalQty, bid?group.lowerPrice:group.upperPrice))
//             //
//             //         SRboxes.bookIDs = (printGroupBox(this, group)).concat(SRboxes.bookIDs)
//             //
//             //         //reset group
//             //         group.totalQty = 0; group.firstPrice = 0; group.lastPrice = 0;
//             //     }
//             //
//             //
//             //
//             //     //if end, print group if >0
//             // } else if (i===9) {
//             //
//             //     group.lastPrice = price
//             //
//             //     // print current group
//             //     if (group.totalQty>0) {
//             //         SRboxes.bookIDs = (printGroupBox(this, group)).concat(SRboxes.bookIDs)
//             //         // SRboxes.bookIDs.push(printBox(this, 9, group.upperPrice))
//             //     }
//             //
//             //     //reset group
//             //     group.totalQty = 0; group.firstPrice = 0; group.lastPrice = 0;
//             //
//             //     //else add to group
//             // } else {
//             //
//             //     // console.log("add to group")
//             //     group.totalQty += qty
//             //     group.lastPrice = price
//             //
//             //     //if group over 2mil, print
//             //     if (group.totalQty>=2000000) {
//             //         SRboxes.bookIDs = (printGroupBox(this, group)).concat(SRboxes.bookIDs)
//             //
//             //
//             //         group.totalQty = 0; group.firstPrice = 0; group.lastPrice = 0;
//             //     }
//             // }
//
//
//         }
//
//         function printGroupBox(c, group) {
//             let now = SRboxes.roundTo(Date.now() / 1000, 900)
//
//             let qtyPercent = group.totalQty / 3000000
//
//             let color = bid ? "rgba(38,153,50," + qtyPercent + ")" : "rgba(153,43,54," + qtyPercent + ")"
//
//
//             let sizee = Formatter.getKformat(group.totalQty, 0)
//
//             let qty = group.totalQty
//
//
//             let ids = []
//
//             ids.push(c.chart.createMultipointShape([
//                 {
//                     time: (now) - (2 * 900)
//                     , price: group.firstPrice
//                 },
//                 {
//                     time: (now) + (10 * 900)
//                     , price: group.lastPrice
//                 }
//             ], {
//                 shape: 'rectangle',
//                 // color: bid?"#83ff59":"#ff2a31",
//                 disableSelection: false,
//                 zOrder: "bottom",
//
//                 overrides: {
//
//                     backgroundColor: color,
//                     transparency: 85,
//                     borderColor: "rgba(255,255,255,0)",
//                 }
//             }))
//
//             ids.push(c.chart.createMultipointShape([
//                 {
//                     time: (now) - (2 * 900)
//                     , price: group.firstPrice + (bid?-0.5:1)
//                 }
//             ], {
//                 shape: 'text',
//                 // color: bid?"#83ff59":"#ff2a31",
//                 disableSelection: false,
//                 zOrder: "top",
//
//                 overrides: {
//                     text: "                          " + sizee,
//                     fontsize: 12,
//                     color: qty < 500000 ? "#585858" : qty < 1000000 ? 'rgb(253,253,255)' : "#e5e642",
//                     fillBackground: false,
//                     borderColor: qty < 2500000 ? color : qty < 5000000 ? "#feff3c" : "#ffff22",
//                     backgroundColor: color,
//                     drawBorder: false,
//                     linewidth: qty < 5000000 ? 1.0 : 3.0,
//                     transparency: 0,
//                     font: "Arial",
//                     fixedSize: true,
//                     bold: qty >= 1000000
//                 }
//             }))
//
//             return ids
//
//
//         }
//
//
//         function printBox(c, qty, price, side) {
//             let now = SRboxes.roundTo(Date.now() / 1000, 900)
//
//             let qtyPercent = qty / 3000000
//
//             let color = side ? "rgba(38,153,50," + qtyPercent + ")" : "rgba(153,43,54," + qtyPercent + ")"
//
//             //
//             // TEXT BOX
//             //
//
//             let sizee = Formatter.getKformat(qty, 0)
//
//             if (sizee.length < 4) {
//                 sizee = sizee + "  "
//             }
//
//
//             return c.chart.createMultipointShape([
//                 {
//                     time: (now) - (2 * 900)
//                     , price: price + (bid ? 0 : 0.5)
//                 }
//             ], {
//                 shape: 'text',
//                 // color: bid?"#83ff59":"#ff2a31",
//                 disableSelection: false,
//                 zOrder: "bottom",
//
//                 overrides: {
//                     text: "                          " + sizee + "       " + price + "                            -",
//                     fontsize: 12,
//                     color: qty < 500000 ? "#585858" : qty < 1000000 ? 'rgb(253,253,255)' : "#e5e642",
//                     fillBackground: true,
//                     borderColor: qty < 2500000 ? color : qty < 5000000 ? "#feff3c" : "#ffff22",
//                     backgroundColor: color,
//                     drawBorder: true,
//                     linewidth: qty < 5000000 ? 1.0 : 3.0,
//                     transparency: 0,
//                     font: "Arial",
//                     fixedSize: true,
//                     bold: qty >= 1000000
//                 }
//             })
//         }
//
//
//     }
//
//
//     static printMarketOrder(msg) {
//
//         msg = msg[0]
//
//         let now = SRboxes.roundTo(Date.now() / 1000, 900)
//
//         let rand = Math.random()
//
//         rand = (10 * rand).toFixed(0)
//
//         rand=rand%2?rand:-rand
//
//         let id1 = this.chart.createMultipointShape([
//             {
//                 time: (now) - (12 * 900)
//                 , price: msg.firstPrice+5 + rand
//             }
//         ], {
//             shape: 'text',
//             // color: bid?"#83ff59":"#ff2a31",
//             disableSelection: false,
//             zOrder: "top",
//
//             overrides: {
//                 text: msg.exchange + " " + Formatter.getKformat(msg.total, 0),
//                 fontsize: 16,
//                 color: msg.total < 500000 ? "#585858" : msg.total < 1000000 ? 'rgb(253,253,255)' : "#e5e642",
//                 fillBackground: true,
//                 borderColor: msg.total < 2500000 ? msg.bgColor : msg.total < 5000000 ? "#feff3c" : "#ffff22",
//                 backgroundColor: msg.bgColor,
//                 drawBorder: true,
//                 linewidth: msg.total < 5000000 ? 1.0 : 3.0,
//                 transparency: 0,
//                 font: "Arial",
//                 fixedSize: true,
//                 bold: msg.total >= 1000000
//             }
//         })
//
//         let id2 = this.chart.createMultipointShape([
//             {
//                 time: (now) - (1 * 900)
//                 , price: msg.firstPrice-1
//             },
//             {
//                 time: (now) - (12 * 900)
//                 , price: msg.firstPrice+5 + rand
//             }
//         ], {
//             shape: 'trend_line',
//             // color: bid?"#83ff59":"#ff2a31",
//             disableSelection: false,
//             zOrder: "top",
//
//             overrides: {
//
//                 color: msg.bg,
//                 // borderColor: msg.total < 2500000 ? msg.bgColor : msg.total < 5000000 ? "#feff3c" : "#ffff22",
//
//                 linewidth: msg.total < 500000 ? 1.0 : 3.0,
//
//             }
//         })
//
//
//         setTimeout(function() {
//             SRboxes.clearByEntity(id1)
//         }, 10000) //fade out
//         setTimeout(function() {
//             SRboxes.clearByEntity(id2)
//         }, 10000) //fade out
//
//     }
//
//     static printall() {
//         const cb = () => {
//             // console.log("callbacccc")
//
//
//         }
//
//         // Firemap.printAll(cb)
//     }
//
//     static clearByEntity(id) {
//         if (this.chart) {
//             // console.log("clearing " + id)
//             this.chart.removeEntity(id)
//         }
//
//     }
//
//
//     static drawTest() {
//
//         this.chart.createMultipointShape([
//             {
//                 time: (Date.now() / 1000) - (5 * 900)
//                 , price: 3800
//             },
//             {
//                 time: (Date.now() / 1000) - (10 * 900)
//                 , price: 4000
//             }
//         ], {
//             shape: 'callout', disableSelection: false, overrides: {}
//         })
//
//     }
//
//     static newScalerRect() {
//         return this.chart.createMultipointShape([
//             {
//                 time: (Date.now() / 1000) - (5 * 900)
//                 , price: 3950
//             },
//             {
//                 time: (Date.now() / 1000) - (80 * 900)
//                 , price: 4000
//             }
//         ], {
//             shape: 'rectangle', disableSelection: false, overrides: {
//                 color: "rgba(71,255,148,0.8)", backgroundColor: "rgba(71,255,148,0.4)", transparency: 50
//             }
//         })
//     }
//
//     static clearDrawingsList(bookIDs) {
//
//         for (let i = 0; i < bookIDs.length; i++) {
//             this.chart.removeEntity(bookIDs[i])
//         }
//
//     }
//
//
//     static clearBook() {
//         SRboxes.clearDrawingsList(SRboxes.bookIDs)
//         SRboxes.bookIDs = []
//     }
//
//     static printButton() {
//
//         const Toast = Swal.mixin({
//             toast: true,
//             position: 'top-start',
//             showConfirmButton: false,
//             timer: 1500
//         });
//
//         Toast.fire({
//             // type: 'success',
//             title: 'printing firemap',
//             // text: JSON.stringify(event.data)
//         })
//
//
//
//
//
//
//     }
// }
//
//
// export {SRboxes}