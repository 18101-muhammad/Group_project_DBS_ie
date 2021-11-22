from flask import Blueprint
from flask import Flask, request, jsonify
from app.dao.userDao import getUser, saveUser, findUserById
from flask import Response
import json
from passlib.hash import sha256_crypt
import jwt

authentication = Blueprint('authentication', __name__)

@authentication.route('/login', methods=["POST"])
def login():
     input_json = request.get_json(force=True)
     dbUser = getUser(input_json['userName'])
     if sha256_crypt.verify(input_json['password'], dbUser['password']):
         payload_data = {
             "sub": "jobportal",
             "name": dbUser['name'],
             "userName": dbUser['userName'],
             "type":dbUser['type'],
             "userId":str(dbUser['_id'])
         }
         token = jwt.encode(
             payload=payload_data,
             key="jobportal@123"
         )
         print("Login succeeded!")
         return jsonify({"token": token.decode('UTF-8')})
     else:
         return Response(
             json.dumps({"success": False, "message": "Check your details"}),
             mimetype='application/json',
             status=400,
         )

@authentication.route('/register', methods=["POST"])
def register():
     input_json = request.get_json(force=True)
     #validation step
     dbUser = getUser(input_json['userName'])
     if dbUser == None:
        #type = 1 (employer) and 2 (candidate)
        if input_json['type'] == None:
            return Response(
                json.dumps({"success": False, "message": "Invalid type"}),
                mimetype='application/json',
                status=422
            )
        input_json['password']=sha256_crypt.encrypt(input_json['password'])
        saveUser(input_json)
        input_json['password'] = None
        return jsonify(input_json)
     else:
         return Response(
             json.dumps({"success": False, "message":"User already exist"}),
             mimetype='application/json',
             status=400,
         )


@authentication.route('/logout', methods=["GET"])
def getAppliedJobList():
    return jsonify({"success": True})


@authentication.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    return response