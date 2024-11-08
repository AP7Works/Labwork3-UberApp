import Auth0 from 'react-native-auth0';
import { authConfig } from './authConfig'; // Now inside the same folder

const auth0 = new Auth0({
  clientId: authConfig.clientId,
  domain: authConfig.domain,
});

export default auth0;
