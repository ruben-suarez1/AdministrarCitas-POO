import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import { 
    nombreInput, 
    apellidoInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js'

const ui = new UI();
const administrarCitas = new Citas();


let editando;

//Objeto con la informacion de la cita
const citaObj = {
    nombre: '',
    apellido: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agreaga datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//Valida y agregar una nueva cita a la clase citas
export function nuevaCita(e) {
    e.preventDefault();

    //Extraer la informacion del objeto de cita
    const { nombre, apellido, telefono, fecha, hora, sintomas } = citaObj;

    //validar
    if( nombre === '' || apellido === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Todos lo campos son obligatorios', 'error');
        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edicion
        editando = false;
    } else {
         //Generar un id
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }

   

    //Reiniciar el obj
    reiciarObj();

    //Reinicia el formulario
    formulario.reset();

    //Mostrar el html
    ui.imprimirCitas(administrarCitas);
}

//Borrar datos del obtejo
export function reiciarObj() {
    citaObj.nombre = '';
    citaObj.apellido = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

//Eliminar cita
export function eliminarCita(id) {
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Cargar los datos y modo edicion
export function cargarEdicion(cita) {
    const { nombre, apellido, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los input
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    citaObj.nombre = nombre;
    citaObj.apellido = apellido;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}