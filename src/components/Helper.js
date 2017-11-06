import React, { Component } from 'react';
class Helper  {

    static getUrls() {
        const apiUrl="http://178.150.105.118:8082/beers/json";
        return {
            hopsUrl: apiUrl + "/hops",
            maltsUrl: apiUrl + "/malts",
            yeastsUrl: apiUrl + "/yeasts",
            searchUrl: apiUrl + "/search",
            beerUrl: apiUrl + "/beer/"
        }
    }
    static helperFunctionHere() {
        console.log("hi");
    }
}
export default Helper