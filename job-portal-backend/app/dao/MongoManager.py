import pymongo

class MongoManager:
    __instance = None

    @staticmethod
    def getInstance():
        if MongoManager.__instance == None:
            MongoManager()
        return MongoManager.__instance

    def __init__(self):
        #Change the string
        dbstring= "mongodb+srv://muhammadabdullah_07:03237474317aA1.@cluster0.xmtgz.mongodb.net/jobportal?retryWrites=true&w=majority"
        if MongoManager.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            #MongoManager.__instance = pymongo.MongoClient("localhost",5000)
            MongoManager.__instance = pymongo.MongoClient(dbstring)