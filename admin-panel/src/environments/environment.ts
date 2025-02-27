export const environment = {
  country: 'BD',
  production: false,
  baseUrl: 'https://localhost:5050',
  registerUrl: 'https://localhost:5050/Authentication/register',
  loginUrl: 'https://localhost:5050/Authentication/login',
  educationPost: (userId: string) => `https://localhost:5050/education/create/user/${userId}`
};
