import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, resetErrorMessage } from '../store/actions/userActions';
import validate from '../utils/validate';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: {
          required: true,
          value: '',
          email: true
        },
        password: {
          required: true,
          value: ''
        }
      },
      errors: {}
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillUnmount() {
    if(this.props.error || this.props.message) {
      this.props.resetErrorMessage();
    }
  }

  changeHandler(e) {
    if(this.props.error || this.props.message) {
      this.props.resetErrorMessage();
    }

    let updatedValues = {
      ...this.state.formData,
      [e.target.name]: {
        ...this.state.formData[e.target.name],
        value: e.target.value,
        touched: true
      }
    };

    let errors = validate(updatedValues);

    this.setState({
      ...this.state,
      formData: updatedValues,
      errors
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const errors = validate(this.state.formData, true);
    this.setState({ ...this.state, errors });

    if(Object.keys(errors).length === 0) {
      console.log('form submitted...');
      let data = {
        email: this.state.formData.email.value,
        password: this.state.formData.password.value
      };
      this.props.login(data);
    }else {
      console.log('form cannot be submitted...');
    }
  }

  render() {
    const { error, message } = this.props;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-6 col-center">
              <h2>Login</h2>
              {!error && message && <p className="u-success">{message}</p>}
              {error && <p className="u-error">{message}</p>}
              <form onSubmit={this.submitHandler}>
                <Input 
                  type="text"
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Enter your email address"
                  value={this.state.formData.email.value}
                  onChange={this.changeHandler}
                  error={this.state.errors.email}
                />
                <Input 
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={this.state.formData.password.value}
                  onChange={this.changeHandler}
                  error={this.state.errors.password}
                />
                <Button type="submit" text="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error,
    message: state.user.message
  }
}

export default connect(mapStateToProps, { login, resetErrorMessage })(Login);