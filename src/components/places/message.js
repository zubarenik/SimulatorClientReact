import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, RadioInput } from "../"
import { CharacterAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ModalCreateCharacter from './modals/createCharacter'


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
    const [createModal, setCreateModal] = useState(false)
    const { sim_id, lesson_id, page_id } = useParams()
    const characters = useSelector(state => state.characters).characters
    useEffect(() => {
        CharacterAction.find({ simulator: sim_id })
      }, [sim_id, lesson_id, page_id])
    return(
      
        <>
        <ModalCreateCharacter open={createModal} onClose={() => setCreateModal(false)} />
            <Form className='auth-login-form mt-2' onSubmit={save}>
                <FormGroup>
                    <Label for="pause_text">Текст</Label>
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
                    <Label for="pause_text_female">Текст для женского персонажа</Label>
                    <Tiny
                        id="pause_text_female"
                        value={form.female_text} 
                        onChange={(text)=>setForm({...form, female_text: text})}
                    />
                </FormGroup>
                <FormGroup>
                <Input type='select' name='character' id='character' label="Персонаж" onChange={changeHandler}>
                    
                    <option value={null} selected={form.chapter == null} >Без персонажа</option>
                    {
                      characters.map((character) => 
                        <option value={character.id} key={character.id} selected={character.id === form.character}>{character.last_name} {character.first_name}</option>
                      )
                    } 
                     
                  </Input>
                  <a className="text-primary" onClick={() => setCreateModal(true)}>Добавить персонажа</a>
                </FormGroup>
                <FormGroup>
                    <RadioInput
                        id="is_current_user"
                        name="is_current_user"
                        value={form.is_current_user}
                        variants={[{
                            value: true, 
                            label: "Да"
                        },{
                            value: false,
                            label: "Нет"
                        }]}
                        label="Пользователь персонажа?"
                        onChange={(value)=>setForm({...form, is_current_user: value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.forced_role}
                        label="Переопределить роль"
                        onChange={changeHandler}
                        type='text'
                        id='login-forced-role'
                        name="forced_role"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <RadioInput
                        id="is_author_message"
                        name="is_author_message"
                        value={form.is_author_message}
                        variants={[{
                            value: true, 
                            label: "Да"
                        },{
                            value: false,
                            label: "Нет"
                        }]}
                        label="Сообщение автора?"
                        onChange={(value)=>setForm({...form, is_author_message: value})}
                    />
                </FormGroup>
                <FormGroup>
                    <RadioInput
                        id="is_hero"
                        name="is_hero"
                        value={form.is_hero}
                        variants={[{
                            value: true, 
                            label: "Справа"
                        },{
                            value: false,
                            label: "Слева"
                        }]}
                        label="Положение на экране"
                        onChange={(value)=>setForm({...form, is_hero: value})}
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
                        value={form.points}
                        label="Очки ветвления"
                        onChange={changeHandler}
                        type='number'
                        id='login-points'
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
