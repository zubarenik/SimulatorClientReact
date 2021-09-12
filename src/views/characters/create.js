import { useState } from "react";
import { Button, Form } from "reactstrap";
import { Sidebar, Input } from "../../components";
import { CharacterAction } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { RadioInput } from "../../components";
import { CroppaInput } from "../../components";
import FormGroup from "reactstrap/lib/FormGroup";

const ModalCreateCharacter = ({ opened, onClose, toggleSidebar }) => {
  const defaultForm = {
    simulator: "",
    first_name: "",
    last_name: "",
    default_role: "",
    male: false,
    avatar: "",
  };
  const [form, setForm] = useState({
    simulator: "",
    first_name: "",
    last_name: "",
    default_role: "",
    male: false,
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const { sim_id } = useParams();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeImage = async (avatar, name) => {
    setForm({ ...form, [name] : avatar });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await CharacterAction.create({
      ...form,
      simulator: sim_id,
    });
    if (!response.ok) {
      setErrors(await response.json());
    } else {
      setErrors({});
      setForm(defaultForm);
      // onClose();
    }
  };

  return (
    <Sidebar
      open={opened}
      title="Добавить персонажа"
      toggleSidebar={toggleSidebar}
      children={
        <>
          <Form className="auth-login-form mt-2 mb-2" onSubmit={handleForm}>
            <FormGroup>
              <Input
                name="first_name"
                id="name"
                label="Имя*"
                placeholder=""
                className="mb-2"
                onChange={changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="last_name"
                id="name"
                label="Фамилия*"
                placeholder=""
                className="mb-2"
                onChange={changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="default_role"
                id="name"
                label="Роль*"
                placeholder=""
                className="mb-2"
                onChange={changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <RadioInput
                label="Пол"
                name="male"
                id="name"
                variants={[
                  { text: "Мужской", val: true },
                  { text: "Женский", val: false },
                ]}
                className="mb-2"
                onChange={changeHandler}
              />
            </FormGroup>
            <CroppaInput
              onImageChange={(img) => changeImage(img, 'avatar')}
              width={240}
              height={140}
              endWidth={880}
              endHeight={512}
            />
            <span>*обязательные поля</span>
            <div className="d-flex justify-content-between flex-wrap mt-3">
              <Button color="primary" onClick={onClose}>Отменить</Button>
              <Button color="primary" type="submit" onClick={onClose}>
                Добавить
              </Button>
            </div>
          </Form>
        </>
      }
    />
  );
};
export default ModalCreateCharacter;
