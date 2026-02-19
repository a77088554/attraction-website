import type { User } from "../types/user"
import { createContext } from "react";

const UserContext = createContext<User | null>(null)

export default UserContext