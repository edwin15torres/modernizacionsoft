from microservicio1_users import create_app
from flask_restful import Api
from microservicio1_users.modelo.modelo import db
from microservicio1_users.vista.vista import VistaSignIn, VistaLogIn, VistaUsuarios, VistaUsuario
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
cors = CORS(app)

api = Api(app)
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaUsuarios, '/usuarios')
api.add_resource(VistaUsuario, '/usuario/<int:id_usuario>')
api.add_resource(VistaLogIn, '/logIn')

jwt = JWTManager(app)
