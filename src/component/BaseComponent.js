import React from 'react'
import Context from "../data/Context"
import './BaseComponent.css'
import $ from 'jquery'

import {golden} from '../data/golden'
import {SweetAlert} from "../util/SweetAlert"

import {Ticker} from '../component/Ticker/Ticker'
import {Liqs} from '../component/Liqs/Liqs'
import {Chart} from '../component/Chart/Chart'



import Modal from 'react-modal'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        border: 'none',
        padding: 5

    }
}

Modal.setAppElement(document.getElementById('root'))
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.72)'

export class BaseComponent extends React.Component {

    static lastDel = ()=>{}

    static downTime = Date.now()

    static idd = 0

    openModal() {
        this.setState({modalIsOpen: true})
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    constructor(props) {
        super(props)

        this.closeButton = this.closeButton.bind(this)

        this.mouseEnt = this.mouseEnt.bind(this)

        this.mouseDownn = this.mouseDownn.bind(this)
        this.mouseUpp = this.mouseUpp.bind(this)


        this.mouseOutt = this.mouseOutt.bind(this)

        this.setDragsource = this.setDragsource.bind(this)

        this.settingsButton = this.settingsButton.bind(this)

        this.dragclickmsg = this.dragclickmsg.bind(this)


        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

        // console.log('props:')
        // console.log(props)


        this.state = {

            isModalOpen: false,

            comp: props.comp,
            id: props.propss ? props.propss.id : props.id,
            name: props.name ? props.name : 'base',

            propss: props.propss,


            dragggg: (<div id={'drag' + props.id}>✢</div>),

            p: '⇱',


            compSettings: props.compSettings,

            down: false,

            showSettings: false,

            dragsource: false,

            black: true,

            marg: true,

            bord: false,

        }
    }

    setDragsource() {

        //remove old dragsource

        // console.log('dragsources:')

        // console.log(golden.myLayout)

        // golden.myLayout._dragSources = []

        // console.log(golden.myLayout._dragSources)
        //
        //
        // golden.myLayout._dragSources.forEach((ds,i)=>{
        //
        //     if (ds._element === undefined || ds._element[0]===undefined) return
        //
        //     console.log(ds._element[0].id)
        //
        //     if (ds._element[0].id===('drag' + this.state.id)) {
        //         console.log('yep ' + ds._element[0].id + ' i: ' + i)
        //
        //         // let dss = {...ds}
        //
        //         // dss._itemConfig.props = this.state.propss
        //     }
        // })

        if (!this.state.dragsource && this.state.id !== 'new') {
            let id = '#drag' + this.state.id
            console.log('set dragsource ' + id + ' propss: ' + JSON.stringify(this.state.propss))
            golden.myLayout.createDragSource($(id),
                {
                    title: this.state.name,
                    type: "react-component",
                    component: this.state.name,
                    // component: this.props.props.glContainer._config.component,
                    // componentState: this.props.props.glContainer._config.componentState
                    // props: this.props.props.glContainer.getState()
                    props: this.state.propss
                }
            )
            this.setState({dragsource: true})
        }

    }

    mouseUpp() {


        // BaseComponent.lastDel = ()=>{}

        this.setState({down: false})

        console.log('mouseup id ' + this.state.id)
    }

    mouseDownn() {

        //         this.setState({black: true})
        // BaseComponent.lastDel = ()=>{this.closeButton('dontclear')}

        BaseComponent.downTime = Date.now()

        this.setState({down: true})

        // BaseComponent.lastDel = ()=>{}

        setTimeout(()=>{
            if (this.state.down===true) {

                BaseComponent.idd = this.state.id

                this.setState({black: true})

                BaseComponent.lastDel = ()=>{this.closeButton('dontclear')}

            }
        },300)
    }

    mouseOutt() {
        // if (this.state.down) {
        //     golden.myLayout._getAllContentItems().forEach((c) => {
        //
        //         try {
        //             // console.log(c.config.props.id)
        //             if (c.config.props.id === this.state.id) {
        //                 c.container.close()
        //             }
        //         } catch (e) {
        //         }
        //     })
        //
        //     setTimeout(() => {
        //
        //
        //         let dragid = '#drag' + this.state.id
        //         golden.myLayout.createDragSource($(dragid),
        //             {
        //                 title: 'titlee',
        //                 type: "react-component",
        //                 component: this.state.name,
        //                 props: this.state.propss
        //             }
        //         )
        //
        //
        //     }, 1000)
        //
        // }
    }

    componentDidUpdate(prevProps) {
        if (this.props.comp !== prevProps.comp) {
            this.setState({comp: this.props.comp})
        }

        if (this.props.propss !== prevProps.propss) {
            this.setState({propss: this.props.propss})
        }

        if (this.props.compSettings !== prevProps.compSettings) {
            this.setState({compSettings: this.props.compSettings})
        }
    }


    componentDidMount() {



        console.log('mount ' + this.state.id)
            // this.setState({black: false})
            // this.setState({marg: false})
        // this.setState({bord: true})

        setTimeout(()=>{
            this.setState({black: false})
            this.setState({marg: false})

            setTimeout(()=>{
                this.setState({bord: true})
            }, 900*Math.random())

        }, 1000+(2500*Math.random()))



        console.log('basecomp mount id ' + this.state.id)


        //todo get rid of buncha intervals here
        let innt = setInterval(() => {
            if (this.state.down) {

                // this.setState({black: true})

                console.log('count ' + this.state.countt + ' up!')
                this.setState({countt: this.state.countt + 1})

                if (this.state.countt > 2) {
                    console.log('DELET ' + this.state.id)
                    clearInterval(innt)



                    // this.setState({black: true})

                    // setTimeout(()=>{
                    //     console.log('updatesizee')
                    //     golden.myLayout.updateSize()
                    // },1000)

                }
            } else {
                this.setState({countt: 0})
            }

        }, 1000)

        setInterval(() => {
            this.mouseEnt()
        }, 2000)

        // console.log('base mount id ' + this.state.id + ' name: ' + this.state.name + ' propss: ' + JSON.stringify(this.state.propss))

        // BaseComponent.lastDel()

        if (this.state.id !== 'new') return

        let self = this

        let timeo = setInterval(() => {

            // console.log('\ntimeo ' + this.state.name + this.state.id)

            golden.myLayout._getAllContentItems().forEach((c) => {
                try {
                    console.log('checking ')
                    try {
                        console.log(c.config.props.id)
                    } catch (e) {

                    }

                    if (c.config.props.id === 'new') {
                        clearInterval(timeo)

                        let id = (9000000 * Math.random()).toFixed(0)
                        self.setState({id: id})

                        let propss = Object.assign({}, self.state.propss)  // creating copy of state variable jasper
                        propss.id = id                     // update the name property, assign a new value
                        // console.log('settt ' + JSON.stringify(propss))
                        self.setState({propss: propss})
                        c.config.props.id = id
                        self.props.onChangeId(id)
                        self.setState({id: id})



                        if (this.state.name==='spacer') {
                            this.setState({spacer: true})
                        }

                        // console.log('placed id ' + self.id)
                        //
                        // BaseComponent.lastDel()
                        //
                        // BaseComponent.lastDel = ()=>{}

                    }
                } catch (e) {
                }

            })
        }, 300)

        this.setDragsource()

    }

    closeButton(action) {



        golden.myLayout._getAllContentItems().forEach((c, i) => {
            try {
                // console.log('checking ' + c.config.props.id)
                // console.log('stateid: ' + this.state.id)
            } catch (e) {

            }

            try {
                if (c.config.props.id === this.state.id) {
                    // console.log('yep, ' + this.state.id)
                    c.container._contentElement.animate({opacity: 0}, 200, undefined, () => {
                        c.container.close()
                    })
                }
            } catch (e) {
            }
        })

        if (action==='dontclear') {
            return
        }

        if (this.state.name==='ticker') {
            let removei
            Ticker.instances.forEach((ticker,i)=>{
                if (ticker.state.id===this.state.id) {
                    removei = i
                    // console.log('removei: ' + removei)
                }
            })
            if (removei) {
                Ticker.instances.splice(removei,1)
            }
            // console.log('new ticker isntances: ')
            // console.log(Ticker.instances)
        } else if (this.state.name==='liqs') {
            let removei
            Liqs.instances.forEach((liq,i)=>{
                if (liq.state.id===this.state.id) {
                    removei = i
                    console.log('removei: ' + removei)
                }
            })
            if (removei) {
                Liqs.instances.splice(removei,1)
            }
            console.log('new Liqs isntances: ')
            console.log(Liqs.instances)
        } else if (this.state.name==='chart') {
            let removei
            Chart.instances.forEach((chart,i)=>{
                if (chart.state.id===this.state.id) {
                    removei = i
                    console.log('removei: ' + removei)
                }
            })
            if (removei) {
                Chart.instances.splice(removei,1)
            }
            console.log('new charts isntances: ')
            console.log(Chart.instances)
        }

    }

    dragclickmsg() {

        SweetAlert.mini('hold and drag', '', 'center', '', 1200)

        // console.log(this.state.propss.trades[0])
    }

    settingsButton() {

        console.log(this.state.id)

        this.openModal()

        // $('.componentTop').css({opacity: 0})
        //
        // setTimeout(() => {
        //     $('.componentTop').css({opacity: 1})
        // }, 1000)
        //
        // this.setState({showSettings: !this.state.showSettings})


        // golden.myLayout._dragSources.forEach((ds) => {
        //     try {
        //         console.log(ds)
        //         console.log(ds._dragListener._eElement[0].id)
        //
        //     } catch (e) {
        //
        //     }
        //
        // })

    }

    mouseEnt() {

        // console.log('id: ' + this.state.id + ' propss: ' + JSON.stringify(this.state.propss))

        golden.myLayout._getAllContentItems().forEach((c) => {
            try {
                if (c.config.props.id === this.state.id) {
                    // console.log('configprops: ' + JSON.stringify(c.config.props))
                    // console.log()
                    c.config.props = {...this.state.propss, trades: []}

                    // c.config.props.trades = []
                }
            } catch (e) {
            }

        })


        golden.myLayout._dragSources.forEach((ds) => {
            try {

                if (ds._itemConfig.props.id !== undefined && ds._itemConfig.props.id === this.state.id) {

                    ds._itemConfig.props = this.state.propss

                    console.log('new ds ' + JSON.stringify(ds))

                } else {
                    // console.log('nope')
                }

            } catch (e) {
                // console.log('nahp')
            }

            // console.log(ds)
        })

        // golden.myLayout._getAllContentItems().forEach((c) => {
        //
        //     try {
        //         // console.log(c.config.props.id)
        //         if (c.config.props.id === this.state.id) {
        //             // console.log('state:')
        //             // console.log(c.container.getState())
        //             // console.log('set state to ')
        //             // console.log(this.state.propss)
        //             c.container.extendState({propss: this.state.propss})
        //         }
        //     } catch (e) {
        //     }
        // })
        //
        //
        // // console.log('set props')
        //


        // golden.myLayout._dragSources.forEach((ds) => {
        //     try {
        //         console.log(ds._dragListener._eElement[0].id)
        //
        //         if (ds._dragListener._eElement[0].id === 'drag'+this.state.id) {
        //             console.log('id found! ' + ds._dragListener._eElement[0].id)
        //         } else {
        //
        //
        //         }
        //     } catch (e) {
        //
        //     }
        //
        // })
        //                     drag = ds
        //                 } else {
        //                     golden.myLayout.createDragSource(this.state.dragggg,
        //                         {
        //                             title: 'titlee',
        //                             type: "react-component",
        //                             component: 'base',
        //                             // component: this.props.props.glContainer._config.component,
        //                             // componentState: this.props.props.glContainer._config.componentState
        //                             // props: this.props.props.glContainer.getState()
        //                             props: this.state
        //                         }
        //                     )
        //                 }


        // console.log('\nid:')
        // console.log(this.state.id)
        //
        // console.log('all:')
        // golden.myLayout._getAllContentItems().forEach((c) => {
        //     try {
        //         // console.log(c.config.props.id)
        //     } catch (e) {
        //
        //     }
        // })


        // golden.myLayout._getAllContentItems().forEach((c, i) => {
        //     try {
        //         if (c.config.props.id === this.state.id) {
        //             console.log('id: ' + this.state.id)
        //             // console.log(c.config.props)
        //
        //             let drag = null
        //
        //             golden.myLayout._dragSources.forEach((ds) => {
        //                 console.log(ds)
        //                 if (ds._dragListener._eElement[0].id == 'footeradd' + this.state.id) {
        //                     drag = ds
        //                 } else {
        //                     golden.myLayout.createDragSource(this.state.dragggg,
        //                         {
        //                             title: 'titlee',
        //                             type: "react-component",
        //                             component: 'base',
        //                             // component: this.props.props.glContainer._config.component,
        //                             // componentState: this.props.props.glContainer._config.componentState
        //                             // props: this.props.props.glContainer.getState()
        //                             props: this.state
        //                         }
        //                     )
        //                 }
        //             })
        //
        //             console.log('drag:')
        //             console.log(drag)
        //
        //         }
        //     } catch (e) {
        //     }
        // })
        //
        // console.log()
    }

    render() {

        return (
            <Context.Consumer>
                {context => (
                    <div id={'BaseComponent'} onMouseUp={()=>{
                        // console.log('mouseup id ' + this.state.id)
                    }} style={{opacity: this.state.black?0.0:1, transition: '0.7s', marginTop: this.state.marg?-50:0, border: !this.state.bord?'2px outset rgba(166, 255, 84, 1)':
                    '2px outset rgba(116, 161, 230, 0.5)'}}>


                        <div className={'componentTop'}
                             style={{
                                 height: 40,
                                 width: '102px',
                                 display: this.state.propss.hideTabs===true?'none':'flex',
                                 justifyContent: 'flex-end',
                                 paddingLeft: 4,
                                 paddingBottom: 4,
                             }}>
                            {/*{JSON.stringify(this.state.propss)}*/}

                            <div style={{marginLeft: 'auto'}}></div>
                            {/*<Drag tt={this} />*/}
                            {/*<div className={'settingsButton popoutt'} onClick={this.popout}>⇱</div>*/}
                            <div className={'settingsButton draggg'}
                                 onClick={this.dragclickmsg}
                                 onMouseEnter={this.setDragsource}
                                 onMouseDown={this.mouseDownn}
                                 onMouseUp={this.mouseUpp}
                                 onMouseOut={this.mouseOutt}
                                 id={'drag' + this.state.id}>{this.state.dragggg}</div>
                            <div className={'settingsButton settingsss'} id={'settingz'}
                                 onClick={this.settingsButton}>⚙
                            </div>

                            <div className={'settingsButton closee'} onClick={this.closeButton}>✖</div>
                        </div>


                        {/*<div style={{padding: 50}} onClick={this.upcount}>*/}
                        {/*    {this.state.countt}*/}
                        {/*</div>*/}

                        <div id={'contentt'} style={{height: '100%', width: '100%'}}>


                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                height: '100%'
                            }}>
                                {/*<div>{this.state.id}</div>*/}
                                {/*<div>{JSON.stringify(this.state.propss)}</div>*/}
                                <div style={{height: '100%'}}>{this.state.comp}</div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            id={'modall'}
                        >


                            <div id={'topsettings'} style={{
                                // opacity: this.state.showSettings ? 1 : 0,
                                // overflow: this.state.showSettings ? 'visible' : 'hidden',
                                // height: this.state.showSettings ? '100%' : '0px',
                                // padding: this.state.showSettings ? 10 : 0,
                                // zIndex: this.state.showSettings ? 10000 : 3000,
                                opacity: 1,
                                // l: 'rgba(255,255,255,0.31)',
                                // overflow: 'scroll',
                                height: 'fit-content',
                                maxHeight: '70vh',
                                // padding: this.state.showSettings ? 10 : 0,
                                // zIndex: this.state.showSettings ? 10000 : 3000,
                                width: '-webkit-fill-available',
                                boxShadow: '2px 2px 4px rgba(255,255,255,0.31)'
                            }}>

                                <div id={'settingsInner'}>

                                    <div style={{
                                        padding: '0px 6px 2px',
                                        alignItems: 'center',
                                        opacity: 1,
                                        fontWeight: 'bold',
                                        display: 'flex'
                                    }} onClick={() => {
                                        // this.setState({showSettings: false})
                                        this.closeModal()
                                    }}>
                                        <span id={'settingstitle'}>{this.state.name} settings</span>
                                        <span id={'settingsX'}>✖</span>
                                    </div>

                                    {this.state.compSettings}
                                </div>


                            </div>


                        </Modal>

                    </div>
                )}
            </Context.Consumer>

        )
    }

    openModalHandler() {
        this.setState({isModalOpen: true})
    }

    closeModalHandler() {
        this.setState({isModalOpen: false})
    }
}
