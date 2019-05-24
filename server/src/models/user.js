import moment from 'moment';
import { config } from 'dotenv';
import hashPassword from '../helpers/hashPassword';
import userData from './data/userData';

config();

const { registeredUsers } = userData;


class User {
  /**
   * class constructor
   *
   */
  constructor() {
    this.users = registeredUsers;
    this.numberOfUsers = registeredUsers.length;
  }

  /**
   * @param {object} queryData
   * @param {object} data
   * @returns {object} user object
   */
  create(queryData, data) {
    const newUser = {
      id: this.numberOfUsers + 1,
      email: data.email || '',
      firstName: data.firstname || '',
      lastName: data.lastname || '',
      password: hashPassword(data.password, 10) || '',
      address: {
        boxNumber: data.boxNumber || '',
        town: data.town || '',
        postalCode: data.postalCode || '',

      },
      createdDate: moment.now(),
      modifiedDate: moment.now(),
      isAdmin: queryData.admin || false,
    };
    this.users.push(newUser);
    return newUser;
  }


  /**
   *
   * @param {string} email
   * @returns {object} user object
   */
  findOne(email) {
    return this.users.find(user => user.email === email);
  }

  /**
   * @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }

  /**
   *
   * @param {string} email
   * @param {object} data
   */
  update(email, data) {
    const user = this.findOne(email);
    const index = this.users.indexOf(user);
    this.users[index].firstName = user.firstName;
    this.users[index].lastName = user.lastName;
    this.users[index].email = user.email;
    this.users[index].password = hashPassword(['password'], 10);
    this.users[index].isAdmin = user.isAdmin;
    this.users[index].address = {
      boxNumber: user.address.address,
      town: user.address.town,
      postalCode: user.address.postalCode,
    };
    this.users[index].modifiedDate = moment.now();
    return this.users[index];
  }
}
export default new User();
