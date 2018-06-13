import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './profileSettingsPage.css';
import { change_email } from '../../actions/profileSettingsActions';
import { Redirect } from 'react-router';
import { renderTextField, validatePassAndEmail } from '../../commonFunctions/formFunctions';
import {linkOrUnlinkFB, linkOrUnlinkGoogle} from '../../actions/profileSettingsActions';


var ProfileSettingsPage = props => {
    const { handleSubmit, isFBLinked, isGoogleLinked, linkOrUnlinkFB, linkOrUnlinkGoogle, valid, isFetching, dispatch, auth } = props;
    if (!auth) {
        return <Redirect to='/' />
    }
    else {
        return (
            <div className='screen-center settings' style={{ textAlign: 'start' }}>
                <form onSubmit={(values => dispatch(handleSubmit(values)))}>
                    <div>
                        <h2 className='form-title'> Account</h2>
                        <h4 style={{ marginBottom: 0, marginTop: '0.6em' }}> Email</h4>
                        <Field fullWidth className='input-field' name="email" component={renderTextField} />
                    </div>
                    <div style={{ marginBottom: '0.6em' }}>
                        <h4 className='form-title'> Password</h4>
                        <Field fullWidth className='input-field' name="password" type='password' disabled={true} component={renderTextField} />
                        <Link className='title-link' to='/change_password'>Change password</Link>
                    </div >
                    <h3 className='form-title'> Linked accounts</h3>
                    <div className='social-link-container'>
                        <img className='link-acc-image' title="Google account is linked" alt="Google account is linked"
                            src="//web-assets.ifttt.com/assets/web/social-signon/google-21c9ddc5a9057bbbeadee3865e7b7fe40483807a0e1c6dda34eae0dd683be1d0.svg" />
                        <span className='social-link-wrapper'>
                            {isGoogleLinked && <span>Google account is linked</span>}
                            {!isGoogleLinked && <span>Google account is not linked</span>}
                        </span>
                        <span onClick={linkOrUnlinkGoogle} className='social-link'>
                            {isGoogleLinked && <span>Unlink</span>}
                            {!isGoogleLinked && <span>Link</span>}
                        </span>
                    </div>
                    <div className='social-link-container'>
                        <img className='link-acc-image' title="Facebook is not linked" alt="Facebook is not linked"
                            src="//web-assets.ifttt.com/assets/web/social-signon/facebook-d8dad9fdd6856071e5e5cd323995a9cbb5c7380aabde8898845b769a998c9846.svg" />
                        <span className='social-link-wrapper'>
                            {isFBLinked && <span>Facebook is  linked</span>}
                            {!isFBLinked && <span>Facebook is not linked</span>}
                        </span>
                        <span onClick={linkOrUnlinkFB} className='social-link'>
                            {isFBLinked && <span>Unlink</span>}
                            {!isFBLinked && <span>Link</span>}
                        </span>
                    </div>

                    <div className='bottom-link-container'>
                        <Button variant="raised" color="primary" className='submit-button' type="submit" disabled={isFetching || !valid}> Update</Button>
                        <Link className='bottom-link' to='/account_deletion'>Delete your account</Link>
                    </div>
                </form >
            </div >
        )
    }
}

ProfileSettingsPage = reduxForm({
    form: 'profileSettingsForm', // a unique identifier for this form
    validate: validatePassAndEmail
})(ProfileSettingsPage)


function mapStateToProps(state) {
    return {
        isFBLinked: state.profileSettings.isFBLinked,
        isGoogleLinked: state.profileSettings.isGoogleLinked,
        initialValues: { email: state.auth.email, password: 'password' },
        auth: state.auth.auth,
        onSubmit: values => change_email(values),
        isFetching: state.auth.emailChanging.isFetching
    }
}


export default ProfileSettingsPage =
    connect(mapStateToProps, {linkOrUnlinkFB, linkOrUnlinkGoogle})(ProfileSettingsPage);