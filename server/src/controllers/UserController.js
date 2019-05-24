import User from '../models/user';
import Authorization from '../middlewares/Authorization';
import { config } from 'dotenv';
config();


/**
 * 
 * @class UserController
 */
class UserController {
  /**
   * Create a new User
   * @static
   * @param {object} req
   * @param {object} res
   * @returns { Object }
   * @memberof UserController
   */
  static async signup(req, res) {
     
      const is_userRegistered = User.findOne(req.body.email);

      if(!is_userRegistered){
        const user =  User.create(req.query,req.body);
        const token = Authorization.generateToken(user);
        return res.status(201).send(
            {
                status:res.statusCode,
                data:{
                    token:token,
                    id:user.id,
                    email:user.email,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    isAdmin:JSON.parse(user.isAdmin)
             }});
      }

      else{
         return res.status(400).send({
             status: res.statusCode,
             error: "Email is already registered"
         })
      }
      

  }

  

  
  
}

export default UserController;