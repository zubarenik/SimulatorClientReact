import React, { useState } from 'react'
import { Form, FormGroup, Button, ButtonGroup, ButtonToolbar, Label } from 'reactstrap'
import { Input, Tiny, RadioInput, Checkbox } from "../"
import { useSelector } from 'react-redux'
import ModalCreateAnswer from './modals/createAnswer'
import ModalEditAnswer from './modals/editAnswer'


export default (props) => {
    const [form, setForm] = useState(props.place)
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const save = (e) => {
        e.preventDefault()
        props.onSave(form)
    }
    const [errors, setErrors] = useState({})
    const places = useSelector(state => state.page).page.places.places
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
    return (

        <>
            <ModalCreateAnswer open={createModal} onClose={() => setCreateModal(false)} onSaveAnswer={(answer) => onSaveAnswer(answer)} />
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
                    <Label for="pause_text">Текст</Label>
                    <Tiny
                        id="pause_text"
                        value={form.text}
                        onChange={(text) => setForm({ ...form, text: text })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="pause_text_female">Текст для женского персонажа</Label>
                    <Tiny
                        id="pause_text_female"
                        value={form.female_text}
                        onChange={(text) => setForm({ ...form, female_text: text })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="pause_text_description">Описание</Label>
                    <Tiny
                        id="pause_text_description"
                        value={form.text_description}
                        onChange={(text) => setForm({ ...form, text_description: text })}
                    />
                </FormGroup>
                
                <FormGroup>
                    <RadioInput
                        id="is_multiple"
                        name="is_multiple"
                        value={form.is_multiple}
                        variants={[{
                            value: true,
                            label: "Да"
                        }, {
                            value: false,
                            label: "Нет"
                        }]}
                        label="Множественный выбор"
                        onChange={(value) => setForm({ ...form, is_multiple: value })}
                    />
                </FormGroup>
                {
                    (form && form.is_multiple) &&
                    <>
                        <FormGroup>
                            <Label for="postreply_text">Текст правильный</Label>
                            <Tiny
                                id="postreply_text"
                                value={form.postreply_text}
                                onChange={(text) => setForm({ ...form, postreply_text: text })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postreply_female_text">Текст правильный (жен)</Label>
                            <Tiny
                                id="postreply_female_text"
                                value={form.postreply_female_text}
                                onChange={(text) => setForm({ ...form, postreply_female_text: text })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postreply_error_text">Текст неправильный</Label>
                            <Tiny
                                id="postreply_error_text"
                                value={form.postreply_error_text}
                                onChange={(text) => setForm({ ...form, postreply_error_text: text })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postreply_error_female_text">Текст неправильный (жен)</Label>
                            <Tiny
                                id="postreply_error_female_text"
                                value={form.postreply_error_female_text}
                                onChange={(text) => setForm({ ...form, postreply_error_female_text: text })}
                            />
                        </FormGroup>
                    </>
                }
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
                        errors={errors["script_id"]} />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.points}
                        label="Очки ветвления"
                        onChange={changeHandler}
                        type='number'
                        id='login-points'
                        name="points"
                        placeholder='' />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={form.points_error}
                        label="Очки ветвления при ошибке"
                        onChange={changeHandler}
                        type='number'
                        id='points_error'
                        name="points_error"
                        placeholder=''/>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        id="need_notifications"
                        name="need_notifications"
                        value={form.need_notifications}
                        label="Включить уведомления"
                        onChange={(value) => setForm({ ...form, need_notifications: value })}
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
