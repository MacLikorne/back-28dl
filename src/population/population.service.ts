import { Injectable } from '@nestjs/common';
import { PopulationDto } from './population';

@Injectable()
export class PopulationService {
    /**
     * Génère une matrice en fonction d'une taille avec tous les indexes à false
     * @param size taille de la matrice
     */
    public generatePop = (size) => {
        let pop: any[] = []
        for (let i = 0; i < size; i++) {
            pop.push([])
            for (let j = 0; j < size; j++) {
                pop[i].push([])
                for (let k = 0; k < size; k++) {
                    pop[i][j][k] = false
                }
            }
        }
        return new PopulationDto(0, Math.pow(size, 3), pop)
    }

    /**
     * Passe aléatoirement un index de la matrice à true
     * @param popDto objet contenant la matrice
     */
    public patientZero = (popDto: PopulationDto) => {
        const randInt = (max: number) => {
            return Math.floor(Math.random() * Math.floor(max))
        }
        const size = popDto.pop[0].length
        popDto.pop[randInt(size)][randInt(size)][randInt(size)] = true
        popDto.infectedRatio = Math.round(100 / popDto.size)
        return popDto
    }

    /**
     * Renvoie un tableau contenant un tableau avec les indexes de la matrice à true
     * @param popDto objet contenant la matrice
     */
    public getInfected = (popDto: PopulationDto) => {
        const infected: number[][] = []
        let human: number[] = []

        const testHuman = (elem: any) => {
            elem.forEach((newElem, index) => {
                if (Array.isArray(newElem)) {
                    if (elem[0][0][0] !== undefined) {
                        human[0] = index
                    } else if (elem[0][0] !== undefined) {
                        human[1] = index
                    }
                    testHuman(newElem)
                } else {
                    human[2] = index
                    if (newElem) {
                        infected.push([...human])
                    }
                }
            })
        }

        testHuman(popDto.pop)

        return infected
    }
}
