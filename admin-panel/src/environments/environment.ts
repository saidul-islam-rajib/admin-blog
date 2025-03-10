export const environment = {
  country: 'BD',
  production: false,
  baseUrl: 'https://localhost:5050',
  registerUrl: 'https://localhost:5050/Authentication/register',
  loginUrl: 'https://localhost:5050/Authentication/login',
  educationPost: (userId: string) => `https://localhost:5050/education/create/user/${userId}`,
  getEducationDetails: (educationId: string) => `https://localhost:5050/education/get-by-id/${educationId}`,
  updateEducation: (educationId: string, userId: string) => `https://localhost:5050/education/update/${educationId}/user/${userId}`,

  getExperienceDetails: (id: string) => `https://localhost:5050/experience/get-by-id/${id}`,
  experiencePost: (userId: string) => `https://localhost:5050/experience/users/${userId}/create`,
  updateExperience: (id: string, userId: string) => `https://localhost:5050/experience/update-experience/${id}/user/${userId}`,

  getInterestDetails: (id: string) => `https://localhost:5050/interest/${id}`,
  postInterest: (userId: string) => `https://localhost:5050/interest/users/${userId}/create-interest`,
  updateInterest: (id: string, userId: string) => `https://localhost:5050/interest/update-interest/${id}/user/${userId}`,
  
  getPublicationDetails: (id: string) => `https://localhost:5050/Publication/get-by-id/${id}`,
  postPublication: (userId: string) => `https://localhost:5050/publication/users/${userId}/create-publication`,
  updatePublication: (id: string, userId: string) => `https://localhost:5050/Publication/update/${id}/user/${userId}`
};
