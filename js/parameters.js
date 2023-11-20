// Parameters: Window
let wi_heigth = 402;
let wi_width = 600;
let wi_background_color = "#e6d3fd";
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
    "triangular_fase": ["6 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_ganho": ["5 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_contribuicao": ["4 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_saida": ["3 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_saida_amplitude": ["2 * pow(-1, (((2*n)+1)-1)/2)", "PI * PI * ((2*n)+1) * ((2*n)+1)", "((2*n)+1)" ],
    "triangular_saida_fase": ["8 * pow(-1, (((2*n)+1)-1)/2) ", "1 ", "1" ],
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