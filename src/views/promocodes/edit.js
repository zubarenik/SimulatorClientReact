import { useState } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { Input } from '../../components'
import { PageAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'

const EditPage = ({ onClose, page }) => {
  const defaultForm = page
  const [form, setForm] = useState(defaultForm)
  console.log(defaultForm)
  const [errors, setErrors] = useState({})
  const { lesson_id } = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await PageAction.edit({ ...form, lesson: lesson_id })
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
        <h3>
          Редактировать страницу
        </h3>
      </CardHeader>
      <CardBody>
        <Form className='auth-login-form mt-2' onSubmit={handleForm}>

          <FormGroup>
            <Input
              label="Название"
              onChange={changeHandler}
              required
              type='text'
              id='name'
              name="name"
              errors={errors.name}
              value={form.name}
              placeholder='Название страницы' />
          </FormGroup>
          


        </Form>
      </CardBody>
      <CardFooter>
        <Button color='primary' onClick={handleForm} className='mr-2'>
          Редактировать
        </Button>
        <Button color='danger' onClick={onClose} >
          Отменить
        </Button>
      </CardFooter>
    </Card>
  )
}
export default EditPage
