import { useState } from "react";
import { Button, Form } from "reactstrap";
import { Sidebar, Input } from "../../components";
import { TheoryAction } from "../../redux/actions";
import { useParams } from "react-router-dom";

const ModalCreateTheory = ({ opened, onClose, toggleSidebar }) => {
  const defaultForm = {
    name: "",
  };
  const [form, setForm] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const { sim_id } = useParams();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await TheoryAction.create({
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
      title="Добавить новую главу теории"
      toggleSidebar={toggleSidebar}
      children={
        <Form
          className="auth-login-form mt-2"
          onSubmit={handleForm}
          onChange={changeHandler}
        >
          <Input name="name" id="name" label="Название главы" placeholder="" />
          <div className="d-flex justify-content-between flex-wrap mt-5">
            <Button color="primary">Отменить</Button>
            <Button color="primary" type="submit" onClick={onClose}>
              Добавить
            </Button>
          </div>
        </Form>
      }
    />
  );
};
export default ModalCreateTheory;
