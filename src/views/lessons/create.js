import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input} from '../../components'
import { LessonAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import {CroppaInput} from '../../components'

const ModalCreateLesson = ({open, onClose}) => {
  const defaultForm = {
    name: ""
  }
  const [form, setForm] = useState({
    name: ""
  })
  const [errors, setErrors] = useState({})
  const {sim_id} = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await LessonAction.create({...form, simulator: sim_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  const changeImage = async (picture, preview) => {
    
    setForm({...form, picture})
  }
  
  return (
    <div className='demo-inline-spacing'>
        
      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Создание урока</ModalHeader>
          <ModalBody>
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
                errors={errors.descriprion}
                placeholder='Описание урока' />
            </FormGroup>
            <FormGroup>
              <Input
                label="Цена"
                onChange={changeHandler}
                type='number' 
                id='price' 
                name="price" 
                errors={errors.price}
                placeholder='Цена' />
            </FormGroup>
            
           
          </Form>
          <CroppaInput
            onImageChange={changeImage}
            width = {240}
            height = {140}
            endWidth = {880}
            endHeight = {512}


          />
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
export default ModalCreateLesson
