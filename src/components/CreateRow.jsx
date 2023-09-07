import { useContext } from 'react';

import { FormDataContext } from '../App';
import CreateRowFrom from './CreateRowFrom';

function CreateRow() {
  const { fetchFormData, setFetchFormData, selectedRow, setSelectedRow, setIsOpenModal } =
    useContext(FormDataContext);

  const handleDeleteClick = () => {
    if (selectedRow !== null) {
      const updatedFormData = fetchFormData.filter((_, index) => index !== selectedRow);
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      setFetchFormData(updatedFormData);
      setSelectedRow(null);
    }
  };

  return (
    <div className="create-row">
      <p>Insert Row</p>
      <CreateRowFrom />
      <div className="buttons-change">
        <button onClick={handleDeleteClick} className="buttons">
          Delete
        </button>
        <button onClick={() => setIsOpenModal(true)} className="buttons">
          Edit
        </button>
      </div>
    </div>
  );
}

export default CreateRow;
