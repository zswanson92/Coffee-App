from .db import db
import datetime

class Coffee(db.Model):
    __tablename__ = 'coffees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    year = db.Column(db.Integer)
    caffeine_content = db.Column(db.Integer)
    caffeine_percentage = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    coffee_post = db.relationship("Post", back_populates="post_coffee", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "year": self.year,
            "caffeine_content": self.caffeine_content,
            "caffeine_percentage": self.caffeine_percentage,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
