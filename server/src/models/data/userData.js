import moment from 'moment';
import hashPassword from '../../helpers/hashPassword';


const dateTime = moment().format('YYYY-MM-DD h:m:s');


export default {

  registeredUsers: [
    {
      id: 1,
      firstname: 'Kazungu',
      lastname: 'Safari',
      email: 'kazungu.safari@gmail.com',
      address: {
        boxNumber: 66,
        postalCode: 10101,
        town: 'Nairobi',
      },
      isAdmin: false,
      password: hashPassword('kazungu100', 10),
      createdOn: dateTime,
      modifiedOn: null,
    },
    {
      id: 2,
      firstname: 'Pedro',
      lastname: 'Lili',
      email: 'lili@gmail.com',
      address: {
        boxNumber: 60,
        postalCode: 10101,
        town: 'Kericho',
      },
      isAdmin: true,
      password: hashPassword('pedrolili100', 10),
      createdOn: dateTime,
      modifiedOn: null,
    },
  ],
};
