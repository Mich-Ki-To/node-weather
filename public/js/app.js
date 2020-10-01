//const { response } = require("express")

console.log('Client side javascript is loaded')

/*
fetch('http://localhost:3000/weather?address=maharashtra').then((response) => {
  response.json().then((data) => {

      if(data.Error)
      {
          console.log(data.Error)
      }
      else
      {
      console.log(data.location)
      console.log(data.forcast)
      }
      
  })
})
*/

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#m1')
const messagetwo = document.querySelector('#m2')

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    messageone.textContent='Loading..'
    messagetwo.textContent=''

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {

        if(data.Error)
        {
              messageone.textContent=data.Error
        }
        else
        {
            messageone.textContent=data.location
            messagetwo.textContent=data.forcast
            console.log(data.location)
            console.log(data.forcast)
        }
    })
})
//    const location = search.value
 //   console.log(location)
})
