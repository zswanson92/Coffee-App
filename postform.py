from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    coffee = StringField("Coffee", validators=[DataRequired()])
    text = TextAreaField("Text", validators=[DataRequired()])
    rating = FloatField("Rating", validators=[DataRequired()])
