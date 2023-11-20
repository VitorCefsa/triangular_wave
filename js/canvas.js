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
