const linkCallout = /^(?:>[ \t]*)+\[!link\][^\r\n]*\r?\n((?:>.*(?:\r?\n|$))*)/gm;

export function extractLinkUrls(source) {
	const urls = [];
	for (const match of String(source).matchAll(linkCallout)) {
		const body = match[1]
			.replace(/^(?:>[ \t]*)+/gm, '')
			.match(/https?:\/\/\S+/)?.[0];
		if (body) urls.push(body.replace(/[)>.,]+$/, ''));
	}
	return urls;
}
