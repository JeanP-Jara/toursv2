export interface Usuario {
    id_usuario: number,
    c_codigo: String,
    c_contrasena: String
}

export interface ResponseUsuario{
    estado: boolean,
    mensaje: string,
    data: Usuario[]
}
