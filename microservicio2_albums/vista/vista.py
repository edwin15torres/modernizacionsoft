from flask import request
from sqlalchemy.orm import query
from microservicio2_albums.modelo.modelo import db, Usuario, Album, AlbumSchema, RecursoCompartido, RecursoCompartidoSchema
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

album_schema = AlbumSchema()
recurso_compartido_schema = RecursoCompartidoSchema()

class VistaAlbumesUsuario(Resource):
    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        propios = []
        for a in usuario.albumes:
            propios.append(a)

        for c in usuario.compartidos:
            if c.album_id != None :
                ac = Album.query.filter(Album.id == c.album_id).first()
                ac.propio = 0
                propios.append(ac)

        return [album_schema.dump(al) for al in propios]

    def post(self, id_usuario):
        nuevo_album = Album(titulo=request.json["titulo"], anio=request.json["anio"], descripcion=request.json["descripcion"], medio=request.json["medio"], propio=1)
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.albumes.append(nuevo_album)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un album con dicho nombre',409

        return album_schema.dump(nuevo_album)

class VistaAlbumes(Resource):

    def get(self):
        return [album_schema.dump(a) for a in Album.query.all()]
    
class VistaAlbum(Resource):

    def get(self, id_album):
        return album_schema.dump(Album.query.get_or_404(id_album))

    def put(self, id_album):
        album = Album.query.get_or_404(id_album)
        album.titulo = request.json.get("titulo",album.titulo)
        album.anio = request.json.get("anio", album.anio)
        album.descripcion = request.json.get("descripcion", album.descripcion)
        album.medio = request.json.get("medio", album.medio)
        db.session.commit()
        return album_schema.dump(album)

    def delete(self, id_album):
        album = Album.query.get_or_404(id_album)
        db.session.delete(album)
        db.session.commit()
        return '',204

class VistaCancionesAlbum(Resource):

    def get(self, id_album):
        album = Album.query.get_or_404(id_album)
        return [cancion_schema.dump(ca) for ca in album.canciones]


    def post(self, id_album):
        album = Album.query.get_or_404(id_album)

        if "id_cancion" in request.json.keys():

            nueva_cancion = Cancion.query.get(request.json["id_cancion"])
            if nueva_cancion is not None:
                album.canciones.append(nueva_cancion)
                db.session.commit()
            else:
                return 'Canción errónea',404
        else:
            nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"])
            album.canciones.append(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)

class VistaRecursosCompartidos(Resource):

    def get(self):
        return [recurso_compartido_schema.dump(rc) for rc in RecursoCompartido.query.all()]

    def post(self):

        usuario_destino = request.json["usuario_destino"]
        usuario_origen_id = request.json["usuario_origen_id"]
        tipo_recurso = request.json["tipo_recurso"]
        id_recurso = request.json["id_recurso"]

        if usuario_destino == None or usuario_origen_id == None:
            db.session.rollback()
            return "Error. El usuario destinatario o de origen no puede ser vacio", 400

        if type(usuario_destino) != str:
            db.session.rollback()
            return "Error. El usuario destinatario debe ser un texto", 400

        if type(usuario_origen_id) != int:
            db.session.rollback()
            return "Error. El id de usuario origen debe ser un numero", 400

        usuario_o = Usuario.query.filter(Usuario.id == usuario_origen_id).first()
        if usuario_o is None:
            db.session.rollback()
            return "El usuario origen no existe", 400

        if tipo_recurso == None:
            db.session.rollback()
            return "Error. El tipo de recurso no puede ser vacio", 400

        if tipo_recurso != "ALBUM" and tipo_recurso != "CANCION":
            db.session.rollback()
            return "Error. El tipo de recurso debe ser ALBUM o CANCION", 400

        if id_recurso == None:
            db.session.rollback()
            return "Error. El id de recurso no puede ser vacio", 400

        usuarios_destinos = usuario_destino.split(',')
        print(usuarios_destinos)
        for ud in usuarios_destinos:
            usuario_d = Usuario.query.filter(Usuario.nombre == ud).first()
            if usuario_d is None:
                if tipo_recurso == "ALBUM":
                    db.session.rollback()
                    return 'No se puede compartir el álbum porque una o más personas no se encuentran registradas en Ionic.', 400
                else:
                    db.session.rollback()
                    return 'No se puede compartir la canción porque una o más personas no se encuentran registradas en Ionic.', 400

            recurso_compartido = RecursoCompartido(
                tipo_recurso= tipo_recurso,
                usuario_origen_id=usuario_origen_id,
                usuario_destino_id=usuario_d.id,
            )
            if tipo_recurso == "ALBUM":
                recurso_compartido.album_id = id_recurso
            else:
                recurso_compartido.cancion_id = id_recurso

            db.session.add(recurso_compartido)

        db.session.commit()
        return recurso_compartido_schema.dump(recurso_compartido)

class VistaRecursoCompartido(Resource):

    def get(self, id_recurso_compartido):
        return recurso_compartido_schema.dump(RecursoCompartido.query.get_or_404(id_recurso_compartido))

    def delete(self, id_recurso_compartido):
        recurso_compartido = RecursoCompartido.query.get_or_404(id_recurso_compartido)
        db.session.delete(recurso_compartido)
        db.session.commit()
        return '',204

class VistaAlbumUsuariosCompartidos(Resource):

    def get(self, id_album):
        recurso_compartido = RecursoCompartido.query.filter(RecursoCompartido.album_id == id_album).group_by(RecursoCompartido.usuario_destino_id).all()
        usuarios = []
        for rc in recurso_compartido:
            u = Usuario.query.filter(Usuario.id == rc.usuario_destino_id).first()
            usuarios.append(u)
        return [usuario_schema.dump(u) for u in usuarios]

