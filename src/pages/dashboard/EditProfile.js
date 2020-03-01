import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { editProfile, resetErrorMessage } from '../../store/actions/userActions';
import validate from '../../utils/validate';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        oldPassword: {
          required: true,
          value: ''
        },
        newPassword: {
          required: true,
          value: '',
          minLength: 6
        },
        confirmPassword: {
          required: true,
          value: '',
          matchPass: 'newPassword'
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

    if (Object.keys(errors).length === 0) {
      console.log('password updated...');
      const data = {
        oldPassword: this.state.formData.oldPassword.value,
        newPassword: this.state.formData.newPassword.value
      }

      this.props.editProfile(this.props.user.id, data);
    } else {
      console.log('password cannot be updated...');
    }
  }

  render() {
    const { error, message } = this.props;

    return (
      <div className="edit-profile content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-8 col-center">
              <div className="actions">
                <Link to="/my-profile" className="btn btn-secondary btn-small">Go back</Link>
              </div>
              <h2 className="text-center">Edit Profile</h2>
              {error && <p className="u-error">{error}</p>}
              {message && <p className="u-success">{message}</p>}
              <form onSubmit={this.submitHandler}>
                <Input 
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  label="Current password"
                  placeholder="Enter your current password"
                  value={this.state.formData.oldPassword.value}
                  onChange={this.changeHandler}
                  error={this.state.errors.oldPassword}
                />
                <Input 
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  label="New password"
                  placeholder="Enter your new password"
                  value={this.state.formData.newPassword.value}
                  onChange={this.changeHandler}
                  error={this.state.errors.newPassword}
                />
                <Input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  placeholder="Enter your new password again"
                  value={this.state.formData.confirmPassword.value}
                  onChange={this.changeHandler}
                  error={this.state.errors.confirmPassword}
                />
                <Button type="submit" text="Update Password" />
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
    message: state.user.message,
    user: state.user.user
  }
}

export default connect(mapStateToProps, { editProfile, resetErrorMessage })(EditProfile);