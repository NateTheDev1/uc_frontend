import { gql, useQuery } from '@apollo/client';
import {
	CircularProgress,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import React from 'react';

const GET_ADMINS = gql`
	query {
		adminUsers {
			id
			name
			type
			createdAt
			username
		}
	}
`;

const AdminUserTable = () => {
	const { loading, error, data } = useQuery(GET_ADMINS);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <p style={{ color: 'red' }}>Error Loading Admin Users.</p>;
	}

	return (
		<>
			<p>
				{data.adminUsers.length} Admin{' '}
				{data.adminUsers.length === 1 ? 'User' : 'Users'}
			</p>
			<TableContainer component={Paper}>
				<Table aria-label="admin users">
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Created At</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					{data.adminUsers.map((user: any) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.type}</TableCell>
							<TableCell>{user.createdAt.toString()}</TableCell>
							<TableCell>{user.username}</TableCell>
						</TableRow>
					))}
				</Table>
			</TableContainer>
		</>
	);
};

const Admin = () => {
	return (
		<div className="admin">
			<h4>User Settings</h4>
			<hr />
			<h5>Current Users</h5>
			<AdminUserTable />
		</div>
	);
};

export default Admin;
