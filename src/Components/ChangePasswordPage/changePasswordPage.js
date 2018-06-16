import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { change_password } from '../../actions/changePasswordActions';
import { Redirect } from 'react-router';
import { renderTextField, validatePasswords } from '../../commonFunctions/formFunctions';
import { successOff } from '../../actions/changePasswordActions';

var ChangePasswordForm = props => {
    const { handleSubmit, dispatch, success, successOff, valid, isFetching } = props;

    let name = localStorage.getItem('name')
    if (success) {
        setTimeout(function () {
            successOff();
        }, 100);
        return <Redirect to='/settings' />
    }
    else if (!name) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div className='screen-center change' style={{ textAlign: 'start' }}>
                <form onSubmit={(values => dispatch(handleSubmit(values)))}>
                    <h1 style={{ marginTop: 0 }}> Change password</h1>
                    <div style={{ marginBottom: '0.6em' }}>
                        <h4 className='form-title'> Current password</h4>
                        <Field fullWidth className='input-field'label="Use any if don't have password"  name="currentPassword" type='password' component={renderTextField} />
                    </div >
                    <div style={{ marginBottom: '0.6em' }}>
                        <h4 className='form-title'> New password</h4>
                        <Field fullWidth className='input-field' name="password1" type='password' component={renderTextField} />
                    </div >
                    <div style={{ marginBottom: '0.6em' }}>
                        <h4 className='form-title'> Confirm new password</h4>
                        <Field fullWidth className='input-field' name="password2" type='password' component={renderTextField} />
                    </div >


                    <div className='bottom-link-container'>
                        <Button variant="raised" color="primary" className='submit-button' disabled={isFetching || !valid} type="submit"> Change</Button>
                        <Link className='bottom-link' to='/settings'>Cancel</Link>
                    </div>
                </form >
            </div >
        )
    }
}

ChangePasswordForm = reduxForm({
    form: 'ChangePasswordForm', // a unique identifier for this form
    validate: validatePasswords
})(ChangePasswordForm)

function mapStateToProps(state) {
    return {
        onSubmit: values => change_password(values),
        isFetching: state.changePassword.isFetching,
        success: state.changePassword.success,
    }
}

export default ChangePasswordForm = connect(mapStateToProps, { successOff })(ChangePasswordForm);
