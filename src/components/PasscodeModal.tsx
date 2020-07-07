import React, { useState } from 'react';
import { IonModal, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { backspaceOutline, checkmarkDoneCircle } from 'ionicons/icons';

import './PasscodeModal.scss';

type PasscodeModalProps = {
  isOpen: boolean;
  shouldCreatePasscode: boolean;
};

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, shouldCreatePasscode }) => {
  const [prompt, setPrompt] = useState(shouldCreatePasscode ? 'Create a Passcode' : 'Unlock with Passcode');
  const [passcode, setPasscode] = useState('');
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

  const submit = () => {
    // If the user has already established a passcode, short-circuit
    if (!shouldCreatePasscode) return () => {};

    if (!verifyPasscode) {
      setVerifyPasscode(passcode);
      setPasscode('');
      setPrompt('Verify Passcode');
    } else if (verifyPasscode !== passcode) {
      setVerifyPasscode('');
      setPasscode('');
      setPrompt('Create a Passcode');
      setError('Passcodes do not match');
    } else {
    }
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
        <div className="passcode-modal-error">{error}</div>
        <div className="passcode-modal-pinpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => (
            <IonButton key={i} fill="clear" disabled={passcode.length === pinLength} onClick={() => append(el)}>
              {el}
            </IonButton>
          ))}
          <IonButton fill="clear" onClick={removeLastNumber}>
            <IonIcon icon={backspaceOutline} />
          </IonButton>
          <IonButton fill="clear" disabled={passcode.length === pinLength} onClick={() => append(0)}>
            0
          </IonButton>
          <IonButton fill="clear" disabled={true} onClick={submit} role="submit">
            <IonIcon icon={checkmarkDoneCircle} />
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default PasscodeModal;
