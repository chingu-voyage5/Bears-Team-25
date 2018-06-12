import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_up } from '../../actions/signUpActions';
import { Redirect } from 'react-router';
import {renderTextField, validatePassUsernameEmail} from '../../commonFunctions/formFunctions';

var SignUpPage = props => {
    const { dispatch, handleSubmit, isFetching, name, valid } = props

    if (name) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div className='screen-center sign'>
                <form onSubmit={(values => dispatch(handleSubmit(values)))}>
                    <h1 style={{ marginBottom: 0 }}>
                        Sign Up
                </h1>
                <div>
                        <Field fullWidth className='input-field'  name="username" component={renderTextField} label="Username" />
                    </div>
                    <div>
                        <Field fullWidth className='input-field'  name="email" component={renderTextField} label="Email (optional)" />
                    </div>
                    <div>
                        <Field fullWidth className='input-field' name="password" type='password' component={renderTextField} label="Password" />
                    </div>
                    <Button variant="raised" color="primary" className='submit-button' disabled={isFetching || !valid}  type="submit"> Sign Up</Button>
                    <div>
                        <Link className='link' to='/login'>Continue with Google or Facebook</Link>
                    </div>
                </form>
            </div>
        )
    }
}

SignUpPage = reduxForm({
    form: 'SignUpForm', // a unique identifier for this form
    validate: validatePassUsernameEmail
})(SignUpPage)


function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        onSubmit: values => sign_up(values),
        isFetching: state.auth.signUp.isFetching,
        name: state.auth.name,
    }
}

export default SignUpPage = connect(mapStateToProps)(SignUpPage);
