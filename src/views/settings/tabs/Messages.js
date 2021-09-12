import { Form, Button } from "reactstrap";
import {Input} from '../../../components'
const Messages = ({ submitHandler, changeHandler, form }) => {
    return(<Form className="mt-2" onSubmit={submitHandler} onChange={changeHandler}>
    <Input
      name="name"
      id="name"
      label="Письмо"
      type="textArea"
      placeholder=""
      onChange={changeHandler}
    />
    <Button color="primary" type="submit" className="mt-2">
          Создать письмо
        </Button>
    </Form>)
}

export default Messages