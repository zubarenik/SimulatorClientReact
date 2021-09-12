import {  Card, CardBody } from "reactstrap";
import {Table} from "../../components";
import { useState } from 'react'


const index = () => {
    const columns = [
      {
        name: "Имя",
        selector: "name",
        sortable: true,
        maxWidth: "100px",
      },
      {
        name: "Фамилия",
        selector: "surname",
        sortable: true,
        minWidth: "225px",
      },
      {
        name: "email",
        selector: "email",
        sortable: true,
        minWidth: "310px",
      },
      {
        name: "utm",
        selector: "utm",
        sortable: true,
        minWidth: "310px",
      },
      {
        name: "Оплачен",
        selector: "payed",
        sortable: true,
        minWidth: "310px",
      },
      {
        name: "Закончен",
        selector: "passed",
        sortable: true,
        minWidth: "310px",
      },
      {
        name: "Зарегистрировался",
        selector: "registrated",
        sortable: true,
        minWidth: "310px",
      },
    ];
    const [form, setForm] = useState({

    });
  
    const data = [{ name: "2" }, { registrated: "2" }];
  
  
    const handleSubmit = () => {};
    return (
      <>
        <h1>Список пользователей</h1>
        <hr />
        <Table data={data} columns={columns} />
        <Card>
          <CardBody className="pt-0">
            <h1 className="mt-2">Список страниц всех пользователей</h1>
          </CardBody>
        </Card>
      </>
    );
}

export default index