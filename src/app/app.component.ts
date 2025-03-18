import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTabsModule,RouterModule,MatButtonToggleModule],
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.scss',
})

export class AppComponent {

}
