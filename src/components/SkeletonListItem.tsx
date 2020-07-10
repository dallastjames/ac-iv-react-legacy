import React from 'react';
import { IonLabel, IonItem, IonSkeletonText } from '@ionic/react';

const SkeletonListItem: React.FC = () => (
  <IonItem>
    <IonLabel>
      <h2>
        <IonSkeletonText animated style={{ width: '60%' }} />
      </h2>
      <p>
        <IonSkeletonText animated />
      </p>
    </IonLabel>
  </IonItem>
);
export default SkeletonListItem;
