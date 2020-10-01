const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
//const publicdirectory = '\Users\nikhil.shinde02\Desktop\Node-course\web-server\public'

//Define paths for Express config
const publicdirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'/template/views')
const partialspath = path.join(__dirname,'/template/partials')

console.log(path.join(__dirname,'../src/views'))

//set handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdirectory))

//app.get methods are used to serve content to html pages
app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Nikhil Shinde'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About us :',
        name:'Nikhil Shinde'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help :',
        message :'Kashala pahije re help tula ?',
        name:'Nikhil Shinde'

    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            Error:'You must provide address'
        })
    }

    geocode(req.query.address,(err,{latitude,longitude,location}={}) => {
        if(err){
            return res.send({
                Error:err
            })
            //return console.log('Error :',err)
        }
        forecast(latitude,longitude, (error,forecastdata) => {
            if(error){
                return res.send({
                    Error:error
                })
            }
            res.send({
                forcast:forecastdata,
                location:location,
                address:req.query.address
        
                //forcast:'It is too hot',
                //location:'Thiruvananthpuram',
                //address:req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res) => {
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'404',
        name:'Nikhil Shinde',
        error:'Help page not found'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        name:'Nikhil Shinde',
        error:'Page Not Found !'
    })
})

//app.listen is used to make app listen on this particular port number
app.listen(3000,() => {
    console.log('Server is up & listening on 3000 port')
})

/*app.get('', (req,res) => {
    res.send('<h1>Welcome to Express</h1>')
})

app.get('/help',(req,res) => {
    res.send({
        name : 'Nikhil',
        age : 23
    })
})

app.get('/about',(req,res) => {
    res.send('<Title>About</Title><h1>This is about page !!</h1>')
})

app.get('/weather',(req,res) => {
    res.send({
         forecast: 'It is clear sunny day today',
         location : 'Mumbai'
    })
})
*/