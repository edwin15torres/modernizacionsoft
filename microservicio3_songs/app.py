from microservicio3_songs import create_app
from flask_restful import Api
from microservicio3_songs.modelo.modelo import db
from microservicio3_songs.vista.vista import VistaCancionesUsuario, VistaCancion, VistaCancionesAlbum, VistaAlbumesCanciones
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin


app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
cors = CORS(app)

api = Api(app)
api.add_resource(VistaCancionesUsuario, '/usuario/<int:id_usuario>/canciones')

api.add_resource(VistaCancion, '/cancion/<int:id_cancion>')
api.add_resource(VistaCancionesAlbum, '/album/<int:id_album>/canciones')
api.add_resource(VistaAlbumesCanciones, '/cancion/<int:id_cancion>/albumes')

jwt = JWTManager(app)
