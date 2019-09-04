import { ReplaySubject } from 'rxjs';

class GlobalVar {
    constructor(public isLoggedIn = false,
                public loginStatusSubject = new ReplaySubject<any>(1)) { }
}
// tslint:disable-next-line:eofline
export let globalVar = new GlobalVar();