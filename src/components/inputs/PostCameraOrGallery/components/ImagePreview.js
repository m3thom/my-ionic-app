import { IonIcon, IonImg } from '@ionic/react'
import React from 'react'
import { closeSharp } from 'ionicons/icons'
import './ImagePreview.scss'

const ImagePreview = ({ srcUrl, handleRemoveClick }) => {

  const backgroundStyle = { backgroundImage: `url('${srcUrl}')` }

  return (
    <div key={srcUrl} style={backgroundStyle} className='image-preview-wrapper'>
      <IonIcon icon={closeSharp} onClick={handleRemoveClick} />
    </div>
  )
}

export default ImagePreview
