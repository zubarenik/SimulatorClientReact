import { useState } from "react";
import { Form, Button, FormGroup, Label } from "reactstrap";
import { Input, Tiny, CroppaInput } from "../../../components";

const Parameters = ({ changeHandler, submitHandler, handleTiny, form }) => {
  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <FormGroup>
        <CroppaInput
          value={form.welcome_message_author_img}
          onImageChange={(img) => handleTiny(img, 'welcome_message_author_img')}
          width={240}
          height={140}
          endWidth={880}
          endHeight={512}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="welcome_message_author_name"
          id="welcome_message_author_name"
          label="Автор"
          placeholder="Клименко Юрий"
          className="mb-2"
          value="welcome_message_author_name"
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label>Текст</Label>
        <Tiny
          value={form.welcome_message_text}
          onChange={(text) => handleTiny(text, 'welcome_message_text')}
        />
      </FormGroup>
      <FormGroup>
        <Label>Сообщение после каждого задания</Label>
        <Tiny
          value={form.message_after_task}
          onChange={(text) => handleTiny(text, 'message_after_task')}
        />
      </FormGroup>
      <FormGroup>
        <Label>Сообщение после каждой главы</Label>
        <Tiny
          value={form.message_after_chapter}
          onChange={(text) => handleTiny(text, 'message_after_chapter')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="text_button_after_chapter"
          id="text_button_after_chapter"
          label="Текст кнопки после главы"
          placeholder=""
          className="mb-2"
          onChange={changeHandler}
        />
      </FormGroup>
      <Button color="primary" type="submit" className="mt-2">
        Изменить
      </Button>
    </Form>
  );
};

export default Parameters;
