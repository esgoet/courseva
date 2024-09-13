import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";

type PasswordFieldProps = {
    password: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

export default function PasswordField({password, handleChange}: Readonly<PasswordFieldProps>) {
    const [showPassword, setShowPassword] = useState<boolean>();
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="password" required>Password</InputLabel>
            <OutlinedInput
                label="Password"
                name={"password"}
                value={password}
                onChange={handleChange}
                required
                aria-required
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};