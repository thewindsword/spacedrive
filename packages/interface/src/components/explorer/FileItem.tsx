import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { ExplorerItem, ObjectKind } from '@sd/client';
import { cva, tw } from '@sd/ui';
import { getExplorerStore } from '~/hooks/useExplorerStore';
import { FileItemContextMenu } from './ExplorerContextMenu';
import FileThumb from './FileThumb';
import { isObject } from './utils';

const NameArea = tw.div`flex justify-center`;

const nameContainerStyles = cva(
	'cursor-default truncate rounded-md px-1.5 py-[1px] text-center text-xs font-medium',
	{
		variants: {
			selected: {
				true: 'bg-accent text-white'
			}
		}
	}
);

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: ExplorerItem;
	selected: boolean;
	index: number;
}

function FileItem({ data, selected, index, ...rest }: Props) {
	const objectData = data ? (isObject(data) ? data.item : data.item.object) : null;
	const isVid = ObjectKind[objectData?.kind || 0] === 'Video';
	const item = data.item;

	return (
		<FileItemContextMenu data={data}>
			<div
				onContextMenu={(e) => {
					if (index != undefined) {
						getExplorerStore().selectedRowIndex = index;
					}
				}}
				{...rest}
				draggable
				className={clsx('mb-3 inline-block w-[100px]', rest.className)}
			>
				<div
					style={{
						width: getExplorerStore().gridItemSize,
						height: getExplorerStore().gridItemSize
					}}
					className={clsx(
						'mb-1 rounded-lg border-2 border-transparent text-center active:translate-y-[1px]',
						{
							'bg-app-selected/30': selected
						}
					)}
				>
					<div
						className={clsx(
							'relative flex h-full shrink-0 items-center justify-center rounded border-2 border-transparent p-1'
						)}
					>
						<FileThumb
							className={clsx(
								'border-app-line max-h-full w-auto max-w-full overflow-hidden rounded-sm border-2 object-cover shadow shadow-black/40',
								isVid && 'rounded border-x-0 border-y-[7px] !border-black'
							)}
							data={data}
							kind={ObjectKind[objectData?.kind || 0]}
							size={getExplorerStore().gridItemSize}
						/>
						{item.extension && isVid && (
							<div className="absolute bottom-4 right-2 rounded bg-black/60 py-0.5 px-1 text-[9px] font-semibold uppercase opacity-70">
								{item.extension}
							</div>
						)}
					</div>
				</div>
				<NameArea>
					<span className={nameContainerStyles({ selected })}>
						{item.name}
						{item.extension && `.${item.extension}`}
					</span>
				</NameArea>
			</div>
		</FileItemContextMenu>
	);
}

export default FileItem;
