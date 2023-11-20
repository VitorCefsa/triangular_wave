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





