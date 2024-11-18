// composables/useRecaptcha.ts
import { useReCaptcha } from "vue-recaptcha-v3";

export function useRecaptcha() {
  const recaptchaInstance = useReCaptcha();

  const getRecaptchaToken = async () => {
    const token = await recaptchaInstance?.executeRecaptcha("yourActionHere");
    return token;
  };

  const validateToken = async () => {
    const token = await getRecaptchaToken();

    const { data } = await useFetch("/api/verify-token", {
      method: "POST",
      body: { token },
    });

    if ((data.value as any).result === "error") {
      throw new Error("recaptcha_verify_fail");
    }

    if ((data.value as any).score <= 0.5) {
      throw new Error("recaptcha_low_score");
    }
  };

  return { validateToken };
}
