from microservicio2_albums import create_app
from flask_restful import Api
from microservicio2_albums.modelo.modelo import db
from microservicio2_albums.vista.vista import VistaAlbumesUsuario, VistaAlbumes, VistaAlbum, VistaRecursosCompartidos, VistaRecursoCompartido, VistaAlbumUsuariosCompartidos
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
cors = CORS(app)

api = Api(app)
api.add_resource(VistaAlbumesUsuario, '/usuario/<int:id_usuario>/albumes')
api.add_resource(VistaAlbumes, '/albumes')
api.add_resource(VistaAlbum, '/album/<int:id_album>')

api.add_resource(VistaRecursosCompartidos, '/recurso/compartido')
api.add_resource(VistaRecursoCompartido, '/recurso/compartido/<int:id_recurso_compartido>')
api.add_resource(VistaAlbumUsuariosCompartidos, '/recurso/compartido/<int:id_album>/usuario')

jwt = JWTManager(app)
