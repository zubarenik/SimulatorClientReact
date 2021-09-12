// ** Store & Actions
import { useDispatch } from 'react-redux'
// import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { LogOut } from 'react-feather'
import { AuthAction } from '../../../../redux/actions'

const UserDropdown = () => {
  // ** Store Vars
  const logout = (e) => {
    e.preventDefault()
    AuthAction.logout()

  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <LogOut color='red' onClick={logout}  />
    </UncontrolledDropdown>
  )
}

export default UserDropdown
