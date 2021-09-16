import firebase from "firebase";

const GET_POSTS = "GET_POSTS";
const CLEAR_POSTS = "CLEAR_POSTS";

const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts,
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS,
  };
};

export const getPostsThunk = () => {
  return async (dispatch) => {
    try {
      let posts = [];
      const querySnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("posts")
        .orderBy("timestamp", "desc")
        .get();

      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        posts.push({ id, ...data });
      });

      dispatch(getPosts(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    case CLEAR_POSTS:
      return [];
    default:
      return state;
  }
};

export default postsReducer;
