import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useUserData = () => {
    const userData = useSelector((state) => state.theme.userData);
    return useMemo(() => {
        return userData;
    }, [userData])
}