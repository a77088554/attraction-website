import { createContext } from "react";

const MenuOpenContext = createContext<{menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}>({menuOpen: false, setMenuOpen: () => {}})

export default MenuOpenContext