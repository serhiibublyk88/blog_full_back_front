import { request } from "../utils/request";
import { setPostData } from "./set-post-data";

export const loadPostAsync = (postId) => (dispatch) => 
  request(`/posts/${postId}`).then((postData) => {
    if (postData.data) {
      
      dispatch(setPostData(postData.data));
    }
    return postData;
    
  });

// import { request } from "../utils/request";
// import { setPostData } from "./set-post-data";

// export const loadPostAsync = (postId) => (dispatch) => {
//   return request(`/posts/${postId}`)
//     .then((postData) => {
//       if (postData.data) {
//         dispatch(setPostData(postData.data));
//       } else {
//         throw new Error(postData.error || "Unexpected error");
//       }
//       return postData;
//     })
//     .catch((error) => {
//       console.error("Error loading post:", error);
//       return { error: error.message || "Failed to load post" };
//     });
// };
