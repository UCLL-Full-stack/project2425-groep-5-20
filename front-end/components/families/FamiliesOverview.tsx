import { Family } from "@/types";
import { useRouter } from "next/router";

type Props = {
    families: Family[];
    selectedFamily?: (family: Family) => void;
}

const FamiliesOverview: React.FC<Props> = ({families, selectedFamily}: Props) => {
  const router = useRouter();
    return (
        <>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount of members</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody className="familyRow">
            {families &&
              families.length > 0 &&
              families.map((family, index) => (
                <tr key={index} onClick={() => {router.push(`/families/${family.id}`)}} role="button">
                  <td>
                    {family.name}
                  </td>
                  <td>
                    {family.familyList?.length}
                  </td>
                  <td>
                    {family.owner?.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </>
    );
}

export default FamiliesOverview;