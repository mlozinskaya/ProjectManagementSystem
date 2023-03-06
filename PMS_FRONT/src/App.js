import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/common.css"
import "./styles/errorPage.css"
import "./styles/forumPage.css"
import "./styles/chatPage.css"
import "./styles/header.css"
import "./styles/sidebar.css"
import "./styles/userProfile.css"

import Login from "./components/Auth/LoginForm";
import Register from "./components/Auth/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/ProfilePage/ProfilePage";
import AdminPage from "./components/AdminPage/AdminPage";

import BoardUser from "./components/Boards/board-user.component";
import BoardModerator from "./components/Boards/board-moderator.component";
import BoardAdmin from "./components/Boards/board-admin.component";
import ForumPage from "./components/ForumPage/ForumPage";
import AddTheme from "./components/ForumPage/AddTheme";
import ThemePage from "./components/ForumPage/ThemePage";
import ChatPage from "./components/ChatPage/ChatPage";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout } from "./components/Auth/actions";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import SideBar from "./components/Main/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      // clear message when changing location
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    const { dispatch } = this.props;

    dispatch(logout());
    history.push("/");

    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  renderModeratorBoard() {
    const { showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="navbar-nav mr-auto">
        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/adm"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}
      </div>
    )
  }

  renderAuthorizedUserButtons() {
    const { currentUser } = this.state;

    return (
      <div className="navbar-nav ml-auto">
        <Navbar variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={currentUser.username}
                  drop={'start'}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={this.logOut}>
                    <FontAwesomeIcon icon={faSignOut} /> Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }

  renderAuthButtons() {
    return (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Sign Up
          </Link>
        </li>
      </div>
    )
  }

  renderHeader() {
    const { currentUser } = this.state;

    return (
      <nav className="navbar navbar-expand navbar-dark navbar_bg header">
        {this.renderModeratorBoard()}
        {currentUser ? this.renderAuthorizedUserButtons() : this.renderAuthButtons()}
      </nav>
    )
  }

  renderPage() {
    return <Switch>
      <Route exact path={["/", "/home"]} component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/adm" component={AdminPage} />

      <Route path="/user" component={BoardUser} />
      <Route path="/modds" component={BoardModerator} />
      <Route path="/admin" component={BoardAdmin} />
      <Route path="/forum/theme/:id" render={(props) => (
        <ThemePage id={props.match.params.id} />
      )} />
      <Route path="/forum/add/:id" render={(props) => (
        <AddTheme id={props.match.params.id} />
      )} />
      <Route path="/forum/add" component={AddTheme} />
      <Route path="/forum" component={ForumPage} />
      <Route path="/chat" component={ChatPage} />
    </Switch>
  }

  render() {
    return (
      <Router history={history}>
        {this.renderHeader()}
        <div className="screen-container">
          <div className="side-bar-container">
            <SideBar />
          </div>
          <div className="page-container">
            {this.renderPage()}
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
