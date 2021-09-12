import {Button, Form, CardBody, Card} from 'reactstrap'
import { X, Edit, Plus, ArrowRight, ArrowUp, ArrowDown, Save} from 'react-feather'
import {Sidebar, Input} from '../../components';
import ModalCreatePromocode from './create'
import ModalDeletePromocode from './delete'
import EditPromocode from './edit'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { PromocodeAction } from '../../redux/actions';

const index = () => {
    const [opened, setOpened] = useState(false)
    const { sim_id } = useParams()

    const [editPromocode, setEditPromocode] = useState(0)
    const [deleteModal, setDeleteModal] = useState(0)
    const promocodes = useSelector(state => state.lesson).promocodes
    

    useEffect(() => {
      PromocodeAction.find({ simulator: sim_id })
    }, [sim_id])

    return (
      <>
        <div className="d-flex">
          <h1>Промокоды</h1>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => setOpened(!opened)}
          >
            Создать
          </Button>
        </div>
        <hr />
        <ModalCreatePromocode
          opened={opened}
          toggleSidebar={() => setOpened(false)}
          onClose={() => setOpened(false)}
        />

        {/* {promocodes.length > 0 &&
          promocodes.map((promo, index) => (
            <Fragment key={promo.id}>
              <Card className="ecommerce-card col-3">
                <CardBody className="">
                  <div className="item-name ">
                    <h4 className="mb-0">Slug: {promo.name}</h4>
                    <h4 className="mb-0">Текст: {promo.price}</h4>
                    <h4 className="mb-0">Цена: {promo.price}</h4>
                    <h4 className="mb-0">Usage limit: {promo.price}</h4>
                    <h4 className="mb-0">Usage count: {promo.price}</h4>
                  </div>
                </CardBody>
                <div className=" d-flex flex-column col-10 ml-auto mr-auto mb-2">
                  <Button
                    className="mt-1 remove-wishlist"
                    color="danger"
                    onClick={() => setDeleteModal(promo.id)}
                  >
                    <X size={14} className="mr-25" />
                    <span>Удалить</span>
                  </Button>
                  <Button
                    className="mt-1 remove-wishlist"
                    color="warning"
                    onClick={() => setEditPromocode(promo.id)}
                  >
                    <Edit size={14} className="mr-25" />
                    <span>Редактировать</span>
                  </Button>
                </div>
              </Card>
              {editPromocode == lesson.id && (
                <EditPromocode
                  promo={promo}
                  onClose={() => setEditPromocode(0)}
                  key={promo.id}
                />
              )}
              <ModalDeletePromocode
                promo={promo.id}
                open={deleteModal == promo.id}
                onClose={() => setDeleteModal(0)}
              />
            </Fragment>
          ))} */}
      </>
    );
}

export default index