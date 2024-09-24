import React from 'react';
import Logout from '../Logout'

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header style={{ backgroundColor: 'lightblue', padding: '20px 60px', borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px"}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: '0', fontSize: '24px', color: '#343a40' }}>HR Management Software</h1>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
