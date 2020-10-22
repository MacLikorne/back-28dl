import { Module } from '@nestjs/common';
import { ZombiesController } from './zombies/zombies.controller';
import { ZombiesService } from './zombies/zombies.service';
import { PopulationService } from './population/population.service';
import { PopulationController } from './population/population.controller';

@Module({
  imports: [],
  controllers: [ZombiesController, PopulationController],
  providers: [ZombiesService, PopulationService],
})
export class AppModule { }
