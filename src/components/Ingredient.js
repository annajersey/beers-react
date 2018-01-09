import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';
import {connect} from 'react-redux';
import Columns from 'react-columns';
import Autocomplete from '@celebryts/react-autocomplete-tags'
import {selectIngredient,removeIngredient} from '../actions';
class Ingredient extends Component {
    constructor(props) {
        super(props)
        this.state={
            toggleBlock:0,
            suggestions:[]
        }

        this.handleToggleHops = this.handleToggleHops.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.getItem = this.getItem.bind(this);
        this.onTockenAdd = this.onTockenAdd.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.onTockenDelete = this.onTockenDelete.bind(this);
        this.addSelected = this.addSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);

    }

     removeSelected(type,value){
         this.props.removeIngredient(value,type);
     }
     addSelected(type,value){
         this.props.selectIngredient(value,type);
     }
    handleToggleHops(e) {
        const height = this.state.toggleBlock ? 0 : 'auto';
        this.setState({toggleBlock: height});
    }

    handleCheckbox(e) {
        //console.log(e.target.value);
        //this.handleCheckbox(this.props.type,e.target.value,e.target.checked);
        const type=this.props.type;
        const value=e.target.value;
        if(e.target.checked)
            this.addSelected(type,value)
        else
            this.removeSelected(type,value)
    }

    getItem(id){
        return this.props.items.find(function (item) { return item.id == id; });
    }
    isSelected(item) {
        return (this.props.selected.indexOf(item.id) > -1)
     }
    onTockenDelete(selected){

        this.removeSelected(this.props.type,selected[0].value);
    }
    onTockenAdd(selected){

        this.addSelected(this.props.type,selected.value);
    }

    changeSuggestions = (value) => {
        //console.log('Value received from onChange: ' + value)
        const itemsSuggestion = this.props.items.filter(function(item, index, array){
            return (item.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
        });
        this.setState({
            suggestions : itemsSuggestion.map( (item)=>{
                return ({
                    label: item.name,
                    value: item.id
                });
            })
        });

    }



    render() {

        if (!this.props.items) return <p><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading {this.props.title}...</p>
        this.itemsCheckboxes = this.props.items.map( (item,key)=>{
            return (
                <div className="form-check checkbox">
                    <label className="form-check-label">
                        <input checked={this.isSelected(item)}
                               className="form-check-input"
                               onClick={this.handleCheckbox}
                               type="checkbox" value={item.id} />
                            {item.name}
                    </label>

                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1"><h3 onClick={this.handleToggleHops}>{this.props.title}
                        <i className="fa fa-caret-down malts"></i></h3>
                    </div>
                    <div className="col-lg-11">
                        <Autocomplete
                            onAdd={this.onTockenAdd}
                            onDelete={this.onTockenDelete}
                            suggestions={this.state.suggestions }
                            onChange={this.changeSuggestions}
                            tags={this.props.selected.map(id => {return {label: this.getItem(id).name,
                                value: this.getItem(id).id }})}
                        />

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

function mapStateToProps(state, ownProps){
    const {selectedIngredients} = state;
    const selected=selectedIngredients[ownProps.type] || [];
    //console.log('selectedIngredients[ownProps.type]',selectedIngredients[ownProps.type]);
    const items = state[ownProps.type];
    return {selected,items}

}

export default connect(mapStateToProps,{selectIngredient,removeIngredient})(Ingredient);
