import { useState } from "react";
import firebase from "../firebase/config";

export type FileUpload = {
  loading: boolean;
  error: boolean;
  upload: (file: File) => Promise<void>;
};

export function useFileUpload(): FileUpload {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const upload = async (file: File) => {
    setLoading(true);
    setError(false);

    const storage = firebase.storage().ref();
    const imageRef = storage.child(`images/${file.name}`);
    const url = await imageRef
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .catch((err) => setError(true));
    setLoading(false);

    return url;
  };

  return {
    loading,
    error,
    upload,
  };
}
