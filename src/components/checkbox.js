import { FormGroup, Label, Input } from 'reactstrap'

const Checkbox = ({id, name, value, label, onChange}) => {
    

    return (
      <FormGroup check inline>
        <Input
          type="checkbox"
          id={id}
          checked={value}
          name={name}
          onChange={onChange}
        />
        <Label for={id} check>
          {label}
        </Label>
      </FormGroup>
    );
}

export default Checkbox