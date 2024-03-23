from flask import (
    Flask,
    render_template,
    make_response,
    jsonify,
    request,
    abort
)
from flask_cors import CORS
import json
from database import database

app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    return render_template("index.html")

@app.route("/api/v1/training/<path:module>", methods=["GET"])
def serve_training_module(module):
    db = database.Database()
    (title, video_link, description) = db.get_module_data(module)
    
    response = make_response(jsonify({
        "title" : title,
        "video_link" : video_link,
        "description" : description
    }))
    return response

@app.route("/api/v1/login", methods=["POST"])
def login():
    data = json.loads(request.data)
    username = data["username"]
    password = data["password"]

    db = database.Database()
    auth_result = db.authenticate_user(username, password)

    response = make_response(jsonify({
        "authenticated" : auth_result
    }))
    if auth_result != 0:
        response.set_cookie("cookie", "A")

    return response

if __name__ == "__main__":
    app.run()

