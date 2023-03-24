import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const gamesQuery = this.repository
      .createQueryBuilder("game")
      .where("title = :param", { param });

    return gamesQuery.getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("select count(*) as count_games from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository.query("select * from users u left join users_games_games ugg on u.id = ugg.usersId where ugg.gamesId = $1", [id]);
  };
}
