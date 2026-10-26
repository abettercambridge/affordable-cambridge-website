# Affordable Cambridge

Static site for [affordablecambridge.org](https://affordablecambridge.org/), asking Cambridge residents to help stop the rollback of the Multifamily Housing Ordinance. A website by [A Better Cambridge](https://www.abettercambridge.org/).

Plain static HTML, CSS and JavaScript. There's no build step.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. The two forms only work on Netlify.

## Deploy

The site is hosted on Netlify. Push to the linked repo, or drag the folder onto app.netlify.com/drop. After the first deploy, turn on form detection under Site settings > Forms. `_headers` sets caching: HTML is re-checked on every visit, images are cached, and PDFs in `files/` are cached for a day so a replaced file shows up quickly.

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage: the story from 1930s zoning to the 2025 ordinance and the proposed rollback, then the ask |
| `act.html` | Email the Council (an editable letter), pledge to attend (the `pledge` form), and the timeline |
| `stories.html` | Share your story: build a story card with a photo (the `story` form) |
| `poll.html` | 2026 Embold Research poll results: highlights, charts, resident quotes and methodology |
| `numbers.html` | Every figure and its source, plus the zoning, diversity and new homes maps |
| `thanks.html`, `pledged.html` | Where the story and pledge forms land after submitting (not indexed by search engines) |
| `privacy.html` | How form information is used |
| `events.js` | Upcoming events, shared by `index.html`, `act.html` and `pledged.html` |
| `storycards.js` | Story card layouts, shared by `index.html` and `stories.html` |
| `share.png` | Link preview image (1200×630) |
| `share-poll.jpg` | Link preview image for `poll.html` (1200×630), the 64% cover |
| `files/` | Downloadable PDFs linked from `poll.html`: the Embold polling memo and methodology |

## Updating numbers

Homepage figures live in `var DATA = {...}` at the top of the last `<script>` in `index.html`. Each figure also has a row on `numbers.html`, so change both together.

Poll figures live in `var POLL = {...}` in the last `<script>` in `poll.html`, which draws the charts. Three of them (64%, 84%, 86%) also appear in the homepage poll band and on `numbers.html`.

Three figures come from [this notebook](https://github.com/abettercambridge/public-posts/blob/main/cambridge-housing-affordability/notebooks/affordable_cambridge_website_citations.ipynb) in `public-posts`: net homes by neighborhood, the West Cambridge −46, and the home value series. Re-run it when the permit or Zillow data is refreshed.

## TODO before launch

- **Resident stories:** `DATA.stories` holds placeholders only, and the homepage carousel is off (there's no `#loop` element). Collect real stories with written consent, then turn the carousel back on.
- **Drone video:** `images/cambridge-aerial.mp4` is YouTube drone footage. Confirm we have the rights to use it.
- **Building photos:** `images/garden-st.jpg`, `harvard-st.jpg`, `linnaean-st.jpg` and `oxford-st.jpg` are low-res (504 px wide). Swap in originals, confirm each building is nonconforming, and move the map pins to the exact addresses.
- **Rindge Ave before/after:** the "one lot" section (`#win`) uses drawings. Two sample sketches inspired by real life are in `images/`: `modern-gable.svg` (single-family modernist mansion) and `nine-unit.svg` (nine-home building).
- **Timeline:** update `index.html` (the ask), `act.html` and `events.js` when the city sets hearing and vote dates.
- **Link previews:** once the domain points at Netlify, check `share.png` and `og:url` with a preview checker such as opengraph.xyz.

## Neighbors' faces and stories

- **Carousel** ("We want to live here", under the hero): built from `DATA.stories` in `index.html`, photos in `images/stories/`. Edited by hand only; new form submissions never appear here.
- **Pushed out graphic**: fills its faces from `images/faces/face-01.jpg` to `face-NN.jpg` (set `DATA.faceCount`), faces the red bars leave standing first. Photos are added by hand only, so nothing uploaded through the story form appears on the homepage without review.
