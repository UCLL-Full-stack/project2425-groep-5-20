import { Family } from "@/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
    families: Family[];
    selectedFamily?: (family: Family) => void;
}

const FamiliesOverview: React.FC<Props> = ({families, selectedFamily}: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
    return (
        <>
        <div className="mt-5 container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead>
                <tr className="bg-gray-100">
                  <th scope="col" className="py-2 px-4 border-b">{t("families.name")}</th>
                  <th scope="col" className="py-2 px-4 border-b">{t("families.amountOfMembers")}</th>
                  <th scope="col" className="py-2 px-4 border-b">{t("families.owner")}</th>
                </tr>
              </thead>
              <tbody className="familyRow">
                {families &&
                  families.length > 0 &&
                  families.map((family, index) => (
                    <tr key={index} onClick={() => {router.push(`/families/${family.id}`)}} role="button" className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {family.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {family.familyList?.length}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {family.owner?.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
        </div>
    </>
    );
}

export default FamiliesOverview;