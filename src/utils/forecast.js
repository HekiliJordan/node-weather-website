const { debug } = require('request')
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

            debugger
            let localtime = body.location.localtime
            let time = localtime.split(" ")

            callback(undefined,
               body.current.weather_descriptions[0].toLowerCase() + 
               '. It is ' + body.current.temperature + ' degrees outisde with a precipitation level of ' + 
               body.current.precip + '. Current time is: ' + time[1]
            )}
        
    })
}

module.exports = forecast