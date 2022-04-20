class Citas {
    constructor() {
        this.citas = [];
    }

    //Agregar cita
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id );
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id ===  citaActualizada.id ? citaActualizada : cita );
    }
}

export default Citas;