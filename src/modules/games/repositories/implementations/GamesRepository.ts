import { Repository } from 'typeorm';
import { postgresDataSource } from '../../../../database';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("game")
      // get element with entire or partial given text value
      .where("game.title ilike :param", {param:`%${param}%`}).getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("select count(*) as count from games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository.query("select * from users u left join users_games_games ugg on ugg.games_id = $1 where u.id = ugg.users_id", [id]);
  };
}
