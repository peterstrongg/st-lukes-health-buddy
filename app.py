from flask import (
    Flask,
    render_template,
    make_response,
    jsonify,
    request,
    session,
    redirect,
)
from flask_cors import CORS
from flask_session import Session
import json
from datetime import timedelta
from database import database

app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)
app.config["SESSION_FILE_THRESHOLD"] = 128 
Session(app)
CORS(app)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
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

@app.route("/api/v1/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = json.loads(request.data)
        username = data["username"]
        password = data["password"]

        db = database.Database()
        auth_result = db.authenticate_user(username, password)

        response = make_response(jsonify({
            "authenticated" : auth_result
        }))
        if auth_result != 0:
            session["session"] = [auth_result, username]

        return response
    
    elif request.method == "GET":
        if not session.get("session"):
            return "FAIL"
        return "PASS"

if __name__ == "__main__":
    app.run()

