import { captureException } from '@sentry/browser';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '@sd/ui';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const onClick = () => {
		captureException(error);
		resetErrorBoundary();
	};

	return (
		<div
			data-tauri-drag-region
			role="alert"
			className="border-app-divider bg-app flex h-screen w-screen flex-col items-center justify-center rounded-lg border p-4"
		>
			<p className="text-ink-faint m-3 text-sm font-bold">APP CRASHED</p>
			<h1 className="text-ink text-2xl font-bold">We're past the event horizon...</h1>
			<pre className="text-ink m-2">Error: {error.message}</pre>
			<div className="text-ink flex flex-row space-x-2">
				<Button variant="accent" className="mt-2" onClick={resetErrorBoundary}>
					Reload
				</Button>
				<Button variant="gray" className="mt-2" onClick={onClick}>
					Send report
				</Button>
			</div>
		</div>
	);
}
