import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
	return (
		<div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
			<SignUp />
		</div>
	);
}
