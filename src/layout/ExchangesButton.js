import React from 'react'
import Context from "../data/Context"

import {Prices} from '../data/Prices'

import onClickOutside from "react-onclickoutside"

import $ from 'jquery'
import {SweetAlert} from "../util/SweetAlert"
import * as Swal from "sweetalert2"
import Bitmex from "../exchange/Bitmex"
import Bitfinex from "../exchange/Bitfinex"
import Coinbase from "../exchange/Coinbase"
import Bitstamp from "../exchange/Bitstamp"
import Bybit from "../exchange/Bybit"
import Deribit from "../exchange/Deribit"
import Binance from "../exchange/Binance"
import OKEx from "../exchange/OKEx"
import FTX from "../exchange/FTX"

const setObj = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
}

class ExchangesButton extends React.Component {



    handleClickOutside = evt => {
        this.outside()
    }

    constructor(props) {
        super(props)

        this.outside = this.outside.bind(this)


        this.state = {

            up: false,

            layouts: [],

            soundOn: false,
            arrowsOn: false,

        }


    }

    layoutsSingle = ({name}) => (
        <div className={'layoutSingle'} onClick={(e)=>{
            e.stopPropagation()

            let title = name


            // SweetAlert.mini('loading \'' + title + '\'..' , '', 'center', '', 1200)


            $('.lm_goldenlayout').css({opacity: 0})

            let layy = this.state.layouts.find(l => l.title === ('title-'+name))


            if (layy===undefined) return

            setObj('savedState', layy)

            // localStorage.setItem('savedState', this.state.layouts[num-1])

            window.location.reload()


        }}>

            <div style={{paddingLeft: 4, fontSize: 16, paddingRight: 10, fontWeight: 'bold'}} id={'layoutName'}>
                {name}
            </div>


            <div className={'singleLayoutLink'} style={{marginLeft: 'auto', marginRight: 4, cursor: 'not-allowed'}} onClick={(e)=>{
                e.stopPropagation()

            }}>
                {'🔗'}
            </div>

            <div className={'singleLayoutX'} style={{color: 'orangered', paddingLeft: 5, paddingRight: 5}} onClick={(e)=>{
                e.stopPropagation()

                Swal.fire({
                    title: 'delete layout \'' + name + "\'",
                    text: "are you sure?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'yes',
                    cancelButtonText: 'cancel',
                    background: 'rgb(23,22,22)',
                    border: '5px outset cornflowerblue',
                    color: 'white',
                }).then((result) => {
                    if (result.value) {
                        // console.log('delete ' + name)

                        let layoutstate = this.state.layouts.slice()

                        layoutstate = layoutstate.filter(function( obj ) {
                            return obj.title !== 'title-'+name;
                        });

                        this.setState({layouts: layoutstate})

                        setObj('layouts', layoutstate)


                        Swal.fire({
                            type: 'success',
                            position: 'bottom-start',
                            icon: 'success',
                            title: 'layout \''+name+'\' removed',
                            showConfirmButton: false,
                            timer: 1100,
                            background: 'rgb(23,22,22)',
                            border: '5px outset cornflowerblue',
                            color: 'white',                        })
                    }
                })


            }}>
                {'⨯'}
            </div>

        </div>
    )

    layoutsInside = ({context}) => {

        let layouts = []

        console.log('ren liii')

        if (Array.isArray(this.state.layouts)) {
            this.state.layouts.forEach((layout, i) => {
                layouts.push(<this.layoutsSingle name={layout.title.split('-')[1]}/>)
            })
        }

        return (
            <div className={'scrolll'} style={{display: this.state.up?'flex':'none', flexDirection: 'row', width: 270, marginRight: 10, height: '64px', margin: 2, padding: 2, paddingRight: 10, paddingTop: 6, overflowX: 'scroll', overflowY: 'hide'}}>





                        <div style={{}}
                             id={'exchangeRow1'} className={'footerExchange'}>
                            <Bitmex icon={'images/exchange/bitmex.png'} off={false}/>
                        </div>

                        <div style={{}}
                             id={'exchangeRow2'} className={'footerExchange'}>
                            <Bitfinex off={true}/>
                        </div>


                        <div style={{}}
                             id={'exchangeRow2'} className={'footerExchange'}>
                            <Coinbase off={true}/>
                        </div>

                        <div style={{}}
                             id={'exchangeRow2'} className={'footerExchange'}>
                            <Bitstamp off={true}/>
                        </div>


                        <div style={{}}
                             id={'exchangeRow3'} className={'footerExchange'}>
                            <Bybit off={true}/>
                        </div>

                        <div style={{}}
                             id={'exchangeRow3'} className={'footerExchange'}>
                            <Deribit off={true}/>
                        </div>


                        <div style={{}}
                             id={'exchangeRow4'} className={'footerExchange'}>
                            <Binance off={true}/>
                        </div>

                        <div style={{}}
                             id={'exchangeRow4'} className={'footerExchange'}>
                            <OKEx off={true}/>
                        </div>


                        <div style={{}}
                             id={'exchangeRow4'} className={'footerExchange'}>
                            <FTX off={true}/>
                        </div>



            </div>
        )}


    componentDidMount() {


    }

    outside = function () {

        if (this.state.up) {
            this.setState({up: false})
        }

    }



    render() {


        return (
            <Context.Consumer>
                {context => (


                    <div id={'resetbuttonbottom'} className={'layoutsButton'} style={this.state.up?{paddingRight: 3, height: 70, marginTop: -80, marginLeft: -25, transition: '0.4s', opacity: 1, marginRight: 6}:{paddingRight: 3, height: 20, marginBottom: 0, transition: '0.2s', marginRight: 6}} onClick={()=>{
                        (this.setState({up: !this.state.up}))
                        this.setState({layouts: getObj('layouts')})
                        // console.log(this.state.layouts)

                        // this.setState({arrowsOn: context.state.arrowsOn, soundOn: context.state.soundOn})

                    }}>





                        <div style={{display: 'flex'}}>
                            <span style={{color: 'yellow', paddingRight: 4, paddingLeft: 4}}>⛬</span> exchanges <span
                            className={'expandarrow'} style={{
                            fontSize: 8,
                            paddingLeft: 4,
                            paddingRight: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>{this.state.up?'▼':'▲'}</span>
                        </div>

                        <this.layoutsInside context={context}/>
                    </div>

                )}
            </Context.Consumer>

        )
    }


}

export default onClickOutside(ExchangesButton)





