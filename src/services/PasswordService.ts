import PasswordData from "../types/PasswordData";

class PasswordService{
    async register(data:PasswordData){
        console.log(data);
    }
}

export default new PasswordService();