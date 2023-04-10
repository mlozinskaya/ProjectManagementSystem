import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/main.css"
import "./styles/adminPage.css"
import "./styles/adminProjectsPage.css"
import "./styles/errorPage.css"
import "./styles/header.css"
import "./styles/sidebar.css"
import "./styles/userProfile.css"
import "./styles/backlog.css"

import Login from "./components/Auth/LoginForm";
import Register from "./components/Auth/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/ProfilePage/ProfilePage";
import ProjectsPage from "./components/AdminPage/Projects/ProjectsPage";

import BacklogPage from "./components/WorkSpacePage/BacklogPage/BacklogPage"
import BacklogTaskForm from "./components/WorkSpacePage/BacklogPage/BacklogTaskForm"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout } from "./components/Auth/actions";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import UsersPage from "./components/AdminPage/Users/UsersPage";
import RightsPage from "./components/AdminPage/RightsPage";
import ProjectForm from "./components/AdminPage/Projects/ProjectForm";
import ConfluencePage from "./components/WorkSpacePage/ConfluencePage/ConfluencePage";
import DashboardPage from "./components/WorkSpacePage/DashboardPage/DashboardPage";
import ControlPanelPage from "./components/WorkSpacePage/ControlPanelPage/ControlPanelPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
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

  renderHomeBtn() {
    return (
      <div className="navbar-nav">
        <li className="nav-item">
          <Link to={"/backlog"} className="nav-link">
            Рабочая область
          </Link>
        </li>
      </div>
    )
  }

  renderAdminBtns() {
    const { showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="navbar-nav mr-auto">
        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin/projects"} className="nav-link">
              Панель администратора
            </Link>
          </li>
        )}

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Панель модератора
            </Link>
          </li>
        )}
      </div>
    )
  }

  renderAuthorizedUserBtns() {
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
                  <NavDropdown.Item>
                    <Link to={"/profile"}>
                      Profile
                    </Link>
                  </NavDropdown.Item>

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

  renderAuthBtns() {
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
        {this.renderHomeBtn()}
        {this.renderAdminBtns()}
        {currentUser ? this.renderAuthorizedUserBtns() : this.renderAuthBtns()}
      </nav>
    )
  }

  renderPage() {
    return <div className="page">
      <Switch>
        <Route exact path={["/", "/home"]} component={HomePage} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />

        <Route path="/admin/projects/:mode" render={(props) => (
          <ProjectForm history={props.history} mode={props.match.params.mode} />
        )} />

        <Route exact path="/admin/projects" component={ProjectsPage} />
        <Route exact path="/admin/users" component={UsersPage} />
        <Route exact path="/admin/rights" component={RightsPage} />

        <Route path="/backlog/:mode" render={(props) => (
          <BacklogTaskForm history={props.history} mode={props.match.params.mode}/>
        )} />

        <Route path="/backlog" render={(props) => (
          <BacklogPage history={props.history} />
        )} />

        <Route path="/confluence" render={(props) => (
          <ConfluencePage history={props.history} />
        )} />

        <Route path="/dashboard" render={(props) => (
          <DashboardPage history={props.history} />
        )} />

        <Route path="/controlPanel" render={(props) => (
          <ControlPanelPage history={props.history} />
        )} />

      </Switch>
    </div>

  }

  render() {
    return (
      <Router history={history}>
        {this.renderHeader()}
        {this.renderPage()}
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { workspace } = state;

  return {
    user, workspace
  };
}

export default connect(mapStateToProps)(App);
