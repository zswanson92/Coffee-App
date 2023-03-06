from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
# from models.coffee import Coffee

class CoffeeForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    year = IntegerField("Year", validators=[DataRequired()])
    caffeine_content = IntegerField("Caffeine Content", validators=[DataRequired()])
