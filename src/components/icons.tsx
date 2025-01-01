import {
	FileIcon,
	ListBulletIcon,
	GitHubLogoIcon,
	Pencil1Icon,
	MoonIcon,
	SunIcon,
	HamburgerMenuIcon,
	Cross2Icon,
	CaretDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	PersonIcon,
	EnvelopeClosedIcon,
	CheckIcon,
	CrossCircledIcon,
	CheckboxIcon,
	FileTextIcon,
} from '@radix-ui/react-icons';

export const getIcon = (icon: string, className?: string) => {
	switch (icon) {
		case 'article':
			return <FileIcon className={className} />;
		case 'list':
			return <ListBulletIcon className={className} />;
		case 'github':
			return <GitHubLogoIcon className={className} />;
		case 'pencil':
			return <Pencil1Icon className={className} />;
		case 'light':
			return <SunIcon className={className} />;
		case 'dark':
			return <MoonIcon className={className} />;
		case 'close':
			return <Cross2Icon className={className} />;
		case 'hamburger':
			return <HamburgerMenuIcon className={className} />;
		case 'caretDown':
			return <CaretDownIcon className={className} />;
		case 'chevronLeft':
			return <ChevronLeftIcon className={className} />;
		case 'chevronRight':
			return <ChevronRightIcon className={className} />;
		case 'arrowLeft':
			return <ArrowLeftIcon className={className} />;
		case 'arrowRight':
			return <ArrowRightIcon className={className} />;
		case 'person':
			return <PersonIcon className={className} />;
		case 'closed-envelope':
			return <EnvelopeClosedIcon className={className} />;
		case 'check':
			return <CheckIcon className={className} />;
		case 'cross':
			return <CrossCircledIcon className={className} />;
		case 'checkbox':
			return <CheckboxIcon className={className} />;
		case 'file-text':
			return <FileTextIcon className={className} />;
		default:
			return icon;
	}
};
