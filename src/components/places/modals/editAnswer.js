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
              value={form.text}
              onChange={changeHandler}
              type='text'
              id='text'
              name="text"
              placeholder='введите текст'/>
          </FormGroup>
          <FormGroup>
            <Input
              label="Текст для женского персонажа"
              value={form.female_text}
              onChange={changeHandler}
              type='text'
              id='female_text'
              name="female_text"
              placeholder='введите текст для женского персонажа'/>
          </FormGroup>
          <FormGroup>
              <RadioInput
                  id="is_correct"
                  name="is_correct"
                  variants={[{
                      value: true, 
                      label: "Да"
                  },{
                      value: false,
                      label: "Нет"
                  }]}
                  label="Верный ответ?"
                  value={form.is_correct} 
                  onChange={(value)=>setForm({...form, is_correct: value})}
              />
          </FormGroup>
          <FormGroup>
              <Label for="postreply_chosen">Комментарий, если выбран</Label>
              <Tiny
                  id="postreply_chosen"
                  onChange={(text)=>setForm({...form, postreply_chosen: text})}
                  value={form.postreply_chosen?form.postreply_chosen:''} 
              />
          </FormGroup>
          <FormGroup>
              <Label for="postreply_not_chosen">Комментарий, если не выбран</Label>
              <Tiny
                  id="postreply_not_chosen"
                  onChange={(text)=>setForm({...form, postreply_not_chosen: text})}
                  value={form.postreply_not_chosen?form.postreply_not_chosen:''}
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
