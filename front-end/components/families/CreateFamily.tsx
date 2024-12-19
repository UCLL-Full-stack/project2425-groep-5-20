import FamilyService from "@/services/FamilyService";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  onCreatedFamily: any;
  email: string;
  role: string;
};

const CreateFamily: React.FC<Props> = ({ onCreatedFamily, email, role }: Props) => {
  const {t} = useTranslation();
  const [newFamilyName, setNewFamilyName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  
  const [familyNameError, setFamilyNameError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const errorClear = () => {
    setFamilyNameError("");
    setUserEmailError("");
    setStatusMessage("");
  };

  const validation = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = true;

    if (newFamilyName.trim() === "") {
      setFamilyNameError(`${t("families.status.familyError")}`);
      result = false;
    }
    if (role === "admin") {
      if (userEmail.trim() === "" || !emailRegex.test(userEmail)) {
        setUserEmailError(`${t("families.status.emailError")}`);
        result = false;
      }
    }
    return result;
  };

  const handleAddFamily = async (event: any) => {
    event.preventDefault();

    errorClear();
    if (!validation()) {
      return;
    }

    if (role === "admin") {
      const user = await UserService.getUserByEmail(userEmail);
      if (!user || user.email !== userEmail) {
        setUserEmailError(`${t("families.status.noUserWithThisEmail")}`);
        return;
      }
    }

    const newFamily = await FamilyService.createFamily(newFamilyName, email);
    if (newFamily) {
      onCreatedFamily(newFamily);
      setNewFamilyName("");
      setUserEmail("");
      setStatusMessage(`${t("families.status.success")}`);

      // timer om dialog box te sluiten als de family is aangemaakt
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 500); 
    } else {
      setStatusMessage("Failed to create family");
    }
  };

  return (
    <div className="familybutton">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#1F2833] font-bold py-2 px-4 rounded"
            id="createFamilyButton"
            onClick={() => setIsDialogOpen(true)}
          >
            {t("families.createNewFamily")}
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1F2833] text-white rounded-lg shadow-lg p-6 outline-none border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#66FCF1]">
              {t("families.createNewFamily")}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mb-4">
              {t("families.details")}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleAddFamily}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t("families.name")}</label>
              <input
                type="text"
                value={newFamilyName}
                onChange={(event) => setNewFamilyName(event.target.value)}
                placeholder={t("families.pleaseEnterNewName")}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#66FCF1] outline-none"
              />
              {familyNameError && <p className="text-red-500 mt-1">{familyNameError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t("users.email")}</label>
              <input
                type="text"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder={t("families.pleaseEnterEmail")}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#66FCF1] outline-none"
              />
              {userEmailError && <p className="text-red-500 mt-1">{userEmailError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#66FCF1] hover:bg-[#45A29E] text-[#1F2833] font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {t("families.addFamily")}
            </button>
          </form>
          {statusMessage && (
            <p
              className={`mt-4 text-center font-semibold ${
                statusMessage.includes("success") ? "text-green-400" : "text-red-400"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFamily;
