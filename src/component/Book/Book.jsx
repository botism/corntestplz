import React, {Component} from 'react'
import App from "../../App"

import './Book.css'
import {Books} from "../../data/Books"
import BroadcastChannel from "broadcast-channel"
import {Table} from "./Table.jsx"

import $ from 'jquery'
import {Bars} from "../../data/Bars/Bars"

import {Prices} from '../../data/Prices.jsx'
import {Printer} from "../../utils/Printer"
import {Formatter} from "../../utils/Formatter"
import {Row} from "../Book2/Row"


export class BookC extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            symbol: 'XBTUSD',
            book: [],
            draw: true,
            bigOrderIds: [],
            on: false
        }

        this.printBigOrders = this.printBigOrders.bind(this)

        this.toggle = this.toggle.bind(this)




    }

    // setBook(book) {
    //     this.setState({book: book, ran: Math.random()})
    // }


    printBigOrders() {

        console.log("printing big orders")

        Printer.clearOrders(this.state.bigOrderIds)

        let ids = []

        let now = Formatter.roundTo(Date.now() / 1000, 900)

        for (let i = 0; i < this.state.book.length; i++) {
            const book = this.state.book[i]



            if (book.size >= 1000000) {

                let now = Formatter.roundTo(Date.now() / 1000, 900)
                console.log("printing " + JSON.stringify(book))

                ids.push(Printer.getChart().createMultipointShape([
                    {
                        time: now
                        , price: book.price
                    },
                    {
                        time: (now) + (10 * 900)
                        , price: book.price
                    }
                ], {
                    shape: 'trend_line',
                    // color: bid?"#83ff59":"#ff2a31",
                    disableSelection: true,
                    lock: true,
                    zOrder: "bottom",

                    overrides: {
                        linecolor: Row.getBgColor(book.side, book.size),
                        linewidth: book.size<2000000?1:book.size<5000000?2:3,
                        // text: Formatter.getKformat(book.size, 0) + '    -',
                        // text: period+len,
                        // text: (plus?'♯ ':'') + (period==="15m"?' ♪ ♩♪ ♬ ♭ ♪ ♩  ♪  ♭  ♬ ♪ ':' ♫    ♬ ♫♫   ♫ ♫♬  ♫  ♫ ♬   ♬ ♫ '),
                        // fontsize: 15,
                        // color: book.size<500000?'#1d1d1d':book.size<1000000?'#ffffff':'#f9ff3a',
                        // fillBackground: true,
                        // borderColor: book.size < 2500000 ? '' : book.size < 5000000 ? "#fffa9e" : "#ffff22",
                        // backgroundColor: Row.getBgColor(book.side, book.size),
                        // drawBorder: true,
                        // linewidth: qty < 5000000 ? 1.0 : 3.0,
                        // transparency: 50,
                        // font: "Arial",
                        // fixedSize: true,
                        // bold: qty >= 1000000
                    }
                }))





                let qtyPercent = book.size / 3000000

                let color = book.side ? "rgba(38,153,50," + qtyPercent + ")" : "rgba(153,43,54," + qtyPercent + ")"

                //
                // TEXT BOX
                //

                let sizee = Formatter.getKformat(book.size, 0)

                if (sizee.length < 4) {
                    sizee = sizee + "  "
                }


                ids.push(Printer.getChart().createMultipointShape([
                    {
                        time: (now) + (10 * 900)
                        , price: book.price + (book.side ? 0 : 0.5) //todo: use ticks for alts offset
                    }
                ], {
                    shape: 'text',
                    // color: bid?"#83ff59":"#ff2a31",
                    disableSelection: false,
                    zOrder: "bottom",

                    overrides: {
                        text: "                          " + sizee + "       " + book.price + "                            -",
                        fontsize: 12,
                        color: book.size < 500000 ? "#585858" : book.size < 1000000 ? 'rgb(253,253,255)' : "#e5e642",
                        fillBackground: true,
                        borderColor: book.size < 2500000 ? color : book.size < 5000000 ? "#feff3c" : "#ffff22",
                        backgroundColor: color,
                        drawBorder: true,
                        linewidth: book.size < 5000000 ? 1.0 : 3.0,
                        transparency: 0,
                        font: "Arial",
                        fixedSize: true,
                        bold: book.size >= 1000000
                    }
                }))

                this.setState({bigOrderIds: ids})
            }
        }

    }


    componentDidMount() {



        setTimeout(()=>{
            this.setState({book: []})
            this.setState({on: true})
            const s = "{\"op\": \"subscribe\", \"args\": [" +
                // "\"trade:XBTUSD\"]}"
                "\"orderBookL2:XBTUSD\"]}"
            console.log("sending " + s)
            this.props.context.getBitmexWebsocket().send(s)
        }, 3000)

        // setTimeout(()=>setInterval(this.printBigOrders, 3000), 6000)


        setInterval(this.dobook.bind(this), 150)



        const channelSymbolChange = new BroadcastChannel('symbolChange')
        channelSymbolChange.onmessage = msg => {


            console.log("book got symbolchange msg " + msg)

            if (this.state.symbol !== msg.replace('-','')) {
                const unsub = "{\"op\": \"unsubscribe\", \"args\": [" +
                    // "\"trade:XBTUSD\"]}"
                    "\"orderBookL2:"+this.state.symbol+"\"]}"
                console.log("sending " + unsub)
                this.props.context.getBitmexWebsocket().send(unsub)


                this.setState({symbol: msg.replace('-','')})

                this.setState({book: []})


                // this.setState({on: true})
                const s = "{\"op\": \"subscribe\", \"args\": [" +
                    // "\"trade:XBTUSD\"]}"
                    "\"orderBookL2:"+msg.replace('-','')+"\"]}"
                console.log("sending " + s)
                this.props.context.getBitmexWebsocket().send(s)
            }



            // ActiveSymbol.setSymbol(msg)

        }

        // setInterval(() => this.setBook(Books.get('XBTUSD')), 300)
        //
        // function scrollToMid() {
        //     console.log('scroll to end')
        //
        //     var container = $('#tableMain')
        //
        //     var scrollTo = $('#' + (Math.floor(Prices['XBTUSD'])))
        //
        //     if (scrollTo.offset()) {
        //         container.animate({
        //             scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        //         });
        //     }
        //
        //
        // }

        // setInterval(scrollToMid, 5000)


        setInterval(() => {
            // console.log('scroll to ' + Prices['XBTUSD'])

            var container = $('#tableMain')

            let gap = this.getGap(this.state.symbol)

            //todo get active price better
            var scrollTo = $('#' + gap)

            // console.log(scrollTo)

            // console.log("scrollto " + Prices[this.state.symbol])

            if (scrollTo.offset()) {
                container.animate({
                    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                })
            }


        }, 3000)


    }

    getGap(symbol) {

        const price = Prices[symbol]

        if (symbol==='XBTUSD') {
            return Math.floor(price+10)
        } else if (symbol==='ETHUSD') {
            return Math.floor(price+1)
        } else if (symbol==='XRPM19') {
            return JSON.stringify(price + 0.00000009).replace('0.','')
        }
    }

    async dobook() {

        // console.log('dobook ' + this.state.symbol)

        let book = Books.get(this.state.symbol)

        // console.log("book len: " + book.length)


        if (!book || book.length < 200){return}

        // console.log("book: " + JSON.stringify(book))

        // var book1
        //
        // for( let i = 0; i < book.length; i++) {
        //     if (i===0 || i%2===0) {
        //         book1.push(book[i])
        //     } else {
        //         book1[book1.length-1].size = book1[book1.length-1].size + book[i].size
        //     }
        // }
        //
        // book = book1

//         //todo for full l2 book
        let indexUp = 100
//
        let indexDown = 105
//
        if (Prices.laggy[this.state.symbol]) {

            // console.log("laggyyy " + Prices.laggy[this.state.symbol])

            indexDown = book.findIndex(item => {


                return (item.price ? item.price.toFixed(8) : '') === Prices.laggy[this.state.symbol].toFixed(8)

            }) - 50

            indexUp = book.findIndex(item => (item.price ? item.price.toFixed(8) : '') === Prices.laggy[this.state.symbol].toFixed(8)) + 50
        }
//
// //
// // //todo: bars.getcurrentprice isnt getting update, then book will work
// //
// // console.log("indexup: " + indexUp + " indexDown: " + indexDown)
//
//

        // console.log("book len: " + book.length)

        if (!book) {return}

        if (book.length > 1) {

            // console.log("setting book down: " + indexDown + " up: " + indexUp)
            // console.log(book.slice(indexDown, indexUp))

            this.setState({
                book: book.slice(indexDown, indexUp)
            })


            // console.log("book now " + book[1])

            // this.setState({book: book.slice(book.length/2/2, book.length/1.5)})
            // this.setState({book: book.slice(book.length/2/2, book.length/1.5)})


            // console.log("book: " + JSON.stringify(this.state.book))


        }

    }

    toggle = () => {


        console.log("toggle symbol " + this.props.context.state.symbol.short)


        if (this.state.on===false) {
            // this.setState({book: []})
            this.setState({on: true})
            // const s = "{\"op\": \"subscribe\", \"args\": [" +
            //     // "\"trade:XBTUSD\"]}"
            //     "\"orderBookL2:"+this.state.symbol+"\"]}"
            // console.log("sending " + s)
            // this.props.context.getBitmexWebsocket().send(s)
        } else {
            this.setState({on: false})

            // const s = "{\"op\": \"unsubscribe\", \"args\": [" +
            //     // "\"trade:XBTUSD\"]}"
            //     "\"orderBookL2:"+ this.state.symbol +"\"]}"
            // console.log("sending " + s)
            //
            // this.props.context.getBitmexWebsocket().send(s)
        }
    }


    render() {

        if (this.state.on===true) {
            return (
                <div id="tableMain" onClick={this.toggle}>
                    <Table data={this.state.book}/>
                </div>
            )
        } else {
            return (
                <div id="tableMain" onClick={this.toggle.bind(this)} style={{ padding: 8, paddingTop: 20, color: 'rgba(255,255,255,0.55)'}}>
                    start book
                </div>
            )
        }

    }
}


class Book extends Component {

    constructor(props) {
        super(props)

        this.state = {
            context: App.getContext()
        }


    }


    render() {
        return (
            <this.state.context.Consumer>
                {context => (<BookC props={this.props} context={context}/>)}
            </this.state.context.Consumer>
        )
    }
}

export {Book}
