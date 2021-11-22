from app.dao.MongoManager import MongoManager


def getUser(userName):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.user
    return records.find_one({"userName": userName})

def findUserById(id):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.user
    return records.find_one({"_id": id})


def saveUser(user):
    # get the database name
    db = MongoManager.getInstance().get_database('jobportal')
    # get the particular collection that contains the data
    records = db.user
    return records.save(user)
