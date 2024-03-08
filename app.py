from flask import (
    Flask,
    render_template,
    jsonify,
    abort
)
from flask_cors import CORS
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
    data = db.get_data_by_title(module)

    if data:
        return jsonify(data)
    else:
        return abort(404)


if __name__ == "__main__":
    app.run()

