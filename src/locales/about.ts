export interface IAboutContentEntry {
	title: string;
	content: Record<string, string>[];
}
export type IAboutContent = Record<string, IAboutContentEntry>;

export const aboutLocale = {
	"en-US": {
		title: "Your News",
		content: [
			{
				title:
					"Otter.ai’s new assistant can automatically transcribe your Zoom meetings",
				synopsis:
					"A.I.-powered voice transcription service Otter.ai wants to make it even easier for its business users to record their meetings. The company is today introducing a new feature, Otter Assistant, whic...",
				imageUrl: "",
			},
		],
	},
	he: {
		title: "Vos nouvelles",
		content: [
			{
				title:
					"Le nouvel assistant d'Otter.ai peut transcrire automatiquement vos réunions Zoom",
				synopsis:
					"Le service de transcription vocale alimenté par A.I. Otter.ai veut rendre encore plus facile pour ses utilisateurs professionnels l'enregistrement de leurs réunions. La société présente aujourd'hui une nouvelle fonctionnalité, Otter Assistant, qui ...",
				imageUrl: "",
			},
		],
	},
} as IAboutContent;
