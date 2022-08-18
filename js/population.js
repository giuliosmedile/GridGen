// GenGenerator by Giulio Smedile
// Smart image duplication with Genetic Algorithm

// Population class, to describe a population of circles

class Population {
    constructor(m, num, killnum) {
        this.killnum = killnum
        this.mutationRate = m;
        this.population = new Array(num);
        this.matingPool = [];
        this.generations = 0;
        this.previousbest;
        
        for (var i = 0; i < num; i++) {
            this.population[i] = new Circles(new DNA(), i, this.population.length);
        }
    }
    
    calcFitness() {
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness();
        }
    }
    
    selection() {
        // Clear the ArrayList
        this.matingPool = [];
        
        // Calculate total fitness of whole population
        var maxFitness = this.getMaxFitness();
        
        // Sort the population by fitness
        this.population.sort(function(a, b) {
            return b.fitness - a.fitness;
        }
        );
        
        
        // Calculate fitness for each member of the population (scaled to value between 0 and 1)
        // Based on fitness, each member will get added to the mating pool a certain number of times
        // A higher fitness = more entries to mating pool = more likely to be picked as a parent
        // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for (var i = 0; i < this.population.length; i++) {
            var fitnessNormal = map(this.population[i].fitness,0,maxFitness,0,1);
            var n = floor(fitnessNormal * 100); // Arbitrary multiplier
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }

        // Kill and regenerate the last kill_num members of the population
        for (var i = this.killnum; i < this.population.length; i++) {
            this.population[i] = new Circles(new DNA(), i, this.population.length);
            this.matingPool.push(this.population[i]);
        }

    }

    reproduction() {
        // Create a new population
        var newpopulation = [];
        // Refill the population with children from the mating pool
        for (var i = 0; i < this.population.length; i++) {
            // Sping the wheel of fortune to pick two parents
            var m = int(random(this.matingPool.length));
            var d = int(random(this.matingPool.length));
            // Pick two parents
            var mom = this.matingPool[m];
            var dad = this.matingPool[d];
            var child = mom.crossover(dad);

            // Fill the new population with the new child
            newpopulation.push(child)
            // newpopulation.push(new Circles(child, this.population.length));
        }
        this.population = newpopulation;
        this.generations++;
    }
    
    getGenerations() {
        return this.generations;
    }
    
    getMaxFitness() {
        var maxfitness = 0;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxfitness) {
                maxfitness = this.population[i].fitness;
            }
        }
        return maxfitness;
    }
    
    getMinFitness() {
        var minfitness = Infinity;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness < minfitness) {
                minfitness = this.population[i].fitness;
            }
        }
        return minfitness;
    }
    
    getBestIndex() {
        var maxfitness = 0;
        var maxfitnessIndex = 0;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxfitness) {
                maxfitness = this.population[i].fitness;
                maxfitnessIndex = i;
            }
        }
        return maxfitnessIndex;
    }
    
    getWorstIndex() {
        var minfitness = Infinity;
        var minfitnessIndex = 0;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness < minfitness) {
                minfitness = this.population[i].fitness;
                minfitnessIndex = i;
            }
        }
        return minfitnessIndex;
    }
    
    
}