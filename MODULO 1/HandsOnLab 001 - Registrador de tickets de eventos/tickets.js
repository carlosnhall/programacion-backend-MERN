class TicketManager{
    constructor(){
        this.eventos = []

    }

    

    getEventos(){
        return this.eventos
    }


}

let ticket1 = new TicketManager()
ticket1.getEventos()
console.log(ticket1.getEventos())

function suma(a, b = a*1.15){
    return b

}
console.log(suma(4))
