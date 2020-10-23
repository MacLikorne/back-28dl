/**
 * Objet contenant la matrice, la taille de la population générale ainsi que le pourcentage d'index à true.
 */
export class PopulationDto {
    constructor(public infectedRatio: number = 0, public size: number = 0, public pop: boolean[][][] = [[[false]]]) {
        this.infectedRatio = infectedRatio
        this.size = size
        this.pop = pop
    }
}