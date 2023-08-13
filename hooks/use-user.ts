import { create } from "zustand";

import {IUser, Product} from "@/types";
import { toast } from "react-hot-toast";

interface UserStore {
    errorMessage?: string;
    setUserError: (errorMessage: string) => void;
}

const useUser = create<UserStore>((set) => ({
    errorMessage: "",
    setUserError: (errorMessage) => {
        set({ errorMessage });
    },
}));

export default useUser;