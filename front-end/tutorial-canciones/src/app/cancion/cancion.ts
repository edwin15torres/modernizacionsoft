import { Usuario } from "../usuario/usuario";
import { Album } from "../album/album";

export class Cancion {
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;
    //usuario: number;
    albumes: Array<Album>;
    //compartidos: Array<any>;
    propia: string;

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string,
        //usuario: number,
        albumes: Array<Album>,
        //compartidos: Array<any>,
        propia: string
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete,
        //this.usuario = usuario,
        this.albumes = albumes,
        //this.compartidos = compartidos,
        this.propia = propia
    }
}
