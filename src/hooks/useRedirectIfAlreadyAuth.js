import appPathHelper from "helper/pathHelper/app";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./useAuth";

const useRedirectIfAlreadyAuth = () => {
    const { user } = useAuth();
    const history = useHistory();
    const { rootPath } = appPathHelper();

    useEffect(() => {
        if (user) {
            history.replace(rootPath)
        }
    }, [])
}
export default useRedirectIfAlreadyAuth
