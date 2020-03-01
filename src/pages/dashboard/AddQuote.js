import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addQuote, resetQuotesSuccessMessage, resetQuotesLoading, resetQuotesError } from '../../store/actions/quoteActions';
import validate from '../../utils/validate';
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Button from '../../components/UI/Button';
import Loader from '../../components/UI/Loader';

class AddQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        text: {
          required: true,
          value: '',
          minLength: 10
        },
        author: {
          required: true,
          value: ''
        }
      },
      errors: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetFormFields = this.resetFormFields.bind(this);
  }

  componentDidMount() {
    this.props.resetQuotesLoading();
    this.props.resetQuotesError();
  }

  changeHandler(e) {
    e.preventDefault();

    if(this.props.successMessage) {
      this.props.resetQuotesSuccessMessage();
    }
    if(this.props.error) {
      this.props.resetQuotesError();
    }

    const updatedValues = {
      ...this.state.formData,
      [e.target.name]: {
        ...this.state.formData[e.target.name],
        value: e.target.value,
        touched: true
      }
    };

    const errors = validate(updatedValues);

    this.setState({
      ...this.state,
      formData: updatedValues,
      errors
    });
  }

  resetFormFields() {
    this.setState({
      ...this.state,
      formData: {
        text: {
          ...this.state.formData.text,
          value: '',
          touched: false
        },
        author: {
          ...this.state.formData.author,
          value: '',
          touched: false
        }
      }
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const errors = validate(this.state.formData, true);
    this.setState({ ...this.state, errors });

    if (Object.keys(errors).length === 0) {
      console.log(this.state.formData);
      console.log('form submitted...');
      let data = {
        text: this.state.formData.text.value,
        author: this.state.formData.author.value
      }
      this.props.addQuote(data);
      this.resetFormFields();
    } else {
      console.log('form cannot be submitted...');
    }
  }

  render() {
    const { loading, successMessage, error } = this.props;

    return (
      <div className="add-quote content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-6 col-center">
              <h2 className="text-center">Add Quote</h2>
              {loading 
                ? <Loader />
                : 
                <form onSubmit={this.submitHandler}>
                  {successMessage && <p className="u-success">{successMessage}</p>}
                  {error && <p className="u-error">{error}</p>}
                  <TextArea
                    label="Quote Text"
                    id="text"
                    name="text"
                    placeholder="Type your quote here"
                    value={this.state.formData.text.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.text}
                  />
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    label="Quote Author"
                    placeholder="Enter Author Name"
                    value={this.state.formData.author.value}
                    onChange={this.changeHandler}
                    error={this.state.errors.author}
                  />
                  <Button type="submit" text="Submit quote" />
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
    successMessage: state.quote.successMessage,
    loading: state.quote.loading,
    error: state.quote.error
  }
}

export default connect(mapStateToProps, { addQuote, resetQuotesSuccessMessage, resetQuotesLoading, resetQuotesError })(AddQuote);