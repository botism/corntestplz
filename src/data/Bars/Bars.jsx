
export class Bars {


    static bars = {
        XBTUSD1m: [],
        XBTUSD5m: [],
        XBTUSD1h: [],
        XBTUSD1d: [],
        ETHUSD1m: [],
        ETHUSD5m: [],
        ETHUSD1h: [],
        ETHUSD1d: [],
    }

    static setAllBarholders(symbols) {
        symbols.forEach((s)=>{
            this.bars[s+'1m'] = []
            this.bars[s+'5m'] = []
            this.bars[s+'1h'] = []
            this.bars[s+'1d'] = []
        })

        console.log("new bars: " + JSON.stringify(this.bars))
    }


    static add(symbol, bin, bars) {

        if (bin==='1d') {
            bin = 'd1'
        }


        this.bars[symbol+bin] = bars
        console.log("tried to add " + symbol+bin)
        console.log(this.bars[symbol+(bin)])
    }

    static getCurrentTime(symbol) {

        let time = this.bars[symbol+'1h'][this.bars[symbol+'1h'].length-1].time/1000

        console.log("time: " + time)

        return time
    }

    static get(symbol, bin) {
        return this.bars[symbol+bin]?this.bars[symbol+bin]:["get err: " + symbol + bin + ' does not exist']
    }

    static getCurrentPrice(symbol) {
        if (this.bars[symbol+'1h'][this.bars[symbol+'1h'].length-1]) {
            return this.bars[symbol+'1h'][this.bars[symbol+'1h'].length-1].close
        }

    }

}
