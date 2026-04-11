import { datosCita, submitCita } from "./funciones.js";
import { 
    emailInput, fechaInput, formulario, 
    pacienteInput, propietarioInput, sintomasInput 
} from "./selectores.js" 

// eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita);
