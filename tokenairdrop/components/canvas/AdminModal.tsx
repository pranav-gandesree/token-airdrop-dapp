import React, { useState } from "react";
import { Button } from "../ui/button";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-[#030712] text-white rounded-lg w-full max-w-md m-d animate-slideIn">
        {children}
      </div>
    </div>
  );
};

const AdminModal = ({
  initializeAirdrop,
  depositTokens,
  airdropStarted,
}: any) => {
  const [isOpen, setIsopen] = useState(false);
  const [activeTab, setIsActiveTab] = useState("deposit");
  const [loading, setLoading] = useState(false);
  const [initializeAmount, setInitializeAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const handleInitializeAirdrop = async () => {
    setLoading(true);
    try {
      await initializeAirdrop(Number(initializeAmount));
      setIsopen(false);
    } catch (e) {
      console.log("error is", e);
    }
    setLoading(false);
  };

  const handleDepositTokens = async () => {
    setLoading(true);
    try {
      await depositTokens(Number(depositAmount));
      setIsopen(false);
    } catch (e) {
      console.log("error is", e);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsopen(true)}
        className="text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        admin panel
      </Button>

    <Modal isOpen={isOpen} onClose={()=> setIsopen(false)}>
        <div className="p-6">
            {loading? (
                <div className="absolute inset-0 bg-[#030712] bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-blue-500"></div>
                </div>
            ): null}
        </div>
    </Modal>
    </>
  );
};

export default AdminModal;
