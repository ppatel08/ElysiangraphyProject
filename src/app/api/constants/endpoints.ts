import { environment } from '../../../environments/environment';

const API_URL = environment.apiEndpoint;

export const UserEndPoints = {
    LOGIN_URL: `${API_URL}/auth/login`,
};
