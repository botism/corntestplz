import React from 'react'
import Context from "../data/Context"

import onClickOutside from "react-onclickoutside"

import $ from 'jquery'
import {SweetAlert} from "../util/SweetAlert"
import {Formatter} from "../util/Formatter"
import Toggle from "react-toggle"
import InputNum from "rc-input-number"
import * as Swal from "sweetalert2"

const setObj = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
}

class AddLayoutButton extends React.Component {
    handleClickOutside = evt => {
        this.outside()
    }

    constructor(props) {
        super(props)

        this.addLayout = this.addLayout.bind(this)
        this.outside = this.outside.bind(this)


        this.state = {

            up: false,

            layouts: []

        }
    }

    componentDidMount() {


        let layouts = getObj('layouts')

        if (layouts) {

            this.setState({layouts: layouts})
            console.log('statelayouts: ' + this.state.layouts)
        } else {
            setObj('layouts', [])
        }


    }

    outside = function () {

        if (this.state.up) {
            let addc = $('#addLayout')
            addc.css({
                height: parseInt(addc.css('height').replace('px', '')) > 100 ? '18px' : '35%',
                opacity: parseInt(addc.css('height').replace('px', '')) > 100 ? '0.5' : '0.9'
            })

            addc.css({
                width: parseInt(addc.css('height').replace('px', '')) > 100 ? '18px' : '200px',
                opacity: parseInt(addc.css('height').replace('px', '')) > 100 ? '0.5' : '0.9'
            })


            $('.layoutt').removeClass('upp')

            $('#componentScroller').removeClass('scrolll')

            this.setState({up: false})
        }

    }

    addLayout = function () {

        this.setState({layouts: getObj('layouts')})

        this.setState({key: Math.random()})


        let layouts = getObj('layouts')

        console.log('got layout ')

        console.log(layouts)

        if (layouts.length > 0) {
            this.setState({layouts: layouts})
        }


        if ($('.layoutt').hasClass('upp')) {
            return
        }

        let addc = $('#addLayout')
        // console.log(parseInt(addc.css('bottom').replace('px', '')) )

        addc.css({
            height: parseInt(addc.css('height').replace('px', '')) > 100 ? '18px' : '35%',
            opacity: parseInt(addc.css('height').replace('px', '')) > 100 ? '0.5' : '0.9'
        })

        addc.css({
            width: parseInt(addc.css('height').replace('px', '')) > 100 ? '18px' : '200px',
            opacity: parseInt(addc.css('height').replace('px', '')) > 100 ? '0.5' : '0.9'
        })


        $('.layoutt').toggleClass('upp')

        this.setState({up: true})

        $('#componentScroller').toggleClass('scrolll')

    }

    render() {

        let layouts = []

        if (Array.isArray(this.state.layouts)) {
            this.state.layouts.forEach((layout, i) => {
                layouts.push(<this.Layouttt name={layout.title}/>)
            })
        }

        return (
            <Context.Consumer>
                {context => (


                    <div id={this.state.key}>

                        <div className={"footerButton"} style={{width: 18, marginBottom: this.state.up?56:0}} id={'addLayout'} onMouseEnter={() => {
                            $('#addLayout').css({opacity: 0.9})
                        }} onMouseLeave={() => {
                            $('#addLayout').css({opacity: this.state.up ? 0.9 : 0.5})
                        }} onClick={

                            this.state.up ? () => {
                                setTimeout(() => {
                                    this.outside()
                                }, 180)
                            } : this.addLayout


                        }>

                            <div style={{display: 'flex', flexDirection: 'row'}}>
                        <span className={'footerButtonIcon'}
                              style={{
                                  height: 28,
                                  width: 13,
                                  fontSize: 18,
                                  paddingTop: 3,
                                  paddingRight: 6
                              }}>☵</span><span
                                className={'footerButtonText'} style={{opacity: this.state.up?1:0, transition: '0.7s'}}>{this.state.up?'layout':''}</span>
                            </div>

                            <this.Layouttt name={'default'}/>
                            <this.Layouttt name={'delete all (' + this.state.layouts.length + ')'}/>
                            <this.Layouttt name={'save current'}/>
                            {layouts}

                        </div>

                    </div>

                )}
            </Context.Consumer>

        )
    }

    Layouttt = ({name}) => {
        return (


            <div className={'layoutt'} style={{margin: 4, marginTop: 10}} onClick={async (e) => {
                if (this.state.up) {
                    e.stopPropagation()
                }
                if (($('#addLayout').height() < 100)) return

                setTimeout(() => {

                    if (name === 'default') {
                        try {
                            SweetAlert.mini('loading layout..', '', 'center', '', 900)

                            let addc = $('#addLayout')
                            addc.css({height: '18px'})
                            let layouts = $('.layoutt')
                            layouts.css({opacity: 0})

                            $('.lm_goldenlayout').css({opacity: 0})
                            localStorage.removeItem('savedState')
                            window.location.reload()
                            localStorage.removeItem('savedState')
                        } finally {
                        }
                    } else if (name === 'save current') {

                        Swal.fire({
                            title: 'new layout name',
                            input: 'text',
                            background: 'rgb(23,22,22)',
                            border: '5px outset cornflowerblue',
                            color: 'white',                            inputAttributes: {
                                autocapitalize: 'off'
                            },
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

                            console.log('current layouts: ' + JSON.stringify(layouts))

                            let thisone = getObj('savedState')

                            thisone.title = 'title-' + result.value

                            layouts.push(thisone)

                            setObj('layouts', layouts)

                            console.log('new layouts: ')

                            console.log(getObj('layouts'))

                            this.setState({layouts: layouts})

                            this.outside()

                            SweetAlert.mini('saving..', '', 'center', '', 900)

                            console.log('saving ' + JSON.stringify(getObj('savedState')))

                            // $.post('https://murmuring-temple-63807.herokuapp.com/' + 'https://corn-cache1.herokuapp.com/newlayout', {
                            //     name: thisone.title,
                            //     layout: JSON.stringify(getObj('savedState'))
                            // }, (res)=>{
                            //     console.log('layout post res: ' + res)
                            // })

                        })



                    } else if (name.includes('delete all')) {

                        Swal.fire({
                            title: 'delete all saved layouts?',
                            text: "",
                            icon: 'warning',
                            showCancelButton: true,
                            background: 'rgb(23,22,22)',
                            border: '5px outset cornflowerblue',
                            color: 'white',                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'yes',
                            cancelButtonText: 'cancel'
                        }).then((result) => {
                            if (result.value) {

                                setObj('layouts', [])

                                this.setState({layouts: []})
                            }
                        })


                    } else if (name.includes('title-')) {
                        let title = name.split('-')[1]

                        SweetAlert.mini('loading ' + title, '', 'center', '', 900)

                        let addc = $('#addLayout')
                        addc.css({height: '18px'})
                        let layouts = $('.layoutt')
                        layouts.css({opacity: 0})

                        $('.lm_goldenlayout').css({opacity: 0})

                        let layy = this.state.layouts.find(l => l.title === name)

                        console.log(layy)

                        setObj('savedState', layy)

                        // localStorage.setItem('savedState', this.state.layouts[num-1])

                        window.location.reload()


                    }

                }, 0)
            }}>
                <span style={{pointerEvents: 'none'}}>{name.replace('title-','')}</span>
            </div>


        )
    }

}

export default onClickOutside(AddLayoutButton)





