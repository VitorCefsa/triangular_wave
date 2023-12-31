// Parameters: Window
let wi_heigth = 402;
let wi_width = 600;
let wi_background_color = "#ffffff";
let wi_line_color = "#262626";
let wi_circle_color = "#262626";
let wi_vector_color = "#262626";

let wi_grid_color = "#262626";
let wi_draw_circles = true;
const grid_step = 50;
let slider_speed;


// Parameters: Fourier Series
let presets = {
    "triangular": ["8 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_amplitude": ["7 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    
};
const max_itr = 75;
const init_itr = 5;
const max_speed = 100;

const init_speed = 50;
let time_speed = init_speed;
let no_itr = init_itr;

// Variables: Fourier Series
let time = 0;
let wave = [];
let equation = ["8 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)"];
let initial_itr = 0;



// Components from Electron
const electron = require('electron');
const { ipcRenderer } = require('electron')

// Catch slider:speed:fromTB
ipcRenderer.on('slider:speed:fromTB', (event, arg) => {
    time_speed = arg;
    document.getElementById("slider_speed").value = arg;
    document.getElementById("label_speed").innerHTML = (arg / 100).toFixed(2);
});

// Catch slider:itr:fromTB
ipcRenderer.on('slider:itr:fromTB', (event, arg) => {
    no_itr = arg;
    document.getElementById("slider_itr").value = arg;
    document.getElementById("label_itr").innerHTML = arg;
});

// Catch waveform:fromTB
ipcRenderer.on('waveform:fromTB', (event, arg) => {
    console.log(arg);
    update_display_equation(arg);
    document.getElementById("presets").value = arg;
});


function setup() {
    // Initialize canvas
    wi_width = windowWidth;
    let canvas = createCanvas(wi_width, wi_heigth);
    canvas.parent('sketch-holder')

    window.addEventListener('resize', window_resize);

  
    

    

    // Initialize iterations slider
    slider_itr = createSlider(1, max_itr, init_itr);
    slider_itr.parent('slider_itr');
    document.getElementById("label_itr").innerHTML = slider_itr.value();

    // Initialize iterations slider listiner
    document.getElementById("slider_itr").addEventListener("change", (event) => {
        no_itr = event.target.value;
        document.getElementById("label_itr").innerHTML = event.target.value;
        ipcRenderer.send('slider:itr:toTB', event.target.value);
    })

    // Initialize speed slider
    slider_speed = createSlider(0, max_speed, init_speed);
    slider_speed.parent('slider_speed');
    slider_speed.style(
        'width', '100%',
    )
    
    document.getElementById("label_speed").innerHTML = (slider_speed.value()*0.6).toFixed(2) + "Hz";

    // Initialize speed slider listiner
    document.getElementById("slider_speed").addEventListener("change", (event) => {
        time_speed = event.target.value;
        document.getElementById("label_speed").innerHTML = (event.target.value*0.6).toFixed(2) + "Hz";
        ipcRenderer.send('slider:speed:toTB', event.target.value);
    })

    // Initialize custom equation controls
    document.getElementById("submit").onclick = () => {
        document.getElementById("presets").value = "custom";
        update_canvas_equation();
    }
    document.getElementById("presets").onchange = update_waveform;


}

// Function handler of select form
function update_waveform(event) {
    update_display_equation(event.target.value);
}

// Function to update form elemets when selected wave presets
function update_display_equation(waveform) {
    for (const key in presets) {
        if (key == waveform) {
            document.getElementById("numerator").value = presets[waveform][0];
            document.getElementById("denominator").value = presets[waveform][1];
            document.getElementById("coefficient").value = presets[waveform][2];

     
            update_canvas_equation();
        }
    }
}

// Function to update canvas equation by user custom equation
function update_canvas_equation() {
    equation[0] = document.getElementById("numerator").value;
    equation[1] = document.getElementById("denominator").value;
    equation[2] = document.getElementById("coefficient").value;

    wave = [];
}

// Function to resize layout
function window_resize() {
    // Resize canvars
    wi_width = windowWidth;
    resizeCanvas(wi_width, wi_heigth);
}

// Function to draw fourier series
function draw() {

    // Compute fourier series if not paused
    if (slider_speed.value() > 0) {

        // Update background color
        background(wi_background_color);


        // ---- Draw circles ----
        // Shift 1.circle to the left
        translate(wi_width / 5, wi_heigth / 2);
        // Circles parameters
        let x = 0;
        let y = 0;
        let radius = 0;

        const amplitudeSlider = document.getElementById("amplitudeSlider");

        var amplitudeRef = parseFloat(amplitudeSlider.value);


        amplitudeSlider.addEventListener("input", function () {
            amplitudeRef = parseFloat(this.value);
        });



        // Draw number of iteration circles
        for (let n = initial_itr; n < no_itr; n++) {
            var selectElement = document.getElementById("presets");
            // Obter a opção selecionada
            var selectedOption = selectElement.options[selectElement.selectedIndex].value;
            // Starting position of circle center
            let prevx = x;
            let prevy = y;
            let amplitude = 1.0;

            if (selectedOption != "triangular" && selectedOption != "triangular_amplitude" && selectedOption != "triangular_fase") {
                if (time_speed >= amplitudeRef * max_speed) {
                    amplitude = 1.0 - (time_speed - amplitudeRef * max_speed) / ((1.0 - amplitudeRef) * max_speed);
                }
            }
            else{
                amplitudeRef=1.0;
            }
           



            // Equation of fourier series
            let numerator = eval(equation[0]);
            let denominator = eval(equation[1]);
            let coefficient = eval(equation[2]);
            // Defining radius
            radius = numerator / denominator;
            // Redefinition of radius for intial iteration
            if (n == initial_itr) {
                radius_init = radius;
            }
            // Remap radius
            radius = map(radius, 0, radius_init, 0, 100);
            // Calculate x/y position of vector        
            // Calculate x/y position of vector with adjusted amplitude
            x += amplitude * radius * cos(coefficient * time);
            y += amplitude * radius * sin(coefficient * time);

            // Draw circle
            if (wi_draw_circles) {
                stroke(wi_circle_color);
                noFill();
                ellipse(prevx, prevy, 2 * radius);
            }


            // Draw vector
            stroke(wi_vector_color);
            line(prevx, prevy, x, y);

            // Remove unnecessary data outside of canvars
            if (wave.length > wi_width) {
                wave.pop();
            }
        }

        // Add current y position to wave array
        wave.unshift(y);


        // Shift wave to the right
        offset_wave = wi_width / 3;
        stroke(wi_vector_color);
        line(x, y, offset_wave, wave[0]);
        translate(offset_wave, 0);

        // Draw grid
        drawGrid();

        // Draw wave
        beginShape();
        noFill();
        stroke(wi_line_color)
        for (let i = 0; i < wave.length; i++) {
            vertex(i, wave[i]);
        }
        endShape();

        // Increase time
        time += time_speed / 1000;
    }
}

function drawGrid() {
    beginShape()
    stroke(wi_grid_color);
    ellipse(0, 0, 5);

    let y = 0;
    for (y = 0; y <= wi_heigth; y = y + grid_step) {
        line(0, y, wi_width, y)
        line(0, -y, wi_width, -y)
    }
    y -= grid_step - 10;
    for (let x = 0; x <= wi_width; x = x + grid_step) {
        line(x, y, x, -y);
    }


    endShape()
}



