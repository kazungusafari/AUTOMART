import moment from 'moment';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


export default {

  registeredSaleOrders: [
    {
      id: 1,
      carId: 1,
      createdOn: dateTime,
      state: 'used',
      status: 'available',
      price: 1550000,
      priceOffered: 'BMW',
      modifiedDate: null,
    },
    {
      id: 2,
      carId: 1,
      createdOn: dateTime,
      state: 'new',
      status: 'available',
      price: 1910000,
      priceOffered: 'BMW',
      modifiedDate: null,
    },
    {
      id: 3,
      carId: 1,
      createdOn: dateTime,
      state: 'new',
      status: 'available',
      price: 2000000,
      priceOffered: 'Ford',
      modifiedDate: null,
    },
    {
      id: 4,
      carId: 1,
      createdOn: dateTime,
      state: 'used',
      status: 'sold',
      price: 1910000,
      priceOffered: 'Ford',
      modifiedDate: null,
    },
    {
      id: 5,
      carId: 1,
      createdOn: dateTime,
      state: 'new',
      status: 'sold',
      price: 3000000,
      priceOffered: 'Honda',
      modifiedDate: null,
    },
    {
      id: 6,
      carId: 1,
      createdOn: dateTime,
      state: 'new',
      status: 'available',
      price: 1200000,
      priceOffered: 'Toyota',
      modifiedDate: null,
    },
  ],
};
