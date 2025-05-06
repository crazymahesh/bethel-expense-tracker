export const environment = {
  production: false,
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://bethel-expense-tracker.vercel.app/api',
};
