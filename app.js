
import chalk from 'chalk';
import db from './scr/config/database.js';
import { menu_start } from './scr/utils/menus.js';

try {
    await db.query('SELECT 1');                
} catch (e) {
    console.error(chalk.red(`\nCould not connect to MySQL: ${e.message}`));
    console.error(chalk.yellow('Check that MySQL is running and that your .env file is correct.\n'));
    process.exit(1);
}

try {
    await menu_start();
} catch (e) {
    if (e.name === 'ExitPromptError') console.log(chalk.cyan('\nBye! 👋'));   // Ctrl+C
    else console.error(chalk.red(`Fatal error: ${e.message}`));
} finally {
    await db.end();                              
}
