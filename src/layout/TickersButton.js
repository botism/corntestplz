import React from 'react'
import Context from "../data/Context"

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

class TickersButton extends React.Component {
    handleClickOutside = evt => {
        this.outside()
    }

    constructor(props) {
        super(props)

        this.outside = this.outside.bind(this)


        this.state = {

            up: false,

            layouts: []

        }
    }

    layoutsSingle = ({name}) => (
        <div className={'layoutSingle'} onClick={(e)=>{
            e.stopPropagation()
        }}>

            <div style={{paddingLeft: 4}}>
                {name}
            </div>


            {/*<div className={'singleLayoutLink'} style={{marginLeft: 'auto', marginRight: 4}} onClick={(e)=>{*/}
            {/*    e.stopPropagation()*/}
            {/*}}>*/}
            {/*    {'🔗 link'}*/}
            {/*</div>*/}

            {/*<div className={'singleLayoutX'} style={{color: 'orangered'}} onClick={(e)=>{*/}
            {/*    e.stopPropagation()*/}
            {/*}}>*/}
            {/*    {'⨯'}*/}
            {/*</div>*/}

        </div>
    )

    layoutsInside = () => (
        <div style={{display: this.state.up?'flex':'none', width: 150, margin: 2, padding: 2, flexDirection: 'column'}}>

            <this.layoutsSingle name={'market orders'} />

            <this.layoutsSingle name={'liquidations'} />

            <this.layoutsSingle name={'layout3'} />


        </div>
    )


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

                    <div id={'resetbuttonbottom'} className={'layoutsButton'} style={this.state.up?{height: 300, marginTop: -312, marginLeft: -25, transition: '0.4s', opacity: 1}:{height: 20, marginBottom: 0, transition: '0.2s'}} onClick={()=>{(this.setState({up: !this.state.up}))}}>

                        <div style={{display: 'flex'}}>
                            <span style={{color: 'cornflowerblue', paddingRight: 2}}>📊</span> components <span
                            className={'expandarrow'} style={{
                            fontSize: 8,
                            paddingLeft: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>{this.state.up?'▼':'▲'}</span>
                        </div>

                        <this.layoutsInside/>
                    </div>

                )}
            </Context.Consumer>

        )
    }


}

export default onClickOutside(TickersButton)





