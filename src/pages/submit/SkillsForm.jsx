import { Heading, Select, TextArea } from 'govuk-react';

import LimitTextArea from './../../components/LimitTextArea';
import { updateSavedSkills } from './../../util';

const SkillsForm = ({
  role,
  roleLevel,
  skills,
  savedSkills,
  setSavedSkills,
}) => <>
  <Heading
    size="LARGE"
  >
  {
    `Skills for ${role}`
  }
  </Heading>
  <p>
    {
      `You have currently selected ${roleLevel} as your role level.`
    }
  </p>
  <hr />
  <form>
  {
    skills.map(({
      SkillDescription,
      SkillLevel,
      SkillLevelDescription,
      SkillNameFILTER
    }) => <>
      <>
        <h2>{SkillNameFILTER}</h2>
        <h3>Description</h3>
        <p>{SkillDescription}</p>
        <h3>Level</h3>
        <p>{SkillLevel}</p>
        <p>{`Your ${SkillNameFILTER} self assessment`}</p>
      </>

        <>
          <Select input={{
            value: savedSkills[SkillNameFILTER] &&
              savedSkills[SkillNameFILTER].score || "",
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
        </>

        <>
          <LimitTextArea
            label={"Example(s) that support this"}
            limit={3000}
            onChange={(e) => setSavedSkills({
              ...savedSkills,
              [SkillNameFILTER]: {
                ...savedSkills[SkillNameFILTER],
                examples: e.target.value,
              }
            })}
            value={
              savedSkills[SkillNameFILTER] &&
                savedSkills[SkillNameFILTER].examples || ""
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
                comments: e.target.value,
              }
            })}
            value={
              savedSkills[SkillNameFILTER] &&
                savedSkills[SkillNameFILTER].comments || ""
            }
          />
        </>
    </>)
  }
  <button
    onClick={(e) => {
      console.log(savedSkills)
    }}
  >
    SUBMIT
  </button>
  </form>
</>

export default SkillsForm;