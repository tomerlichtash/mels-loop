jest.mock('next/router', () => ({
	push: jest.fn(),
	back: jest.fn(),
	events: {
		on: jest.fn(),
		off: jest.fn(),
	},
	beforePopState: jest.fn(() => null),
	useRouter: () => ({
		push: jest.fn(),
	}),
}));
