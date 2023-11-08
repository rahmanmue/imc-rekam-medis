import { LayoutBack } from "../../components";
import DataTable from "react-data-table-component";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { customStyles, paginationComponentOptions } from "../../utils";
import { useState, useMemo, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDeleteUser, useSubscribeUser } from "../../hooks";
import { Loading } from "../../components";
import { Link } from "react-router-dom";

function Index() {
  const { dataUser, loadingUser, errorUser } = useSubscribeUser();
  if (errorUser) console.error(errorUser);

  const [filterText, setFilterText] = useState("");
  const filteredItems = dataUser?.user_medis?.filter(
    (item) =>
      item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())
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

  const { deleteUser } = useDeleteUser();

  const handleHapusUser = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Data yang dihapus tidak bisa dipulihkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser({
          variables: {
            _eq: id,
          },
        })
          .then(({ data }) => {
            const affected_rows = data.user_medis.affected_rows;
            if (affected_rows) {
              swal("Data Berhasil Dihapus!", {
                icon: "success",
              });
            }
          })
          .catch((err) => console.error(err));
        // console.log(id);
      } else {
        swal("Data Tidak Dihapus!");
      }
    });
  };

  const columnsListAkun = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "30%",
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      maxWidth: "25%",
    },
    {
      name: "No. Rekam Medis",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "18%",
    },
    {
      name: "Status Akun",
      selector: (row) => (
        <span className="text-uppercase">{row.user_role}</span>
      ),
      maxWidth: "15%",
      center: true,
    },
    {
      name: "Edit / Hapus",
      center: true,
      cell: (row) => (
        <div className="d-flex gap-3">
          <Link to={`/list-akun/edit/${row.id}`}>
            <FaEdit className="text-warning fs-4 pointer" />
          </Link>
          <BsFillTrashFill
            className="text-danger fs-4 pointer"
            onClick={() => handleHapusUser(row.id)}
          />
        </div>
      ),
    },
  ];

  if (loadingUser) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="px-2">
          <DataTable
            striped={true}
            columns={columnsListAkun}
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
}

export default Index;
