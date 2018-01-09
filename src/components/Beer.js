import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Helper from './Helper'
import {
    ShareButtons,
    ShareCounts,
    generateShareIcon
} from 'react-share';
class Beer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requestFailed: false,
        }
    }

    componentDidMount() {
        const beerId = this.props.match.params.beerId;
        const beerUrl = Helper.getUrls().beerUrl + beerId;

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
                    Loading: false
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })

    }

    render() {

        if (this.state.requestFailed) return <p>Request Failed!</p>
        const {beer} = this.state;
        if (!beer) return (<div className="container"><p><span
            class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            Loading {this.props.title}...</p></div>);
        const malts = beer.beerToMalt.map(malt => {
            return (
                <tr>
                    <td>{malt.malt.name}</td>
                    <td width="25%">{malt.weight}</td>
                </tr>
            )
        })
        const hops = beer.beerToHop.map(hop => {
            return (
                <tr>
                    <td>{hop.hop.name}</td>
                    <td>{hop.g}</td>
                    <td>{hop.add}</td>
                    <td>{hop.attribute}</td>
                </tr>
            )
        })
        const yeast = beer.yeast.map(yeast => {
            return (
                <tr>
                    <td>{yeast.name}</td>
                </tr>
            )
        })
        const mashTemps = JSON.parse(beer.method_mash_temp);

        const {
            FacebookShareButton,
            GooglePlusShareButton,

            TwitterShareButton,

            VKShareButton

        } = ShareButtons;
        const food =
            <div className="food">
                <div className="square">
                    <img src={ require(`../images/${beer.id}/1.png`) } />
                </div>
                <div className="square">
                    <img src={ require(`../images/${beer.id}/2.png`) } />
                </div>
                <div className="square">
                    <img src={ require(`../images/${beer.id}/3.png`) } />
                </div>
            </div>




        return (
            <div className="container">
                <div className="row">

                    <div className="col-lg-9">
                        <h1><span className="grey">#{beer.id} </span>
                            {beer.name}<span class="grey">{beer.beerSubName}</span></h1>
                    </div>
                    <div className="col-lg-9">
                        <h3>{beer.beerTitle}<span class="grey">{beer.beerSubTitle}</span></h3>
                    </div>

                    <div className="col-lg-3">
                        <table width="100%" className="abv-table">
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
                            <table width="100%" class="hl">
                                <thead>
                                <th colspan="2">MALT</th>
                                </thead>
                                {malts}
                            </table>
                            <table width="100%" class="hl">
                                <tr>
                                    <th>HOPS</th>
                                    <th class="grey">(g)</th>
                                    <th class="grey">Add</th>
                                    <th class="grey" width="25%">Attribute</th>
                                </tr>
                                {hops}
                            </table>
                            <table>
                                <thead>
                                <th>YEAST</th>
                                </thead>
                                {yeast}
                            </table>
                        </div>
                        <div>
                            <div>
                                <h3><i class="fa fa-flask" aria-hidden="true"></i> BASICS</h3>
                                <table width="100%" class="hl">
                                    <tr>
                                        <th>VOLUME</th>
                                        <td width="25%">{beer.basics_volume}</td>
                                    </tr>
                                    <tr>
                                        <th>BOIL VOLUME</th>
                                        <td>{beer.basics_boil_volume}L</td>
                                    </tr>
                                    <tr>
                                        <th>ABV</th>
                                        <td>{beer.basics_abv}%</td>
                                    </tr>
                                    <tr>
                                        <th>TARGET FG</th>
                                        <td>{beer.basics_target_fg}</td>
                                    </tr>
                                    <tr>
                                        <th>TARGET OG</th>
                                        <td>{beer.basics_target_og}</td>
                                    </tr>
                                    <tr>
                                        <th>EBC</th>
                                        <td>{beer.basics_ebc}</td>
                                    </tr>
                                    <tr>
                                        <th>SRM</th>
                                        <td>{beer.basics_srm}</td>
                                    </tr>
                                    <tr>
                                        <th>PH</th>
                                        <td>{beer.basics_ph}</td>
                                    </tr>
                                    <tr>
                                        <th>ATTENUATION LEVEL</th>
                                        <td>{beer.basics_attenuation_level}%</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-5">
                        <div>
                            <h3><i class="fa fa-clock-o" aria-hidden="true"></i> METHOD / TIMINGS</h3>
                            <div class="square">
                                <div class="numbers">
                                    <table>
                                        <thead>
                                        <th colspan="2">MASH TEMP</th>
                                        </thead>

                                        <tr>

                                            <td>{Object.keys(mashTemps)[0]}</td>
                                            <td>{mashTemps[Object.keys(mashTemps)[0]]}&deg;C</td>
                                        </tr>

                                    </table>
                                </div>

                            </div>
                            <div class="square">
                                <div class="numbers">
                                    <table>
                                        <thead>
                                        <td><strong>FERMENTATION</strong></td>
                                        </thead>
                                        <tr>
                                            <td>{beer.method_fermentation}&deg;C</td>
                                        </tr>
                                    </table>
                                </div>
                                <div>
                                    <table>

                                        <thead>
                                        <th>TWIST</th>
                                        </thead>
                                        <tr>
                                            <td>{beer.method_twist}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3><i class="fa fa-info-circle" aria-hidden="true"></i> THIS BEER IS</h3>
                            <table>
                                <tr>
                                    <td><p>{beer.beerDescription}</p></td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <h3><i className="fa fa-cutlery"></i> FOOD PAIRING</h3>

                            {food}
                         </div>
                        <br />
                            <div>
                                <h3><i class="fa fa-lightbulb-o" aria-hidden="true"></i> BREWER'S TIP</h3>
                                <table>
                                    <tr>
                                        <td>{beer.beerTips}</td>
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