import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register, resetErrorMessage } from '../store/actions/userActions';
import validate from '../utils/validate';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Loader from '../components/UI/Loader';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        fname: {
          required: true,
          value: ''
        },
        lname: {
          required: true,
          value: ''
        },
        username: {
          required: true,
          value: ''
        },
        email: {
          required: true,
          value: ''
        },
        password: {
          required: true,
          value: '',
          minLength: 6
        },
        confirmPassword: {
          required: true,
          value: '',
          matchPass: 'password'
        },
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
    e.preventDefault();

    if(this.props.error || this.props.message) {
      this.props.resetErrorMessage();
    }

    const updatedValues = {
      ...this.state.formData,
      [e.target.name]: {
        ...this.state.formData[e.target.name],
        value: e.target.value,
        touched: true
      }
    }

    const errors = validate(updatedValues);

    this.setState({ ...this.state, formData: updatedValues, errors });
  }

  submitHandler(e) {
    e.preventDefault();
    const errors = validate(this.state.formData, true);
    this.setState({ ...this.state, errors });

    if(Object.keys(errors).length === 0) {
      console.log('form submitted...');
      const data = {
        fname: this.state.formData.fname.value,
        lname: this.state.formData.lname.value,
        username: this.state.formData.username.value,
        email: this.state.formData.email.value,
        password: this.state.formData.password.value,
        confirmPassword: this.state.formData.confirmPassword.value
      };
      this.props.register(data);
    }else {
      console.log('form cannot be submitted...');
    }
  }

  render() {
    const { error, loading, message } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-6 col-center">
              <h2>Create an account</h2>
              {message && <p className="u-success">{message}</p>}
              {error && <p className="u-error">{error}</p>}
              {loading ? <Loader />
                :
                <form onSubmit={this.submitHandler}>
                  <Input 
                    type="text"
                    name="fname"
                    id="fname"
                    label="First name"
                    placeholder="Enter your first name"
                    value={this.state.formData.fname.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.fname}
                  />
                  <Input 
                    type="text"
                    name="lname"
                    id="lname"
                    label="Last name"
                    placeholder="Enter your last name"
                    value={this.state.formData.lname.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.lname}
                  />
                  <Input 
                    type="text"
                    name="username"
                    id="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={this.state.formData.username.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.username}
                  />
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
                  <Input 
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter your password again"
                    value={this.state.formData.confirmPassword.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.confirmPassword}
                  />
                  <Button type="submit" text="Register" />
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    message: state.user.message,
    error: state.user.error
  }
}

export default connect(mapStateToProps, { register, resetErrorMessage })(Register);