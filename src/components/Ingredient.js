import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';
import Columns from 'react-columns';
import Autocomplete from '@celebryts/react-autocomplete-tags'
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

    }

    handleToggleHops(e) {
        const height = this.state.toggleBlock ? 0 : 'auto';
        this.setState({toggleBlock: height});
    }
    handleCheckbox(e) {
        this.props.handleCheckbox(this.props.type,e.target.value,e.target.checked);
    }

    getItem(id){
        return this.props.items.find(function (item) { return item.id == id; });

    }
    isSelected(id) {
         return (this.props.selected.indexOf(id) > -1)
     }
    onTockenDelete(selected){
        this.props.removeSelected(this.props.type,selected.value);
    }
    onTockenAdd(selected){
        this.props.addSelected(this.props.type,selected.value);
    }

    changeSuggestions = (value) => {
        console.log('Value received from onChange: ' + value)
        const itemsSuggestion = this.props.items.filter(function(item, index, array){
            return (item.name.toLowerCase().indexOf(value.toLowerCase()) == 0)
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


    componentWillReceiveProps(nextProps) {
        if (nextProps.items) {

            this.setState({
                suggestions : nextProps.items.map( (item)=>{
                        return ({
                           label: item.name,
                           value: item.id
                        });
                })
            })
        }
    }
    render() {

        if (!this.props.items) return <p>Loading {this.props.title}...</p>
        this.itemsCheckboxes = this.props.items.map( (item,key)=>{
            return (
                <div className="form-check">
                    <label className="form-check-label">
                        <input checked={this.isSelected(item.id)} className="form-check-input" onClick={this.handleCheckbox} type="checkbox" value={item.id} />
                            {item.name}
                    </label>

                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1"><h3 onClick={this.handleToggleHops}>{this.props.title}
                        <br />&#9660;</h3>
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
                        {/*<input type="text" className="form-control"*/}
                               {/*value={this.props.selected.map(id => this.getItem(id).name).join()}/>*/}

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