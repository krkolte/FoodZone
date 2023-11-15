import auth from '@react-native-firebase/auth'
// import { updateUser } from '../../../users'

export const registerWithEmail = (userDetails) => {
  const {
    email,
    password,
  } = userDetails
  return new Promise(function (resolve, _reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async response => {
        resolve({ user: userDetails })
      })
      .catch(error => {
        resolve({ error: 'Something Went Wrong!' })
      })
  })
}

export const loginWithEmailAndPassword = async (email, password) => {
  return new Promise(function (resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid

        const userData = {
          email,
          id: uid,
        }
      //   usersRef
      //     .doc(uid)
      //     .get()
      //     .then(function (firestoreDocument) {
      //       if (!firestoreDocument.exists) {
      //         resolve({ errorCode: ErrorCode.noUser })
      //         return
      //       }
      //       const user = firestoreDocument.data()
      //       const newUserData = {
      //         ...userData,
      //         ...user,
      //       }
      //       resolve({ user: newUserData })
      //     })
      //     .catch(function (_error) {
      //       console.log('_error:', _error)
      //       resolve({ error: ErrorCode.serverError })
      //     })
      })
      .catch(error => {
        resolve({ error: 'Something Went Wrong!' })
      })
  })
}