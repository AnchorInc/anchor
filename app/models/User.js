import firebase from 'firebase';

class User {
  constructor() {
    this.user = firebase.auth().currentUser;
  }

  getUser() {
    return firebase.database().ref(`/users/students/${this.user.uid}`)
      .once('value')
      .then((response) => {
        return response.val();
      });
  }

  updateUser(displayName, email, phoneNumber, batchList) {
    const db = firebase.database().ref(`/users/students/${this.user.uid}`);
    db.update({
      displayName,
      email,
      phoneNumber,
      batchList,
    });
  }

  deleteUser() {
    this.user.delete()
      .then(() => console.log('delete successful'))
      .catch(error => console.log(error));
  }
}

export const getUser = User.prototype.getUser;
export const updateUser = User.prototype.updateUser;
export const deleteUser = User.prototype.deleteUser;
