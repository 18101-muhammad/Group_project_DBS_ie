from flask import Flask, request, jsonify

app = Flask(__name__)
from app.dao.userDao import getUser, saveUser, findUserById
from app.util.mongoflask import MongoJSONEncoder, ObjectIdConverter
from app.routes.authentication import authentication
from app.routes.employer import employer
from flask_cors import CORS
app.json_encoder = MongoJSONEncoder
app.url_map.converters['objectid'] = ObjectIdConverter
CORS(app)
app.register_blueprint(authentication)
app.register_blueprint(employer)



@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    return response

#end of code to run it
if __name__ == "__main__":
  app.run(debug=True, port=5001)