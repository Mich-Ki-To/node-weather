const request = require('request')

const forecast = (latitude,longitude,callback) => {

const url = 'https://api.darksky.net/forecast/5f935a6ddcddf6cd91cc0293160dc2a4/'+latitude+','+longitude+'?units=si'

request({url,json:true},(error,{body}) => {

    if(error){
        callback('Unable to connect to weather services')
    }
    else if(body.error) {
        callback('Unable to find location')
    }
    else{
        console.log(body.daily.data[0])
        const temp = body.currently.temperature
        const rain = body.currently.precipProbability
        callback(undefined,body.daily.data[0].summary+'\r\n It is currently '+temp+' degrees out'+'\r\n The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow +' & there is a '+rain+' % chance of a rain')

    }
})
}

module.exports = forecast