import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust if backend is running on a different port

// ClickHouse Routes
export const testConnection = (config) =>
  axios.post(`${API_BASE_URL}/clickhouse/connect`, config);

export const getTables = (params) =>
  axios.get(`${API_BASE_URL}/clickhouse/tables`, {params});

export const getColumns = (tableName, config) =>
  axios.post(`${API_BASE_URL}/clickhouse/columns`, { table: tableName, config });

// Flat File Routes
export const getFlatFileSchema = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_BASE_URL}/flatfile/schema`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Ingestion Routes
export const ingestDataFromClickhouse = (payload) =>
  axios.post(`${API_BASE_URL}/ingest/from-clickhouse`, payload);

export const ingestDataToClickhouse = (payload) =>
  axios.post(`${API_BASE_URL}/ingest/to-clickhouse`, payload);
