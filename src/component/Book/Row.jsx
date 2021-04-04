import * as React from 'react';
import {BitmexTradeBuilder} from "../../exchanges/bitmex/BitmexTradeBuilder"

class Row extends React.Component {

    static getBgColor(side, total) {

        // if (total<1000) {
        //     return 'rgba(38,44,49,0.43)'
        // }

        var intensity = total / 6200
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

    getClassName(totalSize) {
        if (totalSize < 1000) {
            return 'booksize1'
        } else if (totalSize < 10000) {
            //1k to 10k
            return 'booksize2'
        } else if (totalSize < 100000) {
            //10k to 100k
            return 'booksize3'
        } else if (totalSize < 500000) {
            //100k to 500k
            return 'booksize4'
        } else if (totalSize < 1000000) {
            //500k to 1m
            return 'booksize5'
        } else if (totalSize < 2000000) {
            //1m to 2m
            return 'booksize6'
        } else if (totalSize < 5000000) {
            //2m to 5m
            return 'booksize7'
        } else if (totalSize < 100000000) {
            //5m to 9m
            return "booksize8"
        } else {
            return 'booksize2'
        }
    }

    render() {
        const {data} = this.props

        //
        // console.log("book")
        //
        // console.log(data)


        const row = data.map((data, i) =>
            <tr id={data.price>1?Math.floor(data.price):JSON.stringify(data.price).replace('0.','')||'x'} className={"bookrow " + this.getClassName(data.size) } key={i} style={{backgroundColor: Row.getBgColor(data.side, data.size)}}>
                {/*<td id="rowIcon"><span><img src={"img/coins/btc.png"}/></span></td>*/}
                <td id="bookprice">{data.price}</td>
                <td id="rowBody2">{BitmexTradeBuilder.getKformat(data.size, 0)}</td>

                {/*<td id={"bookprice"}>{'td!!'}</td>*/}

            </tr>
        )
        return (<tbody id="tbodyy">{row}</tbody>)
    }
}

export {Row}
