import firebase from 'firebase';

class User {
  getUser() {
    return firebase.auth().currentUser;
  }

  updateUser(displayName, email, phoneNumber, photoURL, batchList) {
    const userData = {
      displayName,
      email,
      phoneNumber,
      photoURL,
      batchList,
    };
    const user = firebase.auth().currentUser;
    const db = firebase.database().ref(`/users/students/${user.uid}`);
    db.update(userData);
  }

  deleteUser() {
    const user = firebase.auth().currentUser;
    user.delete()
    .then(() => console.log('delete successful'))
    .catch(error => console.log(error));
  }
}

export const getUser = User.prototype.getUser;
export const updateUser = User.prototype.updateUser;
export const deleteUser = User.prototype.deleteUser;
