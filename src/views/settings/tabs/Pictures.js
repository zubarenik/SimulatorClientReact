import { Form, Button, FormGroup, Label } from "reactstrap";
import {CroppaInput} from '../../../components'
import { useState } from "react";

const Pictures = ({ changeHandler, submitHandler, handleTiny, form }) => {
  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <FormGroup>
        <Label>Логотип</Label>
        <CroppaInput
          value={form.logo}
          onImageChange={(logo) => handleTiny(logo, 'logo')}
          width={240}
          height={140}
          endWidth={880}
          endHeight={512}
        />
      </FormGroup>
      <FormGroup>
        <Label>Favicon</Label>
        <CroppaInput
          value={form.favicon}
          onImageChange={(img) => handleTiny(img, 'favicon')}
          width={240}
          height={140}
          endWidth={880}
          endHeight={512}
        />
      </FormGroup>
      <FormGroup>
        <Label>Изображение</Label>
        <CroppaInput
          value={form.picture}
          onImageChange={(picture) => handleTiny(picture, 'picture')}
          width={240}
          height={140}
          endWidth={880}
          endHeight={512}
        />
      </FormGroup>
      <Button color="primary" type="submit" className="mt-2">
        Изменить
      </Button>
    </Form>
  );
}

export default Pictures