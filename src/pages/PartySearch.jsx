import React from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';

function PartySearch() {
  const { user, setUser } = useUser();
  return (
    <>
      <div>
        PartySearch
        <div>
          <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
          <button onClick={() => setUser({ name: 'John Doe' })}>
            Set User
          </button>
        </div>
      </div>
      <div id="map" style={{ width: '100%', height: '50vh' }}>
        <KakaoMap />
      </div>
    </>
  );
}

export default PartySearch;
