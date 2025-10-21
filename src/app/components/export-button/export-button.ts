import { Component, inject, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { User } from 'src/app/services/users/users.interface';
import { Observable } from 'rxjs';
import { selectFilteredUsers } from 'src/app/store/selector';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

@Component({
  selector: 'lx-export-button',
  imports: [Button, ButtonGroup],
  templateUrl: './export-button.html',
  styleUrl: './export-button.scss',
})
export class ExportButton {
  @Input() selectedUser: User[] = [];
  private store = inject(Store);

  public users$: Observable<User[]> = this.store.select(selectFilteredUsers);

  public exportPDF(): void {
    this.export(this.generatePDF);
  }
  public exportXLSX(): void {
    this.export(this.generateXLSX);
  }
  public exportXLS(): void {
    this.export(this.generateXLS);
  }

  private export(callBack: (user: User[]) => void): void {
    this.users$
      .subscribe((u) => {
        const exportData = this.selectedUser.length > 0 ? this.selectedUser : u;
        callBack(exportData);
      })
      .unsubscribe();
  }

  private generatePDF(users: User[]): void {
    const docDefinition = {
      content: [
        { text: 'Users', style: 'header' },
        {
          table: {
            body: [
              [
                'Avatar',
                'First Name',
                'Last Name',
                'Nickname',
                'City',
                'Phone',
                'Email',
                'Address',
              ],
              ...users.map((u) => [
                u.avatar
                  ? { image: u.avatar, width: 50, height: 50 }
                  : 'No photo',
                u.firstName,
                u.lastName,
                u.nickname,
                u.city,
                u.email,
                u.phone,
                u.address,
              ]),
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('users.pdf');
  }

  private generateXLSX(users: User[]): void {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  }

  private generateXLS(users: User[]): void {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xls');
  }
}
