import Accordion from './../components/Accordion';

const Validate = () => <>
  <Accordion 
    id={"accordion-default"}
    items={
      [{
        heading: <><h1>Hello</h1></>,
        summary: <><p>still example</p></>,
        content: <><p>example</p></>,
      }]
    }
  />
</>

export default Validate;