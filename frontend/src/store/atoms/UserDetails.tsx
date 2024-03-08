import { atom } from "recoil"

export const userDetailsAtom = atom({
    key: 'userDetails',
    default: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    }
})