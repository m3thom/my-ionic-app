import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CameraResultType, CameraSource } from '@capacitor/core'
import { useCamera } from '@ionic/react-hooks/camera'
import { IonIcon, IonAvatar } from '@ionic/react'
import { create } from 'ionicons/icons'

import convertUriToImageFile from 'utils/convertUriToImageFile'

import './CameraOrGallery.scss'

const CameraOrGallery = ({ value, initialValue, onChange, cameraOptions }) => {
  const { getPhoto } = useCamera()
  const [previewUrl, setPreviewUrl] = useState(value || initialValue)

  const takePhotoOrSelectFromGallery = async () => {
    try {
      const options = {
        quality: 5,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        ...cameraOptions
      }

      const originalPhoto = await getPhoto(options)
      const path = originalPhoto.webPath
      const imageFile = await convertUriToImageFile(path)

      setPreviewUrl(path)

      onChange && onChange(imageFile)
    }
    catch (e) {
      console.error('ERROR', e)
    }
  }

  return (
    <div className='camera-input-basic__container'>
      <IonAvatar
        className='camera-input-basic__preview'
        onClick={takePhotoOrSelectFromGallery}
      >
        {previewUrl && <img src={previewUrl} alt='Camera Preview' />}
      </IonAvatar>

      <IonIcon
        className='camera-input-basic__edit-button'
        icon={create}
        mode='md'
        onClick={takePhotoOrSelectFromGallery}
      />
    </div>
  )
}

CameraOrGallery.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  cameraOptions: PropTypes.object,
  initialValue: PropTypes.string
}

export default CameraOrGallery
