import React, {Component} from 'react'
import App from "../../App"
import {Murrey} from "../../memes/Murrey"
import {Bars} from "../../data/Bars/Bars"
import {Printer} from "../../util/Printer"
import {KobayashiIDs} from "../../data/KobayashiIDs"


class KobayashiC extends Component {

    constructor(props) {
        super(props)


        this.state = {
            context: App.getContext(),
            show: true,
            bars: Bars.get(this.props.context.state.symbol, '1h')
        }
    }

    build(symbol) {

        return ['a','b','c']

    }



    testt() {

        console.log("current 1h bars " + this.props.context.state.symbol + ": ")
        console.log(Bars.get(this.props.context.state.symbol, '1h'))

    }

    render() {
        return (
            <this.state.context.Consumer>
                {context => (
                    <div id={"Kobayashi"}>

                        <h1>Kobayashi</h1>

                        <input type={"checkbox"} id={"checkboxreduce"} onChange={this.onCheckbox} checked={this.state.show}/>show

                    </div>
                )}
            </this.state.context.Consumer>
        )
    }
}

class Kobayashi extends Component {
    constructor(props) {super(props);this.state = {context: App.getContext()}}

    //context
    render() {return (<this.state.context.Consumer>
        {context => (<KobayashiC context={context}/>)}
    </this.state.context.Consumer>)}


    static buildd(symbol) {

        //clear all\
        //
        // console.log("clearing orders.. len " + KobayashiIDs.ids.length)
        // Printer.clearOrders(KobayashiIDs.ids)
        //
        // // KobayashiIDs.ids = []
        //
        // console.log("new koba len: " + KobayashiIDs.ids.length)

        // console.log("koba ids " + KobayashiIDs.ids.length)
        //
        // KobayashiIDs.ids.forEach((id)=>{
        //     Printer.getChart().removeEntity(id)
        //
        // })
        //
        //
        // //
        // KobayashiIDs.ids = []


        // Printer.getChart().removeAllShapes()


        // console.log("new koba ids " + KobayashiIDs.ids.length)


        // KobayashiIDs.ids = []


        console.log("building kobayashi with " + symbol)

        const bars1h = Bars.get(symbol, '1h')

        const bars1hs = bars1h.slice(bars1h.length-1700, bars1h.length-1)

        // console.log(JSON.stringify("bars1h: " + bars1h))


        // Murrey.printMurreys('1h', bars1h, 4)
        // Murrey.printMurreys('1h', bars1hs, 8)
        // Murrey.printMurreys('1h', bars1hs, 16)
        // Murrey.printMurreys('1h', bars1hs, 16, 1)
        // Murrey.printMurreys('1h', bars1hs, 16, 1)
        // Murrey.printMurreys('1h', bars1hs, 16, 1)
        //
        // //
        // //
        // Murrey.printMurreys('1h', bars1hs, 32)
        // Murrey.printMurreys('1h', bars1hs, 64)
        // Murrey.printMurreys('1h', bars1hs, 64, 1)
        //
        // Murrey.printMurreys('1h', bars1hs, 128)
        Murrey.printMurreys('1h', bars1hs, 216,1)

        // Murrey.printMurreys('1h', bars1hs, 239,1)

        Murrey.printMurreys('1h', bars1hs, 256)


        Murrey.printMurreys('1h', bars1hs, 256,1)

        Murrey.printMurreys('1h', bars1hs, 305,1)

        Murrey.printMurreys('1h', bars1hs, 420,1)


        // Murrey.printMurreys('1h', bars1hs, 256)
        // Murrey.printMurreys('1h', bars1hs, 256, 1)


        //
        // Murrey.printMurreys('1h', bars1h, 192)


        // Murrey.printMurreys('1h', bars1h, 192)




    }


}



export {Kobayashi}




