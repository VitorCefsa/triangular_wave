// Function to draw grid
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