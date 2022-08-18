// GenGenerator by Giulio Smedile
// Smart image duplication with Genetic Algorithm

// Each DNA is an array of Genes
// Each Gene is composed of a vector that represents the position of the circle

class Gene {
    constructor(r, g, b) {
        this.r = floor(r);
        this.g = floor(g);
        this.b = floor(b);
    }
}

class DNA {
    constructor(newgenes) {
        if (newgenes) {
            this.genes = newgenes;
        } else {
            this.genes = [];
            // Constructor: make an array of random genes
            for (var i = 0; i < dna_size; i++) {
                this.genes.push(new Gene(random(255), random(255), random(255)));
            }
        }
    }

    
    
    // Crossover: takes another DNA and creates a new one by combining the genes of both
    crossover(partner) {
        var child = new DNA();
        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    // Based on a mutation probability, picks a new random Vector
    mutate(m) {
        for (var i = 0; i< this.genes.length; i++) {
            this.genes[i].r += random(-m, m)
            this.genes[i].g += random(-m, m)
            this.genes[i].b += random(-m, m)
        }
    }
    
}
