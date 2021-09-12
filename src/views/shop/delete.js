import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useParams } from 'react-router-dom'
import { ShopAction } from "../../redux/actions";

const ModalDeleteShop = ({open, onClose, character}) => {
  const [form, setForm] = useState({
    id: shop
  })
  const [errors, setErrors] = useState({})

  const {shop_id} = useParams()
  const handleForm = async (e) => {
    e.preventDefault()
    const response = await ShopAction.delete({...form, shop: shop_id})
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
          <ModalHeader toggle={onClose}>Удалить персонажа?</ModalHeader>
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
export default ModalDeleteShop
