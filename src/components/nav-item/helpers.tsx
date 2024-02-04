import {
	FileIcon,
	ListBulletIcon,
	GitHubLogoIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons';

export const getIcon = (icon: string) => {
	switch (icon) {
		case 'article':
			return <FileIcon />;
		case 'list':
			return <ListBulletIcon />;
		case 'github':
			return <GitHubLogoIcon />;
		case 'pencil':
			return <Pencil1Icon />;
		default:
			return icon;
	}
};
