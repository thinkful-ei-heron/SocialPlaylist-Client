import React, {Component} from 'react';
import {Input, Required, Label} from '../Form/Form';
import Button from '../Button/Button';
import SpotsApiService from '../../services/spots-api-service';
import PlayListContext from '../../contexts/PlayListContext';

class NewSpotForm extends Component {
  static contextType = PlayListContext;

  static defaultProps = {
    onSpotCreation: () => {},
  };
  stateAbr = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  state = {
    error: null,
    name: '',
    tags: '',
    address: '',
    city: '',
    state: '',
  };

  firstInput = React.createRef();
  renderOptions = () => {
    return this.stateAbr.map(state => {
      return (
        <option key={state} value={state} onChange={this.handleChange}>
          {state}
        </option>
      );
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const {name, tags, address, city, state} = ev.target;
    if (state.value === '') {
      return this.setState({error: 'Please select a state.'});
    }
    console.log('posting' + name.value);

    //Adds a spot to a list

    //need to post as well the lists_id
    SpotsApiService.postSpots({
      name: name.value,
      tags: tags.value,
      address: address.value,
      city: city.value
        .split(' ')
        .join('_')
        .trim(),
      state: state.value,
      /*ADDING THIS TO STOP CRASH ON RELOAD THIS IS JANKY AND SHOULD BE FIXED
       * list_id is comming from the Link button using location params
      * -Daniel */
      list_id: this.props.location.props ? this.props.location.props.list_id : ''
    })
      .then(spot => {
        this.context.setSpotId(spot.id)
        this.context.setSpots(spot)

        name.value = '';
        tags.value = '';
        address.value = '';
        city.value = '';
        state.value = '';
        this.props.onSpotCreation();
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };

  handleChange = ev => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    // console.log(
    //   'city value' +
    //     target.value
    //       .split(' ')
    //       .join('_')
    //       .trim(),
    // );
    this.setState({
      [name]: value,
    });
    // console.log('this', this.state);
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {

    const {error} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="newSpotForm">
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Label htmlFor="newSpot-name-input">
            Name
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="newSpot-name-input"
            name="name"
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="newSpot-tags-input">
            Tags
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="newSpot-tags-input"
            name="tags"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="#datenight #hotnewspots"
            required
          />
        </div>
        <div>
          <Label htmlFor="newSpot-address-input">
            Address
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="newSpot-address-input"
            name="address"
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="newSpot-city-input">
            city
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="newSpot-city-input"
            name="city"
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="registration-state-input">
            State
            <Required />
          </Label>
          <select className="state" name="state" onChange={this.handleChange}>
            <option key="none" defaultValue={this.state.value}></option>
            {this.renderOptions()}
          </select>
        </div>
        <footer className="signupBtnLink">
          <Button type="submit">Submit</Button> <br />{' '}
        </footer>
      </form>
    );
  }
}

export default NewSpotForm;
