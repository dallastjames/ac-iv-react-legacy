import React from 'react';
import { IonIcon } from '@ionic/react';
import background from '../assets/squircle.svg';

interface SquircleProps {
  icon: string;
  color: string;
}

const Squircle: React.FC<SquircleProps> = ({ icon, color }) => (
  <>
    <IonIcon src={background} style={{ color: color, position: 'absolute' }} />
    <IonIcon src={icon} style={{ position: 'relative', height: '48px', color: '#ffffff', paddingBottom: '7px' }} />
  </>
);

export default Squircle;
