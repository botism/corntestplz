import React from 'react'
import Context from "../data/Context"

import onClickOutside from "react-onclickoutside";
import '../index.css'
import $ from 'jquery'
import {SweetAlert} from "../util/SweetAlert"


// todo if triple click, show alert to drag new component

class AddComponentButton extends React.Component {


    static instances = []


    static getInstances = () => AddComponentButton.instances

    handleClickOutside = evt => {
        this.outside()
    }

    constructor(props) {
        super(props);

        this.addComponent = this.addComponent.bind(this)

        this.outside = this.outside.bind(this)

        this.state = {
            up: false,
            shrink: false
        };

        AddComponentButton.instances.push(this)
    }

    shrink(t) {
        this.setState({shrink: t})
    }

    componentDidMount() {


        $('.componentt').click(()=>{
            SweetAlert.mini('hold and drag', '', 'center', '', 1400)
        })

        $('.coff').click(()=>{
            SweetAlert.mini('locked', '', 'center', '', 700)
        })

    }

    outside = function () {

        if (this.state.up) {
            let addc = $('#addComponent')
            addc.css({height: parseInt(addc.css('height').replace('px', '')) >100 ? '18px' : '40%', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})
            addc.css({width: parseInt(addc.css('height').replace('px', '')) >100 ? '22px' : '200px', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})

            $('.componentt').toggleClass('upp')

            $('#componentScroller').toggleClass('scrolll')

            this.setState({up: false})
        }


    }

    addComponent = function () {

        if ($('.componentt').hasClass('upp')) {
            return
        }

        let addc = $('#addComponent')
        // console.log(parseInt(addc.css('bottom').replace('px', '')) )

        addc.css({height: parseInt(addc.css('height').replace('px', '')) >100 ? '18px' : '40%', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})
        addc.css({width: parseInt(addc.css('height').replace('px', '')) >100 ? '22px' : '200px', opacity: parseInt(addc.css('height').replace('px', '')) >100 ? '0.5' : '0.9'})

        $('.componentt').toggleClass('upp')

        this.setState({up: true})

        $('#componentScroller').toggleClass('scrolll')

    }

    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div className={"footerButton"} style={{width: 22, marginBottom: this.state.up?56:0}} id={'addComponent'} onMouseEnter={()=>{$('#addComponent').css({opacity: 0.9})}} onMouseLeave={()=>{$('#addComponent').css({opacity: this.state.up?0.9:0.5})}} onClick={this.state.up?()=>{setTimeout(()=>{this.outside()}, 180)}:this.addComponent}>

                        <div style={{display: 'flex', flexDirection: 'row', paddingBottom: 0}}>
                            <span className={'footerButtonIcon'} style={{height: 31, width: 17}}>✚</span><span
                            className={'footerButtonText'} style={{display: this.state.shrink?'none':'flex'}}>{this.state.up?'component':''}</span>
                        </div>

                        <div id={'componentScroller'} style={{opacity: this.state.up?1:0}}>


                            <div className={'componentt'} id={'footeraddticker'}>
                                trades
                            </div>

                            {/*<div className={'componentt'} id={'footeraddtradestats'}>*/}
                            {/*    trade stats*/}
                            {/*</div>*/}

                            <div className={'componentt'} id={'footeraddliqs'}>
                                liquidations
                            </div>

                            <div className={'componentt'} id={'footeraddliqstats'}>
                                liq. stats
                            </div>

                            {/*<div className={'componentt'} id={'footeraddprice'}>*/}
                            {/*    price*/}
                            {/*</div>*/}

                            <div className={'componentt'} id={'footeraddchart'}>
                                chart
                            </div>

                            {/*<div className={'componentt'} id={'footeraddopeninterest'}>*/}
                            {/*    open interest*/}
                            {/*</div>*/}

                            {/*<div className={'componentt'} id={'footeraddfunding'}>*/}
                            {/*    funding*/}
                            {/*</div>*/}









                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt'} id={'footeraddspacer'}>
                                spacer
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div className={'componentt coff'} id={''}>
                                🔒
                            </div>

                            <div style={{paddingTop: 20}}>

                            </div>
                        </div>

                    </div>
                )}
            </Context.Consumer>

        )
    }
}

export default onClickOutside(AddComponentButton);





