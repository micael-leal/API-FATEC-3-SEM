import { Op } from "sequelize";
import Profile from "../../model/Profile";
import User from "../../model/User";
import IUserRepository from "../IUserRepository";

export default class UserRepository implements IUserRepository {
  // create user
  saveUser(user: User): Promise<User> {
        return User.create({
        userName: user.userName,
        fullName: user.fullName,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        active: user.active,
        profile: {
                name: 'Usuário',
                type: 0
      }
        }, { include: {
            model: Profile
        } });
  }

  // create admin
  saveAdmin(user: User): Promise<User> {
        return User.create({
        userName: user.userName,
        fullName: user.fullName,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        active: user.active,
        profile: {
                name: 'Administrador',
                type: 1
      }
        }, { include: {
            model: Profile
        } });
  }

  // find by Id
  findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id: id } });
  }

  // find by Email
  findByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email: email }, include: { model: Profile } });
  }

  // find by Cpf and Cnpj
  findByCpf(cpf: string): Promise<User | null> {
    return User.findOne({ where: { cpf: cpf } });
  }

  // find by userName
  findByUserName(userName: string): Promise<User | null> {
    return User.findOne({ where: { userName: userName } });
  }

  // find by fullName
  findByFullName(fullName: string): Promise<User | null> {
    return User.findOne({ where: { fullName: fullName } });
  }

  // find all
  findAll(): Promise<User[]> {
    return User.findAll({ include: { model: Profile } });
  }

  // delete
    async removeByEmail(email: string): Promise<number> {
       const result = await User.update({active: false}, {where: { email: email } });
       return result[0];
    }
  

  // password update
    async updatePasswordByEmail(email: string, newPassword: string): Promise<number> {
        const result = await User.update({ password: newPassword }, { where: { email } });
    return result[0];
  }

  // count by active
  async countUsersByActive(active: boolean): Promise<number> {
    const result = await User.count({
      where: {
        active: active,
      },
    });
    return result;
  }

  // find by created at
 async findByCreatedAt(): Promise<any> {
    const result = await User.findAll({
      order: [["userName", "Desc"]]
    });
    return result;
  }

  async editUser( id: String): Promise<number> {
    const user = new User();
    const profile = new Profile();
    const result = await User.update({ 
        userName: user.userName,
        fullName: user.fullName,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        active: user.active,
        profile: {
            name: profile.name,
            type: profile.type,
        } 
    }, { where: { id } });
    return result[0];
}




}
