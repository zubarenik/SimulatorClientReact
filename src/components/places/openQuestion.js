import React, { useState } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, Checkbox, RadioInput } from "../"
import { useSelector } from 'react-redux'



export default (props) =>  {
    const [form, setForm] = useState(props.place)
    const answers = form.answers ? [...form.answers] : []
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const save = (e) => {
        e.preventDefault()
        props.onSave(form)
    }
    const [errors, setErrors] = useState({})
    const places = useSelector(state => state.page).page.places.places
    return(
      
        <>
            <Form className='auth-login-form mt-2' onSubmit={save}>
                <FormGroup>
                    <Input
                    value={form.title}
                    label="Название"
                    required
                    onChange={changeHandler}
                    type='text'
                    id='login-title'
                    name="title"
                    placeholder='Название вопроса'
                    errors={errors["title"]}
                    autoFocus />
                </FormGroup>
                <FormGroup>
                    <RadioInput
                        id="is_start"
                        name="is_start"
                        value={form.is_start}
                        variants={[{
                            value: true,
                            label: "Да"
                        }, {
                            value: false,
                            label: "Нет"
                        }]}
                        label="Начало?"
                        onChange={(value) => setForm({ ...form, is_start: value })}
                    />
                </FormGroup>
                <FormGroup>
                <Input type='select' name='parent_message' id='parent_message' label="Родительское сообщение" onChange={changeHandler}>
                   
                    <option value={null} selected={form.parent_message==null} >Без родительского сообщения</option>
                    {
                      places.filter(place => place.type == 'message').map((place) => 
                        <option value={place.id} key={place.id} selected={place.id === form.parent_message}>{place.text.replace(/<\/?[^>]+(>|$)/g, "").substring(0,30)}</option>
                      )
                    } 
                     
                  </Input>
               
                </FormGroup>
                <FormGroup>
                    <Label for="pause_text">Текст</Label>
                    <Tiny
                        id="pause_text"
                        value={form.text} 
                        onChange={(text)=>setForm({...form, text: text})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="pause_text_female">Текст для женского персонажа</Label>
                    <Tiny
                        id="pause_text_female"
                        value={form.female_text} 
                        onChange={(text)=>setForm({...form, female_text: text})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="pause_text_description">Описание</Label>
                    <Tiny
                        id="pause_text_description"
                        value={form.text_description} 
                        onChange={(text)=>setForm({...form, text_description: text})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="postreply_text">Комментарий после ответа</Label>
                    <Tiny
                        id="postreply_text"
                        value={form.postreply_text} 
                        onChange={(text)=>setForm({...form, postreply_text: text})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="postreply_female_text">Комментарий для женского персонажа</Label>
                    <Tiny
                        id="postreply_female_text"
                        value={form.postreply_female_text} 
                        onChange={(text)=>setForm({...form, postreply_female_text: text})}
                    />
                </FormGroup>
                
                <FormGroup>
                    <Input
                        value={form.script_text}
                        label="Текст скрипта"
                        onChange={changeHandler}
                        type='textarea'
                        id='login-text-script'
                        name="script_text"
                        placeholder='' />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.script_id}
                        label="id скрипта"
                        onChange={changeHandler}
                        type='text'
                        id='login-id-script'
                        name="script_id"
                        placeholder=''
                        errors={errors["script_id"]}/>
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.award}
                        label="Награда"
                        onChange={changeHandler}
                        type='number'
                        id='login-award'
                        name="award"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <Input
                        value={!!form.comment_number?form.comment_number:0}
                        label="Количество комментариев"
                        onChange={changeHandler}
                        type='number'
                        id='comment_number'
                        name="comment_number"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.points}
                        label="Очки ветвления"
                        onChange={changeHandler}
                        type='number'
                        id='login-points'
                        name="points"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        id="need_notifications" 
                        name="need_notifications"
                        value={form.need_notifications}
                        label="Включить уведомления"
                        onChange={(value)=>setForm({...form, need_notifications: value})}
                    />
                </FormGroup>
                <ButtonToolbar className="justify-content-between">
                    <ButtonGroup>
                        <Button type="submit" color='primary' block>
                            Сохранить
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button color='danger' block onClick={props.onCancel}>
                            Закрыть
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Form>
        </>
      
    )
}
