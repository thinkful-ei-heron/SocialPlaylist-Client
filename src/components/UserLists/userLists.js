/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './userLists.css';



export class UserLists extends Component {
  state = {
    userList: []
  }
  static contextType = PlayListContext;

  renderUserList(){
    if(this.props.userList){
      return(
        <div className="display-user">
        <ul>
          {this.props.userList.map((item, idx) =>{
               return <li key={idx}>{item.name}</li>
          })}
        </ul>
      </div>
      )
    }
    return (
        <h2>welp</h2>
    );
  }

  render() {
    return (
     <>
        <section className = 'userlist-section'>
                <h2>My Lists</h2>
                {this.renderUserList()}
                <Button>
                  <Link to='/newList'>New Play List</Link>
                </Button>
                  {/* <Link to = {'/userlist'} >
                    <Button>
                        Click Me
                    </Button>
                </Link> */}
          </section>
    </>
    )
  }
}

export default UserLists;
