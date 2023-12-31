import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    RouterModule,
  ],
  providers: [DialogService, CurrencyPipe],
  exports: [ToolbarNavigationComponent],
})
export class SharedModule {}
