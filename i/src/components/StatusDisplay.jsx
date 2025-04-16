import React from 'react';

const StatusDisplay = ({ status, result }) => (
  <div className="mt-4">
    <p>Status: <strong>{status}</strong></p>
    {result && <p>Records Processed: {result}</p>}
  </div>
);

export default StatusDisplay;
