const request = require("request")

request
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=02ed8054675124d51f8da99dcbd9a24d&query=' + lat + ',' + long + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degresse out. it feels like ' + body.current.feelslike + ' out')
        }
    })
}

module.exports = forecast