
export default {
  signup: {
    validUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      address: '100,00100,Nairobi',
      email: 'example@gmail.com',
      password: 'password100',
      confirmPassword: 'password100',
    },
    adminUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'admin@email.com',
      address: '55,01025,Kisumu',
      password: 'password100',
      confirmPassword: 'password100',
    },
    invalidUserDetails: {
      firstname: '',
      lastname: 'Jane',
      email: 'example@gmail.com',
      address: '99,00101,Eldoret',
      password: 'password',
      confirmPassword: 'pass',
    },
  },
};
