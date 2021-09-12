import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input} from '../../components'
import { PageAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'

const ModalDeletePage = ({open, onClose, page}) => {
  
  
  const [form, setForm] = useState({
    id: page
  })
  const [errors, setErrors] = useState({})

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const {lesson_id} = useParams()
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await PageAction.delete({...form, lesson: lesson_id})
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
          <ModalHeader toggle={onClose}>Удалить страницу?</ModalHeader>
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
export default ModalDeletePage
