export const environment = {
  country: 'BD',
  production: false,
  baseUrl: 'https://localhost:5050',
  registerUrl: 'https://localhost:5050/Authentication/register',
  loginUrl: 'https://localhost:5050/Authentication/login',
  // educationPost: 'https://localhost:5050/education/users/1EC6473A-3C18-49A5-A460-986879BB9CBE/create',
  educationPost: (userId: string) => `https://localhost:5050/education/users/${userId}/create`
};
