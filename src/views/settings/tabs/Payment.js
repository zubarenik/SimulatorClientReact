import { Form, Button, FormGroup } from "reactstrap";
import {Input} from '../../../components'

const Payment = ({ submitHandler, changeHandler, form }) => {
    return (
      <Form className="mt-2" onSubmit={submitHandler} onChange={changeHandler}>
        <FormGroup>
          <Input
            name="pay_TerminalKey"
            id="pay_TerminalKey"
            label="Terminal Key"
            placeholder=""
            className="mb-2"
            value={form.pay_TerminalKey}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="pay_EmailCompany"
            id="pay_EmailCompany"
            label="Email"
            placeholder=""
            className="mb-2"
            value={form.pay_EmailCompany}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="pay_password"
            id="pay_password"
            label="Пароль"
            placeholder=""
            className="mb-2"
            value={form.pay_password}
            />
        </FormGroup>
        <FormGroup>
          <Input
            name="vat"
            id="vat"
            type="number"
            label="Ставка налога (в цифрах)"
            placeholder=""
            value={form.vat}
            className="mb-2"
            />
        </FormGroup>
        <Button color="primary" type="submit" className="mt-2">
          Изменить
        </Button>
      </Form>
    );
}

export default Payment