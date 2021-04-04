
export class Books {


    static book = {
        XBTUSD: [{hi: 'hi'}],
        ETHUSD: [{hi: 'hi'}],

        XBTU19: [{hi: 'hi'}],
        XBTM19: [{hi: 'hi'}],
        ETHM19: [{hi: 'hi'}],
        ADAM19: [{hi: 'hi'}],
        EOSM19: [{hi: 'hi'}],
        LTCM19: [{hi: 'hi'}],
        TRXM19: [{hi: 'hi'}],
        BCHM19: [{hi: 'hi'}],
        XRPM19: [{hi: 'hi'}],



    }

    static add(symbol, bin, bars) {
        this.bars[symbol+bin] = bars
        console.log("tried to add " + symbol+bin)
        console.log(this.bars[symbol+bin])
    }

    static get(symbol) {

        // console.log("book get " + symbol)

        return this.book[symbol]
    }

    static set(symbol, book) {

        // console.log("book set " + symbol + " len: " + book.length)

        this.book[symbol] = book


    }

}
