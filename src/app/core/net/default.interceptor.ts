import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private message: NzMessageService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下假如响应体的 `status` 若不为 `0` 表示业务级异常
        // 并显示 `error_message` 内容

        // const body: any = event instanceof HttpResponse && event.body;
        // if (body && body.status !== 0) {
        //     this.msg.error(body.error_message);
        //     // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //     // this.http.get('/').subscribe() 并不会触发
        //     return ErrorObservable.throw(event);
        // }
        break;
      /* 
      case 400:
          this.message.create('error', event['error'] && event['error']['message']);
          break;
      */
      case 401: // 未登录状态码
        if (event.url && event.url.endsWith('user/principal')) {
          this.message.create(
            'error',
            `Login failed, username or password error`,
          );
        }
        this.router.navigateByUrl('/login');
        break;
      case 428: // 428：Precondition Required，在本项目中，定义为未关联机场而不能登录
        if (event.url && event.url.endsWith('user/principal')) {
          this.message.create(
            'error',
            `Unrelated airport`,
          );
        }
        this.router.navigateByUrl('/login');
        break;
      /* 
      case 403:
          this.message.create('error', event['error'] && event['error']['message']);
          break;
      case 404:
          this.message.create('error', event['error'] && event['error']['message']);
          break;
      case 500:
          this.message.create('error', event['error'] && event['error']['message']);
          break;
       */
      case 500:
        let msg: string = event['error'] && event['error']['message'];
        if (msg == null) {
          msg = '';
        }
        msg = msg.split('->')[0];
        msg = msg.substring(msg.indexOf('ERR#') + 4);
        // 返回500页面
        this.message.create('error', msg);
        // this.router.navigateByUrl('/500');
        break;
      default:
        this.message.create(
          'error',
          event['error'] && event['error']['message'],
        );
        break;
    }
    return of(event);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // 统一加上服务端前缀
    let url = req.url;
    if (
      !url.startsWith('https://') &&
      !url.startsWith('http://') &&
      url.indexOf('assets/') < 0
    ) {
      url = environment.SERVER_URL + url;
    }

    const authorization: string = this.localStorageService.get<string>(
      'authorization',
    );
    const clone = {
      url: url,
      withCredentials: true, // 让spring security在cookie中设置的XSRF-TOKEN令牌生效
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest', // 通过压制自Spring Security的头部来抑制浏览器弹出基本认证框
        authorization: authorization ? authorization : '',
      },
    };
    if (authorization) {
      clone.setHeaders['authorization'] = authorization;
    }
    /*
        关于CSRF的令牌
        当执行 HTTP 请求时，一个拦截器会从 cookie 中读取 XSRF 令牌（默认名字为 XSRF-TOKEN），
        并且把它设置为一个 HTTP 头 X-XSRF-TOKEN，由于只有运行在你自己的域名下的代码才能读取这个 cookie，
        所以这里需要在请求中开启：withCredentials: true。
        不过HttpClient在仅在POST、PUT、DELETE请求中添加XSRF令牌，GET、HEAD请求会忽略，也不会发送给使用绝对 URL 的请求
    */
    // const x = document.cookie.split(';')[1].split('=')[1];
    const newReq = req.clone(clone);
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
