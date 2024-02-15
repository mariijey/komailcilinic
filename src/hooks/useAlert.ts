import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/reducers/snackbar";
import { ErrorType, errorNormalizer } from "components/ErrorHandler";

interface UseAlertProps {
    message?: any
    type: 'success' | 'error'
}

const useSuccessAlert = () => {
    const dispatch = useDispatch();

    const showAlert = useCallback(({ message, type }: UseAlertProps) => {
        if (type === "success") {
            dispatch(
                openSnackbar({
                    open: true,
                    message: message,
                    variant: "alert",
                    alert: {
                        color: type,
                    },
                })
            );
        }
        else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: errorNormalizer(message),
                    variant: "alert",
                    alert: {
                        color: "error",
                    },
                })
            );
        }
        setTimeout(() => {
            dispatch(openSnackbar({ open: false }));
        }, 3000);
    }, []);

    return { showAlert };
};

export default useSuccessAlert;