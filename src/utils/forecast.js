const request = require('postman-request')

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=edeac820e7c5d5564bf0397f5b20a465&query=${lat},${lon}`
  request({ url, json: true }, (error, { body }) => {
    if(error) return callback('Something wrong with connection', undefined)
    if(!body.current) return callback('Dont find location', undefined)
    callback(undefined, `Сейчас ${body.current.temperature} градусов. Ощущается как ${body.current.feelslike}`)
  })
}

module.exports = forecast