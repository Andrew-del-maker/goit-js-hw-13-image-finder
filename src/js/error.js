import { error } from '@pnotify/core';

export default function errorNotFound() {
    error({
        title: 'Oops!',
        text: 'Repeat your request!',
        delay: 1000,
    });
}