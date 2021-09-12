import {
    Form,
    Button,
    FormGroup
  } from "reactstrap";
import {Input, RadioInput} from '../../../components'


const SocialMedia = ({ submitHandler, changeHandler, form }) => {
    return (
      <Form className="mt-2" onSubmit={submitHandler} onChange={changeHandler}>
        <FormGroup>
          <RadioInput
            name="name"
            id="name"
            label="Показывать некупившим?"
            variants={[
              { label: "Да", value: true },
              { label: "Нет", value: false },
            ]}
            value={form.random_showing}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="vkontakte"
            id="vkontakte"
            label="Группа Вконтакте"
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            value={form.vkontakte}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="telegram"
            id="telegram"
            label="Чат Telegram"
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            value={form.telegram}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="facebook"
            id="facebook"
            label="Группа Facebook"
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            value={form.facebook}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="whatsapp"
            id="whatsapp"
            label="Чат WhatsApp"
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            value={form.whatsapp}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="random_icon"
            id="random_icon"
            label={<><span>Своя иконка</span><a href="https://bootstrap-vue.org/docs/icons#icons" target="_blank">&nbsp;(cписок доступных иконок)</a></>}
            placeholder=""
            onChange={changeHandler}
            value={form.random_icon}
            className="mb-2"
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="random_text"
            id="random_text"
            label="Свой текст"
            value={form.random_text}
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="random_link"
            id="random_link"
            label="Своя ссылка"
            placeholder=""
            onChange={changeHandler}
            className="mb-2"
            value={form.random_link}
            />
        </FormGroup>
        <Button color="primary" type="submit" className="mt-2">
          Изменить
        </Button>
      </Form>
    );
}

export default SocialMedia