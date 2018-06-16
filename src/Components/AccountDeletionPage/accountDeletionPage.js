import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { delete_account } from '../../actions/accountDeletionActions'
import { Redirect } from 'react-router'
import {renderTextField, validateOnlyPass} from '../../commonFunctions/formFunctions';

var AccountDeletionPage = props => {
    const { handleSubmit, valid, isFetching, dispatch, auth } = props;
    let name = localStorage.getItem('name')
    if (!name) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div className='screen-center deletion'>
                <form onSubmit={(values => dispatch(handleSubmit(values)))}>
                    <h1 className='form-title'> Delete account</h1>
                    <div style={{ marginBottom: '0.6em', marginTop: '0.6em' }}>
                        <Field fullWidth className='input-field' name="password" type='password' 
                        label='Enter your password to continue' component={renderTextField} />
                    </div >
                    <div className='bottom-link-container'>
                        <Button variant="raised" color="secondary" className='submit-button' 
                        disabled={isFetching || !valid} type="submit"> Delete</Button>
                        <Link className='bottom-link' to='/settings'>I changed my mind</Link>
                    </div>
                </form >
            </div >
        )
    }
}

AccountDeletionPage = reduxForm({
    form: 'AccountDeletionForm', // a unique identifier for this form
    validate: validateOnlyPass
})(AccountDeletionPage)

function mapStateToProps(state) {
    return {
        onSubmit: values => delete_account(values),
        isFetching: state.accountDeletion.isFetching,
        auth: state.auth.auth
    }
}



export default AccountDeletionPage =
    connect(mapStateToProps)(AccountDeletionPage);

