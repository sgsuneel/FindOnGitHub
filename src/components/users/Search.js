import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert:  PropTypes.func.isRequired
  };

  // By making onSubmit an arrow function, we are iherently preventing
  // binding this method in the form below. If we hadn't created an arrow function
  // then that it fine too. Then, we should write like this in the below form
  // <form onSubmit={this.onSubmit.bind(this)} --- both are fine
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      // console.log(this.state.text);
      this.props.searchUsers(this.state.text);
      // Let's centralize everything in App. So, lets send these details up to App.js
      // through searchUsers props.
      this.setState({ text: "" });
    }
  };

  // text change event is fired in the search bar
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  // we do not need curly braces for single line code

  // EXPLANATION
  // In the above code, we could place text: e.target.value
  // but, what if we have a form that has more text input fields
  // like email, phone number, address and so on, then it's not a good practise
  // to create so many onChange methods to track the values entered in those fields
  // so we are using [e.target.name] rather than just 'text: 'because

  render() {
    // destructuring
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            placeholder="Search Users..."
            name="text"
            value={this.state.value}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
