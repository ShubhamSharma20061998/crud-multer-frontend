import React, { useEffect, useReducer } from "react";
import ImageUpload from "./components/imageUpload/ImageUpload";
import DisplayImage from "./components/display/displayImage";
import { fileReducer } from "./reducer/filesReducer";
import { FileContext } from "./context/FileContext";
import axios from "axios";

const App = () => {
  const initialState = {
    file: [],
    serverErrors: {},
  };
  const [files, filesDispatch] = useReducer(fileReducer, initialState);
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3090/api/getPic");
      if (result) {
        console.log(result.data);
        filesDispatch({ type: "LIST_IMAGE", payload: result.data });
      }
    })();
  }, []);
  return (
    <FileContext.Provider value={{ files, filesDispatch }}>
      <div>
        {files.length == 0 ? <ImageUpload /> : null}
        <DisplayImage />
      </div>
    </FileContext.Provider>
  );
};

export default App;
