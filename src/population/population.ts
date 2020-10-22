export class PopulationDto {
    constructor(public infectedRatio: number = 0, public size: number = 0, public pop: boolean[][][] = [[[false]]]) {
        this.infectedRatio = infectedRatio
        this.size = size
        this.pop = pop
    }
}