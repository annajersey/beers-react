import React, {Component} from 'react';

class Beers extends Component {

    render() {

        if (this.props.loading) return (
        <span className="loader">
            <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            Loading...</span>
        );

        else if (this.props.beers === null) return null;
        else if (!this.props.beers.length) return 'No results';

        return (
            <div className="table-responsive beers-table">
                <table className="table table-hover table-striped">
                    <tbody>
                    { this.props.beers.map((beer) => {
                        return (<tr className="d-flex">
                                <td className="col-sm-3">{beer.beerTitle}</td>
                                <td className="col-sm-3">{beer.beerSubTitle}</td>
                                <td><b className="clearfix">ABV</b><br />{beer.basics_abv}%</td>
                            <td>IBU<br />{beer.basics_abv}</td>
                            <td>OG<br />{beer.basics_target_og}</td>

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