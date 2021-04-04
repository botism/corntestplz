import * as React from 'react';
import {Row} from "./Row.jsx"
class Table extends React.Component {


    render() {
        return (<table className="tablebook2"><Row data={this.props.data}/></table>)
    }
}

export {Table}
