import { useEffect, useState } from 'react'
import { Button, Form, FormGroup} from 'reactstrap'
import {Sidebar, Input, DatePicker} from '../../components';
import { PromocodeAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'

const ModalCreatePromocode = ({opened, onClose, toggleSidebar}) => {
  const defaultForm = {
    name: ""
  }
  const [form, setForm] = useState({
    name: "",
    date: ''
  })
  const [errors, setErrors] = useState({})
  const {sim_id} = useParams()
  
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }

  const dateHandler = (val, name) => {
    setForm({ ...form, [name]: val })
    console.log(form)
  }

  const handleForm = async (e) => {
    e.preventDefault()
    const response = await PromocodeAction.create({...form, simulator: sim_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  useEffect(() => {
    console.log(form)
  }, [form])
  
  
  return (
    <Sidebar
      open={opened}
      title="Добавить промокод"
      toggleSidebar={toggleSidebar}
      children={
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleForm}
        >
          <FormGroup>
            <Input
              name="name"
              id="name"
              label="Slug"
              placeholder="0"
              className="mb-2"
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="name"
              id="name"
              label="Текст"
              placeholder="0"
              className="mb-2"
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="name"
              id="name"
              label="Цена"
              placeholder="0"
              className="mb-2"
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <DatePicker
              label={'Дата истечения'}
              value={form.date}
              onChange={(val) => dateHandler(val, 'date')}
            />
          </FormGroup>
          <Input
            name="name"
            id="name"
            label="Usage limit"
            placeholder="0"
            className="mb-2"
            onChange={changeHandler}
            />
          <Input
            name="name"
            id="name"
            label="Usage count"
            placeholder="0"
            className="mb-2"
            onChange={changeHandler}
            />
          <div className="d-flex justify-content-between flex-wrap mt-5">
            <Button color="primary" onClick={onClose}>Отменить</Button>
            <Button color="primary" type="submit">
              Добавить
            </Button>
          </div>
        </Form>
      }
    />
  );
}
export default ModalCreatePromocode
