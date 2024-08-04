import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableDisplayComponent } from '../table-display/table-display.component';

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule, TableDisplayComponent],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.scss'
})
export class TableDashboardComponent {

}
