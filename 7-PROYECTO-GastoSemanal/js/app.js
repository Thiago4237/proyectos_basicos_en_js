// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}


// clases
class Presupuesto {
    
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }

}

class UI {

    insertarPresupuesto(cantidad) {
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // crear el div 
        const divMensaje = document.createElement('div');

        divMensaje.classList.add('text-center', 'alert');
        divMensaje.classList.add((tipo === 'error') ? 'alert-danger' : 'alert-success');
        divMensaje.textContent = mensaje;

        // insertar en el html 
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
    
        // eliminar el alert después de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }

    mostrarGastos(gastos) {

        this.limpiarHTML();

        // itera los gastos
        gastos.forEach(gasto => {

            const { nombre, cantidad, id } = gasto;
            // crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            // agregar html del gasto 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;
            // boton para eliminar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'Borrar x';
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            // agregar el gasto al html
            nuevoGasto.appendChild(btnBorrar);
            gastoListado.appendChild(nuevoGasto);
        });

    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');

        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }
        else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        } 
        else {
            restanteDiv.classList.remove('alert-warning', 'alert-danger');
            restanteDiv.classList.add('alert-success');
        }

        // si el total es 0 o menor
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
        else {
            formulario.querySelector('button[type="submit"]').disabled = false;
        }

    }
}

// instancias de clases 
const ui = new UI();
let presupuesto;

// funciones
function preguntarPresupuesto() {
    
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {

    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }
    else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }
    
    // ui.imprimirAlerta('Gasto agregado correctamente', 'success');
    const gasto = { nombre, cantidad, id: Date.now() };

    // añade gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente', 'success');

    // imprimir gastos 
    const {gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    
    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    // reinicio formulario
    formulario.reset();
}

function eliminarGasto(id) {
    // elimina de la clase
    presupuesto.eliminarGasto(id);

    // elimina del html
    const { gastos, restante } = presupuesto;

    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}