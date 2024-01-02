import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import ErrorComponent from "../errors/ErrorComponent";
import { FileContext } from "../../context/FileContext";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdatePic = props => {
  const { oldpic, handleEdit } = props;
  const [image, setImage] = useState(null);
  const [error, setError] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const { files, filesDispatch } = useContext(FileContext);

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3090/api/getPic");
      if (result) {
        console.log(result.data);
        filesDispatch({ type: "LIST_IMAGE", payload: result.data });
      }
    })();
  }, []);

  const handleImageUpload = image => {
    setImage(image.map(el => el.file));
  };

  const errors = {};
  const runValidation = () => {
    if (!Boolean(image)) {
      errors.image = "image is required";
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    runValidation();
    if (Object.keys(errors) == 0) {
      const formData = new FormData();
      image.forEach(file => formData.append("image", file));
      try {
        setFormErrors({});
        const result = await axios.put(
          `http://localhost:3090/api/updatePic?image=${oldpic}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if ((result.status = 200)) {
          console.log(result.data);
          filesDispatch({ type: "UPDATE_PICTURE", payload: result.data });
          setImage(null);
          handleEdit();
        }
        console.log(result.data);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {Object.keys(formErrors).length > 0 || error.length > 0 ? (
        <ErrorComponent formErrors={formErrors} serverErrors={error} />
      ) : null}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FilePond
          files={image}
          allowFileEncode={true}
          maxFileSize="5MB"
          acceptedFileTypes={["image/jpeg"]}
          onupdatefiles={handleImageUpload}
          name="image"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdatePic;
