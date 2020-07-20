import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import DeletePost from "./delete-post";
import EditPost from "./edit-post";
import PostModal from "./post-modal";
import StaticProfile from "./static-profile";
import { connect } from "react-redux";

const styles = (theme) => ({
  card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: "left",
  },
  postInfoGrid: {
    paddingLeft: 15,
  },
  username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
    textDecoration: "none",
  },
  contents: {
    textAlign: "left",
    fontFamily: "Hind",
    objectFit: "cover",
    wordWrap: "break-word",
  },
  image: {
    minWidth: 90,
    minHeight: 90,
  },
});

class Post extends Component {
  state = {
    open: false,
    profile: null,
  };

  componentDidMount() {
    axios
      .get(`/user/${this.props.post.username}`)
      .then((response) => {
        this.setState({
          profile: response.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  openProfile = () => {
    this.setState({ open: true });
  };

  closeProfile = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      post: { username, content, postID, imageURL },
      user: { isAuth, credentials },
    } = this.props;

    let editButton;
    let deleteButton;

    // only display edit and delete buttons for logged in users
    if (isAuth && username === credentials.username) {
      editButton = <EditPost postID={postID} />;
      deleteButton = <DeletePost postID={postID} />;
    } else {
      editButton = null;
      deleteButton = null;
    }

    let popoutButton = <PostModal postID={postID} username={username} />;

    let userProfile =
      this.state.profile === null ? null : (
        <StaticProfile open={this.state.open} profile={this.state.profile} />
      );

    return (
      <Card className={classes.card}>
        <Grid container>
          <Grid item>
            <Avatar
              variant="rounded"
              src={imageURL}
              title={username}
              className={classes.image}></Avatar>
          </Grid>
          <Grid item xs className={classes.postInfoGrid}>
            <Grid item>
              <div>
                <Button onClick={this.openProfile}>
                  <Typography className={classes.username} color="secondary">
                    {username}
                  </Typography>
                </Button>
                {userProfile}
              </div>
            </Grid>
            <Grid item>
              <Typography className={classes.contents} component="p">
                {content}
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Grid item>
              {popoutButton} {editButton} {deleteButton}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
