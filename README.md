# Affordable Cambridge

Static site, same setup as the Miller site: one self-contained HTML file per page, shared header and footer copied into each, Netlify form, `_headers` for caching.

index.html        The story (hook, success, amendments, cost, ask)
numbers.html      Sources and method for every figure
stories.html      "I want to live here because..." form (Netlify Forms)
act.html          Email the Council (editable letter) + Be there
thanks.html       Where the story form lands after submit
privacy.html      Short privacy note for the form
council-vote.ics  Apple Calendar file for Sept 28 (served as text/calendar via _headers)
images/           Portrait photos go here

## Design
Visual system follows DESIGN.md (Porch Teal): Anton for headlines, DM Serif Display italic for residents' words, DM Sans for everything else. Tokens live in :root and the "Porch Teal design system" block at the end of each page's <style>. The alert band under the skip link is for hearing weeks; remove or update it after Sept 28.

## How the animations work
Nothing pins or holds the page. Each piece plays on its own the first time it scrolls into view:
the cards slide in as you scroll, the yes line draws, the amendments play in sequence,
and the cost chart draws. Visitors with reduced motion turned on see the finished state.

## Deploy
Drag the folder onto app.netlify.com/drop, or push to a repo linked to Netlify.
After the first deploy, turn on form detection: Site settings > Forms.

## Editing numbers
All story numbers live in one block at the top of the <script> in index.html (`var DATA = {...}`).
Change them there and every chart, counter, stat, and house grid updates.

## Before launch
Search every file for TODO and [square brackets]. Main ones:
- Real sources for 1,460 / 70 / 230 / 410, plus the 40-year series and rent/price series
- Amendment one-liners and links
- IRL photo slots: index.html has the block party photo plus two placeholder-boat.jpg slots; replace with real photos and captions
- Background video images/cambridge-aerial.mp4 is YouTube drone footage; confirm rights
- Portrait photos, names, quotes are stock placeholders (index.html part 1, stories.html); replace with real residents
- Meeting time, remote comment link, sign-up link (act.html); confirm council@cambridgema.gov
- Contact email and paid-for line (footer on every page)
- og:image and og:url once the Netlify URL exists
