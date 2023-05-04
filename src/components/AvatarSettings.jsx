import { useMemo, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-edit';
import { toast } from 'react-hot-toast';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import PropTypes from 'prop-types';
import { db, storage } from '../firebase';
import DefaultAvatar from '../assets/avatar.png';
import './styles/AvatarSettings.css';

function AvatarSettings({ uid, username, currentAvatar }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const inputRef = useRef(null);

  const openFilePicker = () => {
    toast.dismiss();

    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      setSelectedImage(file);
    } else {
      toast.error('File must be JPEG or PNG format.');
    }

    e.target.value = null;
  };

  const handleImageCrop = (image) => {
    setResultImage(image);
  };

  const handleEditorClose = () => {
    setSelectedImage(null);
  };

  const handleUpload = async () => {
    setIsSubmitting(true);

    const avatarRef = ref(storage, `avatars/${uid}.jpg`);
    const userRef = doc(db, 'users', uid);

    await uploadString(avatarRef, resultImage, 'data_url');

    const downloadUrl = await getDownloadURL(avatarRef);

    await updateDoc(userRef, {
      avatarUrl: downloadUrl,
    });

    setSelectedImage(null);
    setIsSubmitting(false);
    toast.success('Your avatar was changed successfully.');
  };

  const handleDelete = async () => {
    const avatarRef = ref(storage, `avatars/${uid}.jpg`);
    const userRef = doc(db, 'users', uid);

    await deleteObject(avatarRef);

    await updateDoc(userRef, {
      avatarUrl: deleteField(),
    });

    toast.success('Your avatar was deleted successfully.');
  };

  const editorSrc = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : null),
    [selectedImage]
  );

  return (
    <div className="AvatarSettings">
      <p className="AvatarSettings-title">Avatar</p>
      <div className="AvatarSettings-mainContainer">
        <div className="AvatarSettings-workspace">
          {!selectedImage && (
            <img
              className="AvatarSettings-userAvatar"
              src={currentAvatar || DefaultAvatar}
              alt="Current avatar"
              style={{ height: currentAvatar ? 200 : 100 }}
            />
          )}

          {selectedImage && (
            <>
              <div className="AvatarSettings-editorContainer">
                <div className="AvatarSettings-editorWrapper">
                  <AvatarEditor
                    height={400}
                    src={editorSrc}
                    backgroundColor="transparent"
                    shadingColor="black"
                    shadingOpacity={0.4}
                    onCrop={handleImageCrop}
                    onClose={handleEditorClose}
                    exportMimeType="image/jpeg"
                    exportQuality={0.8}
                    exportSize={250}
                    exportAsSquare
                  />
                </div>
              </div>

              <aside className="AvatarSettings-workspaceAside">
                <div className="AvatarSettings-preview">
                  <img
                    className="AvatarSettings-previewAvatar"
                    src={resultImage}
                    alt="Avatar preview"
                  />
                  <p className="AvatarSettings-previewUsername">{username}</p>
                </div>
              </aside>
            </>
          )}
        </div>

        <div className="AvatarSettings-toolbar">
          {!selectedImage && (
            <>
              <button
                className="AvatarSettings-greenButton"
                type="button"
                onClick={openFilePicker}
              >
                Select new avatar
              </button>
              <button
                className="AvatarSettings-redButton"
                type="button"
                style={{ pointerEvents: currentAvatar ? 'initial' : 'none' }}
                onClick={handleDelete}
              >
                Remove
              </button>
            </>
          )}

          {selectedImage && (
            <>
              <button
                className="AvatarSettings-greenButton"
                type="button"
                style={{
                  opacity: isSubmitting ? 0.5 : 'initial',
                  pointerEvents: isSubmitting ? 'none' : 'initial',
                }}
                onClick={handleUpload}
              >
                Save avatar
              </button>
              <button
                className="AvatarSettings-redButton"
                type="button"
                onClick={handleEditorClose}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <p className="AvatarSettings-notice">
        Avatars must be <abbr>JPEG</abbr> or <abbr>PNG</abbr> format.
      </p>

      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

AvatarSettings.propTypes = {
  uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  currentAvatar: PropTypes.string,
};

AvatarSettings.defaultProps = {
  currentAvatar: null,
};

export default AvatarSettings;
