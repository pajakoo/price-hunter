import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
//cmd+K+cmd+0 folding functions ( unfold  cmd+K +cmd+J )
// Components
import Client from './Client';
import Admin from './Admin';
import UserManagement from './UserManagement';
import { useAuth } from '../AuthProvider'
// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (event) => {
//   // Prevent the default prompt
//   event.preventDefault();
//   // Store the event for later use
//   deferredPrompt = event;
//   // Optionally show your own install button
//   showInstallButton();
// });

// function showInstallButton() {
//   const installButton = document.getElementById('installButton');
//   installButton.style.display = 'block';
//   installButton.addEventListener('click', () => {
//     // Trigger the installation prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the install prompt');
//       } else {
//         console.log('User dismissed the install prompt');
//       }
//       // Clear the deferredPrompt variable
//       deferredPrompt = null;
//     });
//   });
// }

// if (window.matchMedia('(display-mode: standalone)').matches) {
//   // The app is already installed
//   document.getElementById('installButton').style.display = 'none';
// }



function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [url, setUrl] = useState('https://super-polo-shirt-tick.cyclic.app');//useState('http://localhost:3333');//
  const { isAuthenticated, user, login, logout } = useAuth();
 
  async function fetchUserInfoFromServer(response) {
    var user = jwt_decode(response.credential);

    try {
      const r = await fetch(`${url}/api/userInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });

      const userInfo = await r.json();
      // console.log(userInfo);
      setCurrentUser(userInfo);

    } catch (error) {
      console.error('Грешка при извличане на информация за потребителя:', error.message);
      throw error;
    }
  }

  // useEffect(() => {
  //   // Fetch user data from the server
  //     axios.get(`${url}/user`).then((response) => {
  //       setCurrentUser(response.data);
  //     });

  // }, []);


  useEffect(() => {
    /* global google */
    // google.accounts.id.initialize({
    //   client_id: '698649535640-7j0jm7jlscolg3gfdr7dkn0qs248jeep.apps.googleusercontent.com',
    //   callback: fetchUserInfoFromServer
    // });

    // google.accounts.id.renderButton(
    //   document.getElementById("signInDiv"),
    //   { theme: "outline", size: "large" }
    // );

  }, []);


  useEffect(() => {
    console.log('gg',user, isAuthenticated);
  })

  const handleSignOut = () => {
    setCurrentUser(null);
    // google.accounts.id.renderButton(
    //   document.getElementById("signInDiv2"),
    //   { theme: "outline", size: "large" }
    // );
  };

  const checkUserRights = (roles) => {
    // Check if the user has the 'admin' ro
    //console.log('right', currentUser.roles);
    //return currentUser && currentUser.roles.includes(roles);
    return true;
  };


  const Home = () => {
    return (
      <div>
        <div className="home" onClick={() => window.open("http://localhost:3333/auth/google", "_self")} >
          pajak + ${currentUser.displayName || ''}
        </div>
        <div className="home" onClick={() => window.open("http://localhost:3333/auth/logout", "_self")} >
          logout
        </div>

      </div>


    )
  }


  const Login = () => {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={login} >Login with Google</button>
      </div>
    );
  };

  const Logout = () => {
    const handleLogout = async () => {
      try {
        await fetch(`${url}/auth/logout`, { method: 'GET' });
        window.location.href = '/';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    return (
      <div>
        <button className="btn btn-link nav-link" onClick={logout}>
          <i className="fa fa-sign-out"></i> Sign Out
        </button>
      </div>
    );
  };


  const PrivateRoutes = () => {
    return (
      isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
  }



  return (
    <>
      <Router>
        {/* <button id="installButton">Install App</button> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">
                  Client
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
              {checkUserRights('65660572e8d841f79b8fe614') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Logout />
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route element={<Client />} path="/" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Admin />} path="/admin" />
            <Route element={<UserManagement />} path="/users" />
          </Route>
          {isAuthenticated ? '' : <Route element={<Login />} path="/login" /> }
        </Routes>
      </Router>

    </>
  );
}

export default App;









// const PrivateRoutes = ({ component: Component, isAuthenticated, ...rest }) => {
//   console.log('pajak:',isAuthenticated);
//   return isAuthenticated ? <><Component {...rest} /> </>: <><Navigate to="/login" /></>;
// };