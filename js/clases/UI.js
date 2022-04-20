import { eliminarCita, cargarEdicion } from '../funciones.js';
import { contenedorCitas, heading } from '../selectores.js'

class UI {

    imprimirAlerta(mensaje, tipo) {
        //Crear el DIV
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //quitar alerta 
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach( cita => {
            const { nombre, apellido, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting dde los elementos cita
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.textContent = nombre;

            const apellidoParrafo = document.createElement('p');
            apellidoParrafo.innerHTML = `
            <span class="font-weight-bolder">Apellidos:</span> ${apellido}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            //Boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML= `
                Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            `;

            btnEliminar.onclick = () => eliminarCita(id);

            //Añade un boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `
                Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            `;
            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al div cita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(apellidoParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al html
            contenedorCitas.appendChild(divCita);
        });
    }


    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }
    }
}

export default UI;