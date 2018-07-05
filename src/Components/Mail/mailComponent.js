import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form';
import { formValueSelector } from 'redux-form';
import {renderTextField, validateMessage} from '../../commonFunctions/formFunctions';
const selector = formValueSelector('MailForm')

class Mail extends Component {
  render() {
    const {valid, email, afterValid} = this.props;
    const values = {email};
    return (
        <form>
          <div>
            <Field  className='input-field'  name="email" component={renderTextField} label="Email" />  
            </div>        
            <Button disabled = {!valid}  onClick={() => afterValid(values)} variant="raised" color="primary">Create action</Button>
        </form>
    );
  }
}

Mail = reduxForm({
  form: 'MailForm', // a unique identifier for this form
  validate: validateMessage
})(Mail);

const mapStateToProps = state => {
  return {
    email: selector(state, 'email')
  };
};

export default connect(mapStateToProps)(Mail);
