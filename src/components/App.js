import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
//cmd+K+cmd+0 folding functions ( unfold  cmd+K +cmd+J )
// Components
import Client from './Client';
import Admin from './Admin';
import UserManagement from './UserManagement';


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

  const [currentUser, setCurrentUser] = useState(null);
  const [url, setUrl] = useState('https://super-polo-shirt-tick.cyclic.app');// useState('http://localhost:3333');//

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
      console.log(userInfo);
      setCurrentUser(userInfo);

    } catch (error) {
      console.error('Грешка при извличане на информация за потребителя:', error.message);
      throw error;
    }
  }

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


  const handleSignOut = () => {
  //   setCurrentUser(null);
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv2"),
  //     { theme: "outline", size: "large" }
  //   );

  };

  const checkUserRights = (roles) => {
    // Check if the user has the 'admin' ro
    // console.log('right', currentUser.roles);
    // return currentUser && currentUser.roles.includes(roles);
      return true;
  };


  return (
    <>
  
    
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Client
                    </Link>
                  </li>
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
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleSignOut}
                    >
                      <i className="fa fa-sign-out"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<Client />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/users" element={<UserManagement />} />
            </Routes>
          </Router>
      ) 
    </>
  );
}

export default App;
