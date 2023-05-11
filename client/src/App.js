import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Context} from "./index";
import {useContext, useEffect, useState} from "react";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {getToken, info} from "./api/userAPI";
import {PreLoader} from "./components/PreLoader";
import {Menu} from "./components/Menu";
import {observer} from "mobx-react-lite";
import {Cart} from "./components/Cart";
import {NotFound} from "./components/NotFound";
import {Team} from "./components/Team";
import "bootstrap-icons/font/bootstrap-icons.css";
import {History} from "./components/History";


const App = observer(() => {
        const {user} = useContext(Context)
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            setTimeout(() => {
                info().then(data => {
                    user.setUser(data.data);
                    user.setIsAuth(true);
                }).finally(() => setLoading(false))
            },);
        }, [])
        console.log(getToken())
        if (loading) {
            return <PreLoader/>
        } else
            return (
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            {!user.isAuth && <Route path={"*"} Component={Login}/>}
                            {!user.isAuth && <Route path={"/login"} Component={Login}/>}
                            {!user.isAuth && <Route path={"/register"} Component={Register}/>}
                            {user.isAuth && <Route path="/" Component={Home}/>}
                            {user.isAuth && <Route path="/home" Component={Home}/>}
                            {user.isAuth && <Route path="/menu" Component={Menu}/>}
                            {user.isAuth && <Route path="/team" Component={Team}/>}
                            {user.isAuth && <Route path="/cart" Component={Cart}/>}
                            {user.isAuth && <Route path="/history" Component={History}/>}
                            {user.isAuth && <Route path={"*"} Component={NotFound}/>}
                        </Routes>
                    </BrowserRouter>
                </div>
            );
    }
)

export default App;
