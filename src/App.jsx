import './App.css';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalContext from './shared/contexts/GlobalContext';
import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'typescript-cookie'
import { GetOneUser } from './shared/apis/authApi';
function App() {

  const [token, setToken] = useState(getCookie("token") || false)
  const [isAdmin, setIsAdmin] = useState(getCookie("isAdmin") || false)
  const [userId, setUserId] = useState(getCookie("userId") || false)


  const hendleSetToken = (value) => {
    setToken(value);
    setCookie('token', value);
  };
  const hendleSetAdmin = (value) => {
    setIsAdmin(value);
    setCookie('isAdmin', value);
  };
  const hendleUserId = (value) => {
    setUserId(value);
    setCookie('userId', value);
  };

  const [user, setUser] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await GetOneUser();
      if (data.status == 400 && data.message == "Not authention") {
        setToken(false)
      } else {
        setUser(data.user);

      }
    }
    fetchUser()
  }, []);

  if (user?.blocked == false || user?.blocked == "false" || user?.blocked == undefined) {
    return (
      <GlobalContext.Provider value={{ token, setToken: hendleSetToken, isAdmin, setIsAdmin: hendleSetAdmin, userId, setUserId: hendleUserId }}>
        {token && token != "false" ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </GlobalContext.Provider>
    )
  } else {
    return (

      <h1>Your account Blockend</h1>
    )
  }



}

export default App;
