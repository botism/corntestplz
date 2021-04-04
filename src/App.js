import React from 'react'
import {Components} from "./layout/Components"
import './index.css'
import Bitmex from "./exchange/Bitmex"
import {ContextProvider} from './data/ContextProvider'
import AddComponentButton from "./layout/AddComponentButton"
import AddLayoutButton from "./layout/AddLayoutButton"
import AddSettingsButton from "./layout/AddSettingsButton"
import Bitfinex from "./exchange/Bitfinex"
import {Exchange} from "./exchange/Exchange"
import Coinbase from "./exchange/Coinbase"
import Bitstamp from "./exchange/Bitstamp"
import Bybit from "./exchange/Bybit"
import Deribit from "./exchange/Deribit"
import FTX from "./exchange/FTX"
import Binance from "./exchange/Binance"
import Huobi from "./exchange/Huobi"
import OKEx from "./exchange/OKEx"
import $ from "jquery"
import Toggle from "react-toggle"
import {Prices} from "./data/Prices"
import LayoutsButton from "./layout/LayoutsButton"
import {SweetAlert} from "./util/SweetAlert"
import TickersButton from "./layout/TickersButton"
import * as Swal from "sweetalert2"
import Modal from "react-modal"
import SettingsButton from "./layout/SettingsButton"
import ExchangesButton from "./layout/ExchangesButton"
// let $ = window.jquery


const setObj = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
}

export default class App extends React.Component {


    constructor(props) {
        super(props)

        // window.location.href = "https://corn.lol";

        // console.log = function(){};

        this.state = {
            foot: true,
            shrink: false,
        }


    }

    componentDidMount() {

    }


    render() {
        return (
            <ContextProvider>
                <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <div id={'AppHeader'} style={{marginBottom: 3}}>
                        <div>{}</div>
                    </div>
                    <div id={'AppMiddle'}>
                        <Components/>

                    </div>
                    <div id={"AppFooter"}><Footer that={this}/></div>
                </div>
            </ContextProvider>
        )
    }
}

class Footer extends React.Component {

    constructor(props) {
        super(props)

        // window.location.href = "https://corn.lol";


        this.state = {
            exHover: false,
            clicked: false,

            small: false,
        }
    }

    componentDidMount() {



        let w = $(window)
        let small = w.width() < 680
        this.setState({small: small})

        let that = this
        //
        w.resize(function () {
            let small = w.width() < 680

            console.log('small: ' + small)
            that.setState({small: small})


            // $('.footerButton').css('font-size', small?0:16)

        })

    }

    render() {


        let random = Math.random()


        return (
            <div id={'footerr'} style={{display: 'flex', paddingLeft: 5, transition: '0.4s'}}>

                <div id={'logoDiv'} style={{}}>
                    <img src={"images/cornicon2.png"} id={'loginicon'} alt={"corn.lol"} height={20} width={20}/>
                </div>



                <div id={'resetbuttonbottom'} style={{paddingRight: 4}} onClick={()=>{

                    Swal.fire({
                        title: 'reset layout?',
                        text: "unsaved changes will be lost!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'yes',
                        cancelButtonText: 'cancel',
                        background: 'rgb(23,22,22)',
                        border: '5px outset cornflowerblue',
                        color: 'white',                    }).then((result) => {
                        if (result.value) {
                            try {


                                $('.lm_goldenlayout').css({opacity: 0})


                                setTimeout(()=>{

                                    $('#footerr').css({opacity: 0.4})
                                    $('#AppFooter').css({height: -20})
                                },200)

                                setTimeout(()=>{

                                    localStorage.removeItem('savedState')
                                    window.location.reload()
                                },700)

                            } finally {
                            }
                        }
                    })



                }} >
                    <span id={'footnew'} style={{color: '#b6f13f', paddingRight: 3, paddingLeft: 2}}>⛨</span> <span style={{display: this.state.small?'none':'flex'}}>reset</span>
                </div>

                <div id={'resetbuttonbottom'} style={{paddingRight: 4}} onClick={()=>{
                    Swal.fire({
                        title: 'save new layout',
                        text: 'name:',
                        input: 'text',
                        background: 'rgb(23,22,22)',
                        border: '5px outset cornflowerblue',
                        color: 'white',                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        inputValue: 'myLayout'+(getObj('layouts')?getObj('layouts').length+1:1),
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        width: '350',
                        showCancelButton: true,
                        confirmButtonText: 'save',
                        showLoaderOnConfirm: true,
                        preConfirm: (input) => {
                            return input
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {

                        if (!result.value) return
                        console.log('save current layout')

                        let layouts = getObj('layouts')

                        if (layouts===null) {
                            layouts = []
                        }

                        console.log('current layouts: ' + JSON.stringify(layouts))

                        let thisone = getObj('savedState')

                        thisone.title = 'title-' + result.value


                        // Prices.layouts = layouts

                        new BroadcastChannel('layouts').postMessage(thisone)



                        // SweetAlert.mini('saving..', '', 'center', '', 900)
                        // Swal.fire({
                        //     title: 'saving..',
                        //     imageUrl: 'images/cornicon.png'
                        // })

                        Swal.fire({
                            type: 'success',
                            position: 'bottom-start',
                            icon: 'success',
                            title: '\''+result.value + '\' saved!',
                            showConfirmButton: false,
                            timer: 1100,
                            background: 'rgb(23,22,22)',
                            border: '5px outset cornflowerblue',
                            color: 'white',                        })


                        setObj('layouts', )

                        console.log('saving ' + JSON.stringify(getObj('savedState')))

                        layouts = [thisone].concat(layouts)

                        setObj('layouts', layouts)

                        // $.post('https://murmuring-temple-63807.herokuapp.com/' + 'https://corn-cache1.herokuapp.com/newlayout', {
                        //     name: thisone.title,
                        //     layout: JSON.stringify(getObj('savedState'))
                        // }, (res)=>{
                        //     console.log('layout post res: ' + res)
                        // })

                    })
                }}>
                    <div id={'footsave'} style={{color: '#f1e559', paddingRight: 3, paddingLeft: 2, fontSize: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>💾</div> <span style={{display: this.state.small?'none':'flex'}}>save</span>
                </div>

                <div style={{display: this.state.small?'none':'flex'}}>

                    <LayoutsButton/>
                </div>






                {/*<div id={'titleTextDiv1'}>*/}
                {/*    <div id={'titleTextDiv2'}>*/}
                {/*        /!*<span style={{display: 'flex', paddingLeft: 6}}>{''} <a href={'https://www.bybit.com/a/corn'} target={'_blank'}><span id={'titleTextMain'}><h1>{'bybit.com/a/corn'}</h1></span></a></span>*!/*/}
                {/*        <span style={{display: random < 0.5 ? 'flex' : 'none', paddingLeft: 6}}>{''} <span id={'titleTextMain'}><h1>{'<3 Donate BTC: 14mzYBZZyMQGP7ksCS2YPSpnV6uMNgfKtU'}</h1></span></span>*/}

                {/*        /!*<span id={'titleTextSub'}>help</span>*!/*/}

                {/*    </div>*/}
                {/*</div>*/}


                {/*<div id={'resetbuttonbottom'} >*/}
                {/*    <span style={{color: 'coral', paddingRight: 2}}>💚</span> popular <span className={'expandarrow'} style={{fontSize: 8, paddingLeft: 4,display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>▲</span>*/}
                {/*</div>*/}



                <div style={{marginLeft: 'auto'}}>
                </div>

                {/*<TickersButton/>*/}

                {/*<div id={'resetbuttonbottom'} style={{marginLeft: 'auto'}} >*/}
                {/*    <span style={{color: 'cornflowerblue', paddingRight: 2}}>䷝</span> tickers <span className={'expandarrow'} style={{fontSize: 8, paddingLeft: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>▲</span>*/}
                {/*</div>*/}

                {/*<div id={'resetbuttonbottom'} style={{}} >*/}
                {/*    <span style={{color: 'cornflowerblue', paddingRight: 3, fontSize: 13}}>📈</span> charts <span className={'expandarrow'} style={{fontSize: 8, paddingLeft: 4,  display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>▲</span>*/}
                {/*</div>*/}

                <div id={'footeraddchart'} className={'dragcomp'} style={{paddingRight: 4, paddingLeft: 2, height: 19}} >
                    <span style={{color: 'cornflowerblue', paddingRight: 3, fontSize: 13, paddingLeft: 2}}>📈</span> <span style={{display: this.state.small?'none':'flex'}}>chart</span>
                </div>

                <div id={'footeraddticker'} className={'dragcomp'} style={{paddingRight: 4, paddingLeft: 2, height: 19}} >
                    <span style={{color: 'greenyellow', paddingRight: 3, fontSize: 13, paddingLeft: 2}}>☰</span> <span style={{display: this.state.small?'none':'flex'}}>trades</span>
                </div>

                <div id={'footeraddliqs'} className={'dragcomp'} style={{paddingRight: 4, paddingLeft: 2, height: 19}} >
                    <span style={{color: 'orange', paddingRight: 3, fontSize: 13, paddingLeft: 2}}>☰</span> <span style={{display: this.state.small?'none':'flex'}}>liquidations</span>
                </div>



                <div id={'footsymboll'} style={{marginLeft: 6, marginTop: 5, }}>
                    <span style={{display: this.state.small?'none':'flex'}}>|</span>
                </div>

                <div style={{display: this.state.small?'none':'flex'}}>
                    <ExchangesButton/>

                </div>

                {/*<div id={'resetbuttonbottom'}  onClick={()=>{*/}
                {/*    SweetAlert.mini('exchanges', '', 'center', '', 900)*/}

                {/*    this.openModal()*/}

                {/*}} >*/}
                {/*    <span style={{color: 'yellow', paddingRight: 2}}>⛬</span> exchanges*/}
                {/*</div>*/}


                <SettingsButton/>

                {/*<div id={'resetbuttonbottom'} style={{marginRight: 4}}  onClick={()=>{*/}
                {/*    SweetAlert.mini('settings', '', 'center', '', 900)*/}

                {/*}}>*/}
                {/*    <span style={{color: 'greenyellow', paddingRight: 2}}>⚙</span> settings*/}
                {/*</div>*/}







                <div id={'footerRight'} style={{display: 'flex', width: '100%'}}>

                    {/*<div style={{marginLeft: 'auto', padding: 2, border: '1px solid cornflowerblue'}}>*/}
                    {/*    <AddSettingsButton/>*/}
                    {/*</div>*/}

                    {/*<div id={'footerExchanges'} style={{display: 'flex', transition: '0.3s', opacity: this.state.exHover===true?1:0.7}} onMouseEnter={() => {*/}
                    {/*    this.setState({exHover: true})*/}
                    {/*}} onMouseLeave={() => {*/}
                    {/*    this.setState({exHover: false})*/}
                    {/*}} onMouseDown={()=>{*/}
                    {/*    this.setState({clicked: true})*/}
                    {/*    // setTimeout(()=>{this.setState({clicked: false})},5000)*/}
                    {/*}}>*/}


                    {/*    <div onClick={()=>{this.setState({clicked: false})}} style={{paddingLeft: 30, paddingRight: this.state.clicked?250:69, transition: '0.7s', marginRight: this.state.exHover||this.state.clicked?0:-20, fontSize: this.state.clicked?12:10, marginTop: 8, opacity: this.state.exHover||this.state.clicked?1:0.4}}>*/}
                    {/*        {this.state.clicked?'>':'<'}*/}
                    {/*    </div>*/}

                    {/*    <div id={this.state.clicked?'':'exchangesContainer'} style={{paddingRight: 5}}>*/}


                    {/*        <div style={{position: 'absolute', right: 21 + (this.state.clicked===true?200:(this.state.exHover ? 24 : 0)), zIndex: 1000}}*/}
                    {/*             id={'exchangeRow1'} className={'footerExchange'}>*/}
                    {/*            <Bitmex icon={'images/exchange/bitmex.png'} off={false}/>*/}
                    {/*        </div>*/}

                    {/*        <div style={{position: 'absolute', right: 18 + (this.state.clicked===true?175:(this.state.exHover ? 21 : 0)), zIndex: 101}}*/}
                    {/*             id={'exchangeRow2'} className={'footerExchange'}>*/}
                    {/*            <Bitfinex off={true}/>*/}
                    {/*        </div>*/}


                    {/*        <div style={{position: 'absolute', right: 15 + (this.state.clicked===true?150:(this.state.exHover ? 18 : 0)), zIndex: 99}}*/}
                    {/*             id={'exchangeRow2'} className={'footerExchange'}>*/}
                    {/*            <Coinbase off={true}/>*/}
                    {/*        </div>*/}

                    {/*        <div style={{position: 'absolute', right: 12 + (this.state.clicked===true?125:(this.state.exHover ? 15 : 0)), zIndex: 98}}*/}
                    {/*             id={'exchangeRow2'} className={'footerExchange'}>*/}
                    {/*            <Bitstamp off={true}/>*/}
                    {/*        </div>*/}


                    {/*        <div style={{position: 'absolute', right: 9 + (this.state.clicked===true?100:(this.state.exHover ? 12 : 0)), zIndex: 97}}*/}
                    {/*             id={'exchangeRow3'} className={'footerExchange'}>*/}
                    {/*            <Bybit off={true}/>*/}
                    {/*        </div>*/}

                    {/*        <div style={{position: 'absolute', right: 6 + (this.state.clicked===true?75:(this.state.exHover ? 8 : 0)), zIndex: 96}}*/}
                    {/*             id={'exchangeRow3'} className={'footerExchange'}>*/}
                    {/*            <Deribit off={true}/>*/}
                    {/*        </div>*/}


                    {/*        <div style={{position: 'absolute', right: 3 + (this.state.clicked===true?50:(this.state.exHover ? 5 : 0)), zIndex: 95}}*/}
                    {/*             id={'exchangeRow4'} className={'footerExchange'}>*/}
                    {/*            <Binance off={true}/>*/}
                    {/*        </div>*/}

                    {/*        <div style={{position: 'absolute', right: 0 + (this.state.clicked===true?25:(this.state.exHover ? 1 : 0)), zIndex: 94}}*/}
                    {/*             id={'exchangeRow4'} className={'footerExchange'}>*/}
                    {/*            <OKEx off={true}/>*/}
                    {/*        </div>*/}


                    {/*        <div style={{position: 'absolute', right: -3 + (this.state.clicked===true?-0:(this.state.exHover ? -2 : 0)), zIndex: 93}}*/}
                    {/*             id={'exchangeRow4'} className={'footerExchange'}>*/}
                    {/*            <FTX off={true}/>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<div onClick={()=>{*/}
                    {/*    console.log(AddComponentButton)*/}
                    {/*    if (AddComponentButton.instances) {*/}
                    {/*        AddComponentButton.getInstances()[0].shrink(true)*/}
                    {/*    }*/}
                    {/*}}>*/}
                    {/*    {'>'}*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitmex icon={'images/exchange/bitmex.png'} off={false}/>*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitfinex off={true} />*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Coinbase off={true} />*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitstamp off={true} />*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bybit off={true} />*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Deribit off={true} />*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <FTX off={true}/>*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Binance off={true} />*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'} style={{marginRight: 316}}>*/}
                    {/*    <OKEx off={true} />*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'} style={{marginRight: 316}}>*/}
                    {/*    <Huobi off={true} />*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'} style={{marginRight: 316}}>*/}
                    {/*    <Huobi />*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitmex icon={'images/exchange/bitstamp.png'} off={true}/>*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitmex icon={'images/exchange/bybit.png'} off={true}/>*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitmex icon={'images/exchange/deribit.png'} off={true}/>*/}
                    {/*</div>*/}

                    {/*<div className={'footerExchange'} style={{marginRight: 316}}>*/}
                    {/*    <Bitmex icon={'images/exchange/binance.png'} off={true}/>*/}
                    {/*</div>*/}


                    {/*<div className={'footerExchange'}>*/}
                    {/*    <Bitmex icon={'images/exchange/bitmex22.png'} off={true}/>*/}
                    {/*</div>*/}



                    {/*<div id={this.state.clicked?'':'exchangesContainer'}>*/}

                    {/*    <AddComponentButton/>*/}

                    {/*    <AddLayoutButton/>*/}

                    {/*    <AddSettingsButton/>*/}
                    {/*</div>*/}


                </div>



            </div>
        )
    }
}


