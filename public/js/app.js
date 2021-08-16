console.log('Client side javascript file is loaded')

// pass a url string, fetch data then run functions
fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



// when someone clicks the button and submits the form, pass a string similar to css
// we are getting values inside the webpage
const weatherForm = document.querySelector('#weather-form')
const searchElem = document.querySelector('#weather-input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')

// event listener, string and callback function
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElem.value
    msgOne.textContent = 'Loading information...'
    msgTwo.textContent = ''
    // fetch the url then parse the data
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        if (data.error)
        {   
            msgOne.textContent = data.error
        }
        else{

            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
    
    })
})