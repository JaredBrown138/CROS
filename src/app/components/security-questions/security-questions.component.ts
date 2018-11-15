import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewSecurityQuestionComponent } from '../new-security-question/new-security-question.component';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';
import { MatTable } from '@angular/material';



@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = ['question', 'dateCreated', 'delete'];
  newQuestion: string = "";
  questions: any = [];

  constructor(
    public dialog: MatDialog,
    public api: APIService,
    public snackBar: MatSnackBar
  ) {

    this.retrieveQuestions();

  }

  ngOnInit() { }

  retrieveQuestions() {
    this.api.getQuestions().subscribe(
      res => {
        console.log(res);
        this.questions = res['questions'];
      },
      err => {
        this.snackBar.open("Failed to Load Questions", '', {
          duration: 10000
        });
      }
    );
  }

  createQuestion() {
    const dialogRef = this.dialog.open(NewSecurityQuestionComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let writeObject = { question: result }
        this.addQuestion(writeObject);
      }
    });
  }

  addQuestion(question: object) {
    console.log(question);
    this.api.addQuestion(question).subscribe(
      res => {
        this.addToTable(res['question']);
        this.snackBar.open(res['message'], '', {
          duration: 5000
        });
        console.log(res);

      },
      err => {
        this.snackBar.open(err['message'], '', {
          duration: 5000
        });
      }
    );
  }

  delete(questionId: string) {

    this.api.deleteQuestion(questionId).subscribe(
      res => {
        this.snackBar.open(res['message'], '', {
          duration: 5000
        });
        this.questions = this.questions.filter(question => question.id != questionId);
      },
      err => {
        this.snackBar.open(err['message'], '', {
          duration: 5000
        });
      }
    )
  }

  addToTable(question: object) {
    this.questions.push(question);
    this.table.renderRows()
  }

}
