from flask import (
    Flask,
    render_template
)
from flask_cors import CORS

from database import database

app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
CORS(app)

@app.route("/")
def home():
    # db = database.Database()
    return render_template("index.html")

if __name__ == "__main__":
    app.run()