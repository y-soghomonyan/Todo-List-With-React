import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Form extends Component {
    render() {
        const class_name = this.props.activeElms == this.props.completedElms && this.props.activeElms > 0 ? 'act' : '';
        console.log( this.props.activeElms,this.props.completedElms)
        return (
            <React.Fragment>
                <div className={'checkBig col-sm-1 '+ class_name}><i className="fas fa-check" onClick={this.props.handleCheckAll}></i></div>
                <div className={'col-sm-11'}>
                    <form onSubmit={this.props.onSubmit}>
                        <input type="text" placeholder={'Add new todo'} className={'form-control'} id={'main'} autoComplete={'off'} />
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Form;
