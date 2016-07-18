var React = require('react');
var Load=require('./Load');
var movList=[];
var Head=React.createClass({
  getInitialState:function () {
  console.log("init");
  return ({name:'',db:"Local DB"});
  },
  setName:function (e) {
    var n=e.target.value;
    this.setState({name:n});
    console.log(n);
  },
render:function () {
    return (

      <div id="h" >
      <h1 id="title">Search a movie that you like</h1>
        <div className="row form-group" id="search">
        <div className="col-sm-2">
          <button className="btn btn-primary dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" value={this.state.db}>
          {this.state.db} <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu">
          <li className="dropdown-header"><strong>Select Search From</strong></li>
          <li className="divider"></li>
          <li><a href="#" onClick={this.setDB}>Local DB</a></li>
          <li ><a href="#" onClick={this.setDB}>OMDB</a></li>
          </ul>
      </div>
          <div className="col-sm-3">
          <input
          id="movieName"
          className="form-control"
          type="text"
          placeholder="Type a movie name"
          onChange={this.setName}
          value={this.state.name}
          />
        </div>
        <div className="col-sm-1">
          <button
          className="btn btn-success"
          onClick={this.searchMov}>
          Search <span className="glyphicon glyphicon-search"></span>
          </button>
        </div>

      </div>
    </div>
  );
  },
  searchMov:function () {
    movList=[];
    var name=this.state.name;
    var db=this.state.db;
    console.log(db);
    var url="";
    if(db=="Local DB"){
      console.log("if");
      url = "mongoCRUD/list";
      if(name!=null&&name.trim()!=""){
        url="mongoCRUD/read/"+name;
      }
    }
    else{
      url="http://www.omdbapi.com/?s="+this.state.name
    }
    console. log(url);
    this.setState({name:""});
    $.ajax({
      url:url,
      dataType:'json',
      cache:false,
      async: false,
      success:function (data) {
        if(db=="OMDB"){
          data=data.Search;
        }
        data.map(function (d) {
         console.log(d);
          movList.push(d);
        })
        //  this.setState({name:''});
          //console.log(movList);
      }.bind(this),
      error:function (x,status,err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
        });
    console.log("end");
    React.render(<Load db={this.state.db} ml={movList}/>,document.getElementById("displayMov"));
    },
    setDB:function (e) {
      console.log(e.target.text);
      this.setState({db:e.target.text})
    }
  });
module.exports = Head;
