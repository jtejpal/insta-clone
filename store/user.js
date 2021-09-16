import firebase from "firebase";

const GET_USER = "GET_USER";
const CLEAR_USER = "CLEAR_USER"

const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  }
}

export const getUserThunk = () => {
  return async (dispatch) => {
    try {
      const response = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      if (response.exists) {
        dispatch(getUser(response.data()));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CLEAR_USER:
      return {}
    default:
      return state;
  }
};
