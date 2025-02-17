import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function SettingsScreen() {
	return (
		<div className="app-background flex w-full flex-row">
			<div className="w-full">
				<Suspense>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}
