import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, RadioInput } from "../"
import { useParams } from 'react-router-dom'
import { ChaptersAction } from '../../redux/actions'
import { useSelector } from 'react-redux'
import ModalCreateTheory from './modals/createTheory'



export default (props) =>  {
    const [form, setForm] = useState(props.place)
    const [createModal, setCreateModal] = useState(false)
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const save = (e) => {
        e.preventDefault()
        props.onSave(form)
    }
    const [errors, setErrors] = useState({})
    const chapters = useSelector(state => state.chapters).chapters
    const { sim_id, lesson_id, page_id } = useParams()
    useEffect(() => {
        ChaptersAction.find({ simulator: sim_id })
      }, [sim_id, lesson_id, page_id])

    return(
      
        <>
            <ModalCreateTheory open={createModal} onClose={() => setCreateModal(false)} />
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
                    placeholder='Название теории'
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
                <Input type='select' name='theory_chapter' id='theory_chapter' label="Глава" onChange={changeHandler}>
                    {
                        (!form || !form.theory_chapter) && 
                        <option value={null} disabled={true} selected={true} >Выберите главу</option>
                    }
                    {
                      chapters.map((chapter) => 
                        <option value={chapter.id} key={chapter.id} selected={chapter.id === form.theory_chapter}>{chapter.name}</option>
                      )
                    } 
                     
                  </Input>
                  <a className="text-primary" onClick={() => setCreateModal(true)}>Добавить главу</a>
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
