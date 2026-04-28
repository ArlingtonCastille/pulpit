import {
  App,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  normalizePath,
  requestUrl
} from "obsidian";
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

interface PulpitSettings {
  saveFolder: string;
  defaultTags: string;
  filenameTemplate: string;
}

const DEFAULT_SETTINGS: PulpitSettings = {
  saveFolder: "Pulpit",
  defaultTags: "",
  filenameTemplate: "{title}"
};

interface ExtractedArticle {
  title: string;
  byline: string | null;
  content: string;
  textContent: string;
  excerpt: string | null;
}

export default class PulpitPlugin extends Plugin {
  settings: PulpitSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "save-url-from-clipboard",
      name: "Save URL from clipboard",
      callback: async () => {
        try {
          const url = (await navigator.clipboard.readText()).trim();
          if (!this.isValidUrl(url)) {
            new Notice("Clipboard does not contain a valid URL.");
            return;
          }
          await this.clipUrl(url);
        } catch (err) {
          console.error("Pulpit: clipboard read failed", err);
          new Notice("Could not read clipboard. Use the modal command instead.");
        }
      }
    });

    this.addCommand({
      id: "save-url-from-prompt",
      name: "Save URL (paste in dialog)",
      callback: () => {
        new UrlPromptModal(this.app, async (url) => {
          await this.clipUrl(url);
        }).open();
      }
    });

    this.addSettingTab(new PulpitSettingTab(this.app, this));
  }

  isValidUrl(text: string): boolean {
    if (!text) return false;
    try {
      const u = new URL(text);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  async clipUrl(url: string) {
    const notice = new Notice("Pulpit: fetching article...", 0);
    try {
      const html = await this.fetchPage(url);
      const article = this.extractArticle(html, url);
      if (!article) {
        notice.hide();
        new Notice("Could not extract readable content from this page.");
        return;
      }
      const markdown = this.htmlToMarkdown(article.content);
      const note = this.composeNote(article, markdown, url);
      const file = await this.writeNote(article.title, note);
      notice.hide();
      new Notice(`Saved: ${file.path}`);
      await this.app.workspace.openLinkText(file.path, "", false);
    } catch (err: unknown) {
      notice.hide();
      const message = err instanceof Error ? err.message : String(err);
      console.error("Pulpit error:", err);
      new Notice(`Pulpit error: ${message}`);
    }
  }

  async fetchPage(url: string): Promise<string> {
    const response = await requestUrl({ url, method: "GET" });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status} from ${url}`);
    }
    return response.text;
  }

  extractArticle(html: string, baseUrl: string): ExtractedArticle | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const base = doc.createElement("base");
    base.href = baseUrl;
    if (doc.head) {
      doc.head.insertBefore(base, doc.head.firstChild);
    }

    const reader = new Readability(doc);
    const result = reader.parse();
    if (!result || !result.content) return null;
    return {
      title: result.title || "Untitled",
      byline: result.byline,
      content: result.content,
      textContent: result.textContent || "",
      excerpt: result.excerpt
    };
  }

  htmlToMarkdown(html: string): string {
    const turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*"
    });
    turndown.addRule("strikethrough", {
      filter: ["del", "s"],
      replacement: (content) => `~~${content}~~`
    });
    return turndown.turndown(html);
  }

  composeNote(article: ExtractedArticle, body: string, url: string): string {
    const now = new Date();
    const isoDate = now.toISOString().slice(0, 10);
    const tags = this.settings.defaultTags.trim();

    const frontmatter: string[] = ["---"];
    frontmatter.push(`title: ${this.yamlEscape(article.title)}`);
    frontmatter.push(`source: ${url}`);
    if (article.byline) {
      frontmatter.push(`author: ${this.yamlEscape(article.byline)}`);
    }
    frontmatter.push(`date_saved: ${isoDate}`);
    if (tags) {
      frontmatter.push(`tags: [${tags.split(",").map(t => t.trim()).filter(Boolean).join(", ")}]`);
    }
    frontmatter.push("---");
    frontmatter.push("");
    frontmatter.push(`# ${article.title}`);
    frontmatter.push("");
    if (article.byline) {
      frontmatter.push(`*By ${article.byline}*`);
      frontmatter.push("");
    }
    frontmatter.push(`Source: <${url}>`);
    frontmatter.push("");
    frontmatter.push("---");
    frontmatter.push("");
    frontmatter.push(body);

    return frontmatter.join("\n");
  }

  yamlEscape(s: string): string {
    if (/[:\[\]{}#&*!|>'"%@`\n]/.test(s)) {
      return `"${s.replace(/"/g, '\\"')}"`;
    }
    return s;
  }

  async writeNote(title: string, content: string): Promise<TFile> {
    const folder = normalizePath(this.settings.saveFolder.trim() || "Pulpit");
    if (!await this.app.vault.adapter.exists(folder)) {
      await this.app.vault.createFolder(folder);
    }

    const safeTitle = this.sanitizeFilename(title);
    let filename = `${folder}/${safeTitle}.md`;
    let counter = 1;
    while (await this.app.vault.adapter.exists(filename)) {
      filename = `${folder}/${safeTitle} (${counter}).md`;
      counter++;
    }

    return await this.app.vault.create(filename, content);
  }

  sanitizeFilename(name: string): string {
    return name
      .replace(/[\\/:*?"<>|#^[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100) || "Untitled";
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class UrlPromptModal extends Modal {
  onSubmit: (url: string) => void;

  constructor(app: App, onSubmit: (url: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Save URL with Pulpit" });

    const input = contentEl.createEl("input", {
      type: "url",
      placeholder: "https://example.com/article",
      cls: "pulpit-url-input"
    });
    input.style.width = "100%";
    input.style.padding = "8px";
    input.style.marginBottom = "12px";

    const buttonRow = contentEl.createDiv({ cls: "pulpit-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";
    buttonRow.style.justifyContent = "flex-end";

    const cancelBtn = buttonRow.createEl("button", { text: "Cancel" });
    cancelBtn.onclick = () => this.close();

    const submitBtn = buttonRow.createEl("button", { text: "Save", cls: "mod-cta" });
    const submit = () => {
      const url = input.value.trim();
      if (!url) {
        new Notice("Please enter a URL.");
        return;
      }
      try {
        const u = new URL(url);
        if (u.protocol !== "http:" && u.protocol !== "https:") {
          new Notice("URL must use http or https.");
          return;
        }
      } catch {
        new Notice("That doesn't look like a valid URL.");
        return;
      }
      this.close();
      this.onSubmit(url);
    };
    submitBtn.onclick = submit;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submit();
    });

    setTimeout(() => input.focus(), 50);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class PulpitSettingTab extends PluginSettingTab {
  plugin: PulpitPlugin;

  constructor(app: App, plugin: PulpitPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Save folder")
      .setDesc("Folder in your vault where saved articles are written. Will be created if it doesn't exist.")
      .addText(text => text
        .setPlaceholder("Pulpit")
        .setValue(this.plugin.settings.saveFolder)
        .onChange(async (value) => {
          this.plugin.settings.saveFolder = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("Default tags")
      .setDesc("Comma-separated tags to add to every saved article. Leave blank for none.")
      .addText(text => text
        .setPlaceholder("clipped, reading")
        .setValue(this.plugin.settings.defaultTags)
        .onChange(async (value) => {
          this.plugin.settings.defaultTags = value;
          await this.plugin.saveSettings();
        }));
  }
}
