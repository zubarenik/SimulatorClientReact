import { useState } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { Input } from '../../components'
import { useParams } from 'react-router-dom'
import { TheoryAction } from "../../redux/actions";

const EditCharacter = ({ onClose, theory }) => {
  const defaultForm = theory
  const [form, setForm] = useState(defaultForm)
  console.log(form)
  
  const [errors, setErrors] = useState({})
  const { theory_id } = useParams()
  
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => { 
    e.preventDefault()
    const response = await TheoryAction.edit({ ...form, theory: theory_id })
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
      <Form
        className="auth-login-form mt-2"
        onSubmit={handleForm}
        onChange={changeHandler}
      >
        <CardBody>
          <Input name="name" label="Имя" defaultValue={defaultForm.name} placeholder="" />
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
