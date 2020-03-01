import isEmpty from 'is-empty';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default (fields, submit = false) => {
  const errors = {};
  for( let field in fields ) {
    if(submit) {
      fields[field].touched = true;
    }

    if(fields[field].required && isEmpty(fields[field].value) && fields[field].touched) {
      errors[field] = `${field} is required`;
    }

    if(fields[field].email && !validateEmail(fields[field].value) && fields[field].touched) {
      errors[field] = `invalid email address`;
    }

    if(fields[field].matchPass && fields[field].value !== fields[fields[field].matchPass].value && fields[field].touched) {
      errors[field] = 'passwords must match';
    }

    if(fields[field].minLength && fields[field].value !== '' && fields[field].value.length < fields[field].minLength && fields[field].touched) {
      errors[field] = `${field} must have at least ${fields[field].minLength} characters`;
    }
  }  

  return errors;
}