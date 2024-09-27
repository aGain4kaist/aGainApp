import React from 'react';
import { useUser } from '../utils/UserContext';

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
    </>
  );
}

export default PartySearch;
