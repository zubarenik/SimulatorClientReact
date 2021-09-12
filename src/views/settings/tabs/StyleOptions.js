import { Form, Button } from "reactstrap";
import {Input} from "../../../components";

const StyleOptions = ({ submitHandler, changeHandler, form }) => {
    return(<Form className="mt-2" onSubmit={submitHandler} onChange={changeHandler}>
    <Input
      name="name"
      id="name"
      type="textArea"
      label="Задайте собственные стили"
      placeholder=""
      onChange={changeHandler}
    />
    <Button color="primary" type="submit" className="mt-2">
          Изменить
        </Button>
    </Form>)
}

export default StyleOptions