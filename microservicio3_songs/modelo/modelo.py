from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
import enum

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))
    # albumes = db.relationship('Album', cascade='all, delete, delete-orphan')
    compartidos = db.relationship('RecursoCompartido', backref='usuario_destino')
    canciones = db.relationship('Cancion', cascade='all, delete, delete-orphan')

class Medio(enum.Enum):
   DISCO = 1
   CASETE = 2
   CD = 3
   
albumes_canciones = db.Table('album_cancion',
    db.Column('album_id', db.Integer, db.ForeignKey('album.id'), primary_key = True),
    db.Column('cancion_id', db.Integer, db.ForeignKey('cancion.id'), primary_key = True))

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(128))
    anio = db.Column(db.Integer)
    descripcion = db.Column(db.String(512))
    medio = db.Column(db.Enum(Medio))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', secondary = 'album_cancion', back_populates="albumes")
    # compartidos = db.relationship('RecursoCompartido', backref='album')
    propio = db.Column(db.Integer)
    
class Cancion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(128))
    minutos = db.Column(db.Integer)
    segundos = db.Column(db.Integer)
    interprete = db.Column(db.String(128))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    albumes = db.relationship('Album', secondary = 'album_cancion', back_populates="canciones")
    # compartidos = db.relationship('RecursoCompartido', backref='cancion')
    propia = db.Column(db.String(5), default='True')

class TipoRecurso(enum.Enum):
    ALBUM = 1
    CANCION = 2

class RecursoCompartido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo_recurso = db.Column(db.Enum(TipoRecurso))
    usuario_origen_id = db.Column(db.Integer)
    usuario_destino_id = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    cancion_id = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"))

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Usuario
         include_relationships = True
         load_instance = True
         
class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave": value.name, "valor": value.value}

class CancionSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Cancion
         include_relationships = True
         load_instance = True
         
class AlbumSchema(SQLAlchemyAutoSchema):
    medio = EnumADiccionario(attribute=("medio"))
    class Meta:
         model = Album
         include_relationships = True
         load_instance = True

