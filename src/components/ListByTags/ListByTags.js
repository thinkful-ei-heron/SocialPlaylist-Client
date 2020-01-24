// is given access to ALL lists through props
// Filters the array of lists to show those with matching filters
import React, { Component } from 'react';
import PlayListContext from '../../contexts/PlayListContext';
import { Link } from 'react-router-dom';
import TextInput from '../Form/TextInput';
import './ListByTags.css';
import AutoComplete from '../AutoComplete/AutoComplete'


export class ListByTags extends Component {
  static contextType = PlayListContext;
  state = {
    lists: [],
    filter: '',
    filteredList: [],
    input: ''
  };

  handleFilter = (ev) => {
    ev.preventDefault();
    let filter = ev.target.value;
    let newList = [];
    let mulFilters = filter.split(' ');
    if (mulFilters.length === 1) {
      this.props.lists.forEach((x) => {
        let newTags = x.tags.split(' ');
        if (newTags.includes(filter)) {
          newList.push(x);
        }
      });
      filter = '';
    } else if (mulFilters.length > 1) {
      this.props.lists.forEach((x) => {
        let newTags = x.tags.split(' ');
        for (let i = 0; i < mulFilters.length; i++) {
          if (newTags.includes(mulFilters[i])) {
            newList.push(x);
          }
        }
        filter = '';
      });
    }
    this.setState({
      filteredList: [...newList],
    });
  };

  renderFilteredList = () => {
    if (this.state.filteredList.length === 0) {
      return this.props.lists.map((list) => {
          if(list.is_public){
        return (
          <div key={Math.random()} className="listItem filtered">
            <Link to={`/list/${list.id}`}>
              <h4 className="filteredListName">{list.name}</h4>
            </Link>
            <p className="filteredListTag">{list.tags}</p>
          </div>
        );}

      });
    } else if (this.state.filteredList.length > 0) {
      return this.state.filteredList.map((list) => {
        return (
          <div key={Math.random()} className="listItem filtered">
            <Link to={`/list/${list.id}`}>
              <h4 className="filteredListName">{list.name}</h4>
            </Link>
            <p className="filteredListTag">{list.tags}</p>
          </div>
        );
      });
    }
  };
  onChange = e => {
    const { tags, lists } = this.props;
    const userInput = e.target.value.toLowerCase();
    const filteredTags = [];
    let onlyTags = [];
    for(let i = 0; i < lists.length; i++){
      if(lists[i].tags.includes(userInput)){
        filteredTags.push(lists[i])
      }
      onlyTags.push(lists[i].tags);
    }

    this.setState({
      filteredList: [...filteredTags]
    });
  };

  render() {
    return (
<<<<<<< HEAD
      <div>
        <form onChange={this.handleFilter} id="filterForm">
          <h4 className="filterFormTitle">Browse All Lists</h4>
=======
      <section>
        <form onChange={this.onChange} id="filterForm">
          <h2 className="filterFormTitle">Browse All Lists</h2>
>>>>>>> 2dfc1f55ee4594570512ef4dad27aa17988f16db
          <div className="filterButtonContainer">
            <TextInput
              label="Hashtag"
              attr={{
                type: 'text',
                placeholder: '#saturday',
                name: 'filter',
                className: 'filterField'
              }}
            />
          </div>
        </form>
        <div className="filteredContainer">{this.renderFilteredList()}</div>
      </section>
    );
  }
}

export default ListByTags;
