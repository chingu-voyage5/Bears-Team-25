import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form';
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from 'redux-form';
import {renderTextField, renderSelectField, validateMessage} from '../../commonFunctions/formFunctions';
const selector = formValueSelector('SlackForm')
const axios = require("axios");


const sendMessage = (values) => {
  let source = values.Channel
  let user = values.DM;
  let channel = values.channels;
  let message = values.message;
  let to = null;
  if (source == 'DM') {
    to = user;
  }
  else {
    to = channel;
  }
  // console.log(source, user, channel, message)
  axios
    .post("http://localhost:3001/api/slack/sendMessage",
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
    const { isSlackToken, source, handleSubmit, channel, user} = this.props;
    const {users, channels } = this.state;
   // console.log(source, channel, user);
    const usersToRender = users.map( (user, index) => 
      <MenuItem key = {`menuItem-${index}`} value={user.id}>{user.name}</MenuItem>)
    const channelsToRender = channels.map( (channel, index) => 
      <MenuItem key = {`menuItem-${index}`} value={channel.id}>{channel.name}</MenuItem>)
    return (
      <div>
        {isSlackToken && (
        <form onSubmit= {(values) => handleSubmit(values)}>
            <Field  className='input-field'  name="message" component={renderTextField} label="Message" />
            <div>
            <Field  name="Channel" component={renderSelectField} label="Favorite Color">
              <MenuItem value='DM'>DM</MenuItem>
              <MenuItem  value='Channels'>Channels</MenuItem>
            </Field>
            </div>
            { (source =='DM') &&
            <div>
            <Field   name="DM" component={renderSelectField} label="Favorite Color">
                {usersToRender}
            </Field>
            </div>}
            
            { (source =='Channels') &&
            <div>
            <Field  name="channels" component={renderSelectField} label="Favorite Color">
                {channelsToRender}
            </Field>
            </div>
            }
            <Button disabled = {!user && !channel} variant="raised" type="submit" color="primary">send message</Button>
        </form>)
        }
        {!isSlackToken && (
          <a href="http://localhost:3001/api/slack/auth/">
            <Button variant="raised">Slack</Button>
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
    onSubmit: (values)  => sendMessage(values),
    isSlackToken: state.auth.isSlackToken,
    source: selector(state, 'Channel'),
    channel: selector(state, 'channels'),
    user: selector(state, 'DM')
  };
};

export default connect(mapStateToProps)(Slack);
