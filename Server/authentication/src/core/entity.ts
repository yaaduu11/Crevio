import { AutoMap } from '@automapper/classes';

export class UserEntity {
  @AutoMap()
  name!: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  password!: string;
}



export class FreelancerDetailEntity {
  @AutoMap()
  user_id!: string;

  @AutoMap()
  profession!: string;

  @AutoMap()
  company!: string;

  @AutoMap()
  qualification?: string;

  @AutoMap()
  bio?: string;

  @AutoMap()
  work_experience!: string;

  @AutoMap()
  proficient_languages!: string[];

  @AutoMap()
  skills!: string[];

  @AutoMap()
  working_days!: string;

  @AutoMap()
  active_hours!: string;

  @AutoMap()
  basic_price!: number;

  @AutoMap()
  standard_price!: number;

  @AutoMap()
  premium_price?: number;

  @AutoMap()
  portfolio?: string;

  @AutoMap()
  linkedin?: string;

  @AutoMap()
  twitter?: string;

  @AutoMap()
  github?: string;

  @AutoMap()
  total_reviews?: number;

  @AutoMap()
  availability_status?: 'available' | 'busy' | 'offline';
}
