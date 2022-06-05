import { FbApp } from "../firebase/config";

import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(FbApp, "asia-southeast2");

export const useFunctions = () => {
  function useCallFunc(data: any, name: string) {
    const addMessage = httpsCallable(functions, name);
    addMessage(data);

    return addMessage;
  }

  return { useCallFunc };
};
