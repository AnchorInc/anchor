import firebase from 'firebase';

class User {
  getCurrentUser() {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/students/${currentUser.uid}`)
      .once('value')
      .then((response) => {
         return response.val();
      });
  }

  updateUser(displayName, email, phoneNumber, batchList) {
    const { currentUser } = firebase.auth();
    const db = firebase.database().ref(`/users/students/${currentUser.uid}`);
    db.set({
      displayName,
      email,
      phoneNumber,
      batchList,
    });
  }

  deleteUser() {
    const { currentUser } = firebase.auth();
    currentUser.delete()
      .then(() => console.log('delete successful'))
      .catch(error => console.log(error));
  }
}

export const getCurrentUser = User.prototype.getCurrentUser;
export const updateUser = User.prototype.updateUser;
export const deleteUser = User.prototype.deleteUser;
