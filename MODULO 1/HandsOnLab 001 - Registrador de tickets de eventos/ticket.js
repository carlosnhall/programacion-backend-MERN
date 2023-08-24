// Registrador de tickets de eventos
// ¿Cómo lo hacemos? Se creará una clase que permitirá llevar una gestión completa de usuarios que deseen acceder a dichos eventos.

// Definir clase TicketManager
// La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un costo adicional al precio de cada evento.

// Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
// nombre
// lugar
// precio
// capacidad (50 por defecto)
// fecha (hoy por defecto)

// El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.

// Debe contar con un método “agregarUsuario” El cual recibirá:

// id del evento (debe existir, agregar validaciones)
// id del usuario

// El método debe evaluar que el evento exista y que el usuario no haya estado registrado previamente (validación de fecha y capacidad se evitará para no alargar el reto)
// Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese evento.

// Debe contar con un método “ponerEventoEnGira” El cual recibirá:

// id del evento
// nueva localidad
// nueva fecha

// El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)

class TicketManager {

    constructor() {
        console.log("Ticket Manajer se ha instanciado.");

        this.precioBaseDeGanancia = 10; 
        this.eventos = []; 
    };
  
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const id = this.eventos.length + 1; 
        const participantes = []; 
  
        const evento = {
            id,
            nombre,
            lugar,
            precio: precio + this.precioBaseDeGanancia, 
            capacidad,
            fecha,
            participantes,
        };
  
        this.eventos.push(evento); 
    };
  
    agregarUsuario(eventoId, usuarioId) {
        const evento = this.eventos.find((e) => e.id === eventoId);

        if (!evento) {
            console.log("Evento no encontrado");
            return;
        };
    
        if (evento.participantes.includes(usuarioId)) {
            console.log("Usuario ya registrado para este evento");
            return;
        };
    
        evento.participantes.push(usuarioId); 
    };

    ponerEventoEnGira(eventoId, nuevaLocalidad, nuevaFecha) {
        const evento = this.eventos.find((e) => e.id === eventoId);
        if(!evento){
            console.log("Evento no encontrado");
            return;
        };
        const nuevoEvento = {
            ...evento, 
            id: this.eventos.length + 1, 
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            participantes: [], 
        };
        this.eventos.push(nuevoEvento); 
    };

    verEventos(){ // Agregue este metodo aunque no este en la consigna para poder ver testear todo
        this.eventos.map((evento) => {
            console.log(`Evento ID: ${evento.id}`);
            console.log(`Nombre del evento: ${evento.nombre}`);
            console.log(`Precio del evento: ${evento.precio}`);
            console.log(`Participantes del evento: ${evento.participantes.length}`);
        })
    }
};

const ticketManager = new TicketManager();

ticketManager.agregarEvento("Lollapalooza", "Cemento", 50);
ticketManager.agregarEvento("Lali Esposito", "Teatro Colon", 100);
ticketManager.agregarEvento("Rata Blanca", "Cantina Bar Lo De Nestor", 15);


ticketManager.agregarUsuario(0, "Martina Martinez"); // Evento no encontrado

ticketManager.agregarUsuario(1, "Marcos Marquez"); 
ticketManager.agregarUsuario(1, "Marcos Marquez"); // Usuario ya registrado para este evento

ticketManager.agregarUsuario(2, "Gonzalo Gonzalez");

ticketManager.ponerEventoEnGira(1, "Estadio River Plate", new Date("2023-05-20"));

ticketManager.verEventos();