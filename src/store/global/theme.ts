import { create } from "zustand";

interface IThemeStates{
    theme: boolean
}

interface Actions{
    toggleTheme: ()=> void,
    setTheme: (payload: boolean) => void
}

export const useTheme = create<IThemeStates & Actions>((set)=>({
    theme: true,
    toggleTheme:()=> set((state)=>({theme: !state.theme})),
    setTheme: (payload)=> set((state)=> ({theme: payload}))

}))