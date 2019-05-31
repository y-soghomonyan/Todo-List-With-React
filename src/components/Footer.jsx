import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Footer extends Component {
    render() {
        const itemsLeft = this.props.itemsLeft;
        const class_name = this.props.completedElms == 0?'hidden':'';
        return (
            <React.Fragment>
                <div className={'row justify-content-around mt-3'}>
                    <div className={'col-sm-2'}>
                        <div className={'row justify-content-around mt-3'}>
                            <button className={'btn bg-transparent'}>{itemsLeft} items left</button>
                        </div>
                    </div>
                    <div className={'col-sm-7'}>
                        <div className={'row justify-content-around mt-3'}>
                            <button className={'btn bg-transparent button'} onClick={this.props.handleAll}>All</button>
                            <button className={'btn bg-transparent button'} onClick={this.props.handleActive}>Active</button>
                            <button className={'btn bg-transparent button'} onClick={this.props.handleCompleted}>Completed</button>
                        </div>
                    </div>
                    <div className={'col-sm-3'}>
                        <div className={'row justify-content-around mt-3'}>
                            <button className={'btn bg-transparent button '+ class_name} onClick={this.props.handleClearCompleted}>Clear completed</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Footer;
