import React from 'react';
import ReactDOM from 'react-dom';
//import Fragment from 'react';
import './index.css';


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
    event.preventDefault();
  }

  componentDidMount() {
      window.addEventListener('load', this.handleLoad);
      setInterval(this.handleLoad, 30000);
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
          var row_i = table.insertRow(0);
          var cell1 = row_i.insertCell(0);
          var cell2 = row_i.insertCell(1);
          var cell3 = row_i.insertCell(2);
          cell1.innerHTML = array[key]["Name"];
          var abc = "<button id='"+key+"'>Button</button>";
          cell2.innerHTML = abc;
          cell3.innerHTML = array[key]["Votes"];
          var but = document.getElementById(key);
          but.onclick = function(event)
          {
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

          };
          //alert('A name was submitted: ' + array[i]["Name"]);

      }
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
         var row_i = table.insertRow(0);
         var cell1 = row_i.insertCell(0);
         var cell2 = row_i.insertCell(1);
         var cell3 = row_i.insertCell(2);
         cell1.innerHTML = this.state.value;
         var abc = "<button id='"+i+"'>Button</button>";
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Value:
          <input id="Name" type="text" value={this.state.value} onChange={this.handleChange1} />
	  Ether Wallet ID:
	  <input id="Wallet" type="text" value={this.state.wallet} onChange={this.handleChange2} />

        </label>
        <input type="submit" value="Submit" />
      </form>

      <table id = "UsersAppend">
         <th>Name</th>
	 <th>Vote</th>
         <th>Vote count</th>
      </table>
      </div>
    );
  }
}

ReactDOM.render(
  <VoteForm />,
  document.getElementById('root')
);
