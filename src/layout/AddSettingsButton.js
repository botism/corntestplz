import React from 'react'
import Context from "../data/Context"

import onClickOutside from "react-onclickoutside";

import $ from 'jquery'
import Toggle from "react-toggle"
// import {SweetAlert} from "../util/SweetAlert"
import {Prices} from '../data/Prices'


class AddSettingsButton extends React.Component {
    handleClickOutside = evt => {
        this.outside()
    }

    static contextType = Context


    constructor(props) {
        super(props);

        const context = this.context
        this.addSettings = this.addSettings.bind(this)
        this.outside = this.outside.bind(this)

        this.state = {

            up: false,

            soundOn: Prices.soundOn,
            arrowsOn: Prices.arrowsOn,
            context: context,
        };

        // setTimeout(()=>{this.setState({soundOn: Prices.soundOn})}, 2000)


    }

    componentDidMount() {


    }

    outside = function () {

        if (this.state.up) {
            let addc = $('#addSettings')
            addc.css({height: parseInt(addc.css('height').replace('px', '')) >100 ? '18px' : '40%', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})

            addc.css({width: parseInt(addc.css('height').replace('px', '')) >100 ? '19px' : '200px', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})


            // $('#settingss').css({marginTop: parseInt(addc.css('height').replace('px', '')) >100 ? '0px' : '500px'})

            // addc.css({width: parseInt(addc.css('width').replace('px', '')) >100 ? 'fit-content' : '30%'})

            $('.settingss').toggleClass('upp')


            $('#componentScroller').toggleClass('scrolll')

            this.setState({up: false})
        }

    }

    addSettings = function () {

        console.log($('.settingss'))

        if ($('.settingss').hasClass('upp')) {
            return
        }
        console.log('not up..')

        let addc = $('#addSettings')
        // console.log(parseInt(addc.css('bottom').replace('px', '')) )

        addc.css({height: parseInt(addc.css('height').replace('px', '')) >100 ? '18px' : '40%', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})

        addc.css({width: parseInt(addc.css('height').replace('px', '')) >100 ? '19px' : '200px', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})


        // addc.css({width: parseInt(addc.css('width').replace('px', '')) >100 ? 'fit-content' : '30%'})

        $('.settingss').toggleClass('upp')

        this.setState({up: true})

        $('#componentScroller').toggleClass('scrolll')

    }

    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div className={"footerButton"} style={{marginBottom: this.state.up?56:0}} id={'addSettings'} onMouseEnter={()=>{$('#addSettings').css({opacity: 0.9})}} onMouseLeave={()=>{$('#addSettings').css({opacity: this.state.up?0.9:0.5})}} onClick={this.state.up?()=>{setTimeout(()=>{this.outside()}, 180)}:this.addSettings}>
                        <div style={{display: 'flex', flexDirection: 'Fpirow'}}>
                            <span className={'footerButtonIcon'} style={{height: 31, width: 15}}>⚙</span><span
                            className={'footerButtonText'}>{this.state.up?'settings':''}</span>
                        </div>
                        {/*<div style={{opacity: 0}}>OOOOOOO</div>*/}



                        <div style={{ transition: '0.5s', opacity: this.state.up?1:0}}>


                            <div className={'settingss'} style={{marginTop: this.state.up?5:50, display: 'flex',opacity: context.state.arrowsOn?0.9:0.5}}  onClick={(e)=>{
                                e.stopPropagation()
                                context.set({arrowsOn: !context.state.arrowsOn})
                                this.setState({arrowsOn: !context.state.arrowsOn})
                            }}>
                                <span style={{padding: 5}}>{context.state.arrowsOn?'⇡ ':'⇣ '}arrows</span>
                                <div style={{padding: 5, marginLeft: 'auto'}}>
                                    <Toggle
                                        style={{verticalAlign: 'sub'}}
                                        defaultChecked={context.state.arrowsOn}
                                        checked={context.state.arrowsOn}
                                        className='arrowsOn'
                                        icons={false}
                                        onChange={(e) => {
                                            // if (e.target.checked===false) {
                                            //     if (this.state.symbolSelected===(exchangeName+symbol)) {
                                            //         this.setState({symbolSelected: 0})
                                            //     }
                                            // }
                                            // console.log('CHANGE to ' + e.target.checked)
                                            // this.setState({soundOn: e.target.checked})
                                            // Prices.soundOn = e.target.checked
                                            context.set({arrowsOn: e.target.checked})
                                            this.setState({arrowsOn: e.target.checked})
                                            // setTimeout(()=>{console.log('new soundon ' + Prices.soundOn)},1000)
                                        }}/>
                                </div>

                            </div>












                            <div className={'settingss'} style={{marginTop: this.state.up?5:50, display: 'flex',opacity: this.state.soundOn?0.9:0.5}}  onClick={(e)=>{
                                e.stopPropagation()
                                context.set({soundOn: !context.state.soundOn})
                                this.setState({soundOn: !context.state.soundOn})
                            }}>
                                <span style={{padding: 5}}>{this.state.soundOn?'🔊 ':'🔇 '}sound</span>
                                <div style={{padding: 5, marginLeft: 'auto'}}>
                                    <Toggle
                                        style={{verticalAlign: 'sub'}}
                                        defaultChecked={context.state.soundOn}
                                        checked={context.state.soundOn}
                                        className='soundOn'
                                        icons={false}
                                        onChange={(e) => {
                                            // if (e.target.checked===false) {
                                            //     if (this.state.symbolSelected===(exchangeName+symbol)) {
                                            //         this.setState({symbolSelected: 0})
                                            //     }
                                            // }
                                            // console.log('CHANGE to ' + e.target.checked)
                                            // this.setState({soundOn: e.target.checked})
                                            // Prices.soundOn = e.target.checked
                                            context.set({soundOn: e.target.checked})
                                            this.setState({soundOn: e.target.checked})
                                            // setTimeout(()=>{console.log('new soundon ' + Prices.soundOn)},1000)
                                        }}/>
                                </div>

                            </div>


                        </div>



                    </div>


                )}
            </Context.Consumer>

        )
    }
}

export default onClickOutside(AddSettingsButton);







