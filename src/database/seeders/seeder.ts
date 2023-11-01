import { Injectable } from '@nestjs/common';
import { FeeSeederService } from './fee/fee.service';
import { UserSeederService } from './users/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly feeSeederService: FeeSeederService,
    private readonly userSeederService: UserSeederService,
  ) {}

  async seed() {
    // Seed Users
    await this.users()
      .then((completed) => {
        const dateString = new Date().toLocaleString();
        console.log(
          `[Seeder] ${process.pid} - ${dateString}    LOG [User] Seeding completed`,
        );
        Promise.resolve(completed);
      })
      .catch((error) => {
        const dateString = new Date().toLocaleString();
        console.log(
          `[Seeder] ${process.pid} - ${dateString}    LOG [User] Seeding failed`,
        );
        Promise.reject(error);
      });
    // Seed Fee
    await this.fee()
      .then((completed) => {
        const dateString = new Date().toLocaleString();
        console.log(
          `[Seeder] ${process.pid} - ${dateString}    LOG [Fee] Seeding completed`,
        );
        Promise.resolve(completed);
      })
      .catch((error) => {
        const dateString = new Date().toLocaleString();
        console.log(
          `[Seeder] ${process.pid} - ${dateString}    LOG [Fee] Seeding failed`,
        );
        Promise.reject(error);
      });
  }

  async users() {
    return await this.userSeederService.create();
  }

  async fee() {
    return await this.feeSeederService.create();
  }
}
