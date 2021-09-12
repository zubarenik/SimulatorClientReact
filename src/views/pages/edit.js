import { useState, useEffect } from 'react'
import { Button, FormGroup, Form, Card, CardBody, CardFooter, CardHeader, Label, ButtonGroup, ButtonToolbar } from 'reactstrap'
import { Input } from '../../components'
import { PageAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditPage = ({ onClose, page, onEdit }) => {
  const defaultForm = page
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const { lesson_id } = useParams()
  const pages = useSelector(state => state.page).pages

  const pageDetails = (id) => {
    return pages.find((el)=>el.id == id).name
  }

  const nextPageInitState = {
    state: 0, 
    page: -1, 
    points: 0,
    index: -1
  }
  let [nextPage, setNextPage] = useState(nextPageInitState)

  const cancelNextPage = (e = undefined) => {
    e?.preventDefault()
    let {state, page, points, index} = nextPageInitState
    setNextPage({ ...nextPage, state, page, points, index })
  }
  const initNextPage = (state, data = undefined, index = undefined) => {
    if (data) {
      let {page, points} = data
      setNextPage({ ...nextPage, page, points, index, state })
    }
    else {
      setNextPage({ ...nextPage, state })
    }
  }
  const saveNextPage = (e) => {
    e.preventDefault()
    let next_pages = form.next_pages
    let currentNextPage = (({ page, points }) => ({ page, points }))(nextPage)
    if (nextPage.state == 1) {
      if (next_pages) {
          next_pages[next_pages.length] = currentNextPage
      } else {
          next_pages = []
          next_pages[0] = currentNextPage
      }
    } else {
      next_pages[nextPage.index] = currentNextPage
    }
    setForm({ ...form, next_pages })
    cancelNextPage()
  }
  const deleteNextPage = (e) => {
    e.preventDefault()
    let next_pages = form.next_pages
    next_pages.splice(nextPage.index, 1)
    setForm({ ...form, next_pages })
    cancelNextPage()
  } 
  const changeNextPage = (e) => {
    setNextPage({ ...nextPage, [e.target.name]: e.target.value })
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleForm = async (e) => {
    e?.preventDefault()
    const response = await PageAction.edit({ ...form, lesson: lesson_id })
    if (!response.ok) {
      setErrors(await response.json())
    } else {
      setErrors({})
      setForm(defaultForm)
      onClose()
      if (onEdit){
        onEdit(form)
      }
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <h3>
          Редактировать страницу
        </h3>
      </CardHeader>
      <CardBody>
        <Form className='auth-login-form mt-2' onSubmit={handleForm}>
          <FormGroup>
            <Input
              label="Название"
              onChange={changeHandler}
              required
              type='text'
              id='name'
              name="name"
              errors={errors.name}
              value={form.name}
              placeholder='Название страницы' />
          </FormGroup>
          <FormGroup>
            <Label className="">Начало страницы?</Label>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='is_start'
                name="is_start"
                defaultChecked={form.is_start}
                className="ml-0"
                value={true} />
              <div className="ml-2">Да</div>
            </div>
            <div>
              <Input
                onChange={changeHandler}
                required
                type='radio'
                id='is_start'
                name="is_start"
                defaultChecked={!form.is_start}
                className="ml-0"
                value={false} />
              <div className="ml-2">Нет</div>
            </div>
          </FormGroup>
          {
            form.next_pages &&
            <FormGroup>
              {form.next_pages.map((page, index) =>
                <>
                  <a className="text-primary mb-1 d-block" onClick={() => initNextPage(2, page, index)}>
                    {pageDetails(page.page)}: {page.points}
                  </a>
                </>
              )
              }
            </FormGroup>
          }
          <ButtonGroup className="mb-1">
            <Button color='primary' block onClick={() => initNextPage(1)}>
                Добавить переход на следующую страницу
            </Button>
          </ButtonGroup>
          {
            nextPage.state > 0 &&
            <>
              <FormGroup>
                <Input type='select' name='page' id='page' label="Страница" onChange={changeNextPage}>
                  <option value={null} selected={nextPage.state === 1} >Не выбрано</option>
                  {
                    pages
                      .filter((page) => page.id != form.id)
                      .map((page) =>
                        <option value={page.id} key={page.id} selected={page.id == nextPage.page}>{page.name}</option>
                      )
                  }
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  value={nextPage.points}
                  label="Очки ветвления"
                  onChange={changeNextPage}
                  type='number'
                  id='points'
                  name="points"
                  placeholder='' />
              </FormGroup>
              <ButtonToolbar>
                <ButtonGroup className="mr-1">
                  <Button color='primary' block onClick={saveNextPage}>
                    Сохранить изменения
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-1">
                  <Button color='warning' block onClick={cancelNextPage}>
                    Закрыть
                  </Button>
                </ButtonGroup>
                {
                  nextPage.state === 2 &&
                  <ButtonGroup>
                    <Button color='danger' block onClick={deleteNextPage}>
                      Удалить
                    </Button>
                  </ButtonGroup>
                } 
              </ButtonToolbar>
            </>
          }
        </Form>
      </CardBody>
      <CardFooter>
        <Button color='primary' onClick={handleForm} className='mr-2'>
          Редактировать
        </Button>
        <Button color='danger' onClick={onClose} >
          Отменить
        </Button>
      </CardFooter>
    </Card>
  )
}
export default EditPage
