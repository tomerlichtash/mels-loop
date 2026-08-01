/**
 * Whether a record's `url` is an image we host — the signal that decides if
 * a surface shows the picture. Keyed on the URL, not `type`: a document-type
 * record can hold a photograph as its hosted copy (Mel's blackjack writeup),
 * and `type` describes the record, not the copy.
 */
export function isImageUrl(url: string): boolean {
	return /\.(jpe?g|png|webp|gif|avif)$/i.test(url);
}
