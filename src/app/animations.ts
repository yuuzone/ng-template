import { trigger, transition, animate, style, query, group } from '@angular/animations';

// export const routeAnimation = trigger('routeAnimation', [
//     // 定义void表示空状态下
//     transition(':enter', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
//     // * 表示任何状态
//     transition('*', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
//     // 进场动画
//     transition(':enter', [
//         style({ transform: 'translate3d(-100%,0,0)' }),
//         animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
//     ]),
//     // 出场动画
//     transition(':leave', [
//         style({ transform: 'translate3d(0,0,0)' }),
//         animate('.5s ease-in-out', style({ transform: 'translate3d(100%,0,0)' }))
//     ])
// ]);

export const routeAnimation = trigger('routeAnimation', [
    transition(':enter', [
        style({
            position: 'fixed', 'width': '100%', 'height': '100%'
        }),
        animate('.15s linear')
    ]),
    transition('* => *', [
        query(':leave', style({ transform: 'translate3d(0,0,0)', position: 'fixed', 'width': '100%', 'height': '100%' }), { optional: true }),
        query(':enter', style({ transform: 'translate3d(100%,0,0)', position: 'fixed', 'width': '100%', 'height': '100%' }), { optional: true }),

        group([
            query(':leave', animate('.15s linear', style({ transform: 'translate3d(-100%,0,0)' })), { optional: true }),
            query(':enter', animate('.15s linear', style({ transform: 'translate3d(0,0,0)' })), { optional: true })
        ])
    ])
]);