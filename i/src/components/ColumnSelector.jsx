import React from 'react';

const ColumnSelector = ({ columns, selected, toggleColumn }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Select Columns</h3>
    {columns.map((col, idx) => (
      <label key={idx} className="block">
        <input type="checkbox" checked={selected.includes(col)} onChange={() => toggleColumn(col)} /> {col}
      </label>
    ))}
  </div>
);

export default ColumnSelector;