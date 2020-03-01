import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getQuoteById, resetQuotesError, editQuote, resetQuotesSuccessMessage } from '../../store/actions/quoteActions';
import validate from '../../utils/validate';
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Button from '../../components/UI/Button';
import Loader from '../../components/UI/Loader';

class EditQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        text: {
          required: true,
          value: '',
          minLength: 10,
          touched: true
        },
        author: {
          required: true,
          value: '',
          touched: true
        }
      },
      errors: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getQuoteById(id);
  }

  componentDidUpdate(prevProps) {
    if(this.props.quote !== prevProps.quote) {
      const data = {...this.state.formData};
      data.text.value = this.props.quote.text;
      data.author.value = this.props.quote.author;

      this.setState({
        ...this.state,
        formData: data
      });
    }
  }

  componentWillUnmount() {
    if(this.props.error) {
      this.props.resetQuotesError();
    }
    if(this.props.successMessage) {
      this.props.resetQuotesSuccessMessage();
    }
  }

  changeHandler(e) {
    e.preventDefault();

    if(this.props.successMessage) {
      this.props.resetQuotesSuccessMessage();
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

  submitHandler(e) {
    e.preventDefault();
    const errors = validate(this.state.formData, true);
    this.setState({ ...this.state, errors });

    if (Object.keys(errors).length === 0) {
      console.log(this.state.formData);
      console.log('form submitted...');
      const data = {
        text: this.state.formData.text.value,
        author: this.state.formData.author.value
      };
      this.props.editQuote(this.props.match.params.id, data);
    } else {
      console.log('form cannot be submitted...');
    }
  }

  render() {
    const { loading, error, successMessage } = this.props;

    return (
      <div className="add-quote content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-6 col-center">
              <h2 className="text-center">Edit Quote</h2>
              {successMessage && <p className="u-success">{successMessage}</p>}
              {error && <p className="u-error">{error}</p>}
              {loading ? <Loader />
                : !error &&
                <form onSubmit={this.submitHandler}>
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
                  <Button type="submit" text="Edit quote" />
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
    quote: state.quote.quote,
    loading: state.quote.loading,
    error: state.quote.error,
    successMessage: state.quote.successMessage
  }
}

export default connect(mapStateToProps, { getQuoteById, resetQuotesError, editQuote, resetQuotesSuccessMessage })(EditQuote);