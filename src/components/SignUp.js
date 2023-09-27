import { Button, TextField, Box, Card, CardContent, Typography, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Grid, Paper } from '@mui/material'
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import Center from './Center'
import useForm from '../hooks/useForm';
import { ENDPOINTS, createAPIEndpoint } from '.';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFreshModel = () => ({
     username: '',
     email: '',
     password: ''
})

export default function SignUp() {
     /* Needed to have the password icon work */
     const [showPassword, setShowPassword] = React.useState(false);

     const handleClickShowPassword = () => setShowPassword((show) => !show);

     const handleMouseDownPassword = (event) => {
          event.preventDefault();
     };

     const {
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange } = useForm(getFreshModel);

     const { context, setContext } = useStateContext();

     const navigate = useNavigate()

     const login = () => {
          navigate('/')
     }
     const signup = e => {
          e.preventDefault();
          if (validate())
               createAPIEndpoint(ENDPOINTS.users)
                    .signup(values)
                    .then((res) => {
                         console.log(res.data);
                         setContext({ id: res.data.username });
                         navigate('/dashboard')
                    })
                    .catch((err) => {
                         console.log(err);
                    });
     }

     const validate = () => {
          let temp = {}
          temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
          temp.username = values.username != "" ? "" : "This field is required."
          setErrors(temp)
          return Object.values(temp).every(x => x == "")
     }

     return (
          <Center>
               <Paper square={false} elevation={3} sx={{ width: 500, height: 400 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                         <Typography variant='h3' xs={{ my: 3 }}>Sign Up</Typography>
                         <Box sx={
                              {
                                   '&  .MuiTextField-root': {
                                        margin: 2,
                                        width: '90%'
                                   }
                              }
                         }>
                              <form noValidate autoComplete='off' onSubmit={signup}>
                                   <TextField
                                        label='Email'
                                        name='email'
                                        required
                                        value={values.email}
                                        onChange={handleInputChange}
                                        variant='outlined'
                                        error={errors.email}
                                   />
                                   <FormControl sx={{ width: '90%' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                             id="outlined-adornment-password"
                                             type={showPassword ? 'text' : 'password'}
                                             value={values.password}
                                             name='password'
                                             required
                                             onChange={handleInputChange}
                                             error={errors.password}
                                             endAdornment={
                                                  <InputAdornment position="end">
                                                       <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                       >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                       </IconButton>
                                                  </InputAdornment>
                                             }
                                             label="Password"
                                        />
                                   </FormControl>
                                   <TextField
                                        label='Username'
                                        name='username'
                                        required
                                        value={values.username}
                                        onChange={handleInputChange}
                                        variant='outlined'
                                        error={errors.username}
                                   />

                                   <Button
                                        type='submit'
                                        variant='contained'
                                        size='large'
                                        sx={{ width: '90%', margin: 1 }}
                                   >
                                        Sign Up
                                   </Button>
                                   <Link
                                        href="/login"
                                        variant="body2"
                                   >
                                        {"Already have an account? Login"}
                                   </Link>
                              </form>
                         </Box>
                    </CardContent>

               </Paper>
          </Center >

     )
}
