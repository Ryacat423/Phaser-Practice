import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
    {
        path: 'game',
        component: GameComponent
    },
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
    }
];
