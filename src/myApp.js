import React, {Component} from 'react';
import './App.css';

import Beers from './components/Beers'
import Ingredient from './components/Ingredient'

const apiUrl = "http://178.150.105.118:8082";
const hopsUrl = apiUrl+"/beers/json/hops";
const maltsUrl = apiUrl+"/beers/json/malts";
const yeastsUrl = apiUrl+"/beers/json/yeasts";
const searchUrl = apiUrl+"/beers/json/search";
class myApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestFailed: false,
            hops: null,
            malts: null,
            yeasts: null,
            beers: null,
            selectedIngredients: {
                hops: [],
                malts: [],
                yeasts: []
            }
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.Search = this.Search.bind(this);
    }
    getJSON(url,type){
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    [type]: d,
                    [type+"Loading"]:false
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }
    componentDidMount() {
        this.getJSON(hopsUrl,"hops");
        this.getJSON(maltsUrl,"malts");
        this.getJSON(yeastsUrl,"yeasts");
    }
    handleCheckbox(type,value,isChecked){
        let selectedIngredients = Object.assign({}, this.state.selectedIngredients);    //creating copy of object
        let selectedIngredient=selectedIngredients[type];
        if(isChecked)
            selectedIngredient.push(value);
        else
            selectedIngredient.splice(selectedIngredient.indexOf(value), 1);
        this.setState({selectedIngredients});
    }
    Search(){
        this.setState({beersLoading:true});

        let selectedIngredients = Object.assign({}, this.state.selectedIngredients);
        let beersUrl = searchUrl+'?'+Object.keys(selectedIngredients)
            .map(type => type + '=' + selectedIngredients[type].join(','))
            .join('&');
        this.getJSON(beersUrl,"beers");
    }
    render() {
        if (this.state.requestFailed) return <p>Request Failed!</p>
        const {hops,malts,yeasts,beers} = this.state;
        return (
            <div className="App">
                <div className="container">
                    <Ingredient selected={this.state.selectedIngredients.hops} items={hops} title="Hops" type="hops" handleCheckbox={this.handleCheckbox}/>
                    <Ingredient selected={this.state.selectedIngredients.malts} items={malts} title="Malts" type="malts" handleCheckbox={this.handleCheckbox}/>
                    <Ingredient selected={this.state.selectedIngredients.yeasts} items={yeasts} title="Yeasts" type="yeasts" handleCheckbox={this.handleCheckbox}/>
                    <button onClick={this.Search} className="btn-lg btn-primary">Search</button>
                    <Beers beers={beers} loading={this.state.beersLoading}/>
                </div>
            </div>
        );
    }
}


export default myApp;
