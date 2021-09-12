import { Button, Form, CardBody, Card } from "reactstrap";
import { X, Edit } from "react-feather";
import { useState, useEffect, Fragment } from "react";
import { Input, RadioInput, Sidebar } from "../../components";
import ModalCreateCharacter from "./create";
import ModalDeleteCharacter from "./delete";
import EditCharacter from "./edit";
import { CharacterAction } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const index = () => {
  const { sim_id } = useParams();
  const [createModal, setCreateModal] = useState(false);
  const [editCharacter, setEditCharacter] = useState(0);
  const [deleteModal, setDeleteModal] = useState(0);

  const characters = useSelector((state) => state.characters).characters;
  useEffect(() => {
    CharacterAction.find({ simulator: sim_id });
  }, [sim_id]);

  return (
    <>
      <div className="d-flex">
        <h1>Персонажи</h1>
        <Button
          className="ml-auto"
          color="primary"
          onClick={() => setCreateModal(!createModal)}
        >
          Создать
        </Button>
      </div>
      <hr />
      <ModalCreateCharacter
        onClose={() => setCreateModal(false)}
        opened={createModal}
        toggleSidebar={() => setCreateModal(false)}
      />
      <div className="ecommerce-application">
        <div className="list-view">
          <div className="checkout-items w-100">
            {characters.length > 0 &&
              characters.map((character, index) => (
                <Fragment key={character.id}>
                  <Card className="ecommerce-card">
                    <div className="item-img">
                      <img className="img-fluid" src={character.avatar} />
                    </div>
                    <CardBody>
                      <div className="item-name">
                        <h4>
                          {character.first_name}&nbsp;{character.last_name}
                        </h4>
                        <p className="mt-1">
                          {character.male ? "Мужчина" : "Женщина"},&nbsp;
                          {character.default_role}
                        </p>
                      </div>
                    </CardBody>
                    <div className="item-options text-center">
                      <div className="item-wrapper">
                        <div className="item-cost">
                          {/* <h4 className="item-price">р</h4> */}
                        </div>
                      </div>
                      <Button
                        className="mt-1 remove-wishlist"
                        color="danger"
                        onClick={() => setDeleteModal(character.id)}
                      >
                        <X size={14} className="mr-25" />
                        <span>Удалить</span>
                      </Button>
                      <Button
                        className="mt-1 remove-wishlist"
                        color="warning"
                        onClick={() => setEditCharacter(character.id)}
                      >
                        <Edit size={14} className="mr-25" />
                        <span>Редактировать</span>
                      </Button>
                    </div>
                  </Card>
                  {editCharacter == character.id && (
                    <EditCharacter
                      character={character}
                      onClose={() => setEditCharacter(0)}
                      key={character.id}
                    />
                  )}
                  <ModalDeleteCharacter
                    character={character.id}
                    open={deleteModal == character.id}
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
