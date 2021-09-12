import { CardBody, Card } from "reactstrap";
import { ThumbsUp, User, Sun, CreditCard } from "react-feather";
import {Table} from "../../components";

const index = () => {
    const columns = [
        {
          name: "Страница",
          selector: "page",
          sortable: true,
          maxWidth: "100px",
        },
        {
          name: "Удовольствие",
          selector: "joy",
          sortable: true,
          minWidth: "225px",
        },
        {
          name: "Полезность",
          selector: "profit",
          sortable: true,
          minWidth: "310px",
        }
      ];
    const data = [{ page: "2" }, { page: "2" }];
    
    return (
    <>
      <h1>Статистика</h1>
      <hr />
      <div className="d-flex justify-content-between flex-wrap mt-4">
        <Card className="col-2 text-center">
          <CardBody>
            <User className="mt-1" />
            <div className="mt-2">Пользователей</div>
          </CardBody>
        </Card>
        <Card className="col-2 text-center">
          <CardBody>
            <Sun className="mt-1" />
            <div className="mt-2">С попыткой оплатить</div>
          </CardBody>
        </Card>
        <Card className="col-2 text-center">
          <CardBody>
            <CreditCard className="mt-1" />
            <div className="mt-2">Оплат</div>
          </CardBody>
        </Card>
        <Card className="col-2 text-center">
          <CardBody>
            <ThumbsUp className="mt-1" />
            <div className="mt-2">Закончило</div>
          </CardBody>
        </Card>
      </div>
      <h2>Рейтинг страниц</h2>
      <Table data={data} columns={columns} />
      <h2>Скачать сырые данные</h2>
    </>
  );
};

export default index;
