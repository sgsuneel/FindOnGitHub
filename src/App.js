import React, { Fragment, Component } from "react";
import { Navbar } from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const response = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID
  //   }
  //                                       &client_secret=${
  //                                         process.env
  //                                           .REACT_APP_GITHUB_CLIENT_SECRET
  //                                       }`);

  //   // console.log(response.data)
  //   this.setState({ users: response.data, loading: false });
  // }

  // Search Github users --- we will use 'axios async await'  here
  searchUsers = async text => {
    // As soon as the Search button is clicked, the Spinner gif should activate
    // So, we need to set the loading to true
    this.setState({ loading: true });

    // console.log(text)
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
      `
    );
    // Store the received details into users
    this.setState({ users: response.data.items, loading: false });
  };

  // Get single users information from Github API to make individualized page for
  // More button below the Users' item
  getUser = async username => {
    this.setState({ loading: true });

    // console.log(text)
    const res = await axios.get(
      `https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
      `
    );
    // Store the received details into user
    this.setState({ user: res.data, loading: false });
    console.log(this.props.user);
  };

  // Get user repositories
  getUserRepos = async username => {
    this.setState({ loading: true });

    // console.log(text)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
      `
    );
    // Store the received details into user
    this.setState({ repos: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // set alert if user clicks search button without entering any text
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              {/* <Route render={props =>...}> is not required here because these(about 
                  and contact) are static pages and are not receiving any props.
              */}
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              {/* We can not create single User page route like above
                  because, we need to pass props to that user - from the getUser()
                  which is doing an API call to get details to fill in the props 
                  and the User page. So, we go the render way, that we did a little above
              */}
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// title={this.state.title}
// icon = {this.state.icon}
