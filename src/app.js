const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Привет Express',
    name: 'Дмитрий ББ'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Дмитрий'
  })
})

app.get('/help', (req, res) => {
  res.render('about', {
    title: 'Help page',
    name: 'Дмитрий Ч'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.adress) {
    return res.send({
      error: 'Adress must be provided'
    })
  }
  geocode(req.query.adress, (error, { lat, lon, city } = {}) => {
    if(error) return res.send({ error })
    forecast(lat, lon, (error, data) => {
      if(error) return res.send({ error })
      // res.render('weather', {
      //   title: 'weather',
      //   lat,
      //   lon,
      //   location: city,
      //   forecast: data,
      //   adress: req.query.adress
      // })
      res.send({
        title: 'weather',
        lat,
        lon,
        location: city,
        forecast: data,
        adress: req.query.adress
      })
    })
  })
  
})

app.get('*', (req, res) => {
  res.send('404 page')
})

app.listen(3000, () => {
  console.log('Server is run on port 3000')
})