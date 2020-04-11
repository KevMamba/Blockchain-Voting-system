from flask import Flask, render_template,jsonify,request,abort,Response
from web3 import Web3, HTTPProvider
import json


with open("contracts/Election.json") as f:
    info_json = json.load(f)
abi = info_json["abi"]

# Contract Address of blockchain from deploy.js
AddressOfBlockChain = "0xAE5a0907f9ecd46bd136504cc00F627Eb9f2F2a6"


app = Flask(__name__)
runOnPort = "8080"
runOnIp = "0.0.0.0"

#-----------------------------------------------------------------------------------------------------------------------------------

'''
API TO ADD A CANDIDATE TO THE POLL
Data Format
{

"Account" : "0x354783649837493",

"CandidateName" : "Atul For President"

}
'''
@app.route("/poll/add/candidate",methods=["PUT","POST"])
def AddCandidateToPoll():
    Data = request.get_json()
    if Data is None :
        Data = json.loads((request.data).decode('utf-8'))
    #print("\n\n\nData receipt :",json.loads((request.data).decode('utf-8')),end="\n\n")
    w3 = Web3(HTTPProvider("http://127.0.0.1:7545"))
    w3.eth.defaultAccount = Data["Account"]
    vote_call = w3.eth.contract(AddressOfBlockChain, abi=abi)
    CandidateName = Data["CandidateName"]
    tx_hash = vote_call.functions.addCandidate(CandidateName).transact()
    receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return jsonify(),200

#----------------------------------------------------------------------------------------------------------------------------------

'''
API TO VOTE FOR A CANDIDATE
Data Format

{
"Account" : "0x462849732947209",

"CandidateId" : 0
}

'''
@app.route("/poll/cast/vote",methods=["PUT","POST"])
def VoteForCandidate():
    Data = request.get_json()
    if Data is None :
        Data = json.loads((request.data).decode('utf-8'))
    Data["CandidateId"] = int(Data["CandidateId"])
    print(Data)
    AccountNo = Data["Account"]
    CandidateId = Data["CandidateId"]
    w3 = Web3(HTTPProvider("http://127.0.0.1:7545"))
    w3.eth.defaultAccount = AccountNo
    vote_call = w3.eth.contract(AddressOfBlockChain, abi=abi)
    prevvotes = vote_call.functions.getVotes(CandidateId).call()
    try :
        tx_hash_2 = vote_call.functions.castV(CandidateId).transact()
        receipt_1 = w3.eth.waitForTransactionReceipt(tx_hash_2)
        #print("\n\n NO OF VOTES ARE : ",vote_call.functions.getV(candid).call(),end="\n\n")
        return jsonify({"Votes":1}),200
    except :
        return jsonify({"Votes":0}),200
#-----------------------------------------------------------------------------------------------------------------------------------

'''
API TO GET NUMBER OF VOTES AND NAME OF EACH CANDIDATE

DATA FORMAT
{

ACCOUNT : "0x2638727392830",

}

'''
@app.route("/poll/get/information",methods=["PUT","POST"])
def GetVotes():
    Data = request.get_json()
    if Data is None :
        Data = json.loads((request.data).decode('utf-8'))
    AccountNo = Data["Account"]
    w3 = Web3(HTTPProvider("http://127.0.0.1:7545"))
    w3.eth.defaultAccount = AccountNo
    contract = w3.eth.contract(AddressOfBlockChain, abi=abi)

    NoOfCandidates = contract.functions.getNumberOfCandidates().call()

    Information = {}
    for candidateId in range(NoOfCandidates) :

        Information[candidateId] = {"Name":"","Votes":0}
        Information[candidateId]["Votes"] = contract.functions.getVotes(candidateId).call()
        Information[candidateId]["Name"] = contract.functions.getCandName(candidateId).call()
        #Information[candidateId]["Id"] = candidateId
        print(Information[candidateId])
    a = jsonify(Information)
    resp = Response(json.dumps(Information, separators=(',', ':')))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp,200

if __name__ == '__main__':
    app.debug=True
    app.run(host = runOnIp, port = runOnPort)
