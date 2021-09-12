import { useEffect, useState } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { Input } from '../../components'
import { useParams } from 'react-router-dom'
import { CharacterAction } from "../../redux/actions";
import { CroppaInput } from '../../components'
import { RadioInput } from '../../components'

const EditCharacter = ({ onClose, character }) => {
  const defaultForm = character
  const [form, setForm] = useState(defaultForm)
  
  const [errors, setErrors] = useState({})
  const { character_id } = useParams()
  
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const changeImage = async (newAvatar) => {
    setForm({ ...form, newAvatar});
  };

  const handleForm = async (e) => { 
    e.preventDefault()
    const response = await CharacterAction.edit({ ...form, character: character_id })
    if (!response.ok) {
      setErrors(await response.json())
    } else {
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }

  return (
    <Card>
      <CardHeader>
        <h3>Редактировать страницу</h3>
      </CardHeader>
      <Form className="auth-login-form mt-2" onSubmit={handleForm}>
        <CardBody>
          <FormGroup>
            <Input
              name="first_name"
              label="Имя"
              defaultValue={form.first_name}
              placeholder=""
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="last_name"
              label="Фамилия"
              defaultValue={form.last_name}
              placeholder=""
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="default_role"
              label="Роль"
              defaultValue={form.default_role}
              onChange={changeHandler}
              placeholder=""
            />
          </FormGroup>
          <RadioInput
            value={form.male}
            label="Пол"
            name="male"
            id="name"
            variants={[
              { label: "Мужской", value: true },
              { label: "Женский", value: false },
            ]}
            className="mb-2"
            onChange={(val) => setForm({...form, male: val})}
          />
          <CroppaInput
            onImageChange={changeImage}
            width={240}
            height={140}
            endWidth={880}
            endHeight={512}
          />
          <span>*обязательные поля</span>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={handleForm} className="mr-2">
            Редактировать
          </Button>
          <Button color="danger" onClick={onClose}>
            Отменить
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
export default EditCharacter
