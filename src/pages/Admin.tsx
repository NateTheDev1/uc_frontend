import {
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import React from 'react';

const admins = [
	{
		id: 0,
		name: 'Nate',
		type: 'ADMIN',
		createdAt: new Date(),
		email: 'nrichards@biggby.com'
	},
	{
		id: 1,
		name: 'Arik',
		type: 'ADMIN',
		createdAt: new Date(),
		email: 'arik@email.com'
	}
];

const AdminUserTable = () => {
	return (
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
				{admins.map(user => (
					<TableRow key={user.id}>
						<TableCell>{user.id}</TableCell>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.type}</TableCell>
						<TableCell>{user.createdAt.toString()}</TableCell>
						<TableCell>{user.email}</TableCell>
					</TableRow>
				))}
			</Table>
		</TableContainer>
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
