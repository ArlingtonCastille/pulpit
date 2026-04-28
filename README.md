# Pulpit

Save articles from any URL as clean Markdown notes in your Obsidian vault.

Pulpit takes a web page, strips out the ads, sidebars, and navigation, and writes the article body to your vault as a properly formatted Markdown note with frontmatter. Local-first, no accounts, no servers, no API keys.

## Features

- Save the URL on your clipboard with one command
- Or paste a URL into a dialog and save
- Configurable save folder
- Default tags applied to every clipping (optional)
- Frontmatter with title, source URL, author, and date saved
- Article body cleaned and converted to Markdown

## Install

### Via BRAT (recommended for now)

1. Install the BRAT plugin from Obsidian's Community Plugins.
2. In BRAT settings, click "Add Beta Plugin."
3. Paste: `https://github.com/ArlingtonCastille/pulpit`
4. Enable "Pulpit" in Community Plugins.

### Manual install

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest [release](https://github.com/ArlingtonCastille/pulpit/releases).
2. Create a folder at `<your-vault>/.obsidian/plugins/pulpit/`.
3. Drop those three files into it.
4. Enable "Pulpit" in Community Plugins.

## Usage

Two commands available in the command palette (Ctrl/Cmd+P):

- **Pulpit: Save URL from clipboard** — copy a link from anywhere, run this command, the article is saved.
- **Pulpit: Save URL (paste in dialog)** — opens a small input where you can paste any URL.

The saved note opens automatically in a new tab.

## Settings

- **Save folder** — where saved articles are written. Defaults to `Pulpit/`. The folder is created automatically.
- **Default tags** — comma-separated tags added to every saved article. Leave blank for none.

## Privacy

Pulpit runs entirely on your machine. The plugin fetches the URL you give it directly from your machine, processes the HTML locally, and writes the resulting note to your vault. No analytics, no servers, nothing leaves your device except the request to the page you're saving.

## Known limitations

**Images.** Pulpit references images by their original URLs rather than downloading them into your vault. Most images render correctly in Obsidian, but some sites use hotlink protection, signed CDN URLs that expire, or JavaScript-based lazy loading. On those sites, larger images may show as broken even though the article text saves perfectly. Local image archival is on the v1.1 roadmap.

**JavaScript-rendered content.** Pulpit fetches raw HTML and does not run JavaScript. Articles on heavily JS-driven sites (single-page apps, dynamic feeds) may not extract.

**Paywalls.** If you can't read the article in a normal browser without logging in, Pulpit can't either.

## Roadmap

- Local image downloading and embedding
- Custom filename templates
- Bulk URL import from a list
- Highlight syncing

## License

MIT. See [LICENSE](LICENSE).

## Support

Pulpit is free and donationware. If it earns its keep:

- [Buy Me a Coffee](https://buymeacoffee.com/arlingtoncastille)
- [Patreon](https://patreon.com/arlingtoncastille)
