// variables
const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const btnVaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

cargarEventListeners()

// agrega eventos desde el js
function cargarEventListeners() {
    // agregar curso 
    listaCursos.addEventListener('click', agregarCurso)

    // eliminar cursos carrito 
    carrito.addEventListener('click', eliminarCurso)

    // vaciar carrito 
    btnVaciarCarrito.addEventListener('click', vaciarCarrito)
}

// funciones
function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const seleccionado = e.target.parentElement.parentElement
        leerDatosCurso(seleccionado)
    }

}

function eliminarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('borrar-curso')) {
        const seleccionado = e.target.getAttribute('data-id')
        // eliminar del arreglo por el data id 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== seleccionado)

        carritoHtml()
    }
}

function vaciarCarrito(e) {
    articulosCarrito = []
    limpiarHtml()
}

function leerDatosCurso(curso) {
    
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisa si ya esta en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
            }
            return curso
        }) 
        articulosCarrito = [...cursos]
    }
    else {
        // agrega los elementos
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHtml()
}

function carritoHtml() {

    // limmpiar html
    limpiarHtml()

    // recorre y genera el html
    articulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>

        `
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHtml() {
    // forma lenta
    // contenedorCarrito.innerHTML = ''

    // forma recomendada y mas rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}