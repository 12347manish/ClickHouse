import React from 'react';

const DataPreview = ({ data }) => (
  <div className="overflow-x-auto mt-4">
    <h3 className="text-lg font-semibold mb-2">Data Preview</h3>
    <table className="table-auto w-full">
      <thead>
        <tr>
          {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataPreview;