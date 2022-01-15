import React, { useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { upload } from "../../functions/cloudinaryAxios.js";

function FileUpload({ images, setImages, uploading, setUploading }) {
  const { user } = useSelector((state) => ({ ...state }));
  const imageUploaded = images;

  const imageChangeHandler = (e) => {
    setUploading(true);
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const currFile = files[i];
      Resizer.imageFileResizer(
        currFile,
        720,
        720,
        "JPEG",
        100,
        0,
        (binary) => {
          upload(user.token, binary)
            .then((res) => {
              imageUploaded.push(res.data.data);
              setImages(imageUploaded);
              setUploading(false);
            })
            .catch((err) => {
              toast.error(err);
              setUploading(false);
            });
        },
        "base64"
      );
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label">
          Choose Pictures
        </label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          accept="image/*"
          multiple
          onChange={imageChangeHandler}
        />
      </div>
    </div>
  );
}

export default FileUpload;
