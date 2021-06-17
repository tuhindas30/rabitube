import { useState } from "react";
import AddToPlaylistForm from "../AddToPlaylistForm/AddToPlaylistForm";
import DeleteForm from "../DeleteForm/DeleteForm";
import SaveVideoForm from "../SaveVideoForm/SaveVideoForm";
import ShareForm from "../ShareForm/ShareForm";

const ModalForm = ({ formType, handleRemoveVideo }) => {
  const [modalFormType, setModalFormType] = useState(formType);
  return (
    <div>
      {modalFormType === "SAVE_VIDEO" && (
        <SaveVideoForm setModalFormType={setModalFormType} />
      )}
      {modalFormType === "ADD_TO_PLAYLIST" && <AddToPlaylistForm />}
      {modalFormType === "SHARE_VIDEO" && <ShareForm />}
      {modalFormType === "REMOVE_VIDEO" && (
        <DeleteForm
          setModalFormType={setModalFormType}
          onRemove={handleRemoveVideo}
        />
      )}
    </div>
  );
};

export default ModalForm;
