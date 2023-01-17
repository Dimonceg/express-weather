
const form = document.getElementById('form')
const search = document.getElementById('search')
const message = document.querySelector('#message')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`http://localhost:3000/weather?adress=${search.value}`).then((res) => {
  res.json().then((data) => {
    if(data.error) return message.textContent = data.error
    message.textContent = `Место: ${data.location} Погода: ${data.forecast}`
    console.log(data)
  })})
})