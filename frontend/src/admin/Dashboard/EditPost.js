import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader  from "../../Loader";

import {
  getPosts,
  postUpdate,
} from "../../redux/actionCreators/postsActionCreator";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);



  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentPost = posts.find((post) => post.postId === id && post);

  useEffect(() => {
    if (loading) {
      dispatch(getPosts());
    }
    if (currentPost) {
      setTitle(currentPost.post.title);
      setPrice(currentPost.post.price);
      setCategory(currentPost.post.category);
      setDescription(currentPost.post.description);
    }
  }, [dispatch, currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price || !title || !category || !description) {
      return toast.warning("Please fill in all fields!");
    }

    if (description.length < 50) {
      return toast.info("Description should be of atleast 100");
    }
  
    // if (title.trim().split(" ").length < 2) {
    //   return toast.info("Title should be of atleast 2 words");
    // }

    const data = { title, description, category, price };
    
    dispatch(postUpdate(currentPost.postId, data, setLoading));
    
  };
  const rules = {
    pattern : '^0-9',
    message : 'Error'
  }
  return (
    <div className="container">
      <div className="row">
      
        <div className="col-md-12 py-5">
          <h1 className="display-2 text-center">Edit Post</h1>
        </div>
       
        {currentPost ? (
         
          <div className="col-md-6 mx-auto">
             {console.log('loading', loading)}
             {loading ? (
            <Loader />
          )
          //  : progress <= 100 && progress > 0 ? (
          //     <div className="mx-auto p-5   text-center ">
          //     <i className="fa fa-tick text-success mx-auto my-2"></i>
          //     <h1 className="text-center my-2">Post Uploaded successfully  </h1>
              
          //     <Link
          //       to={"/admin/posts"}
          //       className="my-2 mx-auto btn btn-primary"
          //     >
          //       See Posts 
          //     </Link>
          //   </div>
             
          //   ) 
          : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  pattern="^[0-9]+"
                />
              </div>
              <div className="form-group">
                <input
                  type="category"
                  placeholder="Categories "
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="input-group">
             
               
                <input
                
                  type="submit"
                  className="btn btn-dark w-50 mr-auto"
                  value="Update Post"
                
                /> 
                <button
               
                  type="button"
                  className="btn btn-danger w-40"
                  onClick={() => history.push("/admin/posts")}
                >
                  Go Back
                </button>
              </div>
              
            </form>
            )}
          </div> 
        
        ) : (
          <div className="col-md-12">
            {loading ? (
              <h1 className="text-center">Post Loading...</h1>
            ) : (
              <h1 className="text-center">
                Error 404 : Post With Id {id} Not Exists
              </h1>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default EditPost;
