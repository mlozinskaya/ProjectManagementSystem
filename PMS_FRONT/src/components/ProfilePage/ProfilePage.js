import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";


class Profile extends Component {

  getTestData() {
    return {
      username: "1999759034",
      firstName: "Иван",
      secondName: "Иванов",
      thirdName: "Иванович",
      email: "some_test@email.ru",
      dateOfBirth: "28.04.1111",
      phoneNumber: "8-800-555-35-35",
      jobTitle: "Senior of all seniors"
    }
  }

  render() {
    // const { user: currentUser } = this.props;
    const user = this.getTestData();

    if (!user) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container mt-4">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-7 order-md-2">
              <h4>Данные пользователя</h4>
              <br />
              <div>Username: {user.username}</div>
              <div>Date of birth: {user.dateOfBirth}</div>
              <div>Email: {user.email}</div>
              <div>Phone number: {user.phoneNumber}</div>
            </div>
            <div className="col-md-5 order-md-1 profile-name-form">
              <div style={{ textAlign: "center" }}>
                <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                  className="profile-img-card profile-img"
                />
                <div style={{ fontWeight: "bold" }}>{user.firstName} {user.secondName} {user.thirdName}</div>
                <div>{user.jobTitle}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>Участие в проектах: </div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
