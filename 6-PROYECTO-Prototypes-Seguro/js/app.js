function seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// realiza la cotizacion con los datos
seguro.prototype.cotizarSeguro = function() {
    
    /**
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;  
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // cada año que el auto tenga se reduce un 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        si el seguro es básico se multiplica por un 30% más
        si el seguro es completo se multiplica por un 50% más
    */
    // cantidad = (this.tipo === 'basico') ? cantidad * 1.30 : cantidad * 1.50;
    cantidad *= (this.tipo === 'basico') ?  1.30 :  1.50;

    return cantidad;
}

function UI(){}

// llenado de opciones de años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20
    ;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){ 
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        selectYear.appendChild(opcion);
    }

}

// mostrar mensaje en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    
    const div = document.createElement('div');
    
    div.classList.add((tipo === 'error') ? 'error' : 'correcto');
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    
    // insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove()
    }, 3000);

}

// muestra el resultado de la cotizacion
UI.prototype.mostrarResultado = (seguro, total) => {
    
    const {marca, year, tipo} = seguro;
    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;  
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');
    
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    // mostrar spiner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    // quita spiner y muestra resultado
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
    
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
   
    ui.llenarOpciones(); // llenar select con los años
    
});


eventListeners();

function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();
    // leer datos seleccionados
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');
    
    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    
    if(resultados != null){
        resultados.remove();
    }

    // instancia de seguro 
    const cotizado = new seguro(marca, year, tipo);
    // utilizar prototipe de cotizar
    const total = cotizado.cotizarSeguro();

    ui.mostrarResultado(cotizado, total);
}