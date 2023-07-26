import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddMA = () => {
    const navigate = useNavigate();
    return (
        <div>
            Add Medical Appointments
            <Button onClick={()=>navigate("/medicalAppointments")}>Back</Button>
        </div>
    );
}

export default AddMA;
