import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddUser = () => {
  const AddUser = async (values) => {
    try {
      console.log("Submitting form data:", values);
      const res = await http.post("/User/CreateUser", {
        lastName: values.lastName,
        firstName: values.firstName,
        gmail: values.gmail,
        phoneNumber: values.phoneNumber,
        password: values.password,
        isStudent: values.isStudent == "on" ? true : false,
        isTeacher: values.isTeacher == "on" ? true : false,
      });
      return res;
    } catch (error) {
      console.log("Error in useAddUser: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddUser"],
    mutationFn: AddUser,
    // const test = () => {toast.succed()},
    // onMutate: () => {
    //   const blogToast = toast.loading("Adding blog...");
    // },
    onSuccess: () => {
      // toast("Blog added successfully!");
    },
    onError: (error) => {
      // toast.error("Error while adding Blog", {
      //   id: blogToast,
      // });
      console.error("Error while adding blog:", error);
    },
  });
};
