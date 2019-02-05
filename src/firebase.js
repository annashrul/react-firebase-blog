import * as firebase from 'firebase'

const config = {
	apiKey            : "AIzaSyCHC2VaDZaofT7uf3tjW-ECcPPuk2w9AjQ",
	authDomain        : "reactblog-d97ac.firebaseapp.com",
	databaseURL       : "https://reactblog-d97ac.firebaseio.com",
	projectId         : "reactblog-d97ac",
	storageBucket     : "reactblog-d97ac.appspot.com",
	// storageBucket     : "",
	messagingSenderId : "921049325413"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/posts');