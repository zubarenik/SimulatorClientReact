import {
    Form,
    Button,
    FormGroup,
    Label
  } from "reactstrap";
import {Input, RadioInput, Tiny} from '../../../components'
import { useState } from "react";

const Restrictions = ({ changeHandler, submitHandler, handleTiny, form }) => {
  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <FormGroup>
        <RadioInput
          name="name"
          id="name"
          label="Ограничивать прохождение?"
          variants={[
            { label: "Да", value: true },
            { label: "Нет", value: false },
          ]}
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="pause_length"
          id="pause_length"
          label="Срок органичения в часах"
          placeholder="0"
          onChange={changeHandler}
          value={form.pause_length}
        />
      </FormGroup>
      <FormGroup>
        <Label>Текст паузы</Label>
        <Tiny
          value={form.pause_text}
          onChange={(text) => handleTiny(text, 'pause_text')}
        />
      </FormGroup>
      <Button color="primary" type="submit" className="mt-2">
        Изменить
      </Button>
    </Form>
  );
}

export default Restrictions