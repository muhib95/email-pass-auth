import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import app from '../../firebase.init';


const auth=getAuth(app);
const Login = () => {
  const [success,setSuccess]=useState(false);
  const [email,setEmail]=useState('');
  const handleForm=(event)=>{
    event.preventDefault();
    const form=event.target;
    const email=form.email.value;
    const pass=form.password.value;
    signInWithEmailAndPassword(auth,email,pass)
   
    .then((result) => {
      // Signed in 
      const user = result.user;
      setSuccess(true);
      console.log(user);
      // ...
    })
    .catch((error) => {
      console.error('error',error);
    });
  
    
  }
  const getEmail=(event)=>{
const email=event.target.value;
setEmail(email);
  }
  const handleResetPass=()=>{
    if(!email){
      alert('please write email first');
      return;

    }
    sendPasswordResetEmail(auth,email)
    .then(() => {
      alert('password reset email send please check');
    })
    .catch((error) => {
console.error(error);
      // ..
    });
  }
  return (
    <div className='w-50 mx-auto'>
     <h2 className='text-succes'>Log in</h2>
<form onSubmit={handleForm}>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Your Email</label>
  <input onBlur={getEmail} type="email" className="form-control" id="formGroupExampleInput" placeholder="Your email" name='email' required/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Your Password</label>
  <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Your password" name='password' required/>
</div>
<button className="btn btn-primary" type="submit">Log in</button>
</form>
<p><small>Please new to this website <Link to='/register'>Register</Link> </small></p>
{
  success && <p>Login success</p>
}
<p><small>Forget pass <button onClick={handleResetPass} type="button" className="btn btn-link">Reset</button></small></p>
     </div>

    
  );
};

export default Login;