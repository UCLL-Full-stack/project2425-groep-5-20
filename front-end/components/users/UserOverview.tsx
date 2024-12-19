
import { useTranslation } from "next-i18next";
import { User } from "types/index";

type Props = {
  users: User[]
}

const UserOverview: React.FC<Props> = ({ users }: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">{t("users.name")}</th>
              <th scope="col">{t("users.email")}</th>
              <th scope="col">{t("users.role")}</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={index}>
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
      </section>
    </>
  )
}

export default UserOverview
