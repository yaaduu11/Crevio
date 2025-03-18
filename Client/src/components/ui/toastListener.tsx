// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useToast } from "../../hooks/use-toast";
// import { RootState } from "../../redux/storage";

// const ToastListener = () => {
//     const { toast } = useToast();
//     const dispatch = useDispatch();
//     const toastMessage = useSelector((state: RootState) => state.user.showToast);

//     useEffect(() => {
//         if (toastMessage) {
//             toast({
//                 variant: "destructive",
//                 description: toastMessage,
//                 duration: 3000,
//             });

            // dispatch(clearToast()); 
//         }
//     }, [toastMessage, dispatch, toast]);

//     return null;
// };

// export default ToastListener;
