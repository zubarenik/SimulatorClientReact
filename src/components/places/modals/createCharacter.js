import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { Input, RadioInput } from '../..'
import { CharacterAction } from '../../../redux/actions'
import { useParams } from 'react-router-dom'
import {CroppaInput} from '../../../components'

const ModalCreateCharacter = ({ open, onClose }) => {
  const defaultForm = {
  }
  const [form, setForm] = useState({
  })
  const [errors, setErrors] = useState({})
  const { sim_id } = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await CharacterAction.create({ ...form, simulator: sim_id })
    if (!response.ok) {
      setErrors(await response.json())
    } else {
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  const changeImage = async (avatar, preview) => {
    setForm({...form, avatar})
  }

  return (
    <div className='demo-inline-spacing'>

      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Создание персонажа</ModalHeader>
          <ModalBody>
            <Form className='auth-login-form mt-2' onSubmit={handleForm}>

              <FormGroup>
                <Input
                  label="Имя"
                  onChange={changeHandler}
                  required
                  type='text'
                  id='first_name'
                  name="first_name"
                  errors={errors.first_name}
                  placeholder='Имя' />
              </FormGroup>
              <FormGroup>
                <Input
                  label="Фамилия"
                  onChange={changeHandler}
                  required
                  type='text'
                  id='last_name'
                  name="last_name"
                  errors={errors.last_name}
                  placeholder='Фамилия' />
              </FormGroup>
              <FormGroup>
                <Input
                  label="Роль"
                  onChange={changeHandler}
                  required
                  type='text'
                  id='default_role'
                  name="default_role"
                  errors={errors.default_role}
                  placeholder='Роль' />
              </FormGroup>
              <FormGroup>
                <RadioInput
                  id="male"
                  name="male"
                  value={form.male}
                  variants={[{
                    value: true,
                    label: "Мужской"
                  }, {
                    value: false,
                    label: "Женский"
                  }]}
                  label="Пол"
                  onChange={(value) => setForm({ ...form, male: value })}
                />
              </FormGroup>
              <FormGroup>
              <CroppaInput
                onImageChange={changeImage}
                width = {220}
                height = {220}
                endWidth = {220}
                endHeight = {220}


              />
              </FormGroup>


            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleForm}>
              Создать
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
export default ModalCreateCharacter
