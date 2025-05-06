export const environment = {
  production: true,
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://bethel-expense-tracker.vercel.app/api'
};
