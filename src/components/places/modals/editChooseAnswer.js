import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form, Ima, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Input, Tiny, RadioInput} from '../..'
import { useParams } from 'react-router-dom'

const ModalEditAnswer = ({answer, open, onClose, onEdit, OnDelete}) => {
  console.log(answer)
  const [form, setForm] = useState(
    answer
  )
  const [errors, setErrors] = useState({})
  const {sim_id} = useParams()
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    
    e.preventDefault()
    onEdit(form)
  }
  
  return (
    <div className='demo-inline-spacing'>
        
      <div>
        <Modal isOpen={open} toggle={onClose} className='modal-dialog-centered'>
          <ModalHeader toggle={onClose}>Редактирование ответа</ModalHeader>
          <ModalBody>
          <Form className='auth-login-form mt-2' onSubmit={handleForm}>

          <FormGroup>
              
              <Input
                label="Текст"
                required
                value={form.text}
                onChange={changeHandler}
                type='text'
                id='text'
                name="text"
                placeholder='Текст ответа'
                errors={errors["text"]}
                autoFocus />
          </FormGroup>
          <FormGroup>
              <Input
                label="Текст для женского персонажа"
                required
                onChange={changeHandler}
                value={form.female_text}
                type='text'
                id='female_text'
                name="female_text"
                placeholder='Текст ответа'
                errors={errors["female_text"]}
                 />
          </FormGroup>
          <FormGroup>
              <Label for="chosen_text">Комментарий, если выбран</Label>
              <Tiny
                  id="chosen_text"
                  onChange={(text)=>setForm({...form, chosen_text: text})}
                  value={form.chosen_text?form.chosen_text:''} 
              />
          </FormGroup>
          <FormGroup>
              <Label for="chosen_female_text">Комментарий, если не выбран</Label>
              <Tiny
                  id="chosen_female_text"
                  onChange={(text)=>setForm({...form, chosen_female_text: text})}
                  value={form.chosen_female_text?form.chosen_female_text:''}
              />
          </FormGroup>
          <FormGroup>
              <Input
                  label="Очки ветвления, если выбран"
                  onChange={changeHandler}
                  type='number'
                  id='points'
                  value={form.points}
                  name="points"
                  placeholder='введите число'/>
          </FormGroup>
          <FormGroup>
              <Input
                  label="Награда, если выбран"
                  onChange={changeHandler}
                  type='number'
                  id='award'
                  value={form.award}
                  name="award"
                  placeholder='введите число'/>
          </FormGroup>
            
            
           
          </Form>
          </ModalBody>
          <ModalFooter>
          <Button color='danger' onClick={OnDelete}>
              Удалить
            </Button>
            <Button color='primary' onClick={handleForm}>
              Редактировать
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
export default ModalEditAnswer
