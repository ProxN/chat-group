import create, { State, SetState } from 'zustand';

interface IModal {
  render?: React.ReactElement | string;
  props: {
    title: string;
    width: string;
  };
}

interface IModalState extends State {
  modal: IModal | null;
  isModalOpen: boolean;
  openModal: (Modal: IModal) => void;
  closeModal: () => void;
}

const useModalStore = create<IModalState>(
  (set: SetState<IModalState>): IModalState => ({
    modal: null,
    isModalOpen: false,
    closeModal: () => {
      set({ isModalOpen: false, modal: null });
    },
    openModal: (modal) => {
      set({ isModalOpen: true, modal });
    },
  })
);

export default useModalStore;
