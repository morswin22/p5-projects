class DNA {

    constructor(num) {
        this.genes = new Array(num);
        for (let i = 0; i < this.genes.length; i++) {
            this.genes[i] = String.fromCharCode(floor(random(32,128)));
        }
    }

    getPhrase() {
        return this.genes.join('');
    }

    fitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }

        this.fitness = score / target.length;
    }

    crossover(partner) {
        let child = new DNA(this.genes.length);

        let midpoint = floor(random(this.genes.length));

        for (let i = 0; i < this.genes.length; i++) {
            if (i>midpoint) child.genes[i] = this.genes[i];
            else            child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < mutationRate) {
                this.genes[i] = String.fromCharCode(floor(random(32,128)));
            }
        }
    }

}