import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';//import Fragment from 'react';
import logo from "./logo_org.png";
import './Vote.css';
import history from './../history';
import './Vote.css';


class VoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',wallet:''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }
  handleVote(event) {
    var id =  this.id;
    var account = document.getElementById("Wallet");
    const dt = {"Account":account.value,"CandidateId":id};
    var data = JSON.stringify(dt);

    fetch('http://127.0.0.1:8080/poll/cast/vote', {
    method: 'POST',
    body: data
    }).then(function(response) {
        alert(response.json());
        console.log(response.json());
      });

    alert("Voted");
    alert(id);
    var lol;
    fetch('http://127.0.0.1:8080/poll/get/information', {
    method: 'POST',
    body: data
  }).then(res => res.text())
  .then(function(data) {

    var table = document.getElementById("UsersAppend");
    var norows = table.getElementsByTagName("tr");
    data = data.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    data = data.replace(/[\u0000-\u0019]+/g,"");
    var array = JSON.parse(data);
    table.rows[norows.length-1-id].cells[2].innerHTML = array[id]['Votes'];

  });
    this.handleLoad();
    event.preventDefault();
  }

  componentDidMount() {
      //window.addEventListener('load', this.handleLoad);
      setInterval(this.handleLoad, 5000);
   }

  handleLoad() {
    //alert("DOM LOADING");
    var defaultAccount = "0xdc2875d889Bbb48bF7097dC12191E88C1C8Cfc23";
    const dt = {"Account":defaultAccount};
    var data = JSON.stringify(dt);
    fetch('http://127.0.0.1:8080/poll/get/information', {
    method: 'POST',
    body: data
  }).then(res => res.text())
    .then(function(data) {

      var table = document.getElementById("UsersAppend");
      table.innerHTML = "";
      //alert(data);
      //alert(table);
      data = data.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
      data = data.replace(/[\u0000-\u0019]+/g,"");
      var array = JSON.parse(data);
      //alert(array[0].length);
      for(var key in array) {
          var row_i = table.insertRow();
          var cell1 = row_i.insertCell(0);
          var cell2 = row_i.insertCell(1);
          var cell3 = row_i.insertCell(2);
          cell1.innerHTML = array[key]["Name"];
          var abc = "<button class='button' id='"+key+"'>cast vote</button>";
          cell2.innerHTML = abc;
          cell3.innerHTML = array[key]["Votes"];
          var but = document.getElementById(key);
          but.id = key
          but.onclick = function(event)
          {
            alert("id is "+this.id);
            var id =  this.id;
            var account = document.getElementById("Wallet");
            const dt = {"Account":account.value,"CandidateId":id};
            var data = JSON.stringify(dt);

            fetch('http://127.0.0.1:8080/poll/cast/vote', {
            method: 'POST',
            body: data
            }).then(function(response) {
                //alert(response.json());
                console.log(response.json());
              });

            //alert("Voted");
            //alert(id);
            var lol;
            fetch('http://127.0.0.1:8080/poll/get/information', {
            method: 'POST',
            body: data
          }).then(res => res.text())
          .then(function(data) {

            var table = document.getElementById("UsersAppend");
            var norows = table.getElementsByTagName("tr");
            data = data.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
            data = data.replace(/[\u0000-\u0019]+/g,"");
            var array = JSON.parse(data);
            table.rows[norows.length-1-id].cells[2].innerHTML = array[id]['Votes'];
            });
            event.preventDefault();

          };          //alert('A name was submitted: ' + array[i]["Name"]);

      }
      var row_i = table.insertRow(0);
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = "Name";
      row_i.appendChild(headerCell);
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = "Vote";
      row_i.appendChild(headerCell);
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = "No of Votes";
      row_i.appendChild(headerCell);
      //var cell1 = row_i.insertCell(0);
      //var cell2 = row_i.insertCell(1);
      //var cell3 = row_i.insertCell(2);
      //table.stylesheet = "Vote.css"
      //cell1.innerHTML = "Name";
      //cell2.innerHTML = "Vote";
      //cell3.innerHTML = "No of Votes";
    });

  }
  handleChange1(event) {
    this.setState({value: event.target.value});
  }

  handleChange2(event) {
    this.setState({wallet: event.target.value});
  }

  handleSubmit(event) {
    var table = document.getElementById("UsersAppend");

    var name = document.getElementById("Name");
    var account = document.getElementById("Wallet");
    const dt = {"Account":account.value,"CandidateName":name.value};
    var data = JSON.stringify(dt);

    fetch('http://127.0.0.1:8080/poll/add/candidate', {
    method: 'POST',
    body: data
    }).then(function(response) {
        alert(response.json());
        console.log(response.json());
      });


    var flag = 0;
    for (var i = 0, row;row = table.rows[i];i++){
         if(row.cells[0].innerHTML===this.state.value){
		         flag = 1;
	       }
    }
    if(flag===0){
         var row_i = table.insertRow();
         var cell1 = row_i.insertCell(0);
         var cell2 = row_i.insertCell(1);
         var cell3 = row_i.insertCell(2);
         cell1.innerHTML = this.state.value;
         var abc = "<button class='button' id='"+i+"'>cast vote</button>";
         cell2.innerHTML = abc;
         cell3.innerHTML = 0;
         var but = document.getElementById(i);
         but.onclick = this.handleVote;
         alert('A name was submitted: ' + this.state.value);
    }
    else{
         alert("Name already exists")
    }

    event.preventDefault();
  }


  render() {
    return (
      <div>
      <link rel="stylesheet" type="text/css" href="Vote.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"></a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><img class="logoimg" src={logo}/></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-home"></span><h4 onClick={() => history.push('/')}>Home</h4></a></li>
            <li><a href="#"><span class="glyphicon glyphicon-btc"></span><h4>Vote</h4></a></li>
          </ul>
        </div>
      </nav>

      <center>
      <form class="form-inline" onSubmit={this.handleSubmit}>
      <div class="form-group">
        <center>
        <label>
          Value:
        </label>
        </center >
          <input class = "form-control"  id="Name" type="text" value={this.state.value} onChange={this.handleChange1} /><br/><br/>
  <label>
 Ether Wallet ID:
  </label><br/>
	  <input class = "form-control" id="Wallet" type="text" value={this.state.wallet} onChange={this.handleChange2} /><br/><br/>

        <input class="button" type="submit" value="Submit" /><br/><br/>
      </div>
      </form>
      </center>
      <div class="table-responsive">
      <table class="UsersAppend" id = "UsersAppend" align="center">
      <tr>
      <th>Name</th>
      <th> Vote  </th>
      <th> No of Votes  </th>
      </tr>
      </table>
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <VoteForm />,
  document.getElementById('root')
);

export default VoteForm;
