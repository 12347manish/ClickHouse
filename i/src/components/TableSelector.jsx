import React from 'react';

const TableSelector = ({ tables, selectedTable, onSelect }) => (
  <div className="mb-4">
    <label className="block mb-2 font-semibold">Select Table</label>
    <select value={selectedTable} onChange={(e) => onSelect(e.target.value)} className="input">
      <option value="">-- Select a table --</option>
      {tables.map((table, idx) => (
        <option key={idx} value={table}>{table}</option>
      ))}
    </select>
  </div>
);

export default TableSelector;