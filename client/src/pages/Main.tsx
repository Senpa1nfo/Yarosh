import {FC} from "react";
import {IUser} from "../models/IUser.ts";
import Link from "../components/Link.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import $api from "../http";

interface MainProps {
    isAuth: boolean
    user?: IUser
    onAuth: (state: boolean) => void
}

const Main:FC<MainProps> = ({isAuth, user, onAuth}) => {

    const onLogout = async () => {
        await $api.post('/logout')
        localStorage.removeItem('token')
        onAuth(false)
    }

    return (
        <>
            {!isAuth ? (
                <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <h1>You are not authorized</h1>
                    <Box width='100%' display='flex' justifyContent='center' gap='16px'>
                        <Link href='/signin' fontSize='24px'>Sign in</Link>
                        <Link href='/signup' fontSize='24px'>Sign up</Link>
                    </Box>
                </Box>
            ) : (
                <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <h1>Hi {user?.name}!</h1>
                    <Button onClick={onLogout}>Logout</Button>
                </Box>
            )}
        </>
    );
};

export default Main;