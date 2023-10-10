import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import {useEffect, useState} from "react";
import $api from "./http";
import Main from "./pages/Main.tsx";
import {IUser} from "./models/IUser.ts";
import {AuthResponse} from "./models/AuthResponse.ts";

function App() {

    const [isAuth, setAuth] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()

    const refresh = async () => {
        const res = await $api.get<AuthResponse>('/refresh')
        if (res.status === 200) {
            setAuth(true)
            setUser(res.data.user)
        }
    }

    const handleChangeAuth = (state: boolean) => {
        setAuth(state)
    }

    const handleChangeUser = (user: IUser) => {
        setUser(user)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            refresh()
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Main isAuth={isAuth} user={user} onAuth={handleChangeAuth}/>}/>
                {!isAuth && <>
                    <Route path='/signin' element={<SignIn onAuth={handleChangeAuth} onUser={handleChangeUser}/>}/>
                    <Route path='/signup' element={<SignUp onAuth={handleChangeAuth} onUser={handleChangeUser}/>}/>
                </>}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default App
