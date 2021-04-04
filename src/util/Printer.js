import {Kobayashi} from "../component/Kobayashi/Kobayashi"

export class Printer {

    static chart

    static setChart(c) {
        this.chart = c
    }

    static getChart() {
        return this.chart
    }




    static startKoba(symbol) {

        console.log("PRINT KlllOBA")



        // const koba = Kobayashi.buildd(symbol)
    //


    }

    static printOrder(order) {



    }


    static clearOrders(bigOrderIds) {


        if (bigOrderIds) {
            bigOrderIds.forEach((id)=>{
                console.log("clearing " + id)
                this.chart.removeEntity(id)
            })
        }



    }
}
