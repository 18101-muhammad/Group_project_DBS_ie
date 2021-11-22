from flask import Blueprint
from flask import Flask, request, jsonify
from app.dao.jobDao import getJobs, applyForJob, appliedJobList, createJob, getJobById
import jwt
from flask import Response

employer = Blueprint('employer', __name__)

@employer.route('/job')
def getAllJobs():
    if 'Authorization' not in request.headers or request.headers['Authorization'] == None:
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    decodedUser=jwt.decode(request.headers['Authorization'].split('Bearer')[1].strip(), key="jobportal@123", algorithms=['HS256'])


    jobs = getJobs()
    return jsonify(jobs)

@employer.route('/job', methods=["POST"])
def createNewJob():
    input_json = request.get_json(force=True)
    if 'Authorization' not in request.headers or request.headers['Authorization'] == None:
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    decodedUser=jwt.decode(request.headers['Authorization'].split('Bearer')[1].strip(), key="jobportal@123", algorithms=['HS256'])
    if decodedUser['type'] != '1':
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    createJob(input_json)
    return jsonify(input_json)

@employer.route('/job/<string:id>/apply', methods=["GET"])
def applyJob(id):
    if 'Authorization' not in request.headers or request.headers['Authorization'] == None:
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    decodedUser=jwt.decode(request.headers['Authorization'].split('Bearer')[1].strip(), key="jobportal@123", algorithms=['HS256'])
    if decodedUser['type'] != '2':
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    job = getJobById(id)
    applyForJob(job, decodedUser)
    return jsonify(True)

@employer.route('/job/applied', methods=["GET"])
def getAppliedJobList():
    if 'Authorization' not in request.headers or request.headers['Authorization'] == None:
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    decodedUser=jwt.decode(request.headers['Authorization'].split('Bearer')[1].strip(), key="jobportal@123", algorithms=['HS256'])
    if decodedUser['type'] != '1':
        return Response(
            "UNAUTHORIZED",
            mimetype='application/json',
            status=401,
        )
    joblist = appliedJobList()
    return jsonify(joblist)

@employer.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    return response