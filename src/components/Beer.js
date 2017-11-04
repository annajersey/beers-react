import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Helper from './Helper'
class Beer extends  Component {

    constructor(props) {
        super(props)
        this.state = {
            requestFailed: false,
        }
    }
    componentDidMount(){
        const beerId = this.props.match.params.beerId;
        const beerUrl = Helper.getUrls().beerUrl+beerId;

        fetch(beerUrl)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response
            })
            .then(result => result.json())
            .then(beer => {
                this.setState({
                    beer: beer,
                    Loading:false
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })

    }
    render()
    {

        if (this.state.requestFailed) return <p>Request Failed!</p>
        const {beer} = this.state;
        if (!beer) return <p><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading {this.props.title}...</p>
        return (
            <div className="container">
                <div className="row">

                <div className="col-lg-9">
                    <h1><span className="grey">#{beer.id}</span>
                        {beer.name}<span class="grey">{beer.beerSubName}</span></h1>
                </div>
                <div className="col-lg-9">
                    <h3>{beer.beerTitle}<span class="grey">{beer.beerSubTitle}</span></h3>
                </div>

                <div className="col-lg-3">
                    <table width="100%">
                        <tr>
                            <th width="33%">ABV</th>
                            <th width="33%">IBU</th>
                            <th width="33%">OG</th>
                        </tr>
                        <tr>
                            <td width="33%" align="center">{beer.heading_abv}%</td>
                            <td width='33%' align='center'>{beer.heading_ibu}</td>
                            <td width='33%' align='center'>{beer.basics_target_og}</td>
                        </tr>
                    </table>
                </div>
                <div className="col-lg-7">
                    <div>
                        <h3><i class="fa fa-pagelines" aria-hidden="true"></i> INGREDIENTS</h3>
                        <table width="100%">
                            <tr>
                                <td>
                                    <p>{beer.beer_article}</p>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>


            </div>
            </div>
        )
    }
}


export default Beer