import {Formatter} from "../util/Formatter"

class TradeBuilder {

    static minSlip = {
        XBTUSD: 0.5,
        XBTU19: 0.5,
        XBTZ19: 0.5,
        ETHUSD: 0.05,
        ETHU19: 0,
        LTCU19: 0,
        BCHU19: 0,
        XRPU19: 0,

        XRPH20: 0.0000001,

        XRPUSD: 0.0001,
        ADAU19: 0,
        EOSU19: 0,
        TRXU19: 0,
    }

    static symbolFixed = {
        XBTUSD: 1,
        ETHUSD: 2,

    }

    static getSlip(slip, symbol) {

        // console.log('get slip '+ slip)

        let up = slip > 0

        let slips

        if (symbol.includes('XRP')) {
            slips = Math.abs(slip).toFixed(4) > this.minSlip ? Math.abs(slip).toFixed(4) : ''
        } else {

            slips = Math.floor(Math.abs(slip))
        }



        // console.log('slips: ' + slips + 'slip: ' + slip + ' min: ' + this.minSlip[symbol])

        if (slips === '') {
            return ''
        }

        if (slips !== 0) {

            if (up) {
                return '↗ ' + slips
            } else {
                return '↘ ' + slips
            }
        }
    }

    static getNew(time) {
        let timeElapsed = (Date.now() - time) / 1000
        if (timeElapsed < 1) {
            return 1
        } else {
            return 2
        }
    }

    static getTime(time) {
        let timeElapsed = (Date.now() - time) / 1000
        if (timeElapsed < 10) {
            return "now"
        } else if (timeElapsed < 60) {
            return "<1m"
        } else if (timeElapsed < 3600) {
            return (timeElapsed / 60).toFixed(0) + "m"
        } else {
            var seconds = timeElapsed

            var days = Math.floor(seconds / (3600*24));
            seconds  -= days*3600*24;
            var hrs   = Math.floor(seconds / 3600);
            seconds  -= hrs*3600;
            var mnts = Math.floor(seconds / 60);
            seconds  -= mnts*60;
            return days>0?(days + 'd'):hrs>0?hrs + 'h':mnts + 'm'
        }
    }

    static getAmt(data) {
        if (data[1].includes('XBT') || data[1] === 'ETHUSD') {
            return ''
        } else {
            return data[1].substr(0, 3) + ' - '
        }
    }

    static getBg(s) {

        // console.log('getbg' + s)

        var side = s > 0
        var size = Math.abs(s)

        var intensity = size / 4200

        if (intensity > 165) {
            intensity = 165
        } else if (intensity < 1) {
            intensity = 1
        }

        if (side) {
            return rgb2hex(170 - intensity, 255 - intensity / 2, 170 - intensity)
        } else {
            return rgb2hex(255 - intensity / 2, 170 - intensity, 170 - intensity)
        }

        function rgb2hex(red, green, blue) {
            var rgb = blue | (green << 8) | (red << 16)
            return '#' + (0x1000000 + rgb).toString(16).slice(1)
        }

    }
}

export {TradeBuilder}
