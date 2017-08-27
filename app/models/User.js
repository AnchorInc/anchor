import firebase from 'firebase';

class User {
  getUser() {
    const user = firebase.auth().currentUser;
    return firebase.database().ref(`/users/students/${user.uid}`)
      .once('value')
      .then((response) => {
        return response.val();
      });
  }

  updateUser(displayName, email, phoneNumber, batchList) {
    const user = firebase.auth().currentUser;
    const db = firebase.database().ref(`/users/students/${user.uid}`);
    db.update({
      displayName,
      email,
      phoneNumber,
      batchList,
    });
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
