import { X, Plus, ArrowRight } from 'react-feather'
import { Card, CardBody, Button } from 'reactstrap'
import '@styles/base/pages/app-ecommerce.scss'
import { Link, useParams } from 'react-router-dom'
import ModalCreateSimulator from './create'
import ModalDeleteSimulator from './delete'
import { useEffect, useState } from 'react'
import { SimulatorAction } from '../../redux/actions'
import { useSelector } from 'react-redux'

const Simulator = () => {
  const { group_id } = useParams()

  const [createModal, setCreateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(0)
  const simulators = useSelector(state => state.simulator).simulators
  useEffect(() => {
    SimulatorAction.find({ group: group_id })
  }, [group_id])
  return (
    <div>
      <ModalCreateSimulator open={createModal} onClose={() => setCreateModal(false)} />
      
      <Button
        className='btn-cart'
        color='primary'
        onClick={() => setCreateModal(true)}
      >
        <Plus size={14} className='mr-25' />
        <span className='text-truncate'>Добавить симулятор</span>
      </Button>
      <div className="ecommerce-application">
        <div className='list-view'>
          <div className='checkout-items w-100'>
            {
              simulators.length > 0 && simulators.map(simulator =>
                <Card className='ecommerce-card' key={simulator.id}>
                  <div className='item-img'>
                    <img className='img-fluid' src={simulator.logo} />
                  </div>
                  <CardBody>
                    <div className='item-name'>

                      <h4 className='mb-0'>
                        <Link to={`/simulator/${simulator.id}/lessons`}>
                          {simulator.name}
                        </Link>
                      </h4>
                      <p className="mt-1" dangerouslySetInnerHTML={{ __html: simulator.description }}>
                      </p>

                    </div>
                  </CardBody>
                  <div className='item-options text-center'>
                    <div className='item-wrapper'>
                      <div className='item-cost'>
                        <h4 className='item-price'>₽{simulator.price}</h4>
                      </div>
                    </div>
                    <Button className='mt-1 remove-wishlist' color='light' onClick={() => setDeleteModal(simulator.id)}>
                      <X size={14} className='mr-25' />
                      <span>Удалить</span>
                    </Button>
                    <Link to={`/simulator/${simulator.id}/lessons`} className='text-truncate w-100' style={{ color: "#fff" }}>
                      <Button
                        className='btn-cart w-100'
                        color='primary'

                      >
                        <ArrowRight size={14} className='mr-25' />
                        Перейти
                      </Button>
                    </Link>
                  </div>
                  <ModalDeleteSimulator simulator={simulator.id} open={deleteModal == simulator.id} onClose={() => setDeleteModal(0)} />
                </Card>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulator
