import { Button, Chip, TableCell } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TableTestResultByPatient = ({
  idLabTest,
  patient,
  labTest,
  state,
  RadioSelect,
  idMedicalAppointment,
}) => {
  const navigate = useNavigate();
  const complete_MA = (id_MA, id_LabTestResult) => {
    console.log(
      "IDMedicalAppointment: ",
      id_MA,
      "IDLabTestResult: ",
      id_LabTestResult
    );
    fetch(import.meta.env.VITE_APIURL + "LabTestResult/" + id_LabTestResult, {
      method: "PUT",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    fetch(
      import.meta.env.VITE_APIURL +
        "MedicalAppointment/pendingResults/" +
        id_MA,
      {
        method: "PUT",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate("/medicalAppointments");
      });
  };
  return (
    <>
      <TableCell align="right">{idLabTest}</TableCell>
      <TableCell align="right">{patient}</TableCell>
      <TableCell align="right">{labTest}</TableCell>
      <TableCell align="right">
        {state === "completed" ? (
          <Chip label={"completed"} variant="filled" color="success" />
        ) : (
          <Chip label={"pending"} variant="filled" color="warning" />
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          disabled={state === "completed" ? true : false}
          onClick={() => complete_MA(idMedicalAppointment, idLabTest)}
          size="small"
        >
          complete appointment
        </Button>
      </TableCell>
    </>
  );
};

export default TableTestResultByPatient;
