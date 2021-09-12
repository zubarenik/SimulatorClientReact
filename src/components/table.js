import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardTitle } from "reactstrap";

const Table = ({ columns, data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Zero Configuration</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={columns}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  );
};

export default Table;
