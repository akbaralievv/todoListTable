import { useContext, useState } from 'react';
import { Switch, Checkbox } from 'antd';

import { FormDataContext } from '../App';
import arrow from '../assets/arrow.png';

function CreateRowFrom() {
  const { fetchFormData, setFetchFormData, setFormData, formData, toggleTheme } =
    useContext(FormDataContext);

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectValue, setSelectValue] = useState('Subscribed');

  const isFormValid = () => {
    const { name, age, subscription, employment } = formData;
    return name && age && subscription && employment;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const updatedFormData = [...fetchFormData, formData];
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      setFetchFormData(updatedFormData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 'Employed' : 'Unemployed') : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSelect = (item) => {
    setFormData({ ...formData, subscription: item });
    setSelectValue(item);
    setIsOpenOptions(false);
  };

  const handleIncrement = () => {
    setFormData({ ...formData, age: Math.max(18, formData.age + 1) });
  };

  const handleDecrement = () => {
    setFormData({ ...formData, age: Math.max(18, formData.age - 1) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <div className="input-number">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
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
              {['Subscribed', 'Not Subscribed', 'Other'].map((item) => (
                <li key={item} onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Checkbox name="employment" onChange={handleChange}>
        Employed
      </Checkbox>
      <button type="submit" className="buttons">
        Insert
      </button>
      <hr />
      <label className="toggle-theme">
        <Switch onChange={toggleTheme} />
        <span>Mode</span>
      </label>
    </form>
  );
}

export default CreateRowFrom;
