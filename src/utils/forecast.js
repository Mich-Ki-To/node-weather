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
        const temp = body.currently.temperature
        const rain = body.currently.precipProbability
        callback(undefined,body.daily.data[0].summary+' It is currently '+temp+' degrees out'+' & there is a '+rain+' % chance of a rain')

    }
})
}

module.exports = forecast