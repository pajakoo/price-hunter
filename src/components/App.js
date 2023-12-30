import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

//cmd+K+cmd+0 folding functions ( unfold  cmd+K +cmd+J )
// Components
import Client from './Client';
import Admin from './Admin';
import UserManagement from './UserManagement';
import { useAuth } from '../AuthProvider'
let deferredPrompt;

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

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: row; /* Set default direction to row for large screens */

  .menu-toggle {
    display: none;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 18px;
    margin-right: 10px;
  }

  .navbar {
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  .navbar-nav {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-item {
    margin-right: 10px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ddd;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    .menu-toggle {
      display: block;
    }

    .navbar {
      display: ${props => (props.menuOpen ? 'block' : 'none')};
    }
  }
`;



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const checkUserRights = (roles) => {
    // Check if the user has the 'admin' ro
    //console.log('right', currentUser.roles);
    //return currentUser && currentUser.roles.includes(roles);
    return true;
  };
  const Login = () => {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={login} >Login with Google</button>
      </div>
    );
  };

  const Logout = () => {
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
      user ? <Outlet /> : <Navigate to="/login" />
    )
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Router>
        {/* <button id="installButton">Install App</button> */}

        <StyledMenu menuOpen={isOpen}>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰ Menu
      </button>
      <div className="navbar">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
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
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </StyledMenu>

        <Routes>
          <Route element={<Client />} path="/" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Admin />} path="/admin" />
            <Route element={<UserManagement />} path="/users" />
          </Route>
          {user ? <Route element={<Client />} path="/" /> : <Route element={<Login />} path="/login" />}
        </Routes>
      </Router>

    </>
  );
}

export default App; 





// import ReactDOM from 'react-dom/client';

// import React, { useState } from 'react';
// import { CSSTransition } from 'react-transition-group';

// const DashboardScreen = () => {
//   return <div>Dashboard</div>;
// };

// const ProfileScreen = () => {
//   return <div>Profile</div>;
// };

// const TransactionsScreen = () => {
//   return <div>Transactions</div>;
// };

// const TreeScreen = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMenuItemClick = (event) => {
//     event.preventDefault();

//     if (isOpen) {
//       setIsOpen(false);
//     }
//   };

// const nestedList = (treeItems) => {
//   return (
//     <ul>
//       {treeItems.map((item) => (
//         <li key={item.title}>
//           {Array.isArray(item.children) ? (
//             <TreeScreen key={item.title} children={item.children} />
//           ) : (
//             <>{item.title}</>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };
//   return (
//     <div className="tree-screen">
//       <button onClick={toggleMenu}>Menu</button>

//       {isOpen ? (
//         <CSSTransition
//           in={isOpen}
//           timeout={300}
//           classNames="menu"
//           mountOnEnter
//           unmountOnExit
//         >
//           <div className="menu-content">{nestedList(flattenedTree)}</div>
//         </CSSTransition>
//       ) : (
//         <div className="screen-content">{children}</div>
//       )}
//     </div>
//   );
// };

// const mainTree = [
//   {
//     title: 'Home',
//     children: [
//       { title: 'Dashboard', component: DashboardScreen },
//       { title: 'Profile', component: ProfileScreen },
//       { title: 'Transactions', component: TransactionsScreen },
//     ],
//   },
// ];

// const flattenedTree = mainTree.flat();

// ReactDOM.createRoot(document.querySelector('#root')).render(
//   <TreeScreen children={mainTree} />
// );
