
import moment from 'moment';
import Authorization from '../../src/middlewares/Authorization';
import hashPassword from '../../src/helpers/hashPassword';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


const userToken = Authorization.generateToken({
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'example@gmail.com',
  address: {
    boxNumber: 100,
    postalCode: 11000,
    town: 'Nairobi',
  },
  isAdmin: false,
  password: hashPassword('password100', 10),
  createdOn: dateTime,
  modifiedOn: null,
});
const adminToken = Authorization.generateToken({
  id: 2,
  firstname: 'John',
  lastname: 'Doe',
  email: 'admin@email.com',
  address: {
    boxNumber: 55,
    postalCode: 11025,
    town: 'Kisumu',
  },
  isAdmin: true,
  password: hashPassword('password100', 10),
  createdOn: dateTime,
  modifiedOn: null,
});


const tokens = {
  adminToken,
  userToken,

};

export default tokens;
