import axios from './api';

export function testMethod() {
    console.log('commonjs -> testMethod invoke');
}

export function testAxios() {
    console.log('commonjs -> testAxios invoke', axios);
}

export default {
    testMethod
};
