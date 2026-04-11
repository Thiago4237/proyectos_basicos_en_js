import { formulario } from '../selectores.js'

export default class Notificacion {

    constructor({texto, tipo}) {
        
        this.texto = texto;
        this.tipo = tipo;
        
        this.mostrar();
    }

    mostrar() {
        
        // eliminar alertas
        // const alertaPrevia = document.querySelectorAll('.alert');
        // alertaPrevia?.remove();
        document.querySelectorAll('.alert').forEach(el => el.remove());
        
        // crear notificacion
        const alerta = document.createElement('div');
        
        // asocia las clases 
        alerta.classList.add(
            'text-center', 'w-full', 'p-3', 'text-white', 'my-5', 
            'alert', 'uppercase', 'font-bold', 'text-sm'
        );
        
        this.tipo === 'error' 
            ? alerta.classList.add('bg-red-600') 
            : alerta.classList.add('bg-green-500')
        ;

        // mensaje de la notificacion
        alerta.textContent = this.texto;
        
        // insertar en el dom
        formulario.parentElement.insertBefore(alerta, formulario);

        // eliminar la notificacion despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }

}