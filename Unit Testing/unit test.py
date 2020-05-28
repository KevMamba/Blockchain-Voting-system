from flask import Flask
import unittest
import json
import requests

app = Flask(__name__)

class FlaskTestCase(unittest.TestCase):

    def test1_addCandididates(self) :
        tester = app.test_client(self)
        response = requests.post("http://0.0.0.0:8080/poll/add/candidate",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23","CandidateName":"Kevin Kingsly"}))
        self.assertEqual(response.status_code,200)

    def test2_addCandididates(self) :
        tester = app.test_client(self)
        response = requests.post("http://0.0.0.0:8080/poll/add/candidate",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23","CandidateName":"Atul Mathew"}))
        self.assertEqual(response.status_code,200)

    def test3_addCandididates(self) :
        tester = app.test_client(self)
        response = requests.put("http://0.0.0.0:8080/poll/add/candidate",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23","CandidateName":"Jack Black"}))
        self.assertEqual(response.status_code,200)

    def test4_addCandididates_error(self) :
        tester = app.test_client(self)
        response = requests.put("http://0.0.0.0:8080/poll/add/candidate")
        self.assertEqual(response.status_code,200)

    def test5_addCandididates_error(self) :
        tester = app.test_client(self)
        response = requests.get("http://0.0.0.0:8080/poll/add/candidate")
        self.assertEqual(response.status_code,200)

    def test6_getinfo(self) :
        tester = app.test_client(self)
        response = requests.post("http://0.0.0.0:8080/poll/get/information",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23"}))
        self.assertEqual(response.status_code,200)
        print("data : ",response.json(),flush=True)

    def test7_vote(self) :
        tester = app.test_client(self)
        response = requests.post("http://0.0.0.0:8080/poll/cast/vote",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23","CandidateId":0}))
        self.assertEqual(response.status_code,200)


    def test8_getinfo(self) :
        tester = app.test_client(self)
        response = requests.put("http://0.0.0.0:8080/poll/get/information",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23"}))
        self.assertEqual(response.status_code,200)
        print("data : ",response.json(),flush=True)

    def test9_vote(self) :
        tester = app.test_client(self)
        response = requests.put("http://0.0.0.0:8080/poll/cast/vote",data = json.dumps({"Account":"0xda67855215490637899507a92699f7f48167dE8A","CandidateId":1}))
        self.assertEqual(response.status_code,200)


    def test10_getinfo(self) :
        tester = app.test_client(self)
        response = requests.put("http://0.0.0.0:8080/poll/get/information",data = json.dumps({"Account":"0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23"}))
        self.assertEqual(response.status_code,200)
        print("data : ",response.json(),flush=True)


if __name__=="__main__" :
    unittest.main()
