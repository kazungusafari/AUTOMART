
import Authorization from '../../src/middlewares/Authorization';

import hashPassword from '../../src/helpers/hashPassword';


const adminToken = Authorization.generateToken({
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
});
const userToken = Authorization.generateToken({
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
});


const tokens = {
  adminToken: `Bearer ${adminToken} `,
  userToken: `Bearer ${userToken} `,
};

export default tokens;
