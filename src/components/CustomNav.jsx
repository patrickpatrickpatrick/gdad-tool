import { Link, useLocation } from "react-router-dom";
import { TopNav } from 'govuk-react'

// work around !!
const NavLink = ({ path, name, match }) => <div className={
  `govuk-header__navigation-item ${location.pathname.match(match) ? "govuk-header__navigation-item--active" : ""}`
}>
   <Link
    className={`govuk-header__link`}
    to={path}
  >
    {name}
  </Link>
</div>

const CustomNav = () => {
  const location = useLocation();

  return (
    <TopNav
      company={<span>Operational Data & Tools Team</span>}
      serviceTitle={<TopNav.NavLink href="#">Government Data Digital Skills Return</TopNav.NavLink>}
    >
      <NavLink path="/submit-specialism" match="submit" name="Your Submission" />
      <NavLink path="/validate" match="validate" name="Validate Your Line Report Submissions" />
      <NavLink path="/success" match="success" name="test success" />
    </TopNav>
  )
} 

export default CustomNav;