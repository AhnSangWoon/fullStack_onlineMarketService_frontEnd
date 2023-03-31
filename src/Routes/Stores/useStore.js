import {create} from 'zustand';

export const useStore1 = create(set => ({
    user : null,
    setUser : (user) => {set((state) => ({...state, user}));},
    removeUser : (user) => {set((state) => ({...state, user : null}));},
}));

export const useStore2 = create(set => ({
    purpose : 'all',
    setPurpose : (purpose) => {set((state) => ({...state, purpose}));},
    
}));







