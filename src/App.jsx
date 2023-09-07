import { createContext, useState } from 'react';

import CreateRow from './components/CreateRow';
import ListRowTable from './components/ListRowTable';
import { useTheme } from './theme/useTheme';
import EditRowModal from './components/EditRowModal';

import './App.css';

export const FormDataContext = createContext('');

function App() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    subscription: 'Subscribed',
    employment: 'Unemployed',
  });

  const [fetchFormData, setFetchFormData] = useState(
    JSON.parse(localStorage.getItem('formData')) || [],
  );

  return (
    <div className={`wrapper ${theme}`}>
      <FormDataContext.Provider
        value={{
          fetchFormData,
          setFetchFormData,
          selectedRow,
          setSelectedRow,
          isOpenModal,
          setIsOpenModal,
          formData,
          setFormData,
          theme,
          toggleTheme,
        }}>
        <CreateRow />
        <ListRowTable />
        {isOpenModal && <EditRowModal />}
      </FormDataContext.Provider>
    </div>
  );
}

export default App;
