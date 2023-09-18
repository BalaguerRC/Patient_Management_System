import { LoadingButton } from "@mui/lab";
import { Button, Chip, TableCell } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableTestResultByPatient = ({
  idLabTest,
  patient,
  labTest,
  state,
  RadioSelect,
  idMedicalAppointment,
  token,
}) => {
  const [time, setTime] = useState(false);
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
      headers: {
        Authorization: "Bearer " + token,
      },
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
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
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
        {time ? (
          <LoadingButton loading variant="outlined">
            complete appointment
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            disabled={state === "completed" ? true : false}
            type="submit"
            onClick={() => {
              setTime(!time);
              setTimeout(() => {
                setTime(time);
                complete_MA(idMedicalAppointment, idLabTest);
              }, 1000);
            }}
          >
            complete appointment
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default TableTestResultByPatient;
