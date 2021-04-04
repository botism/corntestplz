import React from 'react'
import Context from "../data/Context"

import {Prices} from '../data/Prices'

import onClickOutside from "react-onclickoutside"

import $ from 'jquery'
import {SweetAlert} from "../util/SweetAlert"
import * as Swal from "sweetalert2"

const setObj = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
}

class SettingsButton extends React.Component {



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
                    color: 'white',                }).then((result) => {
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
            <div className={'scrolll'} style={{display: this.state.up?'flex':'none', width: 150, marginRight: 10, height: '100%', margin: 2, padding: 2, paddingRight: 10, paddingTop: 6, flexDirection: 'column', overflowY: 'scroll'}}>

                {/*{layouts.length<1?<div style={{padding: 10, opacity: 0.4, fontSize: 16}}>no saved layouts</div>:layouts}*/}

                {/*<this.layoutsSingle name={'default btc'} />*/}

                <div className={'layoutSingle'} onClick={(e)=>{
                    e.stopPropagation()
                    this.setState({soundOn: !this.state.soundOn})

                    setTimeout(()=>{
                        context.set({soundOn: this.state.soundOn})

                        let cc = getObj('cornContext')
                        cc.soundOn = this.state.soundOn
                        setObj('cornContext', cc)
                    },100)

                }}>
                    <div style={{opacity: this.state.soundOn?1:0.5, display: 'flex'}}>
                        <div style={{paddingLeft: 4}}>
                            {(this.state.soundOn?'🔊 ':'🔇 ')+'sound' + (this.state.soundOn?' >50k':' (off)')}
                        </div>

                        {/*<div style={{marginLeft: 'auto'}}>*/}

                        {/*</div>*/}


                        {/*<div className={'singleSetting'} style={{ cursor: 'not-allowed'}} onClick={(e)=>{*/}
                        {/*    e.stopPropagation()*/}

                        {/*}}>*/}
                        {/*    {'⚙'}*/}
                        {/*</div>*/}
                    </div>
                </div>


                <div className={'layoutSingle'} onClick={(e)=>{
                    e.stopPropagation()
                    this.setState({arrowsOn: !this.state.arrowsOn})

                    setTimeout(()=>{
                        context.set({arrowsOn: this.state.arrowsOn})

                        let cc = getObj('cornContext')
                        cc.arrowsOn = this.state.arrowsOn
                        setObj('cornContext', cc)
                    },100)

                }}>
                    <div style={{opacity: this.state.arrowsOn?1:0.5, display: 'flex'}}>
                        <div style={{paddingLeft: 4}}>
                            {(this.state.arrowsOn===false?'▼ ':'▲ ')+'arrows' + (this.state.arrowsOn?'':' (off)')}
                        </div>

                        {/*<div style={{marginLeft: 'auto'}}>*/}

                        {/*</div>*/}


                        {/*<div className={'singleSetting'} style={{ cursor: 'not-allowed'}} onClick={(e)=>{*/}
                        {/*    e.stopPropagation()*/}

                        {/*}}>*/}
                        {/*    {'⚙'}*/}
                        {/*</div>*/}

                    </div>



                </div>



            </div>
        )}


    componentDidMount() {

        let cc = getObj('cornContext')

        if (cc) {
            this.setState({arrowsOn: cc.arrowsOn, soundOn: cc.soundOn})
        } else {
            this.setState({arrowsOn: false, soundOn: true})
        }

        new BroadcastChannel('layouts').onmessage
            = msg => {
            console.log(msg)
            if (msg.title&&msg.title.includes('title-')) {

                let layouts = getObj('layouts')

                // layouts.push(msg)

                layouts = [msg].concat(layouts)

                setObj('layouts', layouts)

                console.log('new layouts: ')

                console.log(getObj('layouts'))

                this.setState({layouts: layouts})
            }
        }

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


                    <div id={'resetbuttonbottom'} className={'layoutsButton'} style={this.state.up?{height: 300, marginTop: -312, marginLeft: -25, transition: '0.4s', opacity: 1, marginRight: 8}:{height: 20, marginBottom: 0, marginLeft: 2, transition: '0.2s', marginRight: 8}} onClick={()=>{
                        (this.setState({up: !this.state.up}))
                        this.setState({layouts: getObj('layouts')})
                        // console.log(this.state.layouts)

                        // this.setState({arrowsOn: context.state.arrowsOn, soundOn: context.state.soundOn})

                    }}>





                        <div style={{display: 'flex'}}>
                            <span style={{color: 'greenyellow', paddingRight: 2, paddingLeft: 4}}>⚙</span><span
                            className={'expandarrow'} style={{
                            fontSize: 8,
                            paddingLeft: 4,
                            paddingRight: 3,
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

export default onClickOutside(SettingsButton)





