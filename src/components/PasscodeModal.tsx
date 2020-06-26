import React, { useState } from 'react';
import { IonModal, IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/react';

type PasscodeModalProps = {
  isOpen: boolean;
};

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen }) => {
  const [prompt, setPrompt] = useState('Enter Passcode');
  const [passcode, setPasscode] = useState('');
  const [verifyPasscode, setVerifyPasscode] = useState('');
  const [error, setError] = useState('');

  const handleOnDismiss = () => {};

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleOnDismiss} cssClass="passcode-modal">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>Test</div>
      </IonContent>
    </IonModal>
  );
};

export default PasscodeModal;
