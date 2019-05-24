import hashPassword from '../../helpers/hashPassword';

export default {

   registeredUsers: [
    {
        id : 1,
        firstname : "Kazungu",
        lastname : "Safari",
        email : "kazungu.safar@gmail.com",
        address: {
            boxNumber : 66,
            postalCode : 00101,
            town : "Nairobi"
        }
        isAdmin : false,
        password : hashPassword("kazungu100",10)
    }
]
}





