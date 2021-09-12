import { Form, Button, FormGroup } from "reactstrap";
import {Input, CroppaInput} from "../../../components";
import { useState } from "react";

const Sertificate = ({ changeHandler, submitHandler, handleTiny, form }) => {
  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <FormGroup>
        <span>Выберите фоновое изображение</span>
        <CroppaInput
          value={form.img}
          onImageChange={(img) => handleTiny(img, 'img')}
          width={240}
          height={140}
          endWidth={880}
          endHeight={512}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="name"
          id="name"
          label="Выберите размер шрифта"
          placeholder=""
          onChange={changeHandler}
        />
      </FormGroup>
      <Button color="primary" type="submit" className="mt-2">
        Изменить
      </Button>
    </Form>
  );
};

export default Sertificate