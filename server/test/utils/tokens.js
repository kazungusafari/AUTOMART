
import moment from 'moment';
import Authorization from '../../src/middlewares/Authorization';
import hashPassword from '../../src/helpers/hashPassword';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


const userToken = Authorization.generateToken({
  id: 3,
  firstname: 'John',
  lastname: 'Doe',
  email: 'example@gmail.com',
  address: {
    box_number: 100,
    postal_code: 11000,
    town: 'Nairobi',
  },
  is_admin: false,
  password: hashPassword('password100', 10),
  created_date: dateTime,
  modified_date: null,
});
const adminToken = Authorization.generateToken({
  id: 2,
  firstname: 'John',
  lastname: 'Doe',
  email: 'admin@email.com',
  address: {
    box_number: 55,
    postal_code: 11025,
    town: 'Kisumu',
  },
  is_admin: true,
  password: hashPassword('password100', 10),
  created_date: dateTime,
  modified_date: null,
});


const tokens = {
  adminToken,
  userToken,

};

export default tokens;
