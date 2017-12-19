import React, { Component } from 'react';
class Helper  {

    static getUrls() {
        const apiUrl="http://localhost:8080/beers/json";
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