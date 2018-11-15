import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-new-security-question',
  templateUrl: './new-security-question.component.html',
  styleUrls: ['./new-security-question.component.css']
})
export class NewSecurityQuestionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewSecurityQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
