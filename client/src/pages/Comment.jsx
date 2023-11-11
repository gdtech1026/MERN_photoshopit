import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PHOTO } from "../utils/mutations";

import 


const UploadPhoto = ({userId}) => {
  const clientID = "17bc5b96a464d2f";
  const [photoLink, setPhotoLink] = useState("");
  const [deleteHash, setDeleteHash] = useState("");
  const [addPhoto, { error }] = useMutation(ADD_PHOTO);

  const handlePhotoUpload = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
  
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${clientID}`,
        },
        body: formData,
      });
  console.log(response);
      const photoData = await response.json();
  
      if (data.success) {
        setPhotoLink(photoData.data.link);
        setDeleteHash(photoData.data.deletehash);
      } else {
        console.error("Failed to upload image.");
      }
  
      const { data } = await addPhoto({
        variables: { userId, photoLink, deleteHash },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {photoLink && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={photoLink} alt="Uploaded" />
          <p>Delete hash: {deleteHash}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UploadPhoto;
