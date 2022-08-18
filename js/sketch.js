var input;
var img;
var preview;
var dom_img;
var checkbox;

var bestFitness;

var pixels_array = [1, 2, 4, 8, 10, 20, 40, 100, 200, 400];

var population;
var grid_size = pixels_array[3];
var dna_size;             // Number of circles in a single DNA object
var circle_size = 20;             // Maximum size of the circles
var pop_size = 10;              // Size of the population
var killnum = 2;                // Number of elements in the population to kill each generation
var bgcol = 0;                  // Background color
var target_radius = 250;
var isBandW = false;


var s_grid_size, p_grid_size;
var s_pop_size, p_pop_size;
var s_killnum;

var image_fitness = 0;

function preload() {
    preview = loadImage('assets/preview.png');

}

function setup() {
    var canv = createCanvas(400, 400);
    canv.parent("p5Group");
    checkbox = document.getElementById('checkbox');

    image(preview, 0, 0, width, height);
    img = preview;
    img_dom = createImg(canv.canvas.toDataURL(), '');
    img_dom.parent("p5Group");
    img_dom.id('img_dom');
    var yourImg = document.getElementById('img_dom');
    if(yourImg && yourImg.style) {
        yourImg.style.height = width.toString() + 'px';
        yourImg.style.width = height.toString() + 'px';
    }
    background(255);

    var f_img = createFileInput(handleFile);
    f_img.class('btn');
    f_img.parent("input");
    
    // Sliders
    s_grid_size = createSlider(0, pixels_array.length - 1, 3, 1);
    s_grid_size.class('slider');
    s_grid_size.parent("sliders");
    // s_grid_size.position(10, 10);
    s_grid_size.size(200, 20);
    s_grid_size.input(updateSliderValues);
    p_grid_size = createP("Grid Size: " + grid_size);
    p_grid_size.parent("info")
    
    
    s_pop_size = createSlider(4, 200, pop_size, 1);
    s_pop_size.class('slider');
    s_pop_size.parent("sliders");
    // s_pop_size.position(10, 40);
    s_pop_size.size(200, 20);
    s_pop_size.input(updateSliderValues);
    p_pop_size = createP("Population Size: " + pop_size);
    p_pop_size.parent("info");
    
    // bestFitness = createP("Best Fitness:");
    // bestFitness.parent("info");
    currentGen = createP("Current Generation:");
    currentGen.parent("info");
    frameRate(2);
    // colorMode(HSB, 255);

    startSimulation();
}

function draw() {
    
    if (img == null) return;
    
    // background(bgcol);
    
    // Now for the actual drawing
    // First iterate through the population and calculate the fitness
    for (var i = 0; i < population.population.length; i++) {
        //population.population[i].display();
        population.population[i].calcFitness();
    }
    
    // Display the best one
    var b = population.population[population.getBestIndex()];
    if (isBandW) {
        b.displayBW();
    } else b.display();

    // Then generate a mating pool
    population.selection();
    population.reproduction();
    
    // bestFitness.html("Best Fitness: " + b.fitness);
    currentGen.html("Current Generation: " + population.generations);
    
    //noLoop();
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        if (img != null) img_dom.remove();
        img = loadImage(file.data, i => {
            i.resize(width, height);
        });

        img_dom = createImg(file.data, '');
        img_dom.id('img_dom');
        
        var yourImg = document.getElementById('img_dom');
        if(yourImg && yourImg.style) {
            yourImg.style.height = width.toString() + 'px';
            yourImg.style.width = height.toString() + 'px';
        }

        img_dom.parent("p5Group"); 
    } else {
        img = null;
        return;
    }
    startSimulation()
} 

function updateSliderValues() {
    p_grid_size.html("Grid Size: " + pixels_array[s_grid_size.value()]);
    p_pop_size.html("Population Size: " + s_pop_size.value());
}

function startSimulation() {
    loop();
    grid_size = pixels_array[s_grid_size.value()];
    pop_size = s_pop_size.value();
    killnum = pop_size / 4;
    dna_size = width / grid_size * height / grid_size;
    isBandW = checkbox.checked;
    var mutationRate = 0.3;
    population = new Population(mutationRate, pop_size, killnum);
}

function stopSimulation() {
    noLoop();
}

