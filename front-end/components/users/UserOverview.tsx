import { useTranslation } from "next-i18next";
import { User } from "types/index";

type Props = {
  users: User[]
}

const UserOverview: React.FC<Props> = ({ users }: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <section className="mt-5 container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="py-2 px-4 border-b">{t("users.name")}</th>
              <th scope="col" className="py-2 px-4 border-b">{t("users.email")}</th>
              <th scope="col" className="py-2 px-4 border-b">{t("users.role")}</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b">
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
