import { Button, TextField, Box, CardContent, Typography, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Paper } from '@mui/material'

import React, { useState } from 'react'
import Center from './Center'
import useForm from '../hooks/useForm';
import { ENDPOINTS, createAPIEndpoint } from '.';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const getFreshModel = () => ({
     email: '',
     password: ''
})

export default function Login() {
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

     const login = e => {
          e.preventDefault();
          if (validate()) {
               createAPIEndpoint(ENDPOINTS.users)
                    .login(values)
                    .then(res => {
                         if (res.data.message === "Login successful") {
                              setContext({ id: res.data.username });
                              navigate('/dashboard');
                         }

                    })
          }
     }


     const validate = () => {
          let temp = {}
          temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
          temp.password = values.password != "" ? "" : "This field is required."
          setErrors(temp)
          return Object.values(temp).every(x => x == "")
     }

     return (
          <Center>
               <Paper square={false} elevation={3} sx={{ width: 400 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                         <Typography variant='h3' xs={{ my: 3 }}>Login</Typography>
                         <Box sx={
                              {
                                   '&  .MuiTextField-root': {
                                        margin: 2,
                                        width: '90%'
                                   }
                              }
                         }>
                              <form noValidate autoComplete='off' onSubmit={login}>
                                   <TextField
                                        label='Email'
                                        name='email'
                                        required
                                        value={values.email}
                                        onChange={handleInputChange}
                                        variant='outlined'
                                        error={errors.email}
                                   />
                                   <FormControl sx={{ width: '90%', margin: 2 }} variant="outlined">
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

                                   <Button
                                        type='submit'
                                        variant='contained'
                                        size='large'
                                        sx={{ width: '90%', margin: 1 }}
                                   >
                                        Login
                                   </Button>
                                   <Link
                                        href="/signup"
                                        variant="body2"
                                        sx={{ margin: 1 }}
                                   >
                                        {"Don't have an account? Sign Up"}
                                   </Link>
                              </form>
                         </Box>
                    </CardContent>

               </Paper>
          </Center>

     )
}
