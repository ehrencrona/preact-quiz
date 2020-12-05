import hydrate from 'preact-iso/hydrate';
import App from "./App";

hydrate(<App />);

export async function prerender() {
	const { default: prerender } = await import('preact-iso/prerender');
	return await prerender(<App />);
}
