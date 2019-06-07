import moment from 'moment';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


export default {

  registeredSaleOrders: [
    {
      id: 1,
      carId: 1,
      owner: 2,
      createdOn: dateTime,
      status: 'pending',
      price: 1550000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 2,
      carId: 1,
      owner: 1,
      createdOn: dateTime,
      status: 'pending',
      price: 1910000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 3,
      carId: 1,
      owner: 1,
      createdOn: dateTime,
      status: 'pending',
      price: 2000000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 4,
      carId: 1,
      owner: 1,
      createdOn: dateTime,
      status: 'pending',
      price: 1910000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 5,
      carId: 1,
      owner: 2,
      createdOn: dateTime,
      status: 'accepted',
      price: 3000000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 6,
      carId: 1,
      owner: 1,
      createdOn: dateTime,
      status: 'pending',
      price: 1200000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
    {
      id: 7,
      carId: 3,
      owner: 1,
      createdOn: dateTime,
      status: 'pending',
      price: 1200000,
      priceOffered: 5000000,
      modifiedOn: null,
    },
  ],
};
