import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from "redux-form";
import {
  renderTextField,
  renderSelectField,
  validateTrello
} from "../../commonFunctions/formFunctions";
const selector = formValueSelector("TrelloForm");
const axios = require("axios");

class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] };
  }

  componentWillMount() {
    this.fetchBoards();
  }

  fetchBoards = () => {
    axios
      .get("http://localhost:3001/api/trello/fetchBoards", {
        withCredentials: true
      })
      .then(response => {
        let boards = response.data.boards;
        this.setState({ boards });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { valid, listName, boardID, position, afterValid } = this.props;
    const values = { listName, boardID, position };
    const { boards } = this.state;
    const boardsToRender = boards.map((board, index) => (
      <MenuItem key={`board-${index}`} value={board.id}>
        {board.name}
      </MenuItem>
    ));
    return (
      <div style={{ width: "10em", margin: "auto" }}>
        <form>
          <div>
            <Field
              className="input-field"
              name="position"
              component={renderSelectField}
              label="Position"
            >
              <MenuItem value="top">Top</MenuItem>
              <MenuItem value="bottom">Bottom</MenuItem>
            </Field>
          </div>
          <Field
            className="input-field"
            name="boardID"
            component={renderSelectField}
            label="Boards"
          >
            {boardsToRender}
          </Field>
          <div>
            <Field
              fullWidth
              className="input-field"
              name="listName"
              component={renderTextField}
              label="List Name"
            />
          </div>
          <Button
            variant="raised"
            color="primary"
            disabled={!valid}
            onClick={() => afterValid(values)}
          >
            Create action
          </Button>
        </form>
      </div>
    );
  }
}

Trello = reduxForm({
  form: "TrelloForm", // a unique identifier for this form
  validate: validateTrello
})(Trello);

const mapStateToProps = state => {
  return {
    servicesSubscribed: state.auth.servicesSubscribed,
    listName: selector(state, "listName"),
    position: selector(state, "position"),
    boardID: selector(state, "boardID")
  };
};

export default connect(mapStateToProps)(Trello);
