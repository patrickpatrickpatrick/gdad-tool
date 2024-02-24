import { Link } from "react-router-dom";
import { TopNav } from 'govuk-react'

const CustomNav = () => <TopNav
  company={<span>Operational Data & Tools Team</span>}
  serviceTitle={<TopNav.NavLink href="#">Government Data Digital Skills Return</TopNav.NavLink>}
>
  <Link to="/">
    Your Submission
  </Link>
  <Link to="validate">
    Validate Your Line Report Submissions
  </Link>
</TopNav>

export default CustomNav;