import React, { useState } from 'react';
import { IonModal, IonLabel, IonButton, IonIcon } from '@ionic/react';

import './PasscodeModal.scss';
import { backspaceOutline } from 'ionicons/icons';

type PasscodeModalProps = {
  isOpen: boolean;
};

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen }) => {
  const [prompt, setPrompt] = useState('Enter Passcode');
  const [passcode, setPasscode] = useState('764');
  const [verifyPasscode, setVerifyPasscode] = useState('');
  const [error, setError] = useState('');
  const pinLength = 4;

  const handleOnDismiss = () => {};

  const append = (n: number) => {
    setError('');
    setPasscode(passcode + n.toString());
  };

  const removeLastNumber = () => {
    setPasscode(passcode.substring(0, passcode.length - 1));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleOnDismiss} cssClass="passcode-modal">
      <div className="passcode-modal-content">
        <IonLabel color="primary">{prompt}</IonLabel>
        <div className="passcode-modal-display">
          {new Array(pinLength).fill(0).map((_, i) => (
            <div key={i}>{passcode.charAt(i)}</div>
          ))}
        </div>
        <div className="passcode-modal-pinpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => (
            <IonButton key={i} fill="clear" disabled={passcode.length === pinLength} onClick={() => append(el)}>
              {el}
            </IonButton>
          ))}
          <IonButton fill="clear" disabled={true}></IonButton>
          <IonButton fill="clear" disabled={passcode.length === pinLength} onClick={() => append(0)}>
            0
          </IonButton>
          <IonButton fill="clear" onClick={removeLastNumber}>
            <IonIcon icon={backspaceOutline} />
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default PasscodeModal;
