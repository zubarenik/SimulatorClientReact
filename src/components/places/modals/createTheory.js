import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input} from '../../'
import { ChaptersAction } from '../../../redux/actions'
import { useParams } from 'react-router-dom'

const ModalCreateChapter = ({open, onClose}) => {
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
    const response = await ChaptersAction.create({...form, simulator: sim_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
      setForm(defaultForm)
      onClose()
    }
  }
  
  return (
    <div className='demo-inline-spacing'>
        
      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Создание главы теории</ModalHeader>
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
export default ModalCreateChapter
