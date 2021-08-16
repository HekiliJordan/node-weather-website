const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    // can render hbs arguement
    res.render('index', {
        title: 'Weather',
        name: 'Hekili Jordan'
    })
})

app.get('/about', (req,res) => {
    // can render hbs arguement
    res.render('about', {
        title: 'About Me',
        name: 'Hekili Jordan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hekili Jordan',
        helpText: 'What can we help you with today?'
    })
})

// tells the server what to do when someone tries to get resources at specific url, takes two elements, route, func
// func takes in two arguments, object and response
// Weather page
app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'No address provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// any page that hasn't been matched 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help page not found!',
        name: 'Hekili Jordan'
    })


})
// wildcard, any other url that isn't used with app.get, needs to be last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hekili Jordan',
        errorMsg: 'Page not found!'
    })
})
// starts server on a port or url
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

