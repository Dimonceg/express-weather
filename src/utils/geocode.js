const request = require('postman-request')

const geocode = (adress, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?&access_token=pk.eyJ1IjoiZGltb25jZWciLCJhIjoiY2wwZmFoNzZ5MHF6dzNpazY5ZXpsazg4eiJ9.DFFcSRsk8Z9f9RITDatf1Q&limit=1`
  request({url, json: true}, (error, { body } = {}) => {
    if(error) {
      return callback('Не могу загрузить сервис', undefined)
    }
    if(!body.features.length) {
      return callback('Не правильный запрос', undefined)
    }
    const data = body.features[0]
    const result = {
      lat: data.center[1],
      lon: data.center[0],
      city: data.place_name
    }
    // callback(undefined, `Широта ${data.center[1]}; Долгота ${data.center[0]}. Город ${data.place_name}`)
    callback(undefined, result)
  })
}

module.exports = geocode