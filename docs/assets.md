# Third-party assets

## Photographs (`public/images/people/`)

All photos come from Unsplash under the free [Unsplash License](https://unsplash.com/license). None are Unsplash+ (premium). Each photo page was checked for the line "Free to use under the Unsplash License" on 29 September 2026. The licence doesn't require attribution; the footer carries a short "Photos: Unsplash" credit.

The files were downloaded through Unsplash's download endpoint, resized to at most 1600px wide (2400px for the four role photos, which fill the wide participate heroes) and saved as JPEG at quality 80. Two small edits were made: a laptop maker's logo was blurred in `friends-talking-cafe.jpg` and `builders-at-work-table.jpg`, and `developers-pairing-workshop.jpg` was cropped to 4:3 around the two people in front, leaving out the event banner and a sponsor logo on a laptop.

The code reads the photos from one registry, `components/common/photo/photos.ts`, which also holds the English and French alt text. Every photo is rendered by `components/common/photo/photo.tsx`: a rounded frame with a 1px border and an explicit aspect ratio. Callers set the crop with `object-position`; the four role photos' focal points live in `components/pages/participate/participate-shared.i18n.ts`.

| File | Photo | Photographer | Used on |
| --- | --- | --- | --- |
| `students-lecture-hall.jpg` | [TB5HpfJf7mA](https://unsplash.com/photos/TB5HpfJf7mA) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | Participate: university (hero); home, "Join the flight" university card |
| `developers-pairing-workshop.jpg` | [I_LxDFIIRIA](https://unsplash.com/photos/I_LxDFIIRIA) | [fran innocenti](https://unsplash.com/@frani) | Participate: developer (hero); home, developer card |
| `community-meetup-discussion.jpg` | [ohNCIiKVT1g](https://unsplash.com/photos/ohNCIiKVT1g) | [Antenna](https://unsplash.com/@antenna) | Participate: ambassador (hero); home, ambassador card |
| `team-planning-studio.jpg` | [fm4B1xWEIsU](https://unsplash.com/photos/fm4B1xWEIsU) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | Participate: industry (hero); home, industry card |
| `students-around-laptop.jpg` | [-X4Qx4_4iMU](https://unsplash.com/photos/-X4Qx4_4iMU) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | About, hero |
| `friends-talking-cafe.jpg` | [-uHVRvDr7pg](https://unsplash.com/photos/-uHVRvDr7pg) | [Brooke Cagle](https://unsplash.com/@brookecagle) | About, "How Monark works" |
| `builders-at-work-table.jpg` | [dWYU3i-mqEo](https://unsplash.com/photos/dWYU3i-mqEo) | [Annie Spratt](https://unsplash.com/@anniespratt) | Donation, header (hidden on phones) |
| `learn-students-laughing-laptops.webp` | [unsplash.com/photos/g1Kr4Ozfoac](https://unsplash.com/photos/g1Kr4Ozfoac) | [Brooke Cagle](https://unsplash.com/@brookecagle) | `/learn`, learning path "Students" |
| `learn-developers-mentoring-laptop.webp` | [unsplash.com/photos/XkKCui44iM0](https://unsplash.com/photos/XkKCui44iM0) | [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) | `/learn`, learning path "Developers" |
| `learn-workshop-whiteboard.webp` | [unsplash.com/photos/EPdKKb-hflg](https://unsplash.com/photos/EPdKKb-hflg) | [Compagnons](https://unsplash.com/@sigmund) | `/learn`, learning path "Industry" |

### Adding a photo

1. Use only free Unsplash License photos. Check the photo page, because search results mix in Unsplash+ images.
2. Pick real people in warm, natural light, not posed stock. Avoid crypto clichés and visible brand logos (brand guidelines §7).
3. Export at most 1600px wide (2400px if it fills a full-width hero) as a JPEG at quality 80 into `public/images/people/`, with a descriptive name.
4. Add the photo to `photos.ts` with English and French alt text. Then add a row to the table above.

## News covers (`public/images/news/`)

Every news article cover is a free Unsplash License photo. Each photo page was checked for "Free to use under the Unsplash License" on 30 September 2026; none are Unsplash+.

The covers used to carry a Monark watermark, and four of them were AI-generated "orange nebula" images. The watermarked ones were downloaded again from Unsplash without the watermark. The AI images, and the CryptoSys/University of Sherbrooke graphic on the pioneer article (which had no photo source), were replaced with real photos that match the article.

Each cover is cropped to 16:9 (the ratio `ArticleCover` and the news cards display) and saved as a 2000 × 1125 WebP at quality 80, under the article's slug. The article frontmatter credits the photo in both languages: `img_author` holds the photographer and `img_author_src` the photo page, and the cover caption links to it.

| File | Photo | Photographer | Article |
| --- | --- | --- | --- |
| `pioneer-in-university-projects-mentorship.webp` | [8gAbl776pc0](https://unsplash.com/photos/8gAbl776pc0) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | A pioneer in supporting university projects in decentralized accounting |
| `real-world-web3-use-cases-that-aren-t-just-nfts.webp` | [r1AIp7Vj3Mg](https://unsplash.com/photos/r1AIp7Vj3Mg) | [Bernd Dittrich](https://unsplash.com/@hdbernd) | Real-world Web3: use cases beyond NFTs |
| `smart-contracts-explained-like-you-re-5.webp` | [MBfYGVsDEp8](https://unsplash.com/photos/MBfYGVsDEp8) | [Shubham Dhage](https://unsplash.com/@shubhudi) | Smart contracts explained like you're 5 |
| `trust-from-open-data-to-mathematical-proof.webp` | [wW-lhteuK0o](https://unsplash.com/photos/wW-lhteuK0o) | [Brett Jordan](https://unsplash.com/@brett_jordan) | Trust: from open data to mathematical proof |
| `web3-developer-roadmap-and-resources.webp` | [ECGv8s2IPG0](https://unsplash.com/photos/ECGv8s2IPG0) | [Mark König](https://unsplash.com/@markkoenig) | Web3 developer roadmap and resources |
| `web3-revolution-reality.webp` | [cw-cj_nFa14](https://unsplash.com/photos/cw-cj_nFa14) | [Antenna](https://unsplash.com/@antenna) | The revolution and reality of Web3: an honest assessment |
| `what-is-web3-really.webp` | [AvEYas-wFs0](https://unsplash.com/photos/AvEYas-wFs0) | [Jakub Żerdzicki](https://unsplash.com/@jakubzerdzicki) | What is Web3, really? |
| `what-monark-is-building-and-why.webp` | [VmwH8vCgUkY](https://unsplash.com/photos/VmwH8vCgUkY) | [Matthias Leistikow](https://unsplash.com/@monochromatze) | What Monark is building, and why |
| `what-needs-to-happen-before-web3-becomes-everyday-tech.webp` | [VYLwdMhhKS0](https://unsplash.com/photos/VYLwdMhhKS0) | [Jorge Zhagui](https://unsplash.com/@jluis_zz) | What needs to happen before Web3 becomes everyday tech |
| `where-blockchain-shines.webp` | [ZlOlRnWk8zU](https://unsplash.com/photos/ZlOlRnWk8zU) | [Centre for Ageing Better](https://unsplash.com/@ageing_better) | Where blockchain shines, and where it doesn't |
| `who-is-web3-actually-for.webp` | [zNzzulArQdc](https://unsplash.com/photos/zNzzulArQdc) | [note thanun](https://unsplash.com/@notethanun) | Who is Web3 actually for? |
| `why-decentralization-matters.webp` | [1tAtO-9HYNM](https://unsplash.com/photos/1tAtO-9HYNM) | [Dorota Trzaska](https://unsplash.com/@dtrzaska1) | Why decentralization matters, beyond the hype |

### Replacing a news cover

1. Pick a free Unsplash License photo that matches the article (same rules as the photographs above: real people or real-world subjects, no crypto clichés, no visible logos).
2. Crop to 16:9, export 2000 × 1125 WebP at quality 80 over `public/images/news/<slug>.webp`.
3. Update `img_alt`, `img_author` and `img_author_src` in both the English and French `page.mdx`, run `bun scripts/news/news-index.script.ts`, and update the table above.
