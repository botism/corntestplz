import React from "react";
import ReactDOM from "react-dom";
import "./goldenLayout-dependencies";
import GoldenLayout from "golden-layout";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
let $ = window.jquery

export class GoldenLayoutComponent extends React.Component {
  state = {};
  containerRef = React.createRef();

  render() {
    let panels = Array.from(this.state.renderPanels || []);
    return (
      <div ref={this.containerRef} {...this.props.htmlAttrs}>
        {panels.map((panel) => {
          return ReactDOM.createPortal(
            panel._getReactComponent(),
            panel._container.getElement()[0]
          );
        })}
      </div>
    );
  }

  componentRender(reactComponentHandler) {
    this.setState(state => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.add(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }
  componentDestroy(reactComponentHandler) {
    this.setState(state => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.delete(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }

  goldenLayoutInstance = undefined;

  componentDidMount() {


    var savedState = null
        // localStorage.getItem( 'savedState' );

    if( savedState !== null ) {
      this.goldenLayoutInstance = new GoldenLayout( JSON.parse( savedState ), this.containerRef.current );
    } else {
      this.goldenLayoutInstance = new GoldenLayout( this.props.config || {},
          this.containerRef.current );
    }

    if (this.props.registerComponents instanceof Function)
      this.props.registerComponents(this.goldenLayoutInstance);
    this.goldenLayoutInstance.reactContainer = this;
    this.goldenLayoutInstance.init();
  }
}

const ReactComponentHandler = GoldenLayout["__lm"].utils.ReactComponentHandler;

class ReactComponentHandlerPatched extends ReactComponentHandler {
  _render() {
    var reactContainer = this._container.layoutManager.reactContainer; //Instance of GoldenLayoutComponent class
    if (reactContainer && reactContainer.componentRender)
      reactContainer.componentRender(this);
  }
  _destroy() {
    this._container.off("open", this._render, this);
    this._container.off("destroy", this._destroy, this);
  }

  _getReactComponent() {
    var defaultProps = {
      glEventHub: this._container.layoutManager.eventHub,
      glContainer: this._container
    };
    var props = $.extend(defaultProps, this._container._config.props);
    return React.createElement(this._reactClass, props);
  }
}

GoldenLayout["__lm"].utils.ReactComponentHandler = ReactComponentHandlerPatched;
