import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UpdatePic from "../updatepic/UpdatePic";
import { FileContext } from "../../context/FileContext";

const DisplayImage = () => {
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);

  const { files, filesDispatch } = useContext(FileContext);

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3090/api/getPic");
      if (result) {
        filesDispatch({ type: "LIST_IMAGE", payload: result.data });
        setImage(result.data[0]?.image);
      }
    })();
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      {Boolean(image) ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {image && (
              <img
                style={{ width: "15rem", height: "15rem" }}
                src={`http://localhost:3090/uploads/${image}`}
                alt="profilepic"
              />
            )}
          </div>
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {edit && <UpdatePic oldpic={image} handleEdit={handleEdit} />}
            {!edit && <button onClick={handleEdit}>update</button>}
          </div>
        </>
      ) : (
        <h1>Add Image</h1>
      )}
    </>
  );
};

export default DisplayImage;
