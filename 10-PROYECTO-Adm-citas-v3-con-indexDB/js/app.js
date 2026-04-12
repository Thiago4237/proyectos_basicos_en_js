import { datosCita, submitCita, cargarCitas } from "./funciones.js";
import { createDB } from "./dataBase.js";
import { 
    emailInput, fechaInput, formulario, 
    pacienteInput, propietarioInput, sintomasInput 
} from "./selectores.js" 

function eventListeners() {
    pacienteInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    emailInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
    formulario.addEventListener('submit', submitCita);
}

window.onload = () => {
    eventListeners()
    createDB().then(() => cargarCitas())
}

