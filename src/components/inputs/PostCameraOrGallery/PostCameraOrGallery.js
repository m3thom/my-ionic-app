import React, { useState, forwardRef, useEffect } from "react";
import { CameraResultType, CameraSource } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";
import { IonIcon, IonImg } from "@ionic/react";

import convertUriToImageFile from "utils/convertUriToImageFile";
import { closeCircle } from "ionicons/icons";

import "./PostCameraOrGallery.scss";
import ImagePreview from "./components/ImagePreview";

const PostCameraOrGallery = (
  { value, initialValue, onChange, cameraOptions },
  ref
) => {
  const { getPhoto } = useCamera();

  const [previewUrls, setPreviewUrls] = useState(() => {
    return initialValue || value.map((v) => v.file_url) || [];
  });

  const takePhotoOrSelectFromGallery = async () => {
    try {
      const options = {
        quality: 5,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        ...cameraOptions,
      };

      const originalPhoto = await getPhoto(options);
      const path = originalPhoto.webPath;
      const imageFile = await convertUriToImageFile(path);

      setPreviewUrls((urls) => [...urls, path]);

      onChange && onChange([...value, { file: imageFile }]);
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  useEffect(() => {
    const emptyProp = value.length === 0;
    const hasValue = previewUrls.length > 0;
    if (emptyProp && hasValue) {
      setPreviewUrls([]);
    }
  }, [value]);

  const handleRemove = (removingIndex) => {
    setPreviewUrls((urls) => urls.filter((_, i) => i !== removingIndex));

    const newValue = [];

    value.forEach((valueObj, i) => {
      if (valueObj.id && i === removingIndex) {
        return newValue.push({ ...valueObj, _destroy: true });
      } else if (i !== removingIndex) {
        return newValue.push(valueObj);
      }
    });

    onChange && onChange(newValue);
  };

  return (
    <div className="image-preview-container">
      {previewUrls?.map((url, i) => (
        // <div key={url} className='post-image-preview__wrapper'>
        //   <IonIcon icon={closeCircle} onClick={() => handleRemove(i)} />

        //   <IonImg src={url} alt='Camera Preview' />
        // </div>

        <ImagePreview
          key={i}
          srcUrl={url}
          handleRemoveClick={() => handleRemove(i)}
        />
      ))}

      <div ref={ref} onClick={takePhotoOrSelectFromGallery} />
    </div>
  );
};

const _PostCameraOrGallery = forwardRef(PostCameraOrGallery);

_PostCameraOrGallery.defaultProps = {
  value: [],
};

export default _PostCameraOrGallery;
