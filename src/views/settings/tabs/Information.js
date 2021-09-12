import {
  Form,
  Button,
  FormGroup,
  Label
} from "reactstrap";
import {Input, Checkbox, RadioInput, Dropdown, Tiny} from "../../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Information = ({ changeHandler, submitHandler, handleTiny, form }) => {
  const [token, setToken] = useState('')
  const groups = useSelector(state => state.group).groups
  useEffect(() => {
    changeHandler({target:{name: 'token', value: token}})
  }, [token])
  return (
    <Form className="mb-2" onSubmit={submitHandler}>
      <FormGroup>
        <Input
          name="name"
          value={form.name}
          id="name"
          label="Название"
          placeholder="Первый онлайн-симулятор, который обучает решать конфликты и вести переговоры"
          className="mb-2"
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label>Описание</Label>
        <Tiny
          value={form.description}
          onChange={(description) => handleTiny(description, 'description')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="admin_comment_request_price"
          type="text"
          label="Количество звезд, необходимых для запроса оценки от администратора"
          placeholder="10"
          className="mb-2"
          onChange={changeHandler}
          value={form.admin_comment_request_price}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="price"
          type="text"
          id="price"
          label="Цена"
          placeholder="20000"
          className="mb-2"
          onChange={changeHandler}
          value={form.price}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="domain"
          type="text"
          id="domain"
          label="Поддомен"
          placeholder="partners"
          className="mb-2"
          onChange={changeHandler}
          value={form.domain}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="alias"
          id="alias"
          label="Домен"
          placeholder="abc.ru"
          className="mb-2"
          onChange={changeHandler}
          value={form.alias}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="onboarding_name"
          id="onboarding_name"
          label="Название онбоардинга"
          placeholder="Онбординг"
          className="mb-2"
          onChange={changeHandler}
          value={form.onboarding_name}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="notifications_url"
          id="notifications_url"
          label="URL для уведомлений"
          placeholder=""
          className="mb-2"
          onChange={changeHandler}
          value={form.notifications_url}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="agreement_url"
          id="agreement_url"
          label="Ссылка на пользовательское соглашение"
          placeholder=""
          className="mb-2"
          onChange={changeHandler}
          value={form.agreement_url}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="data_processing_url"
          id="data_processing_url"
          label="Ссылка на обработку персональных данных"
          placeholder=""
          className="mb-2"
          onChange={changeHandler}
          value={form.data_processing_url}
        />
      </FormGroup>
      <FormGroup>
        <Checkbox
          name="onboarding_skip"
          id="onboarding_skip"
          className="mb-2"
          label="Пропускать онбординг"
          onChange={changeHandler}
          value={form.onboarding_skip}
        />
      </FormGroup>
      <FormGroup>
        <Checkbox
          name="show_page_mark"
          id="show_page_mark"
          className="mb-2"
          label="Показывать оценку страницы"
          onChange={changeHandler}
          value={form.show_page_mark}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="simulator_script"
          id="simulator_script"
          label="Скрипт симулятора"
          placeholder=""
          className="mb-2"
          onChange={changeHandler}
          value={form.simulator_script}
        />
      </FormGroup>
      <FormGroup>
        <RadioInput
          label="Открывать уроки по порядку?"
          name="order_lesson"
          id="order_lesson"
          variants={[
            { label: "Да", value: true },
            { label: "Нет", value: false },
          ]}
          className="mb-2"
          onChange={changeHandler}
          value={form.order_lesson}
        />
      </FormGroup>
      <Label className="d-block">Группа</Label>
      {
        groups.length > 0 &&
        <Dropdown
          name="group"
          id="group"
          variants={groups.map((group, index) => { return {label: group.name, value: group.id}})}
          label="Группа"
          className="mb-2 d-block"
          value={form.group}
          onChange={changeHandler}
        />
      }
      
      <div className="d-flex align-items-center mb-2">
        <div>Токен:</div>
        <Input value={token} onChange={changeHandler} name='color' style={{border: 'none'}}/>
      </div>
      <div className="d-flex mb-2">
        <Button className="mb-2" color="primary" onClick={() => setToken((Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10))}>
          Сгенерировать новый токен
        </Button>
        <Button color="primary" type="submit" className="mb-2 ml-2">
          Изменить данные симулятора
        </Button>
      </div>
    </Form>
  );
};

export default Information;
