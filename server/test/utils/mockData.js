
export default {
  signup: {
    validUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      address: '100,11000,Nairobi',
      email: 'example@gmail.com',
      password: 'password100',
      confirmPassword: 'password100',
    },
    adminUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'admin@email.com',
      address: '55,11025,Kisumu',
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
      email: 'example@gmail.com',
      password: 'password100',
    },
    validAdminUser: {
      email: 'admin@email.com',
      password: 'password100',
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
  createFlag: {
    validFlag:
      {
        carId: 4,
        reason: 'weird pricing',
        description: 'Too expensive.Dont buy',

      },

    wrongCarId:
      {
        carId: 40,
        reason: 'weird pricing',
        description: 'Too expensive.Dont buy',



      },
    missingReason:
      {

        carId: 4,
        description: 'Too expensive.Dont buy',
        client: 1,


      },

    missingCarId:
      {

        reason: 'weird pricing',
        description: 'Too expensive.Dont buy',
        client: 1,


      },
    normalUser: {
      firstname: 'John',
      lastname: 'Doe',
      address: '100,11000,Nairobi',
      email: 'createflag@gmail.com',
      password: 'password100',
      confirmPassword: 'password100',
    },


  },
  createOrder: {
    validOrder:
      {
        carId: 5,
        status: 'pending',
        price: 1100000,
        offeredPrice: 1100000,
        owner: 1,
      },

    wrongCarId:
      {
        carId: 50,
        status: 'pending',
        price: 1100000,
        offeredPrice: 1100000,
        owner: 1,


      },
    missingCarPrice:
      {

        carId: 4,
        status: 'pending',
        offeredPrice: 1100000,


      },

    missingCarId:
      {


        status: 'pending',
        price: 110000,
        offeredPrice: 110000,


      },


  },

  createSaleAd: {
    validSaleAd1:
      {
        state: 'new',
        status: 'availabe',
        price: 1100000,
        manufacturer: 'BMW',
        model: 'i series',
        bodyType: 'saloon',

      },
    validSaleAd2:
      {
        state: 'new',
        status: 'availabe',
        price: 1500000,
        manufacturer: 'Honda',
        model: 'mustang',
        bodyType: 'saloon',

      },
    validSaleAd3:
      {
        state: 'new',
        status: 'available',
        price: 1600000,
        manufacturer: 'Suzuki',
        model: 'mustang',
        bodyType: 'saloon',

      },
    validSaleAd4:
      {
        state: 'used',
        status: 'available',
        price: 1900000,
        manufacturer: 'ford',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarPrice:
      {
        state: 'used',
        status: 'available',
        price: ' ',
        manufacturer: 'ford',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarState:
      {
        state: ' ',
        status: 'available',
        price: 1100000,
        manufacturer: 'toyota',
        model: 'mustang',
        bodyType: 'saloon',

      },
    missingCarBodyType:
      {
        state: 'used',
        status: 'available',
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
