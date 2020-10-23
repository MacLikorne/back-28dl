import { PopulationDto } from './../population/population';
import { ZombiesService } from './zombies.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/zombies')
export class ZombiesController {

    constructor(private zomService: ZombiesService) { }

    /**
     * Appel api pour effectuer un tour d'infection
     * @param popDto objet contenant la matrice
     */
    @Post()
    infect(@Body() popDto: PopulationDto) {
        return this.zomService.infect(popDto)
    }
}
