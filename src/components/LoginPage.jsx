import React, { Component } from 'react';
import { Field, reduxForm, values } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginPage extends Component {

	renderField(field) {

		const { meta: { touched, error } } = field;

		const inputType = field.label === 'Password' ? 'password' : 'text';

		const InputStyle = `inputStyle text ${touched && error ? 'invalidInputStyle' : ''}`

		return (
			<div className='inputContainer'>
				<label className='labelStyle text'>{field.label}</label>
				<input 
					className={InputStyle}
					type={inputType}
					{...field.input}
				/>
				<div className='errorText text'>
					{touched ? error : ''}
				</div>
			</div>
		);

	}

	onSubmit(values) {

		this.props.login(values, () => {
			this.props.history.push('/home');
		});

	}

	render() {

		const { handleSubmit } = this.props;

		return (
			<div className='mainContainer'>
				<div className='innerContainer'>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='formContainer'>
						<Field 
							label='Name'
							name='name'
							component={this.renderField}
						/>
						<Field 
							label='Email'
							name='email'
							component={this.renderField}
						/>
						<Field 
							label='Password'
							name='password'
							component={this.renderField}
						/>
						<button type='submit' className='submutButton text'>Login</button>
					</form>
				</div>
			</div>
		);

	}

}

const validate = (values) => {

	const errors={};

	if(!values.name) {
		errors.name = 'Required'
	}

	if(!values.email) {
		errors.email = 'Required'
	} else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if(!values.password) {
		errors.password = 'Required'
	}

	if(values.password && values.password.length < 6) {
		errors.password = 'Password should be at least 6 characters!'
	}

	return errors;

}

export default reduxForm({
	validate,
	form: 'LoginForm'
})(connect(null, { login })(LoginPage));
