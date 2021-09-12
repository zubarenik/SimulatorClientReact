import { Nav, NavItem, NavLink } from 'reactstrap'

const Tabs = ({sections, onChange, active, className}) => {
    return (
      <>
        <Nav className={className} tabs>
          {sections.map((el, index) => {
            return (
              <NavItem key={index}>
                <NavLink
                  id={index}
                  active={active === el.val}
                  onClick={() => {
                    onChange(el.val)
                }}
                >
                  {el.text}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </>
    );
}

export default Tabs