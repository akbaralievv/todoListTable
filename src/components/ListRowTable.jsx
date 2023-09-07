import { useContext } from 'react';

import { FormDataContext } from '../App';

function ListRowTable() {
  const { fetchFormData, selectedRow, setSelectedRow } = useContext(FormDataContext);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="table">
      <div className="table-header">
        <table>
          <colgroup>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <col key={index} style={{ width: '150px' }} />
              ))}
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Subscription</th>
              <th>Employment</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="table-body">
        <table>
          <colgroup>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <col key={index} style={{ width: '150px' }} />
              ))}
          </colgroup>
          <tbody>
            {fetchFormData?.length > 0 ? (
              fetchFormData.map((item, id) => (
                <tr
                  key={id}
                  onClick={() => handleRowClick(id)}
                  className={id === selectedRow ? 'selected-row' : ''}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.subscription}</td>
                  <td>{item.employment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="null">
                  <p>Здесь пока ничего нет!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRowTable;
