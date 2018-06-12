import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { login } from '../../actions/loginActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {renderTextField, validatePassAndUsername} from '../../commonFunctions/formFunctions';

var SignInUsingPasswordPage = props => {
    const { dispatch, handleSubmit, isFetching, name,  valid} = props;
    if (name) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div className='screen-center sign'>
                <form onSubmit={  (values =>  dispatch(handleSubmit(values))) }> 
                    <h1 style={{ marginBottom: 0 }}>
                        Sign In
                    </h1>
                    <div>
                        <Field fullWidth className='input-field' name="username" component={renderTextField} label="Enter your username or email" />
                    </div>
                    <div>
                        <Field fullWidth className='input-field' name="password" type='password' component={renderTextField} label="Password" />
                    </div>
                    <Button  variant="raised" color="primary" className='submit-button'
                          disabled={isFetching || !valid} type="submit"> Sign In</Button>
                    <div>
                        <Link className='link' to='/login'>Continue with Google or Facebook</Link>
                    </div>
                </form>
            </div>

        )
    }
}

SignInUsingPasswordPage = reduxForm({
    form: 'signInUsingPassForm', // a unique identifier for this form
    validate: validatePassAndUsername
})(SignInUsingPasswordPage)

function mapStateToProps(state) {
    return {
        onSubmit: values => login(values),
        isFetching: state.auth.login.isFetching,
        name: state.auth.name
    }
}

export default SignInUsingPasswordPage = connect(mapStateToProps)(SignInUsingPasswordPage);
