import { useState } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { Input, CroppaInput } from '../../components'
import { useParams } from 'react-router-dom'
import { ShopAction } from "../../redux/actions";

const ModalEditShop = ({ onClose, character }) => {
  const defaultForm = shop
  const [form, setForm] = useState(defaultForm)
  console.log(form)
  
  const [errors, setErrors] = useState({})
  const {shop_id } = useParams()
  
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => { 
    e.preventDefault()
    const response = await ShopAction.edit({ ...form, shop: shop_id })
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
        <CroppaInput
            onImageChange={changeImage}
            width = {240}
            height = {140}
            endWidth = {880}
            endHeight = {512}
          />
          <Input name="name" id="name" label="Заголовок" placeholder="" className="mb-2"/>
          <Input name="name" id="name" label="Описание" placeholder="" className="mb-2"/>
          <Input name="name" id="name" label="Цена" placeholder="0" className="mb-2"/>
          <Input name="name" id="name" label="Текст email" placeholder="" className="mb-2"/>
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
export default ModalEditShop
