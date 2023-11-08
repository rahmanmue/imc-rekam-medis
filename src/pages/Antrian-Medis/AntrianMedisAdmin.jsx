import { useState, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  useSubscribeAntrian,
  useSubscribeMaxAntrian,
  useUpdateManyAntrian,
  useCancelAntrian,
} from "../../hooks";
import { customStyles, paginationComponentOptions } from "../../utils";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GiCancel } from "react-icons/gi";
import { AiOutlineUser, AiOutlineCheckCircle } from "react-icons/ai";
import swal from "sweetalert";

function Index() {
  const { dataAntrian, loadingAntrian, errorAntrian } = useSubscribeAntrian();
  const { updateManyAntrian, loadingUpdateAntrian } = useUpdateManyAntrian();
  const { updateCancelAntrian } = useCancelAntrian();

  const { maxAntrian } = useSubscribeMaxAntrian();
  const max_no_antrian =
    maxAntrian?.antrian_medis_aggregate?.aggregate.max?.no_antrian;
  const [filterText, setFilterText] = useState("");

  // console.log(dataAntrian);
  // console.log(max_no_antrian);

  const filteredItemsMenunggu = dataAntrian?.antrian_medis.filter(
    (item) =>
      item.nama &&
      item.nama.toLowerCase().includes(filterText.toLowerCase()) &&
      item.status === "menunggu"
  );

  const filteredItemsDiperiksa = dataAntrian?.antrian_medis.filter(
    (item) =>
      item.nama &&
      item.nama.toLowerCase().includes(filterText.toLowerCase()) &&
      item.status === "diperiksa"
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleCancelAntrian = (id) => {
    updateCancelAntrian({
      variables: {
        _eq: id,
      },
    })
      .then()
      .catch((err) => console.error(err));
  };

  // console.log(selectedRows);
  const subHeaderComponentMemoMenunggu = useMemo(() => {
    const lengthAntrian = selectedRows.length;
    let noAntrian = max_no_antrian;

    // console.log(noAntrian);
    const handleAddAntrian = () => {
      let isAntrian = noAntrian + 1;
      const newAntrian = selectedRows.map((x) => {
        const data = {
          id: x.id,
          nama: x.nama,
          no_antrian: x.no_antrian + isAntrian,
          no_rekam_medis: x.no_rekam_medis,
          status: "diterima",
        };
        isAntrian++;
        return data;
      });

      // console.log(newAntrian);

      updateManyAntrian({
        variables: {
          objects: newAntrian,
        },
      })
        .then((data) => {
          const affected_rows = data.insert_antrian_medis?.affected_rows;
          if (affected_rows) {
            swal("Berhasil", "Antrian Diterima", "success", {
              button: true,
            });
          }
        })
        .catch((err) => console.error(err));
    };

    return (
      <div className="d-flex w-100 gap-3 justify-content-end align-items-center mb-4">
        <div className="font-primary py-1">
          <small>
            Antrian Terakhir
            <br />
            Hari Ini : {max_no_antrian}
          </small>
        </div>
        <div className="font-primary pointer  p-2 border rounded  ">
          <AiOutlineCheckCircle
            className="fs-3 shadow-btn  me-2 bg-primary-green text-white rounded-circle "
            onClick={handleAddAntrian}
          />
          {lengthAntrian} Antrian
        </div>

        <Form.Group as={Col} md="3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari Nama"
              onChange={(e) => setFilterText(e.target.value)}
            />
            <InputGroup.Text className="bg-warning">
              <AiOutlineUser />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>
    );
  }, [filterText, selectedRows]);

  const subHeaderComponentMemoDiperiksa = useMemo(() => {
    return (
      <Form.Group as={Col} md="3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Cari Nama"
            onChange={(e) => setFilterText(e.target.value)}
          />
          <InputGroup.Text className="bg-warning">
            <AiOutlineUser />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    );
  }, [filterText]);

  const columnsMenunggu = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "30%",
    },
    {
      name: "Tanggal",
      selector: (row) => row.tanggal,
    },
    {
      name: "No Rekam Medis",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "25%",
    },
    {
      name: "Status Antrian",
      selector: (row) => <span className="px-3">{row.status}</span>,
      maxWidth: "25%",
    },
    {
      name: "Tolak Antrian",
      cell: (row) => (
        <div className="px-4">
          <GiCancel
            onClick={() => handleCancelAntrian(row.no_rekam_medis)}
            className="text-danger fs-3 pointer shadow-btn rounded-circle"
          />
        </div>
      ),
    },
  ];

  const columnsDiperiksa = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "30%",
    },
    {
      name: "Tanggal",
      selector: (row) => row.tanggal,
    },
    {
      name: "No Rekam Medis",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "25%",
    },
    {
      name: "Nomor Antrian",
      selector: (row) => <span className="px-3">{row.no_antrian}</span>,
      maxWidth: "25%",
    },
  ];

  const filteredItemsDiterima = dataAntrian?.antrian_medis.filter(
    (item) =>
      item.nama &&
      item.nama.toLowerCase().includes(filterText.toLowerCase()) &&
      item.status === "diterima"
  );

  const subHeaderComponentMemoDiterima = useMemo(() => {
    return (
      <Form.Group as={Col} md="3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Cari Nama"
            onChange={(e) => setFilterText(e.target.value)}
          />
          <InputGroup.Text className="bg-warning">
            <AiOutlineUser />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    );
  }, [filterText]);

  const columnsDiterima = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "30%",
    },
    {
      name: "Tanggal",
      selector: (row) => row.tanggal,
    },
    {
      name: "No Rekam Medis",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "25%",
    },
    {
      name: "Nomor Antrian",
      selector: (row) => <span className="px-3">{row.no_antrian}</span>,
      maxWidth: "25%",
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="menunggu"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="menunggu" title="Antrian Menunggu">
          <div className="px-2">
            <DataTable
              striped={true}
              columns={columnsMenunggu}
              data={filteredItemsMenunggu}
              customStyles={customStyles}
              pagination
              selectableRows
              subHeader
              subHeaderComponent={subHeaderComponentMemoMenunggu}
              onSelectedRowsChange={handleChange}
              paginationComponentOptions={paginationComponentOptions}
            />
          </div>
        </Tab>

        <Tab eventKey="diterima" title="Antrian Diterima">
          <div className="px-2">
            <DataTable
              striped={true}
              columns={columnsDiterima}
              data={filteredItemsDiterima}
              customStyles={customStyles}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemoDiterima}
              paginationComponentOptions={paginationComponentOptions}
            />
          </div>
        </Tab>
        <Tab eventKey="diperiksa" title="Sudah Diperiksa">
          <div className="px-2">
            <DataTable
              striped={true}
              columns={columnsDiperiksa}
              data={filteredItemsDiperiksa}
              customStyles={customStyles}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemoDiperiksa}
              paginationComponentOptions={paginationComponentOptions}
            />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default Index;
