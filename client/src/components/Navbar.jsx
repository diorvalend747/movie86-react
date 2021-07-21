import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { BsCollectionPlay, BsFilm, BsHouseDoorFill } from 'react-icons/bs';
import { GiSelfLove } from 'react-icons/gi';

const Navbar = () => {
  const { pathname } = useLocation()

  const styles = {
    activeLink : {
      backgroundColor: "#2d3c45",
      color: '#c0392b',
      borderRight: 'solid 6px #c0392b',
    },
    sideBar: {
      padding: '24px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '29px',
    }
  }

  return (
    <>
    <ProSidebar>
      <SidebarHeader>
        <div style={styles.sideBar}>
          <b style={{fontSize: '38px', color: 'white'}}>CINEMA 86</b>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<BsHouseDoorFill style={{backgroundColor: 'transparent'}}/>} style={pathname ==='/' ? styles.activeLink : null}>
             <NavLink className="text-white" to='/'  style={{backgroundColor: 'transparent'}}>
               Home
              </NavLink>
          </MenuItem>
          <MenuItem icon={<BsFilm/>} style={pathname ==='/movies' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/movies' style={{backgroundColor: 'transparent'}}>
              Movie
            </NavLink>
          </MenuItem>
          <MenuItem icon={<BsCollectionPlay/>} style={pathname ==='/tvSeries' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/tvSeries' style={{backgroundColor: 'transparent'}}>
              TV Series
            </NavLink>
          </MenuItem>
          <MenuItem icon={<GiSelfLove/>} style={pathname ==='/favorites' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/favorites' style={{backgroundColor: 'transparent'}}>
              Favorites
            </NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
    </>
  )
}

export default Navbar;