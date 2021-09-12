import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useParams } from 'react-router-dom'
import { TheoryAction } from "../../redux/actions";

const ModalDeleteTheory = ({open, onClose, theory}) => {
  const [form, setForm] = useState({
    id: theory
  })
  const [errors, setErrors] = useState({})

  const {sim_id} = useParams()
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await TheoryAction.delete({...form, simulator: sim_id})
    if (!response.ok){
      setErrors(await response.json())
    }else{
      setErrors({})
      onClose()
    }
  }

  return (
    <div className='demo-inline-spacing'>
      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Удалить теорию?</ModalHeader>
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
export default ModalDeleteTheory
