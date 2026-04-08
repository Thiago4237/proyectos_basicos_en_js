// variables
const form = document.querySelector('#formulario')
const listado = document.querySelector('#lista-tweets')
let tweets = []

// listeners
listeners()

function listeners() {
    // agrega tweet
    form.addEventListener('submit', agregar)

    // documento listo 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []
        crearHtml()
    })
}


// funciones
function agregar(e) {
    
    e.preventDefault()
    
    const text = document.querySelector('#tweet').value
    
    if (text.trim() === '' ) {
        mostrarError('el mensaje no puede ser vacio')
        return
    }
    
    const tweet = {
        id: Date.now(),
        texto: text
    }

    tweets = [...tweets, tweet]

    crearHtml()

    form.reset()
}

function mostrarError(msn) {
    
    const error = document.createElement('p')
    error.textContent = msn
    error.classList.add('error')

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(error)

    setTimeout(() => {
        error.remove()
    }, 3000);
}

function crearHtml() {
    
    limpiarHtmlLista()
    
    if (tweets.length > 0) {
        
        tweets.forEach(tweet => {

            // btn eliminar 
            const btnElimniar = document.createElement('a') 
            btnElimniar.classList.add('borrar-tweet')
            btnElimniar.textContent = 'X'
            btnElimniar.onclick = () => {
                borrarTweet(tweet.id)
            }

            const li = document.createElement('li')
            li.textContent = tweet.texto
            li.id = tweet.id
            li.appendChild(btnElimniar)
            listado.appendChild(li)
        })
    }

    sincronizarStorage()

}

function limpiarHtmlLista() {
    while(listado.firstChild) {
        listado.removeChild(listado.firstChild)
    }
}

function sincronizarStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHtml()
}