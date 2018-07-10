import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "mdi-react/DeleteIcon";
import * as Icons from "../Icons/Icons";
import "./AppletCard.css";

class AppletCard extends Component {
  state = {
    checkedA: true,
    checkedB: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { serviceTo, serviceFrom, isHome, deleteApplet, id } = this.props;
    let iconNameTo = serviceTo + "Icon";
    const IconNameTo = Icons[iconNameTo];
    let iconNameFrom = serviceFrom + "Icon";
    const IconNameFrom = Icons[iconNameFrom];
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <div className="applet-card">
          <Card className="card">
            <CardContent className="white-text">
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <IconNameFrom color="white" className="icon" />
                </Grid>
                <Grid item xs={8} />
                <Grid item xs={2}>
                  {!isHome && (
                    <DeleteIcon
                      onClick={() => deleteApplet(id)}
                      color="red"
                      className="delete-icon"
                    />
                  )}
                </Grid>
              </Grid>
              <TextArea content={this.props.content} />
            </CardContent>
            <CardContent className="card-footer">
              <Grid container spacing={24}>
                {!isHome && (
                  <Grid item xs={7}>
                    <span className="left-align">
                      Running:<Switch
                        checked={this.state.checkedB}
                        onChange={this.handleChange("checkedB")}
                        value="checkedB"
                        color="primary"
                      />
                    </span>
                  </Grid>
                )}
                <Grid style={{ marginLeft: "auto" }} item xs={5}>
                  <span className="right-align">
                    <span className="inline">
                      <span className="text-inline">Works with</span>{" "}
                      <IconNameTo color="white" className="icon" />
                    </span>
                  </span>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Grid>
    );
  }
}

class TextArea extends Component {
  render() {
    return (
      <div className="text-area">
        <textarea defaultValue={this.props.content} />
      </div>
    );
  }
}

class ServiceLogo extends Component {
  render() {
    const { serviceFrom } = this.props;
    let iconNameFrom = serviceFrom + "Icon";
    const IconNameFrom = Icons[iconNameFrom];
    return (
      <div className="review-card">
        <Avatar>
          <IconNameFrom color="white" className="icon" />
        </Avatar>
      </div>
    );
  }
}

export default AppletCard;
