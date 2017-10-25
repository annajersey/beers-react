import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';
import Columns from 'react-columns';
class Ingredient extends Component {
    constructor(props) {
        super(props)
        this.state={
            toggleBlock:0
        }
        this.handleToggleHops = this.handleToggleHops.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleToggleHops(e) {
        const height = this.state.toggleBlock ? 0 : 'auto';
        this.setState({toggleBlock: height});
    }
    handleCheckbox(e) {
        this.props.handleCheckbox(this.props.type,e.target.value,e.target.checked);
    }
    render() {

        if (!this.props.items) return <p>Loading {this.props.title}...</p>
        this.itemsCheckboxes = this.props.items.map( (item)=>{
            return (
                <div>
                    <input onClick={this.handleCheckbox} type="checkbox" value={item.id}/>
                    <label>{item.name}</label>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1"><h3 onClick={this.handleToggleHops}>{this.props.title}
                        <br /><i className="glyphicon glyphicon-chevron-down"></i></h3>
                    </div>
                    <div className="col-lg-11">
                        <input type="text" className="form-control"
                               value={this.props.selected.join()}/>
                    </div>
                </div>
                <AnimateHeight duration={ 700 } height={ this.state.toggleBlock }>
                    <Columns columns="4">
                        {this.itemsCheckboxes}
                    </Columns>
                </AnimateHeight>
            </div>
        );
    }
}
export default Ingredient;