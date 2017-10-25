import React, {Component} from 'react';

class Beers extends Component {

    render() {

        if (this.props.loading) return 'Loading...';
        else if (!this.props.beers) return null;

        return (
            <div className="table-responsive beers-table">
                <table className="table table-hover table-striped">

                    <tbody>
                    { this.props.beers.map((beer) => {
                        return (<tr>
                                <td>{beer.beerTitle}</td>
                                <td>{beer.beerDescription}</td>
                                <td>{beer.beerTips}</td>
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