import { X, Plus, ArrowRight, Edit, Save, ArrowUp, ArrowDown } from 'react-feather'
import { Card, CardBody, Button } from 'reactstrap'
import '@styles/base/pages/app-ecommerce.scss'
import { Link, useParams } from 'react-router-dom'
import ModalCreateSimulator from './create'
import ModalDeletePage from './delete'
import { useEffect, useState } from 'react'
import EditPage from './edit'
import { PageAction } from '../../redux/actions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Lessons = () => {
  const { lesson_id, sim_id } = useParams()

  const [createModal, setCreateModal] = useState(false)
  const [editPage, setEditPage] = useState(0)
  const [orderChanged, setOrderChanged] = useState(false)
  const pages = useSelector(state => state.page).pages
  const [deleteModal, setDeleteModal] = useState(0)
  useEffect(() => {
    PageAction.find({ lesson: lesson_id })
  }, [lesson_id])
  const reorder = (params) => {
    PageAction.reorder({ array: pages, order: params.order, index: params.index })
    setOrderChanged(true)
  }
  const reorder_server = async () => {
    const ids = pages.map(function (obj) {
      return obj.id;
    });
    const response = await PageAction.reorder_server({ ids: ids, lesson: lesson_id })
    if (response == 'ok') {
      toast.success(`Успешно обновлено`)
      setOrderChanged(false)
    }

  }
  return (
    <div>
      <ModalCreateSimulator open={createModal} onClose={() => setCreateModal(false)} />
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
        <span className='text-truncate'>Добавить страницу</span>
      </Button>
      <div className="ecommerce-application">
        <div className='list-view'>
          <div className='checkout-items w-100'>
            {
              pages.length > 0 && pages.map((page, index) =>
                <div key={page.id}>
                  <Card className='ecommerce-card gtc21'>
                    <CardBody className="justify-content-center">
                      <div className='item-name d-flex align-items-center'>
                        <div className='orderbtns mr-1 float-left'>
                          {index != 0 && <ArrowUp className='d-block cursor-pointer' onClick={() => reorder({ order: 'up', index: index })} />}
                          {index != pages.length - 1 && <ArrowDown className='d-block cursor-pointer' onClick={() => reorder({ order: 'down', index: index })} />}
                        </div>
                        <h4 className='mb-0 float-left'>
                          <Link to={`/simulator/${sim_id}/lessons/${lesson_id}/pages/${page.id}`}>
                            {page.name}
                          </Link>
                        </h4>
                        <p className="mt-1" dangerouslySetInnerHTML={{ __html: page.description }}>
                        </p>

                      </div>
                    </CardBody>
                    <div className='item-options text-center'>

                      <Button className='mt-1 remove-wishlist' color='danger' onClick={() => setDeleteModal(page.id)}>
                        <X size={14} className='mr-25' />
                        <span>Удалить</span>
                      </Button>
                      <Button className='mt-1 remove-wishlist' color='warning' onClick={() => setEditPage(page.id)}>
                        <Edit size={14} className='mr-25' />
                        <span>Редактировать</span>
                      </Button>
                      <Link to={`/simulator/${sim_id}/lessons/${lesson_id}/pages/${page.id}`} className='text-truncate w-100' style={{ color: "#fff" }}>
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
                  {editPage == page.id && <EditPage page={page} onClose={() => setEditPage(0)} />}
                  <ModalDeletePage page={page.id} open={deleteModal == page.id} onClose={() => setDeleteModal(0)} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lessons
