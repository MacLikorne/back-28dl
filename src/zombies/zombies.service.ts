import { PopulationService } from './../population/population.service';
import { Injectable } from '@nestjs/common';
import { PopulationDto } from 'src/population/population';

@Injectable()
export class ZombiesService {

    constructor(private popService: PopulationService) { }

    private bite = (targets: number[][], popDto: PopulationDto) => {
        targets.forEach(target => {
            let s: string = "(targets) => targets"
            target.forEach(pos => s += `[${pos}]`)
            s += "=true";
            const infect: Function = eval(s);
            try {
                infect(popDto.pop)
            } catch (error) {
                console.log("Tu mords dans le vide")
            }
        })

        return popDto
    }

    private lookingForMeat = (infected: number[][], popDto: PopulationDto) => {
        const meats: number[][] = []

        const addMeat = (moreOrLess: number) => infected.forEach(zombie =>
            zombie.forEach((position, index) => {
                const target = [...zombie]
                target[index] = position + moreOrLess
                if (target.filter(pos => pos >= 0 && pos < popDto.pop.length).length === 3) {
                    meats.push(target)
                }
            }))
        addMeat(1)
        addMeat(-1)

        return meats
    }

    public infect = (popDto: PopulationDto) => {
        const infected = this.popService.getInfected(popDto)
        const targets = this.lookingForMeat(infected, popDto)
        const newPop = this.bite(targets, popDto)
        const infectedCount = this.popService.getInfected(newPop).length
        newPop.infectedRatio = Math.round(infectedCount * 100 / newPop.size)
        return newPop
    }
}
