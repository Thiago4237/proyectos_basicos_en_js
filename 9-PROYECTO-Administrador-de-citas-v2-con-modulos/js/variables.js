import { generarId } from "./funciones.js";

export let editando = {
    value: false
};

// objeto de cita
export const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}
