import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Seeder } from '../database/seeders/seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seeder: Seeder) {}

  onApplicationBootstrap() {
    let dateString = new Date().toLocaleString();
    console.log(
      `[Seeder] ${process.pid} - ${dateString}    LOG [Seeder] Seeding started`,
    );
    this.seeder
      .seed()
      .then(() => {
        dateString = new Date().toLocaleString();
        console.log(
          `[Seeder] ${process.pid} - ${dateString}    LOG [Seeder] Seeding completed`,
        );
      })
      .catch((error) => {
        dateString = new Date().toLocaleString();
        console.error(
          `[Seeder] ${process.pid} - ${dateString}    LOG [Seeder] Seeding failed`,
        );
        throw error;
      });
  }

  getHello(): object {
    return {
      message: 'Welcome to buzzz api',
      serverTime: new Date(),
      version: '0.1.0',
    };
  }
}
