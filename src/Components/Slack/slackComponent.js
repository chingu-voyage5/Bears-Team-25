import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form';
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from 'redux-form';
import {renderTextField, renderSelectField, validateMessage} from '../../commonFunctions/formFunctions';
const selector = formValueSelector('SlackForm')
const axios = require("axios");


const sendMailAndMessage = (values) => {
  let source = values.Channel
  let user = values.DM;
  let channel = values.channels;
  let message = values.message;
  let to = null;
  if (source === 'DM') {
    to = user;
  }
  else {
    to = channel;
  }
  axios
    .post("http://localhost:3001/api/integrations/sendMessageThroughSlackAndGmail",
     {to: to, message: message},
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

class Slack extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], channels: []}
  }

  componentDidMount() {
    this.fetchUsersAndChannels();
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
  render() {
    const { isSlackToken, source, handleSubmit, channel, user, isGmailToken, message} = this.props;
    const {users, channels } = this.state;
   // console.log(source, channel, user);
    const usersToRender = users.map( (user, index) => 
      <MenuItem key = {`user-${index}`} value={user.id}>{user.name}</MenuItem>)
    const channelsToRender = channels.map( (channel, index) => 
      <MenuItem key = {`channel-${index}`} value={channel.id}>{channel.name}</MenuItem>)
    return (
      <div>
        {isSlackToken && isGmailToken &&  (
        <form onSubmit= {(values) => handleSubmit(values)}>
            <Field  className='input-field'  name="message" component={renderTextField} label="Message" />
            <div>
            <Field  name="Channel" component={renderSelectField} label="Which Channel?">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
              <MenuItem value='DM'>DM</MenuItem>
              <MenuItem  value='Channels'>Channels</MenuItem>
            </Field>
            </div>
            { (source === 'DM') &&
            <div>
            <Field   name="DM" component={renderSelectField} label="User">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
                {usersToRender}
            </Field>
            </div>}
            
            { (source === 'Channels') &&
            <div>
            <Field  name="channels" component={renderSelectField} label="Channel">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
                {channelsToRender}
            </Field>
            </div>
            }
            <Button disabled = {(!user && !channel) || !isGmailToken} variant="raised" type="submit" color="primary">send message</Button>
        </form>)
        }
        {!isSlackToken && (
          <a href="http://localhost:3001/api/slack/auth/">
            <Button variant="raised">Slack</Button>
          </a>
        )}
         {!isGmailToken && (
        <a href="http://localhost:3001/api/gmail/auth/">
            <Button variant="raised">gmail connect</Button>
          </a>
            )}
      </div>
           
      
    );
  }
}

Slack = reduxForm({
  form: 'SlackForm', // a unique identifier for this form
  validate: validateMessage
})(Slack);

const mapStateToProps = state => {
  return {
    onSubmit: (values)  => sendMailAndMessage(values),
    isSlackToken: state.auth.isSlackToken,
    isGmailToken: state.auth.isGmailToken,
    source: selector(state, 'Channel'),
    channel: selector(state, 'channels'),
    user: selector(state, 'DM'),
    message: selector(state, 'message')
  };
};

export default connect(mapStateToProps)(Slack);
