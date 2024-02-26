import { 
  Heading,
  Select,
  TextArea,
  SectionBreak,
  Paragraph,
  Button,
  Fieldset,
  Label,
  LabelText,
} from 'govuk-react';

import LimitTextArea from './../../components/LimitTextArea';
import { updateSavedSkills } from './../../util';

const SkillsForm = ({
  role,
  roleLevel,
  skills,
  savedSkills,
  setSavedSkills,
  setSection,
  saveSkills
}) => <>
  <Heading
    size="LARGE"
  >
  {
    `Skills for ${role}`
  }
  </Heading>
  <Paragraph>
    {
      `You have currently selected ${roleLevel} as your role level.`
    }
  </Paragraph>
  <a href="" onClick={() => setSection("specialismSpecificationForm")}>
    Reselect role level
  </a>
  <SectionBreak level="LARGE" visible />
  <form>
  {
    skills.map(({
      SkillDescription,
      SkillLevel,
      SkillLevelDescription,
      SkillNameFILTER
    }) => <Fieldset
      key={SkillLevel}
    >
      <>
        <h2>{SkillNameFILTER}</h2>
        <h3>Description</h3>
        <Paragraph>{SkillDescription}</Paragraph>
        <h3>Level</h3>
        <Paragraph>{SkillLevel}</Paragraph>
        <Paragraph>{`Your ${SkillNameFILTER} self assessment`}</Paragraph>
      </>

        <Label>
          <LabelText>
            Select a score
          </LabelText>
          <Select input={{
            value: savedSkills[SkillNameFILTER] &&
              savedSkills[SkillNameFILTER]["Score"] || "",
            onChange: (e) => setSavedSkills(
              updateSavedSkills(
                savedSkills,
                SkillNameFILTER,
                "Score",
                e.target.value,
              )
            )
          }}>
            <option value="">Select a score</option>
            <option value="0">0. None / Not applicable</option>
            <option value="1">1. Working towards this level</option>
            <option value="2">2. Working at this level</option>
            <option value="3">3. Working above this level</option>
          </Select>
        </Label>

        <>
          <LimitTextArea
            label={"Example(s) that support this"}
            limit={3000}
            onChange={(e) => setSavedSkills({
              ...savedSkills,
              [SkillNameFILTER]: {
                ...savedSkills[SkillNameFILTER],
                ["Evidence"]: e.target.value,
              }
            })}
            value={
              savedSkills[SkillNameFILTER] &&
                savedSkills[SkillNameFILTER]["Evidence"] || ""
            }
          />
        </>

        <>
          <LimitTextArea
            label={"Comments"}
            limit={3000}
            onChange={(e) => setSavedSkills({
              ...savedSkills,
              [SkillNameFILTER]: {
                ...savedSkills[SkillNameFILTER],
                ["Comments"]: e.target.value,
              }
            })}
            value={
              savedSkills[SkillNameFILTER] &&
                savedSkills[SkillNameFILTER]["Comments"] || ""
            }
          />
        </>
    </Fieldset>)
  }
  <Button
    onClick={(e) => {
      saveSkills();
      console.log(savedSkills);
    }}
  >
    Save
  </Button>
  </form>
</>

export default SkillsForm;