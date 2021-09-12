import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
    Input,
} from "reactstrap";
import { useState } from "react";

const Dropdown = ({ id, name, className, variants, onChange, value }) => {
  const [title, setTitle] = useState(variants ? variants.filter(el => el.value === value)[0].label : '');
  const vars = variants;

  const clickHandler = (el) => {
    setTitle(el);
  };

  return (
    <>
      <UncontrolledButtonDropdown id={id} className={className} >
        <DropdownToggle color="primary" caret>
          {title}
        </DropdownToggle>
        <DropdownMenu className="d-flex flex-column pt-0 pb-0">
          {variants.map((el) => {
            return (
              <DropdownItem key={el.value} value={el.value} name={name} onClick={(e) => {onChange(e); clickHandler(el.label)}}>{el.label}</DropdownItem>
              // <Label
              //   key={el.val}
              //   htmlFor={el.val}
              //   onClick={() => clickHandler(el.text)}
              //   className="col-12 pt-1 pb-1"
              //   style={{ cursor: "pointer" }}
              //   as="DropdownItem"
              // >
              //   <span className="ml-2 mt-1 ">{el.text}</span>
              //   <Input
              //     type="radio"
              //     name={name}
              //     className=""
              //     id={el.val}
              //     onChange={onChange}
              //     value={el.val}
              //     className="d-none"
              //   />
              // </Label>
            );
          })}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </>
  );
};

export default Dropdown;
