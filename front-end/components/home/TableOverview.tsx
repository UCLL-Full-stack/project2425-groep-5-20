const TableOverview: React.FC = () => {
    return <>
    <table>
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
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