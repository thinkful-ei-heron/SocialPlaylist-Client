import React, { Component } from "react";
import "./LandingPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import exampleImg from '../Assets/iconBackground.png';
import Button from '../Button/Button';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  renderLoginForm() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div className="mobile-view" id="loginFormContainer">
          <a href="/login" className="nav-login">
            Log in
          </a>
          <a href="/register" className="nav-signup">
            Sign up
          </a>
        </div>
      );
    } else {
      return <LoginForm />;
    }
  }

  render() {
    return (
      <>
        <div className="examplesContainer">
          <div className="ex01">
        <img src={exampleImg} alt='example background'  className='img01'/>
          </div>
          <div className="ex02">
          <img src={exampleImg} alt='example background'  className='img02'/>
          </div>
        </div>
        <section className="descContainer">
          <p className="descBody">
            Visiting a new city and not sure what to do? Live List is where to go to get 
            in the know with the locals.  Find out what's going on in a city by connecting 
            with the people who know best.  Search 'Hot Lists' for the best options for food, 
            drinks, dancing, and more. Live List provides you with customizable lists from 
            users who have the inside track on whats going on in their cities. </p>
            
            <h2>Live like the locals with LIVE LIST!</h2>
            {/* Social Playlist solves the problem of not knowing what to do when
            you want to go out. Whether a night on the town with friends, date
            night with your love, or a day with the family! See what social
            events people enjoy in their areas. Follow users with your favorite
            playlists. Like a playlist of the city. Create your own playlist and
            share with your followers. */}
         
          <div>{this.renderLoginForm()}</div>
        </section>
      </>
    );
  }
}

export default LandingPage;
