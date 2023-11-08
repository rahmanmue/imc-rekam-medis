import { LayoutBack } from "../../components";
import DataTable from "react-data-table-component";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillTrashFill, BsInfoCircle } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { customStyles, paginationComponentOptions } from "../../utils";
import { useState, useMemo } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSubscribeUser } from "../../hooks";
import { Link } from "react-router-dom";

function Index() {
  // Riwayat pasien berdasarkna user riwayat pasien aktif
  const { dataUser, loadingUser, errorUser } = useSubscribeUser();
  if (errorUser) console.error(errorUser);
  // console.log(dataUser);

  const [filterText, setFilterText] = useState("");
  const filteredItems = dataUser?.user_medis.filter(
    (item) =>
      item.nama &&
      item.nama.toLowerCase().includes(filterText.toLowerCase()) &&
      item.user_role === "pasien"
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Form.Group as={Col} md="3" className="mb-3">
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

  const columnsRiwayatPasien = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "30%",
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      maxWidth: "30%",
    },
    {
      name: "No. Rekam Medis",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "18%",
    },
    {
      name: "Tambah Rekam Medis",
      center: true,
      cell: (row) => (
        <Link to={`/rekam-medis/${row.id}`}>
          <FaEdit className="text-primary fs-4 pointer" id={row.id} />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="px-2">
        <DataTable
          striped={true}
          columns={columnsRiwayatPasien}
          data={filteredItems}
          customStyles={customStyles}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </>
  );
}

export default Index;
