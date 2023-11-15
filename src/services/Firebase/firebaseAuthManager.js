import * as authAPI from './firebaseAuthClient';

const loginWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, _reject) {
    authAPI.loginWithEmailAndPassword(email, password).then(response => {
      if (!response.error) {
        handleSuccessfulLogin({ ...response.user }, false).then(res => {
          // Login successful, push token stored, login credential persisted, so we log the user in.
          resolve({ user: res.user })
        })
      } else {
        resolve({ error: response.error })
      }
    })
  })
}

const createAccountWithEmailAndPassword = (userDetails) => {
  const accountCreationTask = userData => {
    return new Promise((resolve, _reject) => {
      authAPI
        .registerWithEmail(userData)
        .then(async response => {
          if (response.error) {
            resolve({ error: response.error })
          } else {
            resolve({
              user: {
                ...response.user,
                name: 'Kapil R Kolte',
                profilePictureURL: defaultProfilePhotoURL,
              },
            })
          }
        })
    })
  }

  return new Promise(function (resolve, _reject) {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    }
    accountCreationTask(userData).then(response => {
      if (response.error) {
        resolve({ error: response.error })
      } else {
        // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
        handleSuccessfulLogin(response.user, true).then(response => {
          resolve({
            ...response,
          })
        })
      }
    })
  })
}

const handleSuccessfulLogin = (user, accountCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  return new Promise(resolve => {
    resolve({ user: { ...user } })
  })
}

const authManager = {
  loginWithEmailAndPassword,
  createAccountWithEmailAndPassword,
}

export default authManager