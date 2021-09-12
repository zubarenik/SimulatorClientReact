import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Form,
  Ima,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Input } from "../../components";
import { SimulatorAction } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { CroppaInput } from "../../components";

const ModalCreateSimulator = ({ open, onClose }) => {
  const defaultForm = {
    name: "",
  };
  const [form, setForm] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const { group_id } = useParams();
  const changeHandler = (e) => {
    if(e.target.name == 'domain')
    {
      setForm({ ...form, [e.target.name]: e.target.value+'.2.mysimulator.ru' })
    }
    else{
      setForm({ ...form, [e.target.name]: e.target.value })
    }
    
  }
  const handleForm = async (e) => {
    e.preventDefault();
    const response = await SimulatorAction.create({ ...form, group: group_id });
    if (!response.ok) {
      setErrors(await response.json());
    } else {
      setErrors({});
      setForm(defaultForm);
      onClose();
    }
  };
  const changeImage = async (logo, preview) => {
    setForm({ ...form, logo });
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal isOpen={open} toggle={onClose} className="modal-dialog-centered">
          <ModalHeader toggle={onClose}>Создать симулятор</ModalHeader>
          <ModalBody>
          <Form className='auth-login-form mt-2' onSubmit={handleForm}>

            <FormGroup>
              <Input
                label="Название"
                onChange={changeHandler}
                required
                type='text' 
                id='name' 
                name="name" 
                errors={errors.name}
                placeholder='Название симулятора' />
            </FormGroup>
            <FormGroup>
              <Input
                label="Описание"
                onChange={changeHandler}
                required
                type='text' 
                id='description' 
                name="description" 
                errors={errors.descriprion}
                placeholder='Название симулятора' />
            </FormGroup>
            <FormGroup>
              <Input
                label="Цена"
                onChange={changeHandler}
                required
                type='number' 
                id='price' 
                name="price" 
                errors={errors.price}
                placeholder='Цена' />
            </FormGroup>
            <FormGroup>
              <label>Поддомен <span style={{color: "red"}}> *</span></label>
            <InputGroup className='mb-2' >
            <Input
                
                onChange={changeHandler}
                required
                type='text' 
                id='domain' 
                name="domain" 
                errors={errors.domain}
                placeholder='mydomain' />
              <InputGroupAddon addonType='append'>
                <InputGroupText>.2.mysimulator.ru</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            </FormGroup>
            
          </Form>
          <CroppaInput
            onImageChange={changeImage}
            width = {200}
            height = {103}
            endWidth = {880}
            endHeight = {512}


          />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleForm}>
              Создать
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default ModalCreateSimulator;
