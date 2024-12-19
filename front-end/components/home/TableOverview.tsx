import { useTranslation } from "next-i18next";

const TableOverview: React.FC = () => {
    const {t} = useTranslation();
    return <>
    <table>
        <thead>
            <tr>
            <th scope="col">{t("users.name")}</th>
            <th scope="col">{t("users.email")}</th>
            <th scope="col">{t("users.password")}</th>
            <th scope="col">{t("users.role")}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Admin</td>
                <td>admin@email.com</td>
                <td>admin123</td>
                <td>admin</td>
            </tr>
            <tr>
                <td>Parent</td>
                <td>parent@email.com</td>
                <td>parent123</td>
                <td>parent</td>
            </tr>
            <tr>
                <td>Child</td>
                <td>child@email.com</td>
                <td>child123</td>
                <td>child</td>
            </tr>
        </tbody>
    </table>
    </>
}

export default TableOverview;