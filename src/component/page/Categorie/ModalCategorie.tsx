import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup } from "reactstrap";


type ModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  produit: any

};

export default function ModalCategorie({
  modal,
  setModal,
  produit
}: ModalType) {
  
  return (
    <Modal isOpen={modal}>
      <ModalHeader style={{ fontFamily: "fantasy", fontStyle: "oblique" }}>Pizza Time</ModalHeader>
      <ModalBody>
        <FormGroup style={{ fontWeight: "bolder" }}>

          {produit.nom}
        </FormGroup>
        <FormGroup>

          {produit.description}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setModal(!modal)}>
          Back
        </Button>
      </ModalFooter>

    </Modal>
  );
};
