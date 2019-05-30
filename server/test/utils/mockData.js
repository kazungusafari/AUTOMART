
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
  login: {
    validNormalUser: {
      email: 'kazungu.safari@gmail.com',
      password: 'kazungu100',
    },
    validAdminUser: {
      email: 'lili@gmail.com',
      password: 'pedrolili100',
    },
    invalidPasswordFormat: {
      email: 'kazungu.safari@gmail.com',
      password: 'kazungu',
    },
    invalidEmailFormat: {
      email: 'kazungu.safari',
      password: 'kazungu100',
    },
    noEmail: {
      email: '',
      password: 'kazungu100',
    },
    noPassword: {
      email: 'kazungu.safari@gmail.com',
      password: '',
    },
  },

  createOrder: {
    validOrder:
      {
        carId: 5,
        status: 'availabe',
        price: 1100000,
        offeredPrice: 1100000,


      },
    wrongCarId:
      {
        carId: 50,
        status: 'availabe',
        price: 1100000,
        offeredPrice: 1100000,


      },
    missingCarPrice:
      {

        carId: 5,
        status: 'availabe',
        offeredPrice: 1100000,


      },

    missingCarId:
      {


        status: 'availabe',
        price: 110000,
        offeredPrice: 110000,


      },


  },

  createSaleAd: {
    validSaleAd:
      {
        state: 'used',
        status: 'availabe',
        price: 1100000,
        manufacturer: 'ford',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarPrice:
      {
        state: 'used',
        status: 'availabe',
        price: ' ',
        manufacturer: 'ford',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarState:
      {
        state: ' ',
        status: 'availabe',
        price: 1100000,
        manufacturer: 'toyota',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarBodyType:
      {
        state: 'used',
        status: 'availabe',
        price: 110000,
        manufacturer: 'bmw',
        model: '1 series',
        bodyType: '',

      },
    missingCarStatus:
      {
        state: 'used',
        status: ' ',
        price: 1100000,
        manufacturer: 'honda',
        model: '1300',
        bodyType: 'saloon',

      },
    invalidCarPriceFormat:
      {
        state: 'used',
        status: 'availabe',
        price: null,
        manufacturer: 'honda',
        model: '1300',
        bodyType: 'saloon',

      },
    invalidCarStateFormat:
      {
        state: 1100,
        status: 'availabe',
        price: '1100000',
        manufacturer: 'honda',
        model: '1300',
        bodyType: 'saloon',

      },
  },
};
