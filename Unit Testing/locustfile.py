import random
import json
from flask import jsonify
from locust import HttpUser, task, between
index = 0
id = 0
AccList = [
"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23",
"0x1640aDa12B13C91538DC2074ddA9dC583820C9BE",
"0x5fE080648ae5697209CAa8546706627df2D4c38F",
"0xb9D80ec02e40aabCC1941DaAD3d4c35078bFFcED",
"0xda67855215490637899507a92699f7f48167dE8A",
"0xFc3A5Ec184Ba7Cb8a8ba8DCa10C0e1919edCB391",
"0x18067c5D4c250E4B830bf2F004785f4C9eD8AcAc",
"0xA3Bb6fE33e79B69DfB82b6Eed71947783De385EB",
"0x6871500B0372E02FeCE08cDcd31944979D9218f2",
"0x50B0E6246c360679340Cf0f0f9231650692cA856"
]

first_names=('John','Andy','Joe',"Atul","Kevin","Andy")
last_names=('Johnson','Smith','Williams',"Anand","Arulraj","Dwire")


class QuickstartUser(HttpUser):
    wait_time = between(5, 9)

    @task(2)
    def addCandidate(self):
        global id
        id+=1
        full_name=random.choice(first_names)+" "+random.choice(last_names)
        self.client.post("/poll/add/candidate",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23","CandidateName":full_name}))

    @task
    def VoteForCandidate(self):
        res = self.client.post("/poll/get/information",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23"}))
        if len(res.json())>0 :
            acc = random.choice(AccList)
            cand = random.randint(0,len(res.json()))
            self.client.post("/poll/cast/vote",data = json.dumps({"Account":acc,"CandidateId":cand}))

    @task(3)
    def getInfo(self):
        res = self.client.post("/poll/get/information",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23"}))
        print("res : ",len(res.json()),flush=True)
