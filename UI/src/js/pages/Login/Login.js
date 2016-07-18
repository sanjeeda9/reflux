var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var Login = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(AuthStore),
    Reflux.ListenerMixin
  ],

  componentDidMount () {
    this.listenTo(AuthStore, this._onAuthChange);
  },

  _onAuthChange(auth) {
    this.setState(auth);

    if(this.state.loggedIn){
      var redirectUrl = this.getQuery().redirect || '/';
      this.replaceWith(redirectUrl);
    }
  },

  _handleLogin(event) {
    event.preventDefault();

    AuthActions.login(
      React.findDOMNode(this.refs.email).value,
      React.findDOMNode(this.refs.password).value
    );
  },

  render() {
    var errorMessage;
    if (this.state.error) {
      errorMessage = (
        <div className='state-error' style={{ paddingBottom: 16 }}>
          { this.state.error }
        </div>
      );
    }

    var formContent;
    if (this.state.user) {
      formContent = (
        <div>
          <p>
            You are logged in as <strong>{ this.state.user.name }</strong>.
          </p>
        </div>
      );
    } else {
      formContent = (
        <div className="container">
              <div className="form-group">
                  {errorMessage}
                <input className="form-control" defaultValue="reactjs@refulx.com" placeholder="Enter a User Name..." ref="email" type="text" />
               </div>
               <div className="form-group">
                  <input className="form-control" defaultValue="learing" placeholder="Enter a Password..." ref="password" type="password" />
                </div>
                <input className="btn btn-primary btn-block" onClick={this.handleLogout} type="submit" value="Login" />
              </div>
      );
    }
    return (
      <div className="search-form" >
     <h1 className="text-center">Login Here</h1>
     <form onSubmit={this._handleLogin}>
       {formContent}
      </form>
     </div>
    );
  }
});


module.exports = Login;
