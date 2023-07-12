import { useParams } from 'react-router-dom';

const EditDoctor = () => {

    const {id}= useParams();
    return (
        <div>
            Edit {id}
        </div>
    );
}

export default EditDoctor;
