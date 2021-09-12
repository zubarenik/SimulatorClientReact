import React, { useState } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, RadioInput } from "../"



export default (props) =>  {
    const [form, setForm] = useState(props.place)
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const save = (e) => {
        e.preventDefault()
        props.onSave(form)
    }
    const [errors, setErrors] = useState({})
    return(
      
        <>
            <Form className='auth-login-form mt-2' onSubmit={save}>
                <FormGroup>
                    <Label for="text">Текст</Label>
                    <Tiny
                        id="text"
                        value={form.text} 
                        onChange={(text)=>setForm({...form, text: text})}
                    />
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
                    <Input
                        value={form.script_text}
                        label="Текст скрипта"
                        onChange={changeHandler}
                        type='textarea'
                        id='script_text'
                        name="script_text"
                        placeholder='' />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.script_id}
                        label="id скрипта"
                        onChange={changeHandler}
                        type='text'
                        id='script_id'
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
                        id='award'
                        name="award"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.points}
                        label="Очки ветвления"
                        onChange={changeHandler}
                        type='number'
                        id='points'
                        name="points"
                        placeholder=''/>
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
