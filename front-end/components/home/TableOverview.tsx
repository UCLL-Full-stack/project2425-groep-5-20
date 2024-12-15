const TableOverview: React.FC = () => {
    return <>
    <table>
        <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
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