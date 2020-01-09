import React, { Component } from "react";
import PlayListContext from "../../contexts/PlayListContext";
import ListApiService from "../../services/lists-api-service";
import UserApiService from "../../services/lists-api-service";
import UserLists from "../../components/UserLists/userLists";
import ListByTags from "../../components/ListByTags/ListByTags";

export class UserDashboardRoute extends Component {
  static contextType = PlayListContext;
  state = {
    error: null,
    playlist: {},
    userList: []
  };

  static contextType = PlayListContext;

  //get all lists for a specific user
  componentDidMount() {
    ListApiService.getUsersLists()
    .then(data => {
        this.setState({
           userList: data
        })
    })
    .catch(this.context.setError);
  }

  render() {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.words,
      userList: this.state.userList
    };
    return (
      <PlayListContext.Provider value={value}>
        <UserLists userList={this.state.userList}/>
        <ListByTags lists={this.state.lists} />
      </PlayListContext.Provider>
    );
  }
}

export default UserDashboardRoute;
