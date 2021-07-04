import * as PNotifyMobile from '@pnotify/mobile/';
import * as PNotifyCountdown from '@pnotify/countdown';
import { defaultModules } from '@pnotify/core';
defaultModules.set(PNotifyMobile, {});
export default {
    noResult: {
        type: 'error',
        title: 'No matches found.',
        text: 'Please enter different query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    emptyQuery: {
        type: 'error',
        title: 'Query is empty',
        text: 'Please enter your query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    successResult: {
        type: 'success',
        title: 'Images found.',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },

};