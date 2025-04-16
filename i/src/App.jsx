import React, { useState } from 'react';
import ConnectionForm from './components/ConnectionForm.jsx';
import TableSelector from './components/TableSelector.jsx';
import ColumnSelector from './components/ColumnSelector.jsx';
import StatusDisplay from './components/StatusDisplay.jsx';

import {
  testConnection,
  getTables,
  getColumns,
  ingestDataFromClickhouse,
  ingestDataToClickhouse,
  getFlatFileSchema,
} from './api/api';

const App = () => {
  const [source, setSource] = useState('ClickHouse');
  const [config, setConfig] = useState({});
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [status, setStatus] = useState('Idle');
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const handleConnect = async () => {
    setStatus('Connecting...');
    try {
      await testConnection(config);
      const res = await getTables({database : config.database});
      setTables(res.data.tables);
      setStatus('Connected');
    } catch (err) {
      setStatus('Connection failed');
    }
  };

  const loadColumns = async () => {
    setStatus('Fetching Columns...');
    try {
      const res = await getColumns(selectedTable, config);
      setColumns(res.data.columns);
      setStatus('Columns Loaded');
    } catch (err) {
      setStatus('Failed to load columns');
    }
  };

  const toggleColumn = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleIngest = async () => {
    setStatus('Ingesting...');
    const payload = { ...config, table: selectedTable, columns: selectedColumns };

    try {
      const res =
        source === 'ClickHouse'
          ? await ingestDataFromClickhouse(payload)
          : await ingestDataToClickhouse(payload);

      setResult(res.data.count);
      setStatus('Completed');
    } catch (err) {
      setStatus('Ingestion Failed');
    }
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setStatus('Fetching Schema...');
    try {
      const res = await getFlatFileSchema(uploadedFile);
      setColumns(res.data.schema);
      setStatus('Schema Loaded');
    } catch (err) {
      setStatus('Failed to fetch schema');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ClickHouse ⇌ Flat File Ingestion Tool</h1>

      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="radio"
            name="source"
            value="ClickHouse"
            checked={source === 'ClickHouse'}
            onChange={() => setSource('ClickHouse')}
          />{' '}
          ClickHouse
        </label>
        <label>
          <input
            type="radio"
            name="source"
            value="Flat File"
            checked={source === 'Flat File'}
            onChange={() => setSource('Flat File')}
          />{' '}
          Flat File
        </label>
      </div>

      <ConnectionForm source={source} config={config} setConfig={setConfig} />

      {source === 'ClickHouse' ? (
        <button onClick={handleConnect} className="btn">
          Connect
        </button>
      ) : (
        <input type="file" onChange={handleFileChange} className="mb-4" />
      )}

      {tables.length > 0 && source === 'ClickHouse' && (
        <>
          <TableSelector
            tables={tables}
            selectedTable={selectedTable}
            onSelect={setSelectedTable}
          />
          <button onClick={loadColumns} className="btn">
            Load Columns
          </button>
        </>
      )}

      {columns.length > 0 && (
        <>
          <ColumnSelector
            columns={columns}
            selected={selectedColumns}
            toggleColumn={toggleColumn}
          />
          <div className="flex gap-4 mt-4">
            <button onClick={handleIngest} className="btn">
              Start Ingestion
            </button>
          </div>
        </>
      )}

      <StatusDisplay status={status} result={result} />
    </div>
  );
};

export default App;
