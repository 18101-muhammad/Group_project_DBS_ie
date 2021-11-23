This is job portal repo.



How to run
==================================
1) Current this is connected to college DB
2) First run backend api code : 
3) 
    virtualenv venv --python=python3
    source venv/bin/activate
    pip install -r requirements.txt

4) `python start.py` api server will start on 5001
5) then run angular webapp: inside backend repo, 
6) `npm install`
7) `npm start` frontend server will start on 4200, visit localhost:4200 to see the app.
8) Step are given in each project code


Workflow:
================================
Register --> login

john@gmail.com/123456 --> is an employer, he can post the job, and see who has applied for the job.

bob@gmail.com/123456 --> is a candidate, he can only apply for the job.


What is provided: 
===============================
- Register
- login
- job posting
- job application
- Applied job view
