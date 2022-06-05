import { Button, useToast } from "@chakra-ui/react";
import { FbFirestore } from "../../../firebase/config";
import { ToastTypes, useFirestore } from "hooks/useCreate";
import React, { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface DeleteDataUjiLabProps {
  id: string;
}

const DeleteDataUjiLab: FC<DeleteDataUjiLabProps> = ({ id }) => {
  const router = useParams();
  const toast = useToast();
  const toastIdRef = useRef<any>();
  const { mutate } = useFirestore("hasil-uji");
  const [loading, setLoading] = useState(false);

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

  const OnDelete = async () => {
    setLoading(true);
    try {
      await FbFirestore.doc(`/uji-lab/${router.id}`)
        .collection("hasil-uji")
        .doc(`${id}`)
        .delete();
      addToast({
        status: "success",
        title: "Susccess Delete",
        description: "Berhasil Delete Data",
      });
      setLoading(false);
      mutate([`/uji-lab/${router.id}`, "hasil-uji"]);
    } catch (e) {
      addToast({
        status: "success",
        title: "Susccess Delete",
        description: "Berhasil Delete Data",
      });
      setLoading(false);

      console.error(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <p style={{ fontSize: "18px" }}>Yakin ingin menghapus data ini ?</p>
      <Button colorScheme={"red"} isLoading={loading} onClick={OnDelete}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteDataUjiLab;
