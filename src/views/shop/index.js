import {Button, Form, } from 'reactstrap'
import { useState, useEffect } from 'react';
import ModalCreateShop from './create'
import ModalDeleteShop from './delete'
import ModalEditShop from './edit'
import { useSelector } from 'react-redux'
import { ShopAction } from '../../redux/actions';
import { useParams } from 'react-router-dom'

const index = () => {
    const { sim_id } = useParams()
    const [opened, setOpened] = useState(false)
    const [form, setForm] = useState({})

    const [editShop, setEditShop] = useState(0)
    const [deleteShop, setDeleteShop] = useState(0)
    // const shops = useSelector(state => state.shop).shops
    
    useEffect(() => {
      ShopAction.find({ simulator: sim_id })
    }, [sim_id])

    return (
      <>
        <div className="d-flex">
          <h1>Магазин</h1>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => setOpened(!opened)}
          >
            Создать
          </Button>
        </div>
        <hr />
        <ModalCreateShop opened={opened} onClose={() => setOpened(false)} toggleSidebar={() => setOpened(false)}/>
        {/* {shops.length > 0 &&
          shops.map((shop, index) => (
            <Fragment key={shop.id}>
              <Card className="ecommerce-card col-3">
                <CardBody className="">
                  <div className="item-name ">
                    <h4 className="mb-0">Заголовок: {shop.name}</h4>
                    <h4 className="mb-0">Описание: {shop.price}</h4>
                    <h4 className="mb-0">Текст email: {shop.price}</h4>
                    <h4 className="mb-0">Цена: {shop.price}</h4>
                  </div>
                </CardBody>
                <div className=" d-flex flex-column col-10 ml-auto mr-auto mb-2">
                  <Button
                    className="mt-1 remove-wishlist"
                    color="danger"
                    onClick={() => setDeleteShop(shop.id)}
                  >
                    <X size={14} className="mr-25" />
                    <span>Удалить</span>
                  </Button>
                  <Button
                    className="mt-1 remove-wishlist"
                    color="warning"
                    onClick={() => setEditShop(shop.id)}
                  >
                    <Edit size={14} className="mr-25" />
                    <span>Редактировать</span>
                  </Button>
                </div>
              </Card>
              {editShop == shop.id && (
                <Editshopcode
                  shop={shop}
                  onClose={() => setEditShop(0)}
                  key={shop.id}
                />
              )}
              <ModalDeleteshopcode
                shop={shop.id}
                open={deleteShop == shop.id}
                onClose={() => setDeleteShop(0)}
              />
            </Fragment>
          ))} */}
      </>
    );
}

export default index