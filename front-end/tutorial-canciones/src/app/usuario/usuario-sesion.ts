export class UsuarioSesion {
    id: number;
    nombre: string
    token: string

    constructor(
        id: number,
        nombre: string,
        token: string
    ){
        this.id = id;
        this.nombre = nombre;
        this.token = token
    }
}
