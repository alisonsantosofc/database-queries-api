import { getRepository, Repository } from 'typeorm';
import { Game } from '../../../games/entities/Game';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  private gamesRepository: Repository<Game>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: {id: user_id},
      relations: ["games"],
    });

    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query("select * from users u order by u.first_name");
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const result = await this.repository.query("select * from users u where u.first_name = $1 and u.last_name = $2", [first_name, last_name]);
    
    return result;
  }
}
