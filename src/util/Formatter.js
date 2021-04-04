class Formatter {

    static commas(size) {
        if (size < 1) {
            return size
        } else {
            return size.replace('.0', '').toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")
        }
    }

    static getKformat(size, iteration) {
        size = Math.abs(size)
        if (size >= 1) {
            if (size < 1000) {
                return this.lowFormat(size)
            }
            let c = ["k", "m", "b"]
            let d = (size / 100) / 10.0
            let isRound = (d * 10) % 10 === 0
            let s = (d < 1000 ?
                ((d > 99.9 || isRound || (!isRound && d > 9.99) ?
                        d.toFixed(0) * 10 / 10 : d.toFixed(1) + ""
                ) + "" + c[iteration]) : this.getKformat(d, iteration + 1))
            s = s.replace(".0m", "m")
            s = s.replace("000k", "m")
            s = s.replace(".0k", "k")
            return s
        } else {
            return 0
        }
    }

    static lowFormat(size) {
        return Math.abs(Math.round(size)).toFixed(0)
    }

    static roundTo(thiss, num) {
        var resto = thiss % num
        if (resto <= (num / 2)) {
            return thiss - resto
        } else {
            return thiss + num - resto
        }
    }



    static getpoint5round(p) {
        if (p % 0.5 === 0) {
            return p.toFixed(1)
        } else if (p % 1 > 0.7) {

            return Math.ceil(p).toFixed(1)

        } else if (p % 1 < 0.3) {

            return Math.floor(p).toFixed(1)

        } else {

            return (p - (p % 1) + 0.5).toFixed(1)
        }
    }
}

export {Formatter}
