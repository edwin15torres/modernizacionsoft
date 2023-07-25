from flask import Flask
from pathlib import Path

def create_app(config_name):
    app = Flask(__name__)

    parent_dir = Path(__file__).parent.parent
    db_path = parent_dir / 'persistencia' / 'ionic_database_completo.db'

    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'frase-secreta'
    app.config['PROPAGATE_EXCEPTIONS'] = True
    return app
