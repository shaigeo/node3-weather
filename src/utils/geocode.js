const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) +'.json?access_token=pk.eyJ1Ijoic2hhaWdlIiwiYSI6ImNrbmswMzIxejAzejcyc24wb284amt4NHEifQ.Xo0KRURozhce1nvMb7cV0g&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length ===0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode