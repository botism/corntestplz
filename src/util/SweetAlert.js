import Swal from 'sweetalert2'
import '../index.css'

import ftxlogo from '../ftxlogo.png'

class SweetAlert {

    static startMessage() {

        let msgs = [
            'top minds of CT making the switch RIGHT NOW',
            'imagine trading with overload in 2019, getting arthur\'d daily, it\'s OVER',
            // 'please i\'m begging at this point..',
            // 'DO IT NOW',
            // 'help feed a broke brainlet',
            // 'sire, the time is now.  PACK IT UP'
        ]

        let lastmsgg = msgs[~~(Math.random() * msgs.length)]




        if (
            // true
            (!navigator.language.toLowerCase().includes('en-us'))
        ) {

            SweetAlert.miniBanner()

            // Swal.fire({
            //     // title: 'my Bybit refink',
            //     // text: "You won't be able to revert this!",
            //     html: '<h2 class="hoverWhite">welcome to the <span style="color: #ff8128">corn</span>.<span style="color: darkorange">tools</span> beta!</h2> <span class="hoverWhite">Trade BTC and altcoins with 100x leverage on Bybit:</span> <br/><br/>  <a href="https://www.bybit.com/a/corn" target="_blank" style="color:#44a1b3"><img width="480" height="250" src="/images/bybit1.png" alt="https://www.bybit.com/a/corn"/></a>  <a href="https://www.bybit.com/a/corn" target="_blank" style="color:#44a1b3"><h1 id="linkkk">bybit.com/a/corn</h1></a> ',
            //     // icon: 'warning',
            //     // imageUrl: 'images/bybit1.png',
            //     //         imageWidth: 400,
            //     //         imageHeight: 200,
            //     //         imageAlt: 'bybit.com/a/corn',
            //     background: 'rgba(0, 0, 0, 0.75)',
            //     showCancelButton: true,
            //     padding: '1em',
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     cancelButtonText: 'nope',
            //     confirmButtonText: 'Go to Bybit'
            // }).then((result) => {
            //     if (result.value) {
            //         window.open('https://www.bybit.com/a/corn', "_blank");
            //     }
            // })
        } else {
            // Swal.fire({
            //     // title: 'my Bybit refink',
            //     // text: "You won't be able to revert this!",
            //     html: '<h2 class="hoverWhite">welcome to the <span style="color: #ff8128">corn</span>.<span style="color: darkorange">tools</span> beta!</h2> <br/> <span class="hoverWhite">FTX is the new GOAT exchange, get 5% off fees with my refcode "corn" (you can use the link or set it later in settings) </span> <br/> <a href="https://ftx.com/#a=corn" target="_blank" style="color:#ff5728"><h1 id="linkkk">https://ftx.com/#a=corn</h1></a> <br/> <span class="hoverWhite">♥ trade LINK-USD and DOGE-USD with leverage! </span>',
            //     // icon: 'warning',
            //     imageUrl: 'images/ftxlogo.png',
            //             imageWidth: 164,
            //             imageHeight: 60,
            //             imageAlt: 'https://ftx.com/#a=corn',
            //     background: 'rgba(0, 0, 0, 0.75)',
            //     showCancelButton: true,
            //     padding: '1em',
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     cancelButtonText: 'nope',
            //     confirmButtonText: 'Go to FTX'
            // }).then((result) => {
            //     if (result.value) {
            //         window.open('https://ftx.com/#a=corn', "_blank");
            //     }
            // })
        }




    }

    static mini(title, text, position, type, time) {
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: time,
            // height: 300,

        });

        let ran = Math.random()

        Toast.fire({
            type: type,
            title: title,
            // text: text
            imageUrl: 'images/cornicon.png'
        })
    }

    static miniBanner() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 20000,
            background: '#000',
            padding: 0,
            margin: 0,
            // height: 300,

        });

        Toast.fire({
            type: '',
            title: '',
            // text: text
            html: (
                "<div><a href='https://www.bybit.com/a/corn' target='_blank'><img src='images/bannerr.png' alt='https://bybit.com/a/corn'/></a></div>"
            )
            // imageUrl: 'images/bannerr.png'
        })
    }
}

export {SweetAlert}
