import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


export default function MultilineTextFields() {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const addUser = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/client/users/add`, {
            first_name: firstName,
            last_name: lastName,
            role: role,
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response.data)
                alert(response.data.message)

            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="filled-required"
                    label="First Name"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => { setFirstName(e.target.value) }}
                />
                <TextField
                    required
                    id="filled-required"
                    label="Last Name"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => { setLastName(e.target.value) }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="filled-required"
                    label="Email"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <TextField
                    required
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <TextField
                    required
                    id="filled-required"
                    label="Role"
                    variant="filled"
                    onChange={(e) => { setRole(e.target.value.toLowerCase) }}
                />
            </div>
            <Button
                variant="contained"
                color='success'
                onClick={addUser}
            >Add User
            </Button>

        </Box>
    );
}


