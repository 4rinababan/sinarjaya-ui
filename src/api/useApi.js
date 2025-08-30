import { useToast } from "../context/ToastProvider";

export const useApi = () => {
  const { showToast } = useToast();

  const apiRequest = async (apiFn, successMessage) => {
    try {
      const result = await apiFn(); // eksekusi service
      if (successMessage) {
        showToast(successMessage, "success");
      }
      return result;
    } catch (error) {
      showToast(error.message || "Terjadi kesalahan", "error");
      throw error;
    }
  };

  return { apiRequest };
};
