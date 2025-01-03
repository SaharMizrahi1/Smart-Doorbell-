import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FamilyMemberUpload = () => {
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const navigate = useNavigate();

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleUpload = async () => {
    if (!familyMemberName.trim()) {
      alert("Please enter the family member's name.");
      return;
    }
  
    const hasImage = images.some((image) => image !== null);
    if (!hasImage) {
      alert("Please upload at least one image.");
      return;
    }
  
    try {
      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          const formData = new FormData();
          formData.append('visitor_name', familyMemberName);
          formData.append('file', images[i]);
  
          // Log each file upload attempt
          console.log(`Uploading image ${i + 1}...`);
  
          const response = await fetch('http://localhost:8000/files/upload', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            console.log(`Image ${i + 1} uploaded successfully.`);
          } else {
            const errorData = await response.json();
            alert(`Upload failed for image ${i + 1}: ${errorData.error}`);
            return;
          }
        }
      }
  
      alert("All images uploaded successfully!");
      navigate("/welcome-back");
  
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload images.');
    }
  };
  

  const handleRemove = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <div className="family-member-upload-page">
      <div className="family-member-upload-container">
        <h2>Add a New Family Member</h2>
        <input
          type="text"
          placeholder="Enter family member's name"
          value={familyMemberName}
          onChange={(e) => setFamilyMemberName(e.target.value)}
          className="name-input"
          required
        />
        {images.map((image, index) => (
          <div key={index} className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(index, event)}
            />
            {image && (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="image-preview"
                />
                <button className="remove-button" onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </>
            )}
          </div>
        ))}
        <button className="upload-button" onClick={handleUpload}>Upload Images</button>
      </div>
    </div>
  );
};

export default FamilyMemberUpload;
