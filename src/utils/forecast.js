const request = require('request')

// forecast

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dc2f62f26681809bc84786192411a1a6&query=' + latitude + ',' + longitude + '&units=f'

    request ( {url, json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if (body.error){
            callback('Unable to find location! Try another search',undefined)
        }
        else{
            callback(undefined,
               'The current weather forecast for today is ' + body.current.weather_descriptions[0].toLowerCase() + 
               '. It is currently ' + body.current.temperature + ' degrees outside and it currently feels like ' + 
               body.current.feelslike + ' degrees'
            )}
        
    })
}

module.exports = forecast