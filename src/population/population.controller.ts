import { PopulationService } from './population.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PopulationDto } from './population';

@Controller('api/population')
export class PopulationController {

    constructor(private popService: PopulationService) { }

    /**
     * Appel API permettant de générer la matrice
     * @param size taille de la matrice
     */
    @Post(':size')
    genPopulation(@Param('size') size: Number) {
        return this.popService.generatePop(size)
    }

    /**
     * Appel API permettant de passer un des index de la matrice à true
     * @param pop objet contenant la matrice
     */
    @Post()
    patientZero(@Body() pop: PopulationDto) {
        return this.popService.patientZero(pop)
    }
}
