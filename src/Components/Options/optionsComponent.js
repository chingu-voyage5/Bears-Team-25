import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form';
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from 'redux-form';
import {renderTextField, renderSelectField, validateMessage} from '../../commonFunctions/formFunctions';
const selector = formValueSelector('ButtonAppletForm')
const axios = require("axios");

const sendMailAndMessage = (values) => {
  let source = values.Channel
  let user = values.DM;
  let channel = values.channels;
  let message = values.message;
  let email = values.email;
  let to = null;
  if (source === 'DM') {
    to = user;
  }
  else {
    to = channel;
  }
  axios
    .post("http://localhost:3001/api/integrations/sendMessageThroughSlackAndGmail",
     {to, message, email },
    {
      withCredentials: true
    })
    .then(response => {
      console.log('message sent');
    })
    .catch(error => {
      console.log(error);
    });
};

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], channels: []}
  }

  componentDidMount() {
    const isSlack = this.isSubscribed('Slack');
    if (isSlack) this.fetchUsersAndChannels();
  }

  fetchUsersAndChannels = () => {
    axios
      .get("http://localhost:3001/api/slack/fetchUsersAndChannels", {
        withCredentials: true
      })
      .then(response => {
        let users = response.data.users;
        let channels = response.data.channels;
        this.setState({users: users, channels: channels})
      })
      .catch(error => {
        console.log(error);
      });
  };

  // checking if provided service is in array of subscribed services
  isSubscribed(service) {
    const {servicesSubscribed} = this.props;
    return (servicesSubscribed) ? servicesSubscribed.some(element => element.service === service) : false;
  }

  render() {
    const {source, handleSubmit, channel, user,  valid} = this.props;
    const {users, channels } = this.state;
    const isSlack = this.isSubscribed('Slack');
    const isGmail = this.isSubscribed('Mail');
   // console.log(source, channel, user);
    const usersToRender = users.map( (user, index) => 
      <MenuItem key = {`user-${index}`} value={user.id}>{user.name}</MenuItem>)
    const channelsToRender = channels.map( (channel, index) => 
      <MenuItem key = {`channel-${index}`} value={channel.id}>{channel.name}</MenuItem>)
    return (
      <div>
        {isSlack && isGmail &&  (
        <form onSubmit= {(values) => handleSubmit(values)}>
            <Field  className='input-field'  name="message" component={renderTextField} label="Message" />
            <h3>Mail Options</h3>
            <Field  className='input-field'  name="email" component={renderTextField} label="Email" />
            <div>
            <h3>Slack Options</h3>
            <Field  name="Channel" component={renderSelectField} label="Which Channel?">
              <MenuItem value='DM'>DM</MenuItem>
              <MenuItem  value='Channels'>Channels</MenuItem>
            </Field>
            </div>
            { (source === 'DM') &&
            <div>
            <Field   name="DM" component={renderSelectField} label="User">
                {usersToRender}
            </Field>
            </div>}
            
            { (source === 'Channels') &&
            <div>
            <Field  name="channels" component={renderSelectField} label="Channel">
                {channelsToRender}
            </Field>
            </div>
            }
            <Button disabled = {(!user && !channel) || !this.isSubscribed('Mail') || !valid} variant="raised" type="submit" color="primary">send message</Button>
        </form>)
        }
        {!isSlack && (
          <a href="http://localhost:3001/api/slack/auth/">
            <Button variant="raised" className="slack-btn" style={{backgroundColor: '#49c4a1', color: 'white'}}>connect Slack </Button>
          </a>
        )}
         {!isGmail && (
        <a href="http://localhost:3001/api/gmail/auth/">
            <Button variant="raised" className="mail-btn" style={{backgroundColor: '#db3236', color: 'white'}}>connect Gmail</Button>
          </a>
            )}
            </div>

    );
  }
}

Options = reduxForm({
  form: 'ButtonAppletForm', // a unique identifier for this form
  validate: validateMessage
})(Options);

const mapStateToProps = state => {
  return {
    onSubmit: (values)  => sendMailAndMessage(values),
    servicesSubscribed: state.auth.servicesSubscribed,
    source: selector(state, 'Channel'),
    channel: selector(state, 'channels'),
    user: selector(state, 'DM'),
    message: selector(state, 'message')
  };
};

export default connect(mapStateToProps)(Options);
