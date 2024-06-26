import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  BackLink,
} from 'govuk-react';
import { Link } from "react-router-dom";
import { LimitTextArea, ErrorSummary } from './index';

import { updateSavedSkills, createErrors } from './../util';

const SkillsForm = ({
  role,
  roleLevel,
  skills,
  savedSkills,
  setSavedSkills,
  saveSkills,
  onSubmit,
  errors,
}) => {
  const [localSavedSkills, setLocalSavedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSavedSkills(savedSkills)
  }, [savedSkills])

  return (<div className="govuk-grid-row">
      {
        !!Object.keys(errors).length && <ErrorSummary
          id="error-summary-skills"
          errors={createErrors(errors)}
        />
      }
      <div className="govuk-grid-column-full">
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
        <p>
          The skill descriptions listed below are a summary of each of the skills required for this role. Find your role in the <a href="https://ddat-capability-framework.service.gov.uk/">Digital and Data Framework</a> (for example Associate Delivery Manager) to identify the specific skill descriptions required for your level. Your evidence should be based on those descriptions.
        </p>

        <BackLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/submit-specialism")
          }}
        >
          Reselect role level
        </BackLink>

        <SectionBreak level="LARGE" visible />

        <form>
          {
            skills.map(({
              SkillDescription,
              SkillLevel,
              SkillLevelDescription,
              SkillNameFILTER
            }) => <Fieldset
              key={SkillNameFILTER.replace(/\s/g, '')}
            >
              <>
                <h2 id={SkillNameFILTER.replace(/\s/g, '')}>{SkillNameFILTER}</h2>
                <h3>Description</h3>
                <Paragraph>{SkillDescription}</Paragraph>
                <h3>Level</h3>
                <Paragraph>{SkillLevel}</Paragraph>
                <Paragraph>{`Your ${SkillNameFILTER} self assessment`}</Paragraph>
              </>

                <Select input={{
                    arialabelledby: 'select-score-label',
                    value: localSavedSkills[SkillNameFILTER] &&
                    localSavedSkills[SkillNameFILTER]["Score"] || "",
                     onChange: (e) => setLocalSavedSkills(
                      updateSavedSkills(
                        localSavedSkills,
                        SkillNameFILTER,
                        "Score",
                        e.target.value,
                      )
                    ),
                    className: "govuk-!-margin-bottom-3",
                    id: `${SkillNameFILTER.replace(/\s/g, '')}-Score`
                  }}
                  label={'Select a score'}
                  meta={{
                    touched: true,
                    error: errors[SkillNameFILTER] && errors[SkillNameFILTER]["Score"]
                  }}
                >
                  <option value="">Select a score</option>
                  <option value="0">0. None / Not applicable</option>
                  <option value="1">1. Working towards this level</option>
                  <option value="2">2. Working at this level</option>
                  <option value="3">3. Working above this level</option>
                </Select>

                <LimitTextArea
                  id={`${SkillNameFILTER.replace(/\s/g, '')}-Evidence`}
                  error={errors[SkillNameFILTER] && errors[SkillNameFILTER]["Evidence"]}
                  label={"Example(s) that support this"}
                  limit={5000}
                  onChange={(e) => setLocalSavedSkills({
                    ...localSavedSkills,
                    [SkillNameFILTER]: {
                      ...localSavedSkills[SkillNameFILTER],
                      ["Evidence"]: e.target.value,
                    }
                  })}
                  value={
                    localSavedSkills[SkillNameFILTER] &&
                      localSavedSkills[SkillNameFILTER]["Evidence"] || ""
                  }
                />
            </Fieldset>)
          }

          <Button
            onClick={(e) => {
              e.preventDefault();
              onSubmit({
                toValidate: false,
                localSavedSkills,
              });
            }}
            style={{
              marginRight: "15px"
            }}
          >
            Save entered skills
          </Button>

          <Button
            id="submit-for-validation-button"
            onClick={(e) => {
              e.preventDefault();
              onSubmit({
                toValidate: true,
                localSavedSkills,
              });
            }}
          >
            Submit for validation
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SkillsForm;
