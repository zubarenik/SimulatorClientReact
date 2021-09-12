import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState, Fragment } from "react";
import ModalDeleteTheory from "./delete";
import ModalEditTheory from "./edit";
import ModalCreateTheory from "./create";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { TheoryAction } from "../../redux/actions";
import { X, Edit} from 'react-feather'

const index = () => {
  const [opened, setOpened] = useState(false);

  const { sim_id } = useParams();

  const [editTheory, setEditTheory] = useState(0);
  const [deleteModal, setDeleteModal] = useState(0);
 
  const theory = useSelector((state) => state.theory).theory;
  useEffect(() => {
    TheoryAction.find({ simulator: sim_id });
    console.log(theory)
  }, [sim_id]);
  return (
    <>
      <div className="d-flex">
        <h1>Главы теории</h1>
        <Button
          className="ml-auto"
          color="primary"
          onClick={() => setOpened(!opened)}
        >
          Создать
        </Button>
      </div>
      <hr />
      <ModalCreateTheory
        opened={opened}
        toggleSidebar={() => setOpened(false)}
        onClose={() => setOpened(false)}
      />
      <div className="ecommerce-application">
        <div className="list-view">
          <div className="checkout-items w-100">
            {theory.length > 0 &&
              theory.map((theory, index) => (
                <Fragment key={theory.id}>
                  <Card className="ecommerce-card">
                    <div className="item-img">
                      {/* <img className="img-fluid" src={lesson.picture} /> */}
                    </div>
                    <CardBody>
                      <div className="item-name">
                        <h4 className="mb-0">{theory.name}</h4>
                      </div>
                    </CardBody>
                    <div className="item-options text-center">
                      <Button
                        className="mt-1 remove-wishlist"
                        color="danger"
                        onClick={() => setDeleteModal(theory.id)}
                      >
                        <X size={14} className="mr-25" />
                        <span>Удалить</span>
                      </Button>
                      <Button
                        className="mt-1 remove-wishlist"
                        color="warning"
                        onClick={() => setEditTheory(theory.id)}
                      >
                        <Edit size={14} className="mr-25" />
                        <span>Редактировать</span>
                      </Button>
                    </div>
                  </Card>
                  {editTheory == theory.id && (
                    <ModalEditTheory
                      theory={theory}
                      onClose={() => setEditTheory(0)}
                      key={theory.id}
                    />
                  )}
                  <ModalDeleteTheory
                    theory={theory.id}
                    open={deleteModal == theory.id}
                    onClose={() => setDeleteModal(0)}
                  />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
