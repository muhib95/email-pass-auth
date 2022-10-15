import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase.init';
import { Link } from 'react-router-dom';

const auth=getAuth(app);
const RegisterReactBoatstrap = () => {
  const [password,setPassword]=useState('');
  const [success,setSuccess]=useState(false);
  const handleRegister=(event)=>{
    event.preventDefault();
    setSuccess(false);
    const form=event.target;
    const name=form.name.value;
   const email=form.email.value;
    const password=form.password.value;
    if(!/(?=.*?[A-Z])(?=.*?[a-z])/.test(password)){
      setPassword('provide one capital latter and one small latter');
      return;
    }
     if(!/(?=.*[!@#$%^&*])/.test(password)){
      setPassword('please enter spacial');
      return ;

    }
    if(password.length<6){
      setPassword('pls provide 6 correcter')
      return;
    }
   
    setPassword('');
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=>{
      const user=result.user;
      console.log(user);
      setSuccess(true);
      form.reset();
      varifiedEmail();
      setName(name);
    })
    .catch((error)=>{
console.error('error',error);
setPassword(error.message);

    })
    

  }
  const varifiedEmail=()=>{
sendEmailVerification(auth.currentUser)
.then(() => {
 alert('Please check your email');
});
  }
  const setName=(name)=>{
    updateProfile(auth.currentUser,{
      displayName:name,
    })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.error(error);
    });

  }
  return (
    <div className='w-50 mx-auto'>
      <h2 className='text-primary'>Please Register!!!</h2>
       <Form onSubmit={handleRegister}>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter name" required/>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" required/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" required/>
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p>{password}</p>
      {
        success && <p>Successfull</p>
      }
    </Form>
    <p><small>Already an account go to<Link to='/login'>Login</Link> </small></p>
    </div>
  );
};

export default RegisterReactBoatstrap;