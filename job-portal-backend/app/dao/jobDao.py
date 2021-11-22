from app.dao.MongoManager import MongoManager
from bson.objectid import ObjectId

def getJobs():
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.job
    return list(records.find({}))

def getJobById(id):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.job
    return records.find_one({"_id":ObjectId(id)})

def applyForJob(job, user):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.job_applied
    return records.save({"job": job,"user":user })

def appliedJobList():
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.job_applied
    return list(records.find())


def createJob(job):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.job
    return records.save(job)
