import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonLabel,
  IonItem,
  IonToast
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { logOut } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';
import TeaCategories from '../services/TeaCategories';
import SkeletonListItem from '../components/SkeletonListItem';
import TeaCategory from '../models/TeaCategory';

const Home: React.FC = () => {
  const { logout, getAccessToken } = useAuth();
  const [teaCategories, setTeaCategories] = useState<TeaCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTeaCategories = async () => {
    try {
      const accessToken = await getAccessToken();
      const teaCategories = await TeaCategories.getAll(accessToken);
      setTeaCategories(teaCategories);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeaCategories();
  }, []);

  const renderLoadingList = () => (
    <IonList data-testid="loading-list">
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <SkeletonListItem key={idx} />
      ))}
    </IonList>
  );

  const renderTeaCategoriesList = () => (
    <IonList data-testid="tea-categories-list">
      {teaCategories.map((category) => (
        <IonItem key={category.id}>
          <IonLabel className="ion-text-wrap">
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={logout} role="logout">
              <IonIcon icon={logOut} color="dark" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? renderLoadingList() : renderTeaCategoriesList()}
        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError(undefined)}
          message={error}
          buttons={[{ text: 'Done' }]}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
