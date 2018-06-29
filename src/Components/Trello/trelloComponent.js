import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form';
import MenuItem from "@material-ui/core/MenuItem";
import { formValueSelector } from 'redux-form';
import {renderTextField, renderSelectField, validateTrello} from '../../commonFunctions/formFunctions';
const selector = formValueSelector('TrelloForm')
const axios = require("axios");


const saveTrelloConfig = (values) => {
  axios
    .post("http://localhost:3001/api/trello/saveTrelloConfig",
        values,
    {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data.status);
    })
    .catch(error => {
      console.log(error);
    });
};

class Trello extends Component {

  constructor(props) {
    super(props);
    this.state = {boards: []}
  }

  componentDidMount() {
    this.fetchBoards();
  }

  fetchBoards = () => {
    axios
      .get("http://localhost:3001/api/trello/fetchBoards", {
        withCredentials: true
      })
      .then(response => {
        let boards = response.data.boards;
        this.setState({boards})
      })
      .catch(error => {
        console.log(error);
      });
  };


  render() {
    const {  handleSubmit,  valid} = this.props;
    const {boards} = this.state;
    const boardsToRender = boards.map( (board, index) => 
      <MenuItem key = {`board-${index}`} value={board.id}>{board.name}</MenuItem>)
    return (
      <div>
                 <a href="http://localhost:3001/api/github/auth/">
            <Button variant="raised" >connect git</Button>
          </a>

                  <a href="http://localhost:3001/api/trello/auth/">
            <Button variant="raised" >connect trello</Button>
          </a>
        <form onSubmit= {(values) => handleSubmit(values)}>
            {/* <Field  className='input-field'  name="cardTitle" component={renderTextField} label="Card Title" /> */}
            <div>
            <Field  className='input-field'  name="listName" component={renderTextField} label="List Name" />
            </div>
            {/* <div>
            <Field  className='input-field'  name="description" component={renderTextField} label="Description" />
            </div> */}
            <div>
            <Field  name="position" component={renderSelectField} label="Position">
              <MenuItem value='top'>Top</MenuItem>
              <MenuItem  value='bottom'>Bottom</MenuItem>
            </Field>
            </div>
            <Field  name="boardID" component={renderSelectField} label="Boards">
                {boardsToRender}
            </Field>    
            <Button disabled={!valid} variant="raised" type="submit" color="primary">post to trello</Button>
        </form>

 
            </div>

    );
  }
}

Trello = reduxForm({
  form: 'TrelloForm', // a unique identifier for this form
  validate: validateTrello
})(Trello);

const mapStateToProps = state => {
  return {
    onSubmit: (values)  => saveTrelloConfig(values),
    cardTitle: selector(state, 'cardTitle'),
    listName: selector(state, 'listName'),
    position: selector(state, 'position'),
    boardID: selector(state, 'boardID')
  };
};

export default connect(mapStateToProps)(Trello);
