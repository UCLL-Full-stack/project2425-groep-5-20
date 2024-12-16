import { Family } from "@/types";

type Props = {
    family: Family | undefined;
}

const SingleFamilyOverview: React.FC<Props> = ({family}: Props) => {
    return <>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
        </thead>
        <tbody>
            {family?.familyList?.map((user, idx) => (
                <tr key={idx}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.role}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
}
export default SingleFamilyOverview;