const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Shai George'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Shai George'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page',
        title: 'Help',
        name: 'Shai George'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' you have to provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: ' you have to provide an address'
            })
        }

        forecast(latitude,longitude, (error, forecstData) => {
            if (error) {
                return res.send({error: ' cannot find location'})
            }
            res.send({
                location,
                forecst: forecstData,
                address: req.query.address
            })
            
        })
    
    })
})


app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error:'you must provide a rearch term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        error_message: 'Help article not found',
        name: 'Shai George'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        error_message: 'Page not found',
        name: 'Shai George'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})