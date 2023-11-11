import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useSubscribeAntrian, useFinishMedis } from "../../hooks";
import { customStyles, paginationComponentOptions } from "../../utils";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineUser, AiOutlineCheckCircle } from "react-icons/ai";
import { Loading } from "../../components";

function Index() {
  const { dataAntrian, loadingAntrian, errorAntrian } = useSubscribeAntrian();
  const { updateFinishMedis } = useFinishMedis();

  const [filterText, setFilterText] = useState("");
  const filteredItemsDiterima = dataAntrian?.antrian_medis.filter(
    (item) =>
      item.nama &&
      item.nama.toLowerCase().includes(filterText.toLowerCase()) &&
      item.status === "diterima"
  );

  const handleFinishAntrian = (id) => {
    updateFinishMedis({
      variables: {
        _eq: id,
      },
    })
      .then((data) => {
        const affected_rows = data?.update_antrian_medis.affected_rows;
        if (affected_rows) {
          swal("Berhasil", "Antrian Sudah Diperiksa", "success", {
            button: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

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
    {
      name: "Sudah Diperiksa",
      cell: (row) => (
        <div className="px-4">
          <AiOutlineCheckCircle
            onClick={() => handleFinishAntrian(row.no_rekam_medis)}
            className="text-success fs-3 pointer shadow-btn rounded-circle"
          />
        </div>
      ),
    },
  ];

  if (loadingAntrian) {
    return <Loading />;
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default Index;
