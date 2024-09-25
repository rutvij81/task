import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '',
    gender: '',
    image: null,
  });

  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('records'));
    if (storedRecords) setRecords(storedRecords);
  }, []);


  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.birthday || !formData.gender) {
      alert('All fields are required');
      return;
    }

    if (editIndex !== null) {
      const updatedRecords = records.map((record, index) =>
        index === editIndex ? formData : record
      );
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, formData]);
    }

    setFormData({
      name: '',
      email: '',
      birthday: '',
      gender: '',
      image: null,
    });
  };

  const handleEdit = (index) => {
    const record = records[index];
    setFormData(record);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      birthday: '',
      gender: '',
      image: null,
    });
  };

  return (
    <div className="container">
      <h2>Form & Table</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Birthday: </label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender: </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleInputChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleInputChange}
              required
            />
            Female
          </label>
        </div>
        <div className="form-group">
          <label>Image: </label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>

      <h3>Records Table</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.birthday}</td>
              <td>{record.gender}</td>
              <td>
                {record.image && (
                  <img src={record.image} alt="Uploaded" width="50" height="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;