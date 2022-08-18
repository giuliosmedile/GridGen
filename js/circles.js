// GenGenerator by Giulio Smedile
// Smart image duplication with Genetic Algorithm

// A circles object is a representation of a given image, comprised of a series of circles, as dictated by the DNA
class Circles {
    constructor(dna, rank, length) {
        this.dna = dna;
        this.fitness = 0;
        this.mFitness = [this.dna.length];
    }

    display() {
        noStroke();
        for (var i = 0; i < this.dna.genes.length; i++) {
            var gene = this.dna.genes[i];
            fill(gene.r, gene.g, gene.b);
            var x = floor(i * grid_size) % width;
            var y = floor(i * grid_size / height) * grid_size;
            rect(x, y, grid_size, grid_size);
        }
    }

    displayBW() {
        noStroke();
        for (var i = 0; i < this.dna.genes.length; i++) {
            var gene = this.dna.genes[i];
            var avg = (gene.r + gene.g + gene.b) / 3;
            fill(avg);
            var x = floor(i * grid_size) % width;
            var y = floor(i * grid_size / height) * grid_size;
            rect(x, y, grid_size, grid_size);
        }
    }

    calcFitness() {

        this.fitness = 0;
        for (var i = 0; i < this.dna.genes.length; i++) {
            var x = floor(i * grid_size) % width;
            var y = floor(i * grid_size / height) * grid_size;

            // Get the pixel at the given location
            var pix = img.get(x, y);
            var genes = this.dna.genes[i];

            // Calculate the distance between the gene and the pixel
            var d = dist(genes.r, genes.g, genes.b, pix[0], pix[1], pix[2]);
            d = 1 / (d + 1);
            this.mFitness[i] = d;
            this.fitness = d;
        }
    }

    crossover(partner) {

        var child = [this.dna.genes.length];
        for (var i = 0; i < this.dna.genes.length; i++) {
            if (this.mFitness[i] > partner.mFitness[i]) {
                child[i] = this.dna.genes[i];
            } else {
                child[i] = partner.dna.genes[i];
            }
        }
        return new Circles(new DNA(child), 0, 0);
    }


}