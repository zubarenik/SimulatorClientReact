import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input} from '../../components'
import { LessonAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'

const ModalDeleteLesson = ({open, onClose, lesson}) => {
  
  
  const [form, setForm] = useState({
    id: lesson
  })
  const [errors, setErrors] = useState({})

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const {sim_id} = useParams()
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await LessonAction.delete({...form, simulator: sim_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
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
          <ModalHeader toggle={onClose}>Удалить урок?</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleForm}>
              Да
            </Button>
            <Button color='danger' onClick={onClose}>
              Нет
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
export default ModalDeleteLesson
