import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

class HomePage extends Component {

	state = {
		name: ''
	}

	componentWillMount() {

		this.setState({
			name: localStorage.getItem('user')
		})

	}

	logOut() {
		firebase.auth().signOut()
			.then(this.props.history.push('/'))
			localStorage.setItem('user', '')
	}

	render() {

		return (
			<div className='homePageContainer'>

				<header>
					<h2 className='text'>{this.state.name}, welcome to our site!</h2>
				</header>

				<section className='slider'>
					<input type='radio' name='slide' id='slide1' defaultChecked/>						
					<input type='radio' name='slide' id='slide2'/>
					<input type='radio' name='slide' id='slide3'/>
					<input type='radio' name='slide' id='slide4'/>
					<input type='radio' name='slide' id='slide5'/>
					<div className='imagesContainer'>
						<figure>
							<div id='img1'></div>
						</figure>
						<figure>
							<div id='img2'></div>
						</figure>
						<figure>
							<div id='img3'></div>
						</figure>
						<figure>
							<div id='img4'></div>
						</figure>
						<figure>
							<div id='img5'></div>
						</figure>
					</div>
					<div className='trigger'>
						<label htmlFor="slide1"></label>
						<label htmlFor="slide2"></label>
						<label htmlFor="slide3"></label>
						<label htmlFor="slide4"></label>
						<label htmlFor="slide5"></label>
					</div>
				</section>

				<footer>
					<button onClick={this.logOut.bind(this)}>Logout</button>
				</footer>

			</div>
		);

	}

}

export default HomePage;