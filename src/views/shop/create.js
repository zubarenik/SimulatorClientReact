import { useState } from "react";
import { Button, Form } from "reactstrap";
import { Sidebar, Input, CroppaInput } from "../../components";
import { CharacterAction } from "../../redux/actions";
import { useParams } from "react-router-dom";

const ModalCreateShop = ({ opened, onClose, toggleSidebar }) => {
  const defaultForm = {
  };
  const [form, setForm] = useState({
  });

  const [errors, setErrors] = useState({});
  const { sim_id } = useParams();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeImage = (image, preview) => {
    setForm({...form, image})
  }

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
      title="Добавить магазин"
      toggleSidebar={toggleSidebar}
      children={
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleForm}
          onChange={changeHandler}
        >
          <CroppaInput
            onImageChange={changeImage}
            width = {240}
            height = {140}
            endWidth = {880}
            endHeight = {512}
          />
          <Input name="name" id="name" label="Заголовок" placeholder="" className="mb-2"/>
          <Input name="name" id="name" label="Описание" placeholder="" className="mb-2"/>
          <Input name="name" id="name" label="Цена" placeholder="0" className="mb-2"/>
          <Input name="name" id="name" label="Текст email" placeholder="" className="mb-2"/>
          <div className="d-flex justify-content-between flex-wrap mt-5">
            <Button color="primary" onClick={onClose}>Отменить</Button>
            <Button color="primary" type="submit">
              Добавить
            </Button>
          </div>
        </Form>
      }
    />
  );
};
export default ModalCreateShop;
