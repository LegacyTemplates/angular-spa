import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatChipsModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

const matModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatChipsModule,
  MatSelectModule,
  MatTooltipModule
];

@NgModule({
  imports: matModules,
  exports: matModules
})
export class AppMaterialModule { }