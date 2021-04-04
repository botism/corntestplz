import {Printer} from "../util/Printer"
import {KobayashiIDs} from "../data/KobayashiIDs"


export class Murrey {

    static printMurreys(period, bars, len, plus) {

        console.log("printing ")

        // bars = bars.slice(bars.length-250, bars.length-1)

        if (plus===1) {
            this.printFutureMurreys(period, bars, plus, len)
        } else {
            //15m128

            // console.log("printing murreys with bars " + JSON.stringify(bars))


            let rectangles = []

            for (let i = len + 1; i < bars.length; i++) {

                // console.log("check bar " + i + ": " + JSON.stringify(bars[i]))

                let high = 0
                let low = 1000000

                for (let j = i - len; j < i; j++) {
                    // console.log("barsj: " + JSON.stringify(bars[j]))

                    var jclose = parseFloat(bars[j].close)

                    // console.log("barsj close: " + jclose + " >high "  + high + " ? " + (jclose > high))

                    high = jclose > high ? jclose : high
                    low = jclose < low ? jclose : low

                    // console.log("high: " + high)
                }

                // console.log("bar " + i + " high " + high + " low " + low)


                // console.log("current range high: " + high + " low: " + low)

                let murreys = this.getMurreys(high, low)

                // console.log("murrey 0 " + murreys.zero)

                if (murreys.zero) {
                    if (rectangles.length === 0) {
                        rectangles.push({
                            top: murreys.zero,
                            bottom: murreys.minus3,
                            chortTop: murreys.plus3,
                            chortBottom: murreys.eight,
                            startTime: bars[i].time,
                            endTime: bars[i].time
                        })
                    } else if (rectangles[rectangles.length - 1].top === murreys.zero
                        && rectangles[rectangles.length - 1].bottom === murreys.minus3) {
                        //if stretch same frame
                        rectangles[rectangles.length - 1].endTime = bars[i].time
                    } else {
                        //new rectangle
                        rectangles.push({
                            top: murreys.zero,
                            bottom: murreys.minus3,
                            chortTop: murreys.plus3,
                            chortBottom: murreys.eight,
                            startTime: bars[i].time,
                            endTime: bars[i].time
                        })
                    }
                }


            }

            // console.log("printrects period " + period + " rects " + JSON.stringify(rectangles))

            this.printRectangles(period, len, plus, rectangles)

        }



    }


    static printFutureMurreys(period, bars, plus, len) {

        // console.log("print futuremurrey " + period + " " + len)

        let rectangles = []

        for (let i = len + 1; i < bars.length; i++) {

            let high = 0
            let low = 1000000

            for (let j = i - len; j < i; j++) {

                var jclose = parseFloat(bars[j].close)

                high = jclose > high ? jclose : high
                low = jclose < low ? jclose : low
            }

            let murreys = this.getMurreys(high, low)

            // console.log("got murrey 0: " + murreys.zero )

            //
            var nextmurreyUPPER

            while (true) {

                // console.log("bar: " + bars[i])

                high *= 1.012

                // console.log("trying with high: " + high + " low: " + low)

                nextmurreyUPPER = this.getMurreys(high, low)

                if (murreys.eight !== nextmurreyUPPER.eight) {
                    // console.log("new murrey!  0 went from " + murreys.zero + " to " + nextmurrey.zero)
                    break
                }
            }

            var nextmurreyLOWER

            while (true) {

                // console.log("bar: " + bars[i])

                low *= .9988

                // console.log("trying with high: " + high + " low: " + low)

                nextmurreyLOWER = this.getMurreys(high, low)

                if (murreys.minus3 !== nextmurreyLOWER.minus3 && murreys.zero !== nextmurreyLOWER.zero) {
                    // console.log("new murrey!  0 went from " + murreys.zero + " to " + nextmurrey.zero)
                    break
                }
            }

            murreys = {
                minus3: nextmurreyLOWER.minus3,
                minus2: nextmurreyLOWER.minus2,
                minus1: nextmurreyLOWER.minus1,
                zero: nextmurreyLOWER.zero,
                one: nextmurreyLOWER.minus1,
                two: nextmurreyLOWER.minus2,
                three: nextmurreyLOWER.minus3,
                four: nextmurreyUPPER.four,
                five: nextmurreyUPPER.five,
                six: nextmurreyUPPER.six,
                seven: nextmurreyUPPER.seven,
                eight: nextmurreyUPPER.eight,
                plus1: nextmurreyUPPER.plus1,
                plus2: nextmurreyUPPER.plus2,
                plus3: nextmurreyUPPER.plus3
            }
            //

            if (murreys.zero) {
                if (rectangles.length === 0) {
                    rectangles.push({
                        top: murreys.zero,
                        bottom: murreys.minus3,
                        chortTop: murreys.plus3,
                        chortBottom: murreys.eight,
                        startTime: bars[i].time,
                        endTime: bars[i].time
                    })
                } else if (rectangles[rectangles.length - 1].top === murreys.zero
                    && rectangles[rectangles.length - 1].bottom === murreys.minus3) {
                    //if stretch same frame
                    rectangles[rectangles.length - 1].endTime = bars[i].time
                } else {
                    //new rectangle
                    rectangles.push({
                        top: murreys.zero,
                        bottom: murreys.minus3,
                        chortTop: murreys.plus3,
                        chortBottom: murreys.eight,
                        startTime: bars[i].time,
                        endTime: bars[i].time
                    })
                }
            }


        }

        this.printRectangles(period, len, plus, rectangles, 1)


    }


    static printRectangles(period, len, plus, rectangles, style) {


        let ids = []

        // console.log("bars15m current bar: " + this.bars15m[this.bars15m.length-1].time + " behind that: " + this.bars15m[this.bars15m.length-2].time)

        for (let i = 0; i < rectangles.length; i++) {

            // console.log(rectangles[i].startTime)

            let stime = ((rectangles[i].startTime+60) / 1000)
            let etime = ((rectangles[i].endTime) / 1000)
            // console.log("etime: " + etime + "gap: " + (1552935600-etime))

            // let endtime = parseInt(1552860900000+(1*900000))

            // console.log("printing with stime: " + stime + " edtime: " + etime + " period: " + period)

            ids.push(Printer.getChart().createMultipointShape([
                {
                    time: stime
                        - (2 * 36000)
                    , price: rectangles[i].bottom
                },
                {
                    time: etime
                        + ( (
                            // i===rectangles.length||i===rectangles.length-1||i===rectangles.length-2||i===rectangles.length-3 ? 3:2
                            7
                        ) * 36000)
                    , price: rectangles[i].top
                }
            ], {
                shape: 'rectangle',
                disableSelection: true,
                lock: true,
                overrides: {
                    color: "rgba(99,255,205,0.07)",
                    // color: "rgba(0,0,0,0)",

                    backgroundColor: "#2d9c30",
                    // fillBackground: false,
                    transparency: 96,
                }
            }))

            ids.push(Printer.getChart().createMultipointShape([
                {
                    time: stime
                        - (1 * 36000)
                    , price: rectangles[i].chortBottom
                },
                {
                    time: etime
                        + (4
                            // ((i===rectangles.length||i===rectangles.length-1||i===rectangles.length-2||i===rectangles.length-3)? 3:2
                        ) * 36000

                    , price: rectangles[i].chortTop
                }
            ], {
                shape: 'rectangle',
                disableSelection: true,
                lock: true,
                overrides: {
                    color: "rgba(181,111,57,0.28)",
                    // color: "rgba(0,0,0,0)",

                    backgroundColor: period === "15m" ? "#b53237" : period === "60m" ? "#d33c41" : "#ff408d",
                    // fillBackground: false,
                    transparency: 96 //136, 211, 212, .2
                }
            }))

            // || always on all labels
            //
            // if ((i===rectangles.length-1 || i===rectangles.length) && (len>=64)) {
            //     ids.push(Printer.getChart().createMultipointShape([
            //         {
            //             time: stime
            //                 - (1 * 36000)
            //             , price: rectangles[i].top
            //         }
            //     ], {
            //         shape: 'text',
            //         // color: bid?"#83ff59":"#ff2a31",
            //         disableSelection: true,
            //         lock: true,
            //         zOrder: "bottom",
            //
            //         overrides: {
            //             text: 'hi',
            //             // text: period+len,
            //             // text: (plus?'♯ ':'') + (period==="15m"?' ♪ ♩♪ ♬ ♭ ♪ ♩  ♪  ♭  ♬ ♪ ':' ♫    ♬ ♫♫   ♫ ♫♬  ♫  ♫ ♬   ♬ ♫ '),
            //             fontsize: 17,
            //             color: 'rgba(45,255,38,0.14)',
            //             fillBackground: true,
            //             // borderColor: "rgba(91,255,164,0.41)",
            //             backgroundColor: 'rgba(255,255,255,0)',
            //             drawBorder: false,
            //             // linewidth: qty < 5000000 ? 1.0 : 3.0,
            //             // transparency: 50,
            //             font: "Arial",
            //             fixedSize: true,
            //             // bold: qty >= 1000000
            //         }
            //     }))
            //     ids.push(Printer.getChart().createMultipointShape([
            //         {
            //             time: stime
            //                 - (1 * 36000)
            //             , price: rectangles[i].chortTop
            //         }
            //     ], {
            //         shape: 'text',
            //         // color: bid?"#83ff59":"#ff2a31",
            //         disableSelection: true,
            //         lock: true,
            //         zOrder: "bottom",
            //
            //         overrides: {
            //             text: '\n' +
            //                 '️ユダヤ人はそ✡️れをダンプ' +(plus?'✡️️️':'️'),
            //             // text: period+len,
            //             fontsize: 17,
            //             color: 'rgba(255,66,83,0.14)',
            //             fillBackground: true,
            //             // borderColor: qty < 2500000 ? color : qty < 5000000 ? "#feff3c" : "#ffff22",
            //             backgroundColor: 'rgba(255,255,255,0)',
            //             drawBorder: false,
            //             // linewidth: qty < 5000000 ? 1.0 : 3.0,
            //             // transparency: 50,
            //             font: "Arial",
            //             fixedSize: true,
            //             // bold: qty >= 1000000
            //         }
            //     }))
            // }


        }



        let currentIds = this.ids?this.ids:[]

        KobayashiIDs.ids = currentIds.concat(KobayashiIDs.ids)


        this.ids = currentIds.concat(ids)

        // console.log("new this.ids: " + JSON.stringify(this.ids))


    }

    static getMurreys(high, low) {

        //murrrey range of current bar

        //
        // let frame = 192
        // let mult = 1

//-- defines
        let logTen = Math.log(10)
        let log8 = Math.log(8)
        let log2 = Math.log(2)
        // let lookback = Math.round(frame * mult)

//-- determine price values based on ignore wick selection
//         let uPrice = high
//         let lPrice = low

//-- find highest/lowest price over specified lookback
        let vLow = low
        let vHigh = high
        let vDist = vHigh - vLow
//-- if low price is < 0 then adjust accordingly
        let tmpHigh = vLow < 0 ? (0 - vLow) : vHigh
        let tmpLow = vLow < 0 ? ((0 - vLow) - vDist) : vLow

//-- determine if price shift is in place
        let shift = vLow < 0 ? true : false

//-- calculate scale frame
        let sfVar = Math.log(0.4 * tmpHigh) / logTen - Math.floor(Math.log(0.4 * tmpHigh) / logTen)
        let SR = tmpHigh > 25 ? (sfVar > 0 ? Math.exp(logTen * (Math.floor(Math.log(0.4 * tmpHigh) / logTen) + 1)) : Math.exp(logTen * (Math.floor(Math.log(0.4 * tmpHigh) / logTen)))) : 100 * Math.exp(log8 * (Math.floor(Math.log(0.005 * tmpHigh) / log8)))
        let nVar1 = (Math.log(SR / (tmpHigh - tmpLow)) / log8)
        let nVar2 = nVar1 - Math.floor(nVar1)
        let N = nVar1 <= 0 ? 0 : (nVar2 === 0 ? Math.floor(nVar1) : Math.floor(nVar1) + 1)

//-- calculate scale interval and temporary frame top and bottom
        let SI = SR * Math.exp(-(N) * log8)
        let M = Math.floor(((1.0 / log2) * Math.log((tmpHigh - tmpLow) / SI)) + 0.0000001)
        let I = Math.round(((tmpHigh + tmpLow) * 0.5) / (SI * Math.exp((M - 1) * log2)))

        let Bot = (I - 1) * SI * Math.exp((M - 1) * log2)
        let Top = (I + 1) * SI * Math.exp((M - 1) * log2)

//-- determine if frame shift is required
        let doShift = ((tmpHigh - Top) > 0.25 * (Top - Bot)) || ((Bot - tmpLow) > 0.25 * (Top - Bot))

        let ER = doShift === true ? 1 : 0

        let MM = ER === 0 ? M : (ER === 1 && M < 2) ? M + 1 : 0
        let NN = ER === 0 ? N : (ER === 1 && M < 2) ? N : N - 1

//-- recalculate scale interval and top and bottom of frame, if necessary
        let finalSI = ER === 1 ? (SR * Math.exp(-(NN) * log8)) : SI
        let finalI = ER === 1 ? Math.round(((tmpHigh + tmpLow) * 0.5) / (finalSI * Math.exp((MM - 1) * log2))) : I
        let finalBot = ER === 1 ? (finalI - 1) * finalSI * Math.exp((MM - 1) * log2) : Bot
        let finalTop = ER === 1 ? (finalI + 1) * finalSI * Math.exp((MM - 1) * log2) : Top

//-- determine the increment
        let Increment = (finalTop - finalBot) / 8

//-- determine the absolute top
        let absTop = shift === true ? -(finalBot - (3 * Increment)) : finalTop + (3 * Increment)

//-- create our Murrey line variables based on absolute top and the increment
        let Plus38 = absTop
        let Plus28 = absTop - Increment
        let Plus18 = absTop - (2 * Increment)
        let EightEight = absTop - (3 * Increment)
        let SevenEight = absTop - (4 * Increment)
        let SixEight = absTop - (5 * Increment)
        let FiveEight = absTop - (6 * Increment)
        let FourEight = absTop - (7 * Increment)
        let ThreeEight = absTop - (8 * Increment)
        let TwoEight = absTop - (9 * Increment)
        let OneEight = absTop - (10 * Increment)
        let ZeroEight = absTop - (11 * Increment)
        let Minus18 = absTop - (12 * Increment)
        let Minus28 = absTop - (13 * Increment)
        let Minus38 = absTop - (14 * Increment)

        let murreys = {
            minus3: Minus38,
            minus2: Minus28,
            minus1: Minus18,
            zero: ZeroEight,
            one: OneEight,
            two: TwoEight,
            three: ThreeEight,
            four: FourEight,
            five: FiveEight,
            six: SixEight,
            seven: SevenEight,
            eight: EightEight,
            plus1: Plus18,
            plus2: Plus28,
            plus3: Plus38
        }

        return murreys
    }
}

