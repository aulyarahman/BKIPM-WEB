import { FbFirestore } from "../firebase/config";
import { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { useToast } from "@chakra-ui/toast";

export interface ToastTypes {
  title?: string;
  description?: string;
  status: "info" | "warning" | "success" | "error";
  id?: string;
}

export const useFirestore = <S>(collection: string, nested?: string) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef<any>();

  function addToast({ description, status, title, id }: ToastTypes) {
    toastIdRef.current = toast({
      id,
      title,
      description,
      position: "bottom-right",
      status,
      variant: "left-accent",
    });
  }

  async function onFetch() {
    const datas: any[] = [];
    try {
      return new Promise<S[]>((resolve, reject) => {
        return FbFirestore.collection(collection).onSnapshot(
          (snap) => {
            snap.forEach((res) => {
              datas.push(res.data());
            });
            resolve(datas as S[]);
          },
          (err) => {
            reject(err.message);
          }
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function onFetchNested() {
    const data: any[] = [];
    try {
      return new Promise<S[]>((resolve, reject) => {
        FbFirestore.doc(collection)
          .collection(`${nested}`)
          .onSnapshot(
            (snap) => {
              snap.forEach((res) => {
                data.push(res.data());
              });
              resolve(data);
            },
            (err) => {
              reject(err.message);
            }
          );
      });
    } catch (e) {
      throw new Error(error);
    }
  }

  async function onFetchId<K>(id: string) {
    try {
      const result = await FbFirestore.doc(`/${collection}/${id}`).get();
      console.log(result);
      return result.data() as K;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async function onCreate<K>(data: K, id: string) {
    setLoading(true);
    try {
      await FbFirestore.doc(`/${collection}/${id}`).set(
        data as unknown as object
      );
      setLoading(false);
      addToast({
        status: "success",
        title: "Susccess Create",
        description: `${
          collection === "uji-lab"
            ? "Berhasil Menerima Pengujian"
            : "Berhasil Menambahkan"
        }`,
      });
      mutate([collection]);
      return false;
    } catch (error: any) {
      setLoading(false);
      addToast({
        status: "error",
        title: "Error",
        description: `Error Create ${collection}`,
      });
      throw new Error(error);
    }
  }

  async function onUpdate<K>(data: K, id: string) {
    setLoading(true);
    try {
      await FbFirestore.doc(`/${collection}/${id}`).update(
        data as unknown as object
      );
      addToast({
        status: "success",
        title: "Susccess Update",
        description: `Berhasil Melakukan Update`,
      });
      mutate([collection]);

      setLoading(false);
      return false;
    } catch (error: any) {
      setLoading(false);
      addToast({
        status: "error",
        title: "Error",
        description: `Error Update `,
      });
      throw new Error(error.message);
    }
  }

  async function onDelete(id: string) {
    setLoading(true);
    try {
      await FbFirestore.doc(`/${collection}/${id}`).delete();
      setLoading(false);
      addToast({
        status: "success",
        title: "Susccess Delete",
        description: `Berhasil menghapus ${collection}`,
      });
      mutate([collection]);
      return false;
    } catch (error: any) {
      setLoading(false);
      addToast({
        status: "error",
        title: "Error",
        description: `Error Delete ${collection}`,
      });
      throw new Error(error.message);
    }
  }

  const { data, error } = useSWR(
    [collection, nested && nested],
    nested ? onFetchNested : onFetch,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
    }
  );

  return {
    data,
    error,
    loading,
    onCreate,
    onUpdate,
    onDelete,
    onFetchId,
    mutate,
  };
};
