// see SignupForm.js for comments
import React, { useState } from 'react';
import {Container, Input, Label, Button, Form } from 'semantic-ui-react'

import { validateEmail } from '../../utils/validate';
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularSignUp';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutation';

const LoginPage = () => {

  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  
  // set state for alert
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPassWordAlert] = useState(false);
  const [showUsernameAlert, setShowUsernameAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [createUser]=useMutation(ADD_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    if (name==='email') {
        if (validateEmail(value)===null){
            setShowEmailAlert(true);
        } else {
            setShowEmailAlert(false)
        }
    }

    if (name==='password'){
        if (value===''){
            setShowPassWordAlert(true);
        } else {
            setShowPassWordAlert(false);
        }
    }

    if (name==='username'){
        if (value===''){
            setShowUsernameAlert(true);
        } else {
            setShowUsernameAlert(false);
        }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: {...userFormData}
      });
      Auth.loginFromSignUp(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };


  return (
    <Container className='big-container'>
        <Container className='shadow-container'>

           <MenuTabular choice='login'></MenuTabular>
            <Form onSubmit={handleFormSubmit}>
                {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}

                <Form.Group widths='equal'>
                    
                <Form.Field
                    id='form-input-control-username'
                    control={Input}
                    label='Username'
                    name='username'
                    placeholder='Your username'
                    onChange={handleInputChange}
                    required
                    />
                    {showUsernameAlert ? (<Label basic color = 'red'>Please enter a valid username</Label>):(<></>)}

                    <Form.Field
                    id='form-input-control-email'
                    control={Input}
                    label='Email'
                    name='email'
                    placeholder='Your email'
                    onChange={handleInputChange}
                    required
                    />
                    {showEmailAlert ? (<Label basic color = 'red'>Please enter a valid email</Label>):(<></>)}
                    
                    <Form.Field
                    id="form-input-control-password"
                    control={Input}
                    name='password'
                    label='Password'
                    type='password'
                    placeholder='Your password'
                    onChange={handleInputChange}
                    required
                    ></Form.Field>
                    {showPasswordAlert ? (<Label basic color = 'red'>Please enter a valid password</Label>):(<></>)}  
                    
                    </Form.Group>
                <Button
                disabled={!(userFormData.email && userFormData.password)}
                type='submit'
                variant='success'>
                Submit
                </Button>
            </Form>
        </Container>
    </Container>
  );
};

export default LoginPage;
