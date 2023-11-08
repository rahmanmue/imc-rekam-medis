import React from "react";
// import { useInsertAntrian } from "../hooks";
import DataTable from "react-data-table-component";
// import { dataDummy } from "./data";
import { useSubscribeAntrian } from "../hooks";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect, useCallback } from "react";
// import { Modal } from "react-bootstrap";

function Coba() {
  // const { insertAntrian, loadingInsertAntrian } = useInsertAntrian();
  // const handleClick = (data) => () => {
  //   insertAntrian({
  //     variables: {
  //       objects: data,
  //     },
  //   })
  //     .then(({ data }) => {
  //       const affected_rows = data.insert_antrian_medis.affected_rows;
  //       if (affected_rows) {
  //         console.log("success");
  //       } else {
  //         console.log("gagal");
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };
  // const data = {
  //   id: "f5e864f4-32f5-4d22-8024-c1e6be394355",
  //   nama: "mosala",
  //   no_rekam_medis: "30383ef6",
  // };

  // Datatables
  // console.log(dataDummy);

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "No Rekam Medis",
      selector: (row) => row.no_rekam_medis,
    },
    {
      name: "Status Antrian",
      selector: (row) => row.status,
    },
    {
      name: "Nomor Antrian",
      selector: (row) => row.nomor_antrian || 0,
    },
    {
      cell: () => <button onClick={handleButtonClick}>Action</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "35px",
        // fontFamily: "Source Sans 3, sans-serif",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontFamily: '"Source Sans 3", sans-serif',
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontFamily: '"Source Sans 3", sans-serif;',
      },
    },
  };

  const { dataAntrian, loadingAntrian, errorAntrian } = useSubscribeAntrian();
  // console.log(dataAntrian?.antrian_medis);
  const data = dataAntrian?.antrian_medis || [];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    console.log(filterText);
    return (
      <input
        onChange={(e) => setFilterText(e.target.value)}
        // onClear={handleClear}
        // filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    // console.log("state", selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {
    // console.log("clicked");
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const mulaiAntrian = () => {
    const newData = selectedRows;
    console.log(newData);
    let isAntrian = 1;
    const antrianBaru = newData.map((x) => {
      const data = {
        nama: x.nama,
        no_antrian: x.no_antrian + isAntrian,
        no_rekam_medis: x.no_rekam_medis,
        status: "diterima",
        tanggal: x.tanggal,
      };
      isAntrian++;
      return data;
    });

    console.log("Baru", antrianBaru[antrianBaru.length - 1]);
  };

  return (
    <>
      <div className="container m-5 d-flex justify-content-center">
        {/* <button onClick={handleClick(data)}>Ajukan Antrian</button> */}
        <button onClick={mulaiAntrian}>Mulai Antrian</button>
        {/* <Modal /> */}
      </div>

      <div className="mx-5 px-5">
        {/* <DataTable
          title="Data Dummy"
          columns={columns}
          data={filteredItems}
          customStyles={customStyles}
          pagination
          selectableRows
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          onSelectedRowsChange={handleChange}
        /> */}
      </div>
    </>
  );
}

export default Coba;
