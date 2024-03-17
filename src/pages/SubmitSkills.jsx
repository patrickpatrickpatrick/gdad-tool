import { 
  SkillsTable,
  SkillsForm,
} from '../components';

const SubmitSkills = props => props.validated ? <SkillsTable
  {
    ...props
  }
/> : <SkillsForm
  {
    ...props
  }
/>

export default SubmitSkills;