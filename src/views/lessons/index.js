import { X, Edit, Plus, ArrowRight, ArrowUp, ArrowDown, Save } from 'react-feather'
import { Card, CardBody, Button } from 'reactstrap'
import '@styles/base/pages/app-ecommerce.scss'
import { Link, useParams } from 'react-router-dom'
import ModalCreateLesson from './create'
import ModalDeleteLesson from './delete'
import EditLesson from './edit'
import { useEffect, useState, Fragment } from 'react'
import { LessonAction, SimulatorAction } from '../../redux/actions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import EditOnboarding from '../pages/edit'

const Lessons = () => {
  const { sim_id } = useParams()

  const [createModal, setCreateModal] = useState(false)
  const [orderChanged, setOrderChanged] = useState(false)
  const [editLesson, setEditLesson] = useState(0)
  const [editOnboarding, setEditOnboarding] = useState(0)
  const [deleteModal, setDeleteModal] = useState(0)
  const lessons = useSelector(state => state.lesson).lessons
  const onboarding = useSelector(state => state.simulator).onboarding
  
  useEffect(() => {
    LessonAction.find({ simulator: sim_id })
    SimulatorAction.onboarding(sim_id)
  }, [sim_id])
  const reorder = (params) => {
    LessonAction.reorder({array: lessons, order: params.order, index: params.index})
    setOrderChanged(true)
  }
  const reorder_server = async () => {
    const ids = lessons.map(function (obj) {
      return obj.id;
    });
    const response = await LessonAction.reorder_server({ids: ids, simulator: sim_id})
    if(response == 'ok')
    {
      toast.success(`Успешно обновлено`)
      setOrderChanged(false)
    }
    
  }
  return (
    <div>
      <ModalCreateLesson open={createModal} onClose={() => setCreateModal(false)} />
      {orderChanged && <Button
        className='btn-change-order btn-icon rounded-circle'
        color='primary'
        onClick={reorder_server}
      >
        <Save size={35} />
      </Button>}
      <Button
        className='btn-cart'
        color='primary'
        onClick={() => setCreateModal(true)}
      >
        <Plus size={14} className='mr-25' />
        <span className='text-truncate'>Добавить урок</span>
      </Button>
      <div className="ecommerce-application">
        <div className='list-view'>
          {
            onboarding && onboarding.id && 
            <>
            <Card className='ecommerce-card gtc21'>
              <CardBody className="justify-content-center">
                <div className='item-name d-flex align-items-center'>
                  <h4 className='mb-0 float-left'>
                    <Link to={`/simulator/${sim_id}/onboarding/${onboarding.id}`}>
                      {onboarding.name}
                    </Link>
                  </h4>
                  <p className="mt-1" dangerouslySetInnerHTML={{ __html: onboarding.description }}>
                  </p>

                </div>
              </CardBody>
              <div className='item-options text-center'>
                <Button className='mt-1 remove-wishlist' color='warning' onClick={() => setEditOnboarding(onboarding.id)}>
                  <Edit size={14} className='mr-25' />
                  <span>Редактировать</span>
                </Button>
                <Link to={`/simulator/${sim_id}/onboarding/${onboarding.id}`} className='text-truncate w-100' style={{ color: "#fff" }}>
                  <Button
                    className='btn-cart w-100'
                    color='primary'
                  >
                    <ArrowRight size={14} className='mr-25' />
                    Перейти
                  </Button>
                </Link>
              </div>
            </Card>
            {editOnboarding == onboarding.id && <EditOnboarding page={onboarding} onEdit={SimulatorAction.editOnboarding} onClose={() => setEditOnboarding(0)} />}
            </>
          }
          <hr/>
          <div className='checkout-items w-100'>
            {
              lessons.length > 0 && lessons.map((lesson, index) =>
                <Fragment key={lesson.id} >
                  <Card className='ecommerce-card' >
                    <div className='item-img'>
                    <div className='orderbtns mr-1'>
                      {index != 0 && <ArrowUp className='d-block cursor-pointer' onClick={() =>reorder({order: 'up', index: index})} />}
                      {index != lessons.length-1 && <ArrowDown className='d-block cursor-pointer' onClick={() =>reorder({order: 'down', index: index})} />}
                    </div>
                      <img className='img-fluid' src={lesson.picture} />
                    </div>
                    <CardBody>
                      <div className='item-name'>

                        <h4 className='mb-0'>
                          <Link to={`/simulator/${sim_id}/lessons/${lesson.id}`}>
                            {lesson.name}
                          </Link>
                        </h4>
                        <p className="mt-1" dangerouslySetInnerHTML={{ __html: lesson.description }}>
                        </p>

                      </div>
                    </CardBody>
                    <div className='item-options text-center'>
                      <div className='item-wrapper'>
                        <div className='item-cost'>
                          <h4 className='item-price'>₽{lesson.price}</h4>
                        </div>
                      </div>
                      <Button className='mt-1 remove-wishlist' color='danger' onClick={() => setDeleteModal(lesson.id)}>
                        <X size={14} className='mr-25' />
                        <span>Удалить</span>
                      </Button>
                      <Button className='mt-1 remove-wishlist' color='warning' onClick={() => setEditLesson(lesson.id)}>
                        <Edit size={14} className='mr-25'/>
                        <span>Редактировать</span>
                      </Button>
                      <Link to={`/simulator/${sim_id}/lessons/${lesson.id}`} className='text-truncate w-100' style={{ color: "#fff" }}>
                        <Button
                          className='btn-cart w-100'
                          color='primary'
                        >
                          <ArrowRight size={14} className='mr-25' />
                          Перейти
                        </Button>
                      </Link>
                    </div>
                  </Card>
                  {editLesson == lesson.id && <EditLesson lesson={lesson} onClose={() => setEditLesson(0)} key={lesson.id} />}
                  <ModalDeleteLesson lesson={lesson.id} open={deleteModal == lesson.id} onClose={() => setDeleteModal(0)} />
                </Fragment>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lessons
