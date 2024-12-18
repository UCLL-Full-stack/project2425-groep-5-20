const TableOverview: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th scope="col" className="py-2 px-4 border-b">Name</th>
                        <th scope="col" className="py-2 px-4 border-b">Email</th>
                        <th scope="col" className="py-2 px-4 border-b">Password</th>
                        <th scope="col" className="py-2 px-4 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">Admin</td>
                        <td className="py-2 px-4 border-b">admin@email.com</td>
                        <td className="py-2 px-4 border-b">admin123</td>
                        <td className="py-2 px-4 border-b">admin</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">Parent</td>
                        <td className="py-2 px-4 border-b">parent@email.com</td>
                        <td className="py-2 px-4 border-b">parent123</td>
                        <td className="py-2 px-4 border-b">parent</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">Child</td>
                        <td className="py-2 px-4 border-b">child@email.com</td>
                        <td className="py-2 px-4 border-b">child123</td>
                        <td className="py-2 px-4 border-b">child</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableOverview;