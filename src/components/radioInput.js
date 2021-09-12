import { FormGroup, Label, Input } from "reactstrap";


const RadioInput = ({id, name, value, variants, label, onChange, className }) => {
    const undefinedOrNullToFalse = (value) => {
      if (value === undefined || value === null)
        return false
      return value
    }
    const stringToBool = (value) => {
      if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true
        if (value.toLowerCase() === "false") return false
      }
      return value
    }
    const changeHandler = (e) => {
      onChange(stringToBool(e.target.value))
    }

    return (
      <div className={className}>
        <FormGroup
          className="d-flex flex-column align-items-start"
          id={id}
          check
          inline
        >
          <Label>{label}</Label>
          {variants.map((el) => {
            return (
              <Label key={el.value} check>
                <Input 
                  type="radio" 
                  name={name} 
                  value={el.value}
                  checked={el.value === undefinedOrNullToFalse(value)}
                  onChange={changeHandler}
                  />
                {el.label}
              </Label>
            );
          })}
        </FormGroup>
      </div>
    );
}

export default RadioInput