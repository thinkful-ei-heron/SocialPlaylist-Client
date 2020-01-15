import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import TextInput from '../Form/TextInput';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  static contextType = UserContext;

  state = { error: null };

  //firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  // componentDidMount() {
  //   this.firstInput.current.focus();
  // }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <h4 className="loginTitle">Log in</h4>
        <div>
          <TextInput
            label="Username"
            attr={{
              id: 'login-username-input',
              name: 'username',
              required: true
            }}
          />
        </div>
        {/* <Label htmlFor="login-username-input">Username</Label>
         <Input
           ref={this.firstInput}
            id="login-username-input"
            name="username"
           required
           /> 
      </div> */}
        <div>
          <TextInput
            label="Password"
            attr={{
              id: 'login-password-input',
              name: 'username',
              required: true
            }}
          />
          {/* <Label htmlFor="login-password-input">Password</Label>
          <Input
            id="login-password-input"
            name="password"
            type="password"
            required
          /> */}
        </div>
        <Link to="/register">Sign up</Link>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}

export default LoginForm;
