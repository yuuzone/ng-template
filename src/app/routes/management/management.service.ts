import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ManagementService {
    constructor(private http: HttpClient) {

    }
    getUsers(): Observable<any> {
        let u: User = new User();
        u.name = 'zhangsan';
        u.email = "zhangsan@163.com";
        let users = [{ name: 'zhangsan', email: 'xxx' }];
        users.push(u);
        return of(users);
    }

}
class User {
    public name: string;
    public email: string;
}