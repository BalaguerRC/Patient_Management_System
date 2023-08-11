import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const Results = () => {
    const {id} =useParams();

    const navigate = useNavigate();
    return (
        <div>
            Results - {id}
            <Button onClick={()=>navigate("/medicalAppointments")}>BACK</Button>
        </div>
    );
}

export default Results;
