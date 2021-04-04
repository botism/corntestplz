import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {SweetAlert} from "./util/SweetAlert"
import * as serviceWorker from './util/serviceWorker';
import {BaseComponent} from "./component/BaseComponent"

import $ from 'jquery'
import Swal from "sweetalert2"

// console.log = function(){};

ReactDOM.render(<App />, document.getElementById('root'));






serviceWorker.register()

console.log = ()=>{}

if ($(window).width() > 800
    // &&(
    // navigator.language.toLocaleLowerCase() !== 'en-us' ||
    // (Math.random()>=0.36))
) {
    setTimeout(()=>{

        SweetAlert.startMessage()

        // let msgs = [
        //     'top minds of CT making the switch RIGHT NOW',
        //     'imagine trading with overload in 2019, getting arthur\'d daily, it\'s OVER',
        //     // 'please i\'m begging at this point..',
        //     // 'DO IT NOW',
        //     // 'help feed a broke brainlet',
        //     // 'sire, the time is now.  PACK IT UP'
        // ]
        //
        // let lastmsgg = msgs[~~(Math.random() * msgs.length)]
        //
        //
        // Swal.fire({
        //     // title: 'my Bybit refink',
        //     // text: "You won't be able to revert this!",
        //     html: '<h2>welcome to the <span style="color: #ffaf59">corn</span>.<span style="color: darkorange">tools</span> beta!</h2> <br/> the bitmex/deribit mass exodus has begun.  if my sites have helped you, please consider using my reflinks! <br/> <a href="https://www.bybit.com/a/corn" target="_blank" style="color:#2fadec"><h1 id="linkkk">bybit.com/a/corn</h1></a> <br/>' +
        //         // '♥ no KYC, easy sign-up<br/>♥ trade 100x bitcoin and alts<br/>♥ lowest slippage<br/>♥ '+lastmsgg,
        //         '<a href="https://ftx.com/#a=1738306" target="_blank" style="color:#2fadec"><h1 id="linkkk">bybit.com/a/corn</h1></a> <br/>',
        //     // icon: 'warning',
        //     // imageUrl: 'images/bybit1.png',
        //     //         imageWidth: 400,
        //     //         imageHeight: 200,
        //     //         imageAlt: 'bybit.com/a/corn',
        //     // background: 'rgb(149, 215, 232)',
        //     showCancelButton: true,
        //     // padding: '1em',
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     cancelButtonText: 'lol nope',
        //     confirmButtonText: 'View live trading'
        // }).then((result) => {
        //     if (result.value) {
        //         window.open('https://www.bybit.com/a/corn', "_blank");
        //     }
        // })



    },5000)
}





$(document).mouseup(function (e) {

    if (BaseComponent.lastDel !== (()=>{})) {

        // if (Date.now() > BaseComponent.downTime+1000) {

            // console.log('mouseup basedelid ' + BaseComponent.idd)


            BaseComponent.lastDel()

            BaseComponent.lastDel = ()=>{}
        // }
    }

});






let lastt = 111111111111

setInterval(()=>{

    let diff = Date.now()-lastt

    // console.log('diff: ' + diff)

    if (diff > 20000 && lastt !== 111111111111) {
        setTimeout(()=>{
            SweetAlert.mini('refreshing..')
            setTimeout(()=>{
                window.location.reload(true);
            },3000)
        },1000)
    }

    lastt = Date.now()

    // console.log('new last: ' + lastt)
},5000)
