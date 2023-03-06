from .db import db
import datetime


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    coffee = db.Column(db.Integer, db.ForeignKey("coffees.id"))
    text = db.Column(db.String)
    rating = db.Column(db.Float)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    post_coffee = db.relationship("Coffee", back_populates="coffee_post")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "coffee": self.coffee,
            "text": self.text,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
