import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: {
    currentStep: 0,
    interests: [] as string[],
    isModalOpen: false,
  },
});