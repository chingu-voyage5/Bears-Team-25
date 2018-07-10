import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from "redux-form";
import {
  renderSelectField,
  validateMessage
} from "../../commonFunctions/formFunctions";
import baseURL from '../../baseUrl';

const selector = formValueSelector("SlackForm");
const axios = require("axios");

class Slack extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], channels: [] };
  }

  componentWillMount() {
    this.fetchUsersAndChannels();
  }

  fetchUsersAndChannels = () => {
    axios
      .get(`${baseURL}slack/fetchUsersAndChannels`, {
        withCredentials: true
      })
      .then(response => {
        let { users, channels } = response.data;
        this.setState({ users, channels });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { source, channel, user, valid, afterValid } = this.props;
    const { users, channels } = this.state;
    let to = null;
    source === "DM" ? (to = user) : (to = channel);
    const values = { to };
    const usersToRender = users.map((user, index) => (
      <MenuItem key={`user-${index}`} value={user.id}>
        {user.name}
      </MenuItem>
    ));
    const channelsToRender = channels.map((channel, index) => (
      <MenuItem key={`channel-${index}`} value={channel.id}>
        {channel.name}
      </MenuItem>
    ));
    return (
      <div>
        <form>
          <div>
            <Field
              name="Channel"
              component={renderSelectField}
              label="Which Channel?"
            >
              <MenuItem value="DM">DM</MenuItem>
              <MenuItem value="Channels">Channels</MenuItem>
            </Field>
          </div>
          {source === "DM" && (
            <div>
              <Field name="DM" component={renderSelectField} label="User">
                {usersToRender}
              </Field>
            </div>
          )}

          {source === "Channels" && (
            <div>
              <Field
                name="channels"
                component={renderSelectField}
                label="Channel"
              >
                {channelsToRender}
              </Field>
            </div>
          )}
          <Button
            disabled={(!user && !channel) || !valid}
            variant="raised"
            onClick={() => afterValid(values)}
            color="primary"
          >
            Create action
          </Button>
        </form>
      </div>
    );
  }
}

Slack = reduxForm({
  form: "SlackForm", // a unique identifier for this form
  validate: validateMessage
})(Slack);

const mapStateToProps = state => {
  return {
    source: selector(state, "Channel"),
    channel: selector(state, "channels"),
    user: selector(state, "DM")
  };
};

export default connect(mapStateToProps)(Slack);
