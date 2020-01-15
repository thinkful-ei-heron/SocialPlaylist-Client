import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';
import ListApiService from '../../services/lists-api-service';
import UserLists from '../../components/UserLists/userLists';
import ListByTags from '../../components/ListByTags/ListByTags';
import loadingAnimation from '../../components/Assets/loadingAnimation.gif';
import ListsApiService from '../../services/lists-api-service';

export class UserDashboardRoute extends Component {
  static contextType = PlayListContext;
  state = {
    error: null,
    playlist: {},
    userList: [],
    lists: [],
    spots: [],
    loading: false,
    checkLength: 0
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleNewPlaylistCreation = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/dashboard';
    history.push(destination);
  };

  handleDeletePlaylist = (playId) => {
    // console.log('handle playlistdelete playId' , playId)
    ListsApiService.getSpotsById(playId)
      .then((data) => {
        // console.log('handle delete inside spot', data)
        //  console.log(data.spots.length)
        if (data.spots.length === 0) {
          // console.log('can be deleted')
          ListApiService.deleteLists(playId).then(() => {
            console.log(`Record '${playId}' deleted`);
            const newUserList = this.state.userList.filter(
              (userlist) => userlist.id !== playId
            );
            // console.log('newUserList', newUserList)
            this.setState({
              userList: newUserList,
              checkLength: data.spots.length
            });
          });
        } else {
          console.log('list cannot be deleted');
          return this.setState({ checkLength: data.spots.length });
        }
      })
      .catch(this.context.setError);
  };

  //get all lists for a specific user
  componentDidMount() {
    this.setState({
      loading: true
    });
    ListApiService.getUsersLists()
      .then((data) => {
        console.log('data from the server on userList call', data);
        this.setState({
          userList: data
        });
      })
      .catch(this.context.setError);

    ListApiService.getLists()
      .then((data) => {
        console.log('this data from getLists call', data);
        this.setState({
          lists: data
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1000);
      })
      .catch(this.context.setError);
  }

  renderWithLoading = () => {
    const value = {
      playlist: this.state.playlist,
      spots: this.state.spots,
      userList: this.state.userList,
      lists: this.state.lists,
      handleDeletePlaylist: this.handleDeletePlaylist,
      checkLength: this.state.checkLength
    };
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          <img
            src={loadingAnimation}
            alt="loading"
            className="loadingAnimation"></img>
          <h3 className="loadingText">Loading...</h3>
        </div>
      );
    } else {
      return (
        <div>
          <PlayListContext.Provider value={value}>
            <UserLists
              userList={this.state.userList}
              handleDeletePlaylist={this.handleDeletePlaylist}
              spots={this.state.spots}
              checkLength={this.state.checkLength}
            />
            <ListByTags lists={this.state.lists} />
          </PlayListContext.Provider>
        </div>
      );
    }
  };

  render() {
    console.log('check length', this.state.checkLength);
    return <div>{this.renderWithLoading()}</div>;
  }
}

export default UserDashboardRoute;
