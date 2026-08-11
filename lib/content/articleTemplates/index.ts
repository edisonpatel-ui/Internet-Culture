/**
 * Article Template registry.
 *
 * Import getArticleTemplate(category) anywhere that needs to know "what
 * does a correct article of this category look like" — currently Draft
 * Studio's real generation and revision. This is the intended single
 * import point; don't hardcode section/field lists elsewhere.
 */

import type { ContentCategory } from "@/types";
import type { ArticleTemplate } from "./types";
import { memeTemplate } from "./meme";
import { slangTemplate } from "./slang";
import { eventTemplate } from "./event";
import { creatorTemplate } from "./creator";
import { brainrotTemplate } from "./brainrot";
import { trendTemplate } from "./trend";

export type { ArticleTemplate, TemplateField } from "./types";

const REGISTRY: Record<ContentCategory, ArticleTemplate> = {
  meme: memeTemplate,
  slang: slangTemplate,
  event: eventTemplate,
  creator: creatorTemplate,
  brainrot: brainrotTemplate,
  trend: trendTemplate,
};

export function getArticleTemplate(category: ContentCategory): ArticleTemplate {
  return REGISTRY[category];
}

export function allArticleTemplates(): ArticleTemplate[] {
  return Object.values(REGISTRY);
}

/**
 * Render a template as prompt text for Groq — field rules + a real good
 * example per field, plus a bad-example warning where one exists.
 */
export function renderTemplateForPrompt(template: ArticleTemplate): string {
  const lines: string[] = [
    `Category: ${template.category} (public name: "${template.publicName}")`,
    `Focus: ${template.focus}`,
    "",
    "Field-by-field rules:",
  ];
  for (const f of template.fields) {
    lines.push(`- ${f.label} (${f.key}): ${f.rule}`);
    lines.push(`  Good: ${f.goodExample}`);
    if (f.badExample) lines.push(`  Bad: ${f.badExample}`);
  }
  lines.push("", `Page structure note: ${template.pageStructure}`);
  return lines.join("\n");
}
