import inquirer from 'inquirer';    
import { creacion_cliente } from '../prompts/crear_clientes.js';


// MENUS PRINCIPALES 

async function menu_start () {
   const answers = await inquirer .prompt([
    {
        type: 'confirm',
        name:'empezar',
        message: `       
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\  O  /                 ║
        ║               \\ | /                  ║
        ║        ════════\\|/════════           ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║            P E A K F I T             ║
        ║                                      ║
        ╚══════════════════════════════════════╝
        
        
        
        
        START?`,
        default: ''
     }
  ])
  
    if(answers.empezar){
     await main_menu();
    }else if(answers.empezar !== true){
      console.log("CLOSING");
    }
    }


async function main_menu() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\ :D  /                 ║
        ║               \\ | /                  ║
        ║        ════════\\|/════════           ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║            M   E   N   U             ║
        ║                                      ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  PROGRESS", "+  NUTRITION ", "+  TRAINING PLANS", "+  CLIENTS", "+  BALANCE",  "+  BACK"]
  }])

    if (answers.choose_menus === "+  PROGRESS") {
    menu_progeso();

  } else if (answers.choose_menus === "+  NUTRITION ") {
    menu_nutricion();

  } else if (answers.choose_menus === "+  TRAINING PLANS") {
    menu_entrenamiento();

  } else if (answers.choose_menus === "+  CLIENTS") {
    menu_clientes();
  } else if (answers.choose_menus === "+  BALANCE") {
    menu_balance();
  } else if (answers.choose_menus === "+  BACK") {
    menu_start();
  }
  }

  




// MANEJO CLIENTES 
async function menu_clientes() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║             V         V              ║
        ║              \\ :>  /                 ║
        ║               \\ | /                  ║
        ║        ════════\\|/════════           ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║         C   L  I  E  N  T  S         ║
        ║                                      ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  CREATE CLIENTS", "+  LIST CLIENTS", "+  UPDATE CLIENTS", "+  ELIMINATE CLIENTS", "+  BACK"]
  }])

    if (answers.choose_menus === "+  CREATE CLIENTS") {
      menu_crear_clientes()

  } else if (answers.choose_menus === "+  LIST CLIENTS") {
    console.log("YAY2");

  } else if (answers.choose_menus === "+  UPDATE CLIENTS") {
    console.log("TRAIN PLANS");

  } else if (answers.choose_menus === "+  ELIMINATE CLIENTS") {
    console.log("CLIENTS");

  } else if (answers.choose_menus === "+  BACK") {
    main_menu();
  }
}


async function menu_crear_clientes() {
console.log( `
        ╔══════════════════════════════════════╗
        ║             V         V              ║
        ║              \\ :>  /                 ║
        ║               \\ | /                  ║
        ║        ════════\\|/════════           ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║         C   L  I  E  N  T  S         ║
        ║                                      ║
        ╚══════════════════════════════════════╝`)
  creacion_cliente();
}

async function menu_listar_clientes() {
  
}

async function menu_actualizar_clientes() {
  
}

async function menu_eliminar_clientes() {
  
}





//MANEJO PLANES DE ENTRENAMIENTO 

async function menu_entrenamiento() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\ >:)  /                ║
        ║               \\ | /                  ║
        ║        WWWWWWWW\\|/WWWWWWWWW          ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║        T  R  A  I  N  I  N  G        ║
        ║            P  L  A  N  S             ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  CREATE PLAN", "+  RENOVATE PLAN", "+  CANCEL PLAN", "+  FINALIZE PLAN", "+  BACK"]
  }])

    if (answers.choose_menus === "+  CREATE PLAN") {
    console.log("YAY");

  } else if (answers.choose_menus === "+  RENOVATE PLAN") {
    console.log("YAY2");

  } else if (answers.choose_menus === "+  CANCEL PLAN") {
    console.log("TRAIN PLANS");

  } else if (answers.choose_menus === "+  FINALIZE PLAN") {
    console.log("CLIENTS");

  } else if (answers.choose_menus === "+  BACK") {
    main_menu();
  }
}


async function menu_crear_plan() {
  
}

async function menu_renovar_plan() {
  
}

async function menu_cancelar_plan() {
  
}

async function menu_finalizar_plan() {
  
}

//MANEJO NUTRICION

async function menu_nutricion() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\  +  /                ║
        ║               \\ | /                  ║
        ║        ++++++++\\|/+++++++++          ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║       N  U  T  R  I  T  I  O  N      ║
        ║                                      ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  CREATE NUTRITION PLAN", "+  WEEKLY REPORT", "+  BACK"]
  }])

    if (answers.choose_menus === "+  CREATE NUTRITION PLAN") {
    console.log("YAY");

  } else if (answers.choose_menus === "+  WEEKLY REPORT") {


  } else if (answers.choose_menus === "+  BACK") {
    main_menu();
  }
}


async function menu_consultar_reporte_semanal() {
  
}

async function menu_crea_plan_alimentacion() {
  
}




//MANEJO PROGRESO 

async function menu_progeso() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\ :O  /                 ║
        ║               \\ | /                  ║
        ║        ~~~~~~~~\\|/~~~~~~~~~          ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║        P  R  O  G  R  E  S  S        ║
        ║                                      ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  REGISTER WEEKLY PROGRESS", "+  VISUALIZE PROGRESS", "+  ELIMINATE", "+  BACK"]
  }])

    if (answers.choose_menus === "+  REGISTER WEEKLY PROGRESS") {
    console.log("YAY");

  } else if (answers.choose_menus === "+  VISUALIZE PROGRESS") {
    console.log("YAY2");

  } else if (answers.choose_menus === "+  ELIMINATE") {
    console.log("TRAIN PLANS");

  } else if (answers.choose_menus === "+  BACK") {
    main_menu();
  }
}

async function menu_registrar_avances_semanales() {
  
}

async function menu_visualizar_progreso() {
  
}

async function menu_elimnar_registro_avances() {
  
}

// MANEJO BALANCE

async function menu_balance() {
  const answers = await inquirer.prompt([{
    type: "rawlist",
    name: "choose_menus",
    message: `
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║              \\  $  /                 ║
        ║               \\ | /                  ║
        ║        <<<<<<<<\\|/>>>>>>>>>          ║
        ║                / \\                   ║
        ║               /   \\                  ║
        ║                                      ║
        ║          B  A  L  A  N  C  E         ║
        ║                                      ║
        ╚══════════════════════════════════════╝`,
    choices: ["+  INCOME", "+  EXPENSES", "+  BACK"]
  }])

    if (answers.choose_menus === "+  REGISTER WEEKLY PROGRESS") {
    console.log("YAY");

  } else if (answers.choose_menus === "+  VISUALIZE PROGRESS") {
    console.log("YAY2");

  } else if (answers.choose_menus === "+  BACK") {
    main_menu();
  }
}

async function menu_ingresos() {
  
}

async function menu_egresos() {
  
}
    

export {menu_start};