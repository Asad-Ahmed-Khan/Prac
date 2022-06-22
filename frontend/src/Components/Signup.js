import React, { useState , useEffect} from 'react'
import {  useDispatch,  } from "react-redux";
import { auth, db } from '../Config/config'
import { Link } from 'react-router-dom'
import { getPosts } from "../redux/actionCreators/postsActionCreator"; 
import Loader from "../Loader"
export const Signup = (props) => {

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading , setLoading]= useState (false);
    const dispatch = useDispatch();
    useEffect(() =>{
        setLoading(true)
        setTimeout(() =>{
        setLoading(false)
        }, 2000 )
        dispatch(getPosts());
      }, [])

      
    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            { loading ? 
              <Loader />
         : loading.length !== 100 ?(
            <form autoComplete="off" className='form-group' onSubmit={signup}>
            
               <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
        
                </form>) : (
                    <h1 className="text-center">
                    Login successfully
                    
                  </h1>
                )}
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Already have an account? Login
                <Link to="Login"> Here</Link>
            </span> 
        </div>
    )
}
