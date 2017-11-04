import React, {Component} from 'react';
import { Link } from 'react-router-dom'
class Beers extends Component {

    render() {

        if (this.props.loading) return (
        <span className="loader">
            <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            Loading...</span>
        );

        else if (this.props.beers === null) return null;
        else if (!this.props.beers.length) return (<div className="no-rs">No results</div>);

        return (
            <div className="table-responsive beers-table">
                <table className="table table-dark table-hover table-striped">
                    <tbody>
                    { this.props.beers.map((beer) => {
                        return (<tr className="d-flex" key={beer.id}>
                                <td className="col-sm-3">
                                    <Link to={`/beer/${beer.id}`}> {beer.beerTitle} </Link>
                                </td>
                                <td className="col-sm-3">{beer.beerSubTitle}</td>
                                <td><b className="clearfix">ABV</b>{beer.basics_abv}%</td>
                            <td><b className="clearfix">IBU</b>{beer.basics_abv}</td>
                            <td><b className="clearfix">OG</b>{beer.basics_target_og}</td>

                            </tr>

                        );
                    })
                    }
                    </tbody>

                </table>
            </div>
        );
    }
}


export default Beers;