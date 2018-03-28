class Population {

    constructor (p, m, num) {
        this.generations = 0;
        this.finished = false;
        this.target = p;
        this.mutationRate = m;
        this.perfectScore = 1;

        this.best = "";

        this.population = [];
        for (let i = 0; i<num; i++) {
            this.population.push(new DNA(this.target.length));
        }
        this.calcFitness();
        this.matingPool = [];
    }

    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].fitness(target);
        }
    }

    naturalSelection() {
        this.matingPool = [];

        let maxFitness = 0;
        for (let i = 0; i< this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        for (let i = 0; i<this.population.length; i++) {
            let fitness = map(this.population[i].fitness,0,maxFitness,0,1);
            let n = floor(fitness * 100);
            for (let j = 0; j<n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    generate() {
        for (let i = 0; i < this.population.length; i++) {
            let partnerA = random(this.matingPool);
            let partnerB = random(this.matingPool);
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }

    getBest() {
        let worldrecord = 0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > worldrecord) {
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }

        if (worldrecord == this.perfectScore) this.finished = true;
        return this.population[index].getPhrase();
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }

    allPhrases() {
        let everything = "";
        let displayLimit = min(this.population.length,50);

        for (let i = 0; i< displayLimit; i++) {
            everything += this.population[i].getPhrase() + "\n";
        }
        return everything;
    }

}