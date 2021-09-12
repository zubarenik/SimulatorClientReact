import React, { useState } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, Checkbox, RadioInput } from "../"
import ModalCreateAnswer from './modals/createChooseAnswer'
import ModalEditAnswer from './modals/editChooseAnswer'


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
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(-1)
    const onSaveAnswer = (answer) => {

        let answers = form.answers
        if (answers) {
            answers[answers.length] = answer
        }
        else {
            answers = []
            answers[0] = answer
        }
        setForm({ ...form, 'answers': answers })
        setCreateModal(false)

    }
    const onEditAnswer = (answer) => {

        let answers = form.answers
        answers[editModal] = answer
        setForm({ ...form, 'answers': answers })
        setEditModal(-1)

    }
    const setDelete = () => {

        let answers = form.answers
        answers.splice(editModal, 1)
        setForm({ ...form, 'answers': answers })
        setEditModal(-1)

    }
    return(
      
        <>
        <ModalCreateAnswer open={createModal} onClose={() => setCreateModal(false)} onSaveAnswer={(answer) => onSaveAnswer(answer)} />
            <Form className='auth-login-form mt-2' onSubmit={save}>
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
                <hr></hr>
                {
                    form.answers &&
                    <FormGroup>
                        {form.answers.map((answer, index) =>
                            <>
                                <a className="text-primary mb-1" onClick={() => setEditModal(index)}>Ответ {index+1}: {answer.text.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 20)}</a>
                                <ModalEditAnswer open={editModal == index} answer={answer} OnDelete={() => setDelete()} onClose={() => setEditModal(-1)} onEdit={(answer) => onEditAnswer(answer)} > </ModalEditAnswer>
                            </>
                        )
                        }
                    </FormGroup>
                }
                <ButtonGroup className="mb-1">
                    <Button color='primary' block onClick={() => setCreateModal(true)}>
                        Добавить ответ
                    </Button>
                </ButtonGroup>
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
