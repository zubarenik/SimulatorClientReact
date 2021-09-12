import { useState } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { Input, Tiny } from '../../components'
import { LessonAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import {CroppaInput} from '../../components'



const EditLesson = ({ onClose, lesson }) => {
  const defaultForm = lesson
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const { sim_id } = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const changeImage = async (newpicture, preview) => {
    setForm({...form, newpicture})
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await LessonAction.edit({ ...form, simulator: sim_id })
    if (!response.ok) {
      setErrors(await response.json())
    } else {
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  console.log(form)
  return (
    <Card>
      <CardHeader>
        <h3>
          Редактировать урок
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
              placeholder='Название урока' />
          </FormGroup>
          <FormGroup>
            <Input
              label="Описание"
              onChange={changeHandler}
              required
              type='text'
              id='description'
              name="description"
              errors={errors.description}
              value={form.description}
              placeholder='Описание урока' />
          </FormGroup>
          <FormGroup>
            <Input
              label="Цена"
              onChange={changeHandler}
              required
              type='text'
              id='price'
              name="price"
              errors={errors.price}
              value={form.price}
              placeholder='Описание урока' />
          </FormGroup>
          <FormGroup>
            <Label className="">Активно?</Label>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='active'
                name="active"
                defaultChecked={form.active}
                className="ml-0"
                value={true} />
              <div className="ml-2">Да</div>
            </div>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='active'
                name="active"
                defaultChecked={!form.active}
                className="ml-0"
                value={false} />
              <div className="ml-2">Нет</div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label className="">Ограничивать прохождение?</Label>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='need_pause'
                name="need_pause"
                defaultChecked={form.need_pause}
                className="ml-0"
                value={true} />
              <div className="ml-2">Да</div>
            </div>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='need_pause'
                name="need_pause"
                defaultChecked={!form.need_pause}
                className="ml-0"
                value={false} />
              <div className="ml-2">Нет</div>
            </div>
          </FormGroup>

          <FormGroup>
            <Input
              label="Ограничение в часах"
              onChange={changeHandler}
              required
              type='number'
              id='pause_length'
              name="pause_length"
              errors={errors.pause_length}
              value={form.pause_length?form.pause_length:''}
              placeholder='введите ограничение в часах' />
          </FormGroup>
          <FormGroup>
            <Tiny value={form.pause_text} onChange={(pause_text)=>setForm({...form, pause_text})}/>
          </FormGroup>
        </Form>
        <Label className="">Изменить изображение? Чтобы не менять не заполняйте</Label>
        <CroppaInput
            onImageChange={changeImage}
            width = {240}
            height = {140}
            endWidth = {880}
            endHeight = {512}


          />
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
export default EditLesson
