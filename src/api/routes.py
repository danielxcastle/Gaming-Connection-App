from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, UserPlatform
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/log-in', methods=["POST"])
def check_user_identity():
    body = request.json
    email = body.get("email")
    hashed_password = body.get("hashed_password")

    if email is None or hashed_password is None:
        raise APIException("Incomplete login data in the request", 400)

    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("User not found", 404)

    is_password_correct = user.check_password(hashed_password)

    if not is_password_correct:
        raise APIException("Wrong password! STAY OUT", 401)

    access_token = create_access_token(identity=user.id)

    return jsonify(
        access_token=access_token,
        user=user.serialize()
    ), 200


@api.route('/sign-up', methods=['POST'])
def user_sign_up():
    new_user_data = request.json
    username = new_user_data.get("username")
    email = new_user_data.get("email")
    hashed_password = new_user_data.get("hashed_password")

    if not username or not email or not hashed_password:
        raise APIException("Incomplete user data in the request", 400)


    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("User with this email already exists", 400)

    new_user = User(username=username, email=email, hashed_password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@api.route('/transfers', methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException("No such user!, 404")
    return jsonify(logged_in_as=user.serialize()), 200



@api.route('/add-platform/<int:user_id>', methods=["POST"])
@jwt_required()
def add_user_platform(user_id):


    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user is None:
        raise APIException("No such user!", 404)

    platform_data = request.json
    platform_name = platform_data.get("platform_name")
    username = platform_data.get("username")

    if not platform_name or not username:
        raise APIException("Incomplete platform data in the request", 400)

    new_platform = UserPlatform(user_id=user_id, platform_name=platform_name, username=username)
    db.session.add(new_platform)

    try:
        db.session.commit()
        return jsonify(message="Platform added successfully"), 201
    except Exception as e:
        db.session.rollback()
        raise APIException(str(e), 500)



@api.route('/delete-platform/<int:platform_id>', methods=["DELETE"])
@jwt_required()
def delete_user_platform(platform_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user is None:
        raise APIException("No such user!", 404)

    platform = UserPlatform.query.filter_by(id=platform_id, user_id=user_id).first()

    if platform is None:
        raise APIException("No such platform associated with the user!", 404)

    db.session.delete(platform)
    db.session.commit()

    return jsonify(message="Platform deleted successfully"), 200



@api.route('/rename-platform/<int:platform_id>', methods=["PUT"])
@jwt_required()
def rename_user_platform(platform_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user is None:
        raise APIException("No such user!", 404)

    platform = UserPlatform.query.filter_by(id=platform_id, user_id=user_id).first()

    if platform is None:
        raise APIException("No such platform associated with the user!", 404)

    platform_data = request.json
    new_platform_name = platform_data.get("new_platform_name")

    if not new_platform_name:
        raise APIException("Incomplete platform data in the request", 400)

    platform.platform_name = new_platform_name
    db.session.commit()

    return jsonify(message="Platform renamed successfully"), 200

    
@api.route('/user/<int:user_id>/platforms', methods=["GET"])
@jwt_required()
def get_user_platforms(user_id):
    current_user_id = get_jwt_identity()

    if current_user_id != user_id:
        raise APIException("Unauthorized access", 401)

    user = User.query.get(user_id)
    if user is None:
        raise APIException("No such user!", 404)

    user_platforms = UserPlatform.query.filter_by(user_id=user_id).all()

    serialized_platforms = [{
        "id": platform.id,
        "user_id": platform.user_id,
        "platform_name": platform.platform_name,
        "username": platform.username
    } for platform in user_platforms]

    return jsonify(platforms=serialized_platforms), 200
