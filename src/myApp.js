import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import Beers from './components/Beers'
import Ingredient from './components/Ingredient'
import Helper from './components/Helper'
import {FormGroup,FormControl} from 'react-bootstrap';
import {setHops} from './actions';
const urls=Helper.getUrls();

const hopsUrl = urls.hopsUrl;
const maltsUrl = urls.maltsUrl;
const yeastsUrl = urls.yeastsUrl;
const searchUrl = urls.searchUrl;

class myApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestFailed: false,
        }
        

    }
     getJSON(url,type){
        console.log(url);
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
                this.props.setHops(d,type);

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

    Search(){
        this.setState({beersLoading:true});

        let selectedIngredients = Object.assign({}, this.props.selectedIngredients);
        let beersUrl = searchUrl+'?'+Object.keys(selectedIngredients)
            .map(type => type + '=' + selectedIngredients[type].join(','))
            .join('&');
        if(this.state.term) beersUrl+='&search='+this.state.term;
        this.getJSON(beersUrl,"beers");
    }
    render() {
        //console.log(Helper.urls);
        console.log('this.props',this.props);
        if (this.state.requestFailed) return <p>Request Failed!</p>
        const {hops,malts,yeasts,beers} = this.props;

        return (
            <div className="App">
                <div className="container">
                    <FormGroup>
                    <Ingredient title="Hops" type="hops" />
                    <Ingredient  title="Malt" type="malts" />
                    <Ingredient  title="Yeasts" type="yeasts" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1"><h3>Keyword</h3>
                            </div>
                            <div className="col-lg-11">
                                <FormControl type="text" value={this.state.term} onChange={(ev) => this.setState({term: ev.target.value})} />
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>this.Search()} className="btn-lg btn-primary">Search</button>
                    </FormGroup>
                    <Beers beers={beers} loading={this.state.beersLoading}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log('state',state);
    const {beers=[],selectedIngredients} = state;
    return {beers,selectedIngredients}

}
export default connect(mapStateToProps,{setHops})(myApp);


