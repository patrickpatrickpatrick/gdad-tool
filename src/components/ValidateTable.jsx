import { Table } from 'govuk-react';

const ValidateTable = ({
  JobFamily,
  Role,
  RoleLevel,
  Skills,
}) => <div>
  <Table>
    <Table.Row>
      <Table.CellHeader>
        Job Family
      </Table.CellHeader>
      <Table.Cell>
        { JobFamily }
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.CellHeader>
        Role
      </Table.CellHeader>
      <Table.Cell>
        { Role }
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.CellHeader>
        Role Level
      </Table.CellHeader>
      <Table.Cell>
        { RoleLevel }
      </Table.Cell>
    </Table.Row>
  </Table>
  {
    Object.keys(Skills).map((skill) => {
      const {
        Score,
        Comments,
        Evidence,
      } = Skills[skill]

      return <div
        key={skill}
      >
        <h2>
          {
            skill
          }
        </h2>
        <Table>
          <Table.Row>
            <Table.CellHeader>
              Score
            </Table.CellHeader>
            <Table.Cell>
              { Score }
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>
              Comments
            </Table.CellHeader>
            <Table.Cell>
              { Comments }
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>
              Evidence
            </Table.CellHeader>
            <Table.Cell>
              { Evidence }
            </Table.Cell>
          </Table.Row>
        </Table>
      </div>
    })
  }
</div>

export default ValidateTable;
