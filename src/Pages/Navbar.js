import React from 'react';

const Nav = ({activeTab,selectTab}) => {
  const activeStyle={
    borderRadius:'5px',
    border:'2px solid #1a97f3',
    color:'#1a97f3',
  }
 
  return (
    <div>

<nav className="navbar mt-3 navbar-expand-lg navbar-light bg-transparent container">
        <ul className="navbar-nav mr-auto" >
        <li
            className="nav-item"
            style={activeTab === 'stationaryTable' ? activeStyle : {}}
          >
            <a
           
              className="nav-link"
              href="#stationaryTable"
              onClick={(e) => selectTab(e, 'stationaryTable')}
            >
              <span className={`fw-bold ${activeTab === 'stationaryTable' ? 'text-primary' : 'text-primary'}`}> Stationary</span>
            </a>
          </li>
          <li
            className="nav-item"
            style={activeTab === 'cosmeticsTable' ? activeStyle : {}}
          >
            <a
              className="nav-link"
              href="#cosmeticsTable"
              onClick={(e) => selectTab(e, 'cosmeticsTable')}
            >
              <span className={`fw-bold ${activeTab === 'cosmeticsTable' ? 'text-primary' : 'text-primary'}`}> Cosmetics</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
  )
}

export default Nav;
