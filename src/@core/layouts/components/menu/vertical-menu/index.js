// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'

// ** Vertical Menu Items Array
import navigation from '@src/navigation/vertical'
import navigationGroup from '@src/navigation/verticalGroups'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'

import {Input} from 'reactstrap'
import { useSelector } from 'react-redux'
import { useHistory, useParams, withRouter } from 'react-router-dom'

const Sidebar = props => {
  const history = useHistory();
  // ** Props
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin } = props
  const [nav, setNav] = useState(navigation)
  useEffect(() => {
    if(!!routerProps && !!routerProps.meta && !!routerProps.meta.menu)
    {
      if(routerProps.meta.menu=='groups')
      {  
        setNav(navigationGroup)
      }
      else
      {
        setNav(navigation)
      }
    }
    else
    {
      setNav(navigation)
    }
  }, [props])
  const {group_id} = useParams()
  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)
  const groups = useSelector(state => state.group).groups

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    if (menuCollapsed) {
      setMenuHover(true)
    }
  }
  const changeGroup = (e) => {
    history.push(`/groups/${e.target.value}/simulators`)
  }
  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  return (
    <Fragment>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu(props)
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              
              <ul className='navigation navigation-main'>
                <li className="nav-item">
                  <div className="d-flex align-items-center" style={{"margin": "0 15px", "padding": "10px 15px"}}>
                    {nav==navigationGroup &&
                  <Input type='select' name='select' id='select-basic' onChange={changeGroup}>
                    {
                      groups.map((group) => 
                        <option value={group.id} key={group.id} selected={group.id === group_id}>{group.name}</option>
                      )
                    }
                    
                  </Input>
                  }
                  </div>
                </li>
              
                <VerticalNavMenuItems
                  items={nav}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  groupOpen={groupOpen}
                  setGroupOpen={setGroupOpen}
                  routerProps={routerProps}
                  menuCollapsed={menuCollapsed}
                  menuHover={menuHover}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default withRouter(Sidebar)
