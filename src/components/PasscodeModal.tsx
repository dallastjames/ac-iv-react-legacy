import React from 'react';
import { IonModal } from '@ionic/react';

type PasscodeModalProps = {
  isOpen: boolean;
};

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen }) => {
  const handleOnDismiss = () => {};

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleOnDismiss}>
      <div>Hello</div>
    </IonModal>
  );
};

export default PasscodeModal;
