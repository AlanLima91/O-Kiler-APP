import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  questionList: any[] = [];
  question: any;

  constructor(private router: Router, private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => { 
      this.questionList = data.questions;
      this.question = this.questionList[this.random()]
      console.log(data);
      console.log(this.questionList);
      console.log(this.question);
    });
  }

  onClick(value: number) {
    let tag = this.question.tags[value];
    console.log(value);
    console.log(tag);
    this.router.navigate(['./action']);
  }

  random() {
    console.log(this.questionList.length);
    return Math.floor((Math.random() * this.questionList.length))
  }

}
