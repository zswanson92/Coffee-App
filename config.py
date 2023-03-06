import os
from os import environ
# from .__init__ import app

class Config(object):
    # GREETING = 'Salutations, superior students!'

    SECRET_KEY = os.environ.get('SECRET_KEY')
    # SQLALCHEMY_DATABASE_URI = f"sqlite:///{app.root_path}/dev.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
