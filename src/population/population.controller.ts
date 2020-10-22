import { PopulationService } from './population.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PopulationDto } from './population';

@Controller('api/population')
export class PopulationController {

    constructor(private popService: PopulationService) { }

    @Post(':size')
    genPopulation(@Param('size') size: Number) {
        return this.popService.generatePop(size)
    }

    @Post()
    patientZero(@Body() pop: PopulationDto) {
        return this.popService.patientZero(pop)
    }
}
