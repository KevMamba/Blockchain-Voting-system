# WebTechII-Project
Building a Voting System using Blockchain.

Technologies used :
1) Soidity - to define contract structure
2) Web3.py and Flask for backend and interaction with blockchain
3) React for front end


Installation Instructions

1) Download truffle - npm install -g truffle ()
2) Download Ganache - https://www.trufflesuite.com/ganache 
      open properties - go to permissions - tick the option Allow Executing Files as a program
3) Download React - https://medium.com/@DanielSayidi/install-and-setup-react-app-on-ubuntu-18-04-3-lts-fcd2c875885a
4) Create a new folder
      - cd into folder and run truffle unbox pet-shop.
      - place the sol files ( Election.sol and Migrations.sol ) in repo into the contracts directory.
      - place 2_deploy_contract.js in migrations directory.
      - run truffle migrate --reset.
      - copy and save the contract address under deploy (will be used in flask backend).
      - move flaskbackend.py to the build directory and change the value of variable AddressOfBlockChain to the value copied          in the last step.
      - run using python3 flaskbackend.py
 5) Create another folder
       - run npx create-react-app nameofapp.
       - place index.js into src directory.
       - run using npm start.
      
