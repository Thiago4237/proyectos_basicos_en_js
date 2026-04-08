// variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear()
const min = max - 10

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// eventos
document.addEventListener('DOMContentLoaded', () => {
    // mostrar autos al cargar
    mostrarAutos(autos)
    // llena opciones de años
    llenarSelect()
})

// listener eventos formulario
marca.addEventListener('change', llenarFormularioBusqueda)
year.addEventListener('change', llenarFormularioBusqueda)
minimo.addEventListener('change', llenarFormularioBusqueda)
maximo.addEventListener('change', llenarFormularioBusqueda)
puertas.addEventListener('change', llenarFormularioBusqueda)
transmision.addEventListener('change', llenarFormularioBusqueda)
color.addEventListener('change', llenarFormularioBusqueda)

// funciones 
function mostrarAutos(autos) {
    
    limpiarListado()

    if(!autos.length) {
        noResultados()
        return
    }

    autos.forEach((auto) => {
        
        const {marca, modelo, year, puertas, transmision, color, precio} = auto
        const autoHtml = document.createElement('p')

        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - transmision ${transmision} - precio $ ${precio} - ${color} 
        `

        // insertar en el html
        resultado.appendChild(autoHtml)

    })

}

function llenarSelect() {
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option')
        opcion.value = i
        opcion.textContent = i
        year.appendChild(opcion)
    }
}

function llenarFormularioBusqueda(e) {
    datosBusqueda[e.target.id] = e.target.value
    filtrarAutos()
}

function filtrarAutos() {

    let resultado = autos

    for(let filtro in datosBusqueda) {

        resultado = resultado.filter(auto => {
    
            if(datosBusqueda[filtro]) {

                let valor = (typeof auto[filtro] !== 'number')
                    ? datosBusqueda[filtro] : Number(datosBusqueda[filtro])

                if (filtro === 'minimo') {
                    return auto.precio >= valor 
                }
                else if (filtro === 'maximo') {
                    return auto.precio <= valor
                }
                else {
                    return auto[filtro] === valor
                }
            }

            return auto;
        });
    }

    console.log(resultado)
    mostrarAutos(resultado)
}

function limpiarListado(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function noResultados() {
    const noResultado = document.createElement('div')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = 'Sin resultados para esos filtros'
    resultado.appendChild(noResultado)
}