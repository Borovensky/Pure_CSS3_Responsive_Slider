import firebase from 'firebase';
import { values } from 'redux-form';

export const LOGIN_SUCCESS = 'login_success';


export const login = (values, callback) => {

    const { name, email, password } = values

    const user = firebase.auth().currentUser

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            localStorage.setItem('user', name)
            callback()
        })
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    localStorage.setItem('user', name)
                    callback()
                })
                .catch(e => console.log(e.message))
        })
    
    return {
        type: LOGIN_SUCCESS
    }
    
};