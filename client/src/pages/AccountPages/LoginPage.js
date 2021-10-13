// see SignupForm.js for comments
import React, { useState } from 'react';
import {Container, Input, Button, Form, Label} from 'semantic-ui-react'

import { validateEmail } from '../../utils/validate';
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularLogin';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutation';

const LoginPage = () => {

  //login page state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPassWordAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser]= useMutation(LOGIN_USER);

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
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {...userFormData}
      });

      Auth.login(data.login.token);
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
