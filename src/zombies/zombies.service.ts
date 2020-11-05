import { PopulationService } from './../population/population.service';
import { Injectable } from '@nestjs/common';
import { PopulationDto } from 'src/population/population';

@Injectable()
export class ZombiesService {

    constructor(private popService: PopulationService) { }

    /**
     * Permet de passer les indexes de false à true en fonction des idexes déjà à true et renvoie le nouvel état de la population.
     * @param targets tableau des indexes de la matrice à false et sui touche un index à true
     * @param popDto objet contenant la matrice
     */
    private bite = (targets: number[][], popDto: PopulationDto) => {
        targets.forEach(target => {
            let elem = null
            target.forEach((pos, index) => {
                if (Array.isArray(popDto.pop[pos]) && index === 0) {
                    elem = popDto.pop[pos]
                } else if (Array.isArray(elem[pos])) {
                    elem = elem[pos]
                } else if (typeof elem[pos] === 'boolean') {
                    elem[pos] = true
                }
            })
        })

        return popDto
    }

    /**
     * Renvoie un tableau avec les indexes de la matrice à false qui "touche" un index à true
     * @param infected tableau des indexes de la matrice à true
     * @param popDto objet contenant la matrice
     */
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

    /**
     * Cycle d'infection passant à true tous les indexes à false qui "touchent" un index à true et qui modifie le ratio d'infection. Renvoi le nouvelle état de la population.
     * @param popDto objet contenant la matrice
     */
    public infect = (popDto: PopulationDto) => {
        const infected = this.popService.getInfected(popDto)
        const targets = this.lookingForMeat(infected, popDto)
        popDto = this.bite(targets, popDto)
        const infectedCount = this.popService.getInfected(popDto).length
        popDto.infectedRatio = Math.round(infectedCount * 100 / popDto.size)
        return popDto
    }
}
