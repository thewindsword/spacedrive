import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import { DefaultProps } from './types';

export interface TagProps extends DefaultProps {
	color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
}

export function Tag(props: PropsWithChildren<TagProps>) {
	return (
		<div
			className={clsx(
				'inline-block cursor-default rounded px-1.5 py-1 text-xs font-medium',
				{
					'bg-red-500 hover:bg-red-400': props.color === 'red',
					'bg-orange-500 hover:bg-orange-400': props.color === 'orange',
					'bg-yellow-500 hover:bg-yellow-400': props.color === 'yellow',
					'bg-green-500 hover:bg-green-400': props.color === 'green',
					'bg-blue-500 hover:bg-blue-400': props.color === 'blue',
					'bg-purple-500 hover:bg-purple-400': props.color === 'purple',
					'bg-pink-500 hover:bg-pink-400': props.color === 'pink'
				},
				props.className
			)}
		>
			{props.children}
		</div>
	);
}
