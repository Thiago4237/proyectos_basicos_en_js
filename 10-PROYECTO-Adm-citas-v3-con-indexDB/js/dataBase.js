import { DB } from "./variables.js";

// crea la base de datos 
export function createDB() {

    return new Promise((resolve, reject) => {
        // crear la bd 1.0
        const crear = window.indexedDB.open('citas', 1)
    
        // error al crear la bd
        crear.onerror = function () {
            console.log('BD no se pudo crear')
            reject()
        }
    
        // bd creada
        crear.onsuccess = function () {
            DB.value = crear.result
            console.log('BD creada')
            resolve()
        }
    
        // configuracion del schema
        crear.onupgradeneeded = function(e) {
            
            const db = e.target.result
    
            const objectStore = db.createObjectStore('citas', {
                keyPath: 'id',
            })
    
            // definir columnas 
            objectStore.createIndex('id', 'id', { unique: true })
            objectStore.createIndex('paciente', 'paciente', { unique: false })
            objectStore.createIndex('propietario', 'propietario', { unique: false })
            objectStore.createIndex('email', 'email', { unique: false })
            objectStore.createIndex('fecha', 'fecha', { unique: false })
            objectStore.createIndex('sintomas', 'sintomas', { unique: false })
            
            console.log('db configurada')
    
        }
    })
}

// obtiene todos los registros 
export function getAll() {
    
    return new Promise((resolve, reject) => {
        const citas = []
        const objStore = DB.value.transaction('citas').objectStore('citas')

        objStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;

            if (cursor) {
                citas.push(cursor.value);
                cursor.continue();
            } 
            else {
                // cursor null = ya no hay más registros
                resolve(citas);
            }
        }

        objStore.openCursor().onerror = () => reject([]);

    })
}

// añade un registro
export function registrar(citaObj) {

    return new Promise((resolve, reject) => {

        const transaction = DB.value.transaction(['citas'], 'readwrite')
        const objStore = transaction.objectStore('citas')
        
        objStore.add(citaObj)

        transaction.oncomplete = () => resolve(true)
        transaction.onerror = () => reject(false)
    })
}

// edita la informacion de un registro
export function editar(citaObj){
    
    return new Promise((resolve, reject) => {
        const transaction = DB.value.transaction(['citas'], 'readwrite')
        const objStore = transaction.objectStore('citas')
        
        objStore.put(citaObj)

        transaction.oncomplete = () => resolve(true)
        transaction.onerror = () => reject(false)

    })
}

// elimina un registro por el id
export function eliminar(id) {

    return new Promise((resolve, reject) => {
        const transaction = DB.value.transaction(['citas'], 'readwrite')
        const objStore = transaction.objectStore('citas')
    
        objStore.delete(id)

        transaction.oncomplete = () => resolve(true)
        transaction.onerror = () => reject(false)

    })
}