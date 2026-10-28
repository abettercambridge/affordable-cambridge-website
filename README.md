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
| `neighbors.html` | Longform stories from residents, past and present, each with a pull quote and a status chip |
| `stories.html` | Share your story: build a story card with a photo (the `story` form) |
| `numbers.html` | Every figure and its source, plus the zoning, diversity and new homes maps |
| `thanks.html`, `pledged.html` | Where the story and pledge forms land after submitting (not indexed by search engines) |
| `privacy.html` | How form information is used |
| `events.js` | Upcoming events, shared by `index.html`, `act.html` and `pledged.html` |
| `storycards.js` | Story card layouts, shared by `index.html` and `stories.html` |
| `sheet-sync.js` | Copies each pledge and story submission to a Google Sheet, alongside Netlify Forms |
| `files/` | Downloadable PDFs |
| `share.png` | Link preview image (1200×630) |

## Updating numbers

Homepage figures live in `var DATA = {...}` at the top of the last `<script>` in `index.html`. Each figure also has a row on `numbers.html`, so change both together.

Three figures come from [this notebook](https://github.com/abettercambridge/public-posts/blob/main/cambridge-housing-affordability/notebooks/affordable_cambridge_website_citations.ipynb) in `public-posts`: net homes by neighborhood, the West Cambridge −46, and the home value series. Re-run it when the permit or Zillow data is refreshed.

## Neighbors' faces and stories

Everything here is added by hand, so nothing uploaded through the story form appears on the site without review. Publish a story or photo only with the person's consent.

- **Carousel** ("We want to live here", under the hero): built from `DATA.stories` in `index.html`, photos in `images/stories/` (640×640). Add `story:'id'` to an entry to show a "Read [name]'s story" link to `neighbors.html#id`.
- **Neighbors page**: each story is an `<li class="nb" id="...">` in `neighbors.html`. Linking to `neighbors.html#id` opens that story.
- **Pushed out graphic**: fills its faces from `images/faces/face-01.jpg` to `face-NN.jpg` (160×160; set `DATA.faceCount`), faces the red bars leave standing first.
- Strip photo metadata (location, camera) before adding a photo. Phone photos often include GPS.

## Animations

The homepage map story and the "12 homes to 3" drawing are each a list of motion and pause segments (see `timeline()` in `index.html`). Each has a `SPEED` setting: it speeds up the motion only, and the pauses keep their length. `1` is the original pace.

## Open items

- **"Thousands of existing Cambridge homes would become illegal to build today"** (rollback section, `index.html`): add the source as a row on `numbers.html`.
- **Drone video:** `images/cambridge-aerial.mp4` is YouTube drone footage. Confirm we have the rights to use it.
- **Building photos:** `images/garden-st.jpg`, `harvard-st.jpg`, `linnaean-st.jpg` and `oxford-st.jpg` are low-res (504 px wide). Swap in originals, confirm each building is nonconforming, and move the map pins to the exact addresses.
- **Unused sketches:** `images/modern-gable.svg` and `images/nine-unit.svg` aren't used on any page. Use them in the "one lot" section (`#win`) or delete them.
- **Placeholder PDF:** `files/EmboldPollingMethodologyOct26.pdf` on `main` is a one-page "test" file. Nothing links to it yet; the real file ships with the poll page.
- **Timeline:** update `index.html` (the ask), `act.html` and `events.js` when the city sets hearing and vote dates.
- **Link previews:** once the domain points at Netlify, check `share.png` and `og:url` with a preview checker such as opengraph.xyz.
