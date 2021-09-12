import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input} from '../../components'
import { PageAction, SimulatorAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'

const ModalCreateSimulator = ({open, onClose}) => {
  const defaultForm = {
    name: ""
  }
  const [form, setForm] = useState({
    name: ""
  })
  const [errors, setErrors] = useState({})
  const {lesson_id} = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await PageAction.create({...form, lesson: lesson_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  const changeImage = async (logo, preview) => {
    setForm({...form, logo})
  }
  
  return (
    <div className='demo-inline-spacing'>
        
      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Создать страницу</ModalHeader>
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
                placeholder='Название страницы' />
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
export default ModalCreateSimulator
