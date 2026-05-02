import { useState } from 'react';
import API from './api';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Login first to upload an image.');
      return;
    }

    if (!file) {
      setMessage('Select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await API.post('/auth/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <div className="card">
      <h2>Upload Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {preview && <img src={preview} alt="Preview" className="preview-image" />}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Upload;
