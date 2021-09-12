import { Form, Button, Card, CardBody } from "reactstrap";
import {Input, Table} from "../../components";
import { useState } from 'react'

const index = () => {
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Тип",
      selector: "type",
      sortable: true,
      minWidth: "225px",
    },
    {
      name: "Урок",
      selector: "lesson",
      sortable: true,
      minWidth: "310px",
    },
    {
      name: "Тема",
      selector: "topic",
      sortable: true,
      minWidth: "310px",
    },
    {
      name: "Задержка",
      selector: "delay",
      sortable: true,
      minWidth: "310px",
    },
  ];

  const [form, setForm] = useState({

  });

  const data = [{ delay: "2" }, { delay: "2" }];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {};

  return (
    <>
    <h1>Триггеры</h1>
    <hr />
      <Table data={data} columns={columns} />
      <Card>
        <CardBody className="pt-0">
          <h1 className="mt-2">Добавить триггер</h1>
          <Form
            className="auth-login-form mt-2"
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <Input name="name" id="name" label="Тип" placeholder="0" />
            <Input name="name" id="name" label="Урок" placeholder="0" />
            <Input
              name="name"
              id="name"
              label="Тема письма"
              placeholder="0"
            />
            <Input
              name="name"
              id="name"
              type="textArea"
              label="Текст письма"
              placeholder="0"
            />
            <Input
              name="name"
              id="name"
              label="Задержка отправки в часах"
              placeholder="0"
            />
            <Button color="primary" type="submit" className="mt-2">
              Создать
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default index;
