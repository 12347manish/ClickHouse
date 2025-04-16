import React from 'react';

const ConnectionForm = ({ source, config, setConfig }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setConfig({ ...config, [name]: value });
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">{source} Connection</h2>

      {source === 'ClickHouse' ? (
        <>
          <input name="host" placeholder="Host" onChange={handleChange} className="input" />
          <input name="port" placeholder="Port" onChange={handleChange} className="input" />
          <input name="database" placeholder="Database" onChange={handleChange} className="input" />
          <input name="user" placeholder="User" onChange={handleChange} className="input" />
          <input name="jwt" placeholder="JWT Token" onChange={handleChange} className="input" />
        </>
      ) : (
        <>
          <input name="delimiter" placeholder="Delimiter" onChange={handleChange} className="input" />
          <input type="file" name="file" onChange={(e) => setConfig({ ...config, file: e.target.files[0] })} />
        </>
      )}
    </div>
  );
};

export default ConnectionForm;
