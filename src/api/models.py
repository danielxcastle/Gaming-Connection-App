from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from api.utils import APIException
from base64 import b64encode
import os
from sqlalchemy.orm import relationship

from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()

friendship_association_table = db.Table(
    'friendships',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(900), unique=False, nullable=False)
    platforms = db.relationship('UserPlatform', backref='user', lazy=True)
    posts = db.relationship('Post', backref='user', lazy=True)
    salt = db.Column(db.String(900), nullable=False)
    level = db.Column(db.String, default=1, nullable=False)  # Add a new column for the user's level

    # Add a new relationship for friends
    friends = db.relationship(
        'User',
        secondary=friendship_association_table,
        primaryjoin=id == friendship_association_table.c.user_id,
        secondaryjoin=id == friendship_association_table.c.friend_id,
        backref=db.backref('friendships', lazy='dynamic'),
        lazy='dynamic'
    )
    def check_password(self, password_to_check):
        return check_password_hash(self.hashed_password, f"{password_to_check}{self.salt}")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "platforms": [platform.serialize() for platform in self.platforms],
            "posts": [post.serialize() for post in self.posts],
            "level": self.level,
            "friends": [friend.username for friend in self.friends.all()]  # Include friends in the serialization
        }

    def __init__(self, username, hashed_password, email):
        already_exists = User.query.filter_by(username=username).one_or_none()
        if already_exists is not None:
            raise APIException("User already exists", 400)
        self.salt = b64encode(os.urandom(32)).decode("utf-8")
        self.hashed_password = generate_password_hash(hashed_password + self.salt)
        self.username = username
        self.email = email
        self.level = "Peasant"
        self.friends = []  # Initialize the friends list
        db.session.add(self)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise APIException(str(e), 500)


class UserPlatform(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    platform_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "platform_name": self.platform_name,
            "username": self.username
        }

    def __init__(self, user_id, platform_name, username):
        existing_platform = UserPlatform.query.filter_by(user_id=user_id, username=username).first()

        if existing_platform is not None:
            raise APIException("This username already exists for this user.", 400)

        self.user_id = user_id
        self.platform_name = platform_name
        self.username = username

        db.session.add(self)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise APIException(str(e), 500)

class Post(db.Model):
    __tablename__ = "post"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Format the datetime
        }
