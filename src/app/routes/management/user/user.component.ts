import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

    title: string = '';

    list;
    prefixUser;
    prefixLock;
    validateForm: FormGroup;

    constructor(
        private managementService: ManagementService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.title = '用户管理页';

        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            email: [null, [Validators.required]]
          });

        this.managementService.getUsers().subscribe(data => {
            this.list = data;
        });
    }

    submitForm(): void {
        let userName = '';
        let email= '';
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          if(i === 'userName') {
            userName = this.validateForm.controls[i].value;
          }else if(i === 'email') {
            email = this.validateForm.controls[i].value;
          }
        }

        let users = [] = this.list;

        users.push({name:userName,email: email});

      }
}
