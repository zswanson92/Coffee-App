import os
from flask import Flask, request, jsonify, session, redirect
from flask_migrate import Migrate
from .config import Config
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models import db, Coffee, Post
from .coffeeform import CoffeeForm
from .postform import PostForm

app = Flask(__name__)
# app.config.from_object(Config) // maybe bring this back
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{app.root_path}/dev.db"
app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# db = SQLAlchemy(app)
db.init_app(app)
Migrate(app, db)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    # if path == 'favicon.ico':
    #     return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

# @app.route('/')
# def hello():
#     return '<h1>Hello World</h1>'


@app.route('/coffee/ping', methods=["GET"])
def coff_ping():
    return {'status': 'good'}


@app.route('/post/ping', methods=["GET"])
def post_ping():

    return {'status': 'good'}


@app.route("/coffee/<int:id>", methods=["GET"])
def get_coff_id(id):
    coffee = Coffee.query.get(id)

    return coffee.to_dict()

@app.route('/coffee', methods=["GET"])
def get_all_coffees():
    coffees = Coffee.query.all()

    return { coffee.id: coffee.to_dict() for coffee in coffees }


@app.route('/coffee/create', methods=["POST"])
def post_coffee():
    form = CoffeeForm()
    # print("FORM", form.data)


    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        coffee = Coffee(
            name = form.data["name"],
            year = form.data["year"],
            caffeine_content = form.data["caffeine_content"]
        )
        # print("COFFEE", coffee)

        db.session.add(coffee)
        db.session.commit()
        return coffee.to_dict()

    print("VALIDATE", form.errors)

    return {"err": "this did not work"}

@app.route('/coffee/delete/<int:id>', methods=["DELETE"])
def delete_coffee(id):
    coffee = Coffee.query.get(id)

    db.session.delete(coffee)
    db.session.commit()
    return {"message": 'Delete Successful'}

@app.route('/post/<int:id>', methods=["DELETE"])
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()
    return {"message": 'Delete Successful'}

@app.route("/post", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()

    return { post.id: post.to_dict() for post in posts }

@app.route("/post/<int:id>", methods=["GET"])
def get_single_post(id):
    post = Post.query.get(id)

    return post.to_dict()

@app.route("/post", methods=["POST"])
def create_post():
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            title = form.data["title"],
            coffee = form.data["coffee"],
            text = form.data["text"],
            rating = form.data["rating"]
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()


    return {"err": "this did not work"}
