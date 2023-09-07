import { useContext, useState } from 'react';
import { Checkbox } from 'antd';

import { FormDataContext } from '../App';
import arrow from '../assets/arrow.png';

function EditRowModal() {
  const { fetchFormData, setFetchFormData, selectedRow, setIsOpenModal, isOpenModal } =
    useContext(FormDataContext);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectValue, setSelectValue] = useState('Subscribed');
  const [editedData, setEditedData] = useState({
    name: '',
    age: '',
    subscription: 'Subscribed',
    employment: 'Unemployed',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 'Employed' : 'Unemployed') : value;
    setEditedData({ ...editedData, [name]: newValue });
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (editedData.name && editedData.age) {
      const updatedFormData = [...fetchFormData];
      updatedFormData[selectedRow] = editedData;

      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      setFetchFormData(updatedFormData);
      onClose();
    }
  };

  const handleIncrement = () => {
    setEditedData({ ...editedData, age: +editedData.age + 1 });
  };

  const handleDecrement = () => {
    if (editedData.age > 18) {
      setEditedData({ ...editedData, age: +editedData.age - 1 });
    }
  };

  return (
    <div className={`modal ${isOpenModal ? 'open' : ''}`}>
      <div className="create-row modal-row">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSaveClick}>
          <p>Edit Row</p>
          <div className="inputs-form">
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <div className="input-number">
              <input
                type="number"
                name="age"
                value={editedData.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
              <div className="arrow">
                <div onClick={handleDecrement}>
                  <img src={arrow} alt="" />
                </div>
                <div onClick={handleIncrement}>
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>
            <div className="select">
              <div className="select-input" onClick={() => setIsOpenOptions(!isOpenOptions)}>
                <input type="text" readOnly value={selectValue} name="subscription" />
                <div>
                  <img src={arrow} alt="" />
                </div>
              </div>
              {isOpenOptions && (
                <ul className="options">
                  {['Subscribed', 'Not Subscribed', 'Other'].map((item, id) => (
                    <li
                      key={id}
                      onClick={() => {
                        setSelectValue(item);
                        setIsOpenOptions(false);
                      }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Checkbox name="employment" onChange={handleInputChange}>
            Employed
          </Checkbox>
          <button type="submit" className="buttons">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRowModal;
