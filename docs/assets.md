# Third-party assets

## Photographs (`public/images/people/`)

All photos come from Unsplash under the free [Unsplash License](https://unsplash.com/license). None are Unsplash+ (premium). Each photo page was checked for the line "Free to use under the Unsplash License" on 29 September 2026. The licence doesn't require attribution; the footer carries a short "Photos: Unsplash" credit.

The files were downloaded through Unsplash's download endpoint, resized to at most 1600px wide and saved as JPEG at quality 80. Two small edits were made: a laptop maker's logo was blurred in `friends-talking-cafe.jpg` and `builders-at-work-table.jpg`, and `developers-pairing-workshop.jpg` was cropped to 4:3 around the two people in front, leaving out the event banner and a sponsor logo on a laptop.

The code reads the photos from one registry, `components/common/photo/photos.ts`, which also holds the English and French alt text. They are rendered by `components/common/photo/photo.tsx`.

| File | Photo | Photographer | Used on |
| --- | --- | --- | --- |
| `students-lecture-hall.jpg` | [TB5HpfJf7mA](https://unsplash.com/photos/TB5HpfJf7mA) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | Participate: university (hero); home, "Join the flight" university card |
| `developers-pairing-workshop.jpg` | [I_LxDFIIRIA](https://unsplash.com/photos/I_LxDFIIRIA) | [fran innocenti](https://unsplash.com/@frani) | Participate: developer (hero); home, developer card |
| `community-meetup-discussion.jpg` | [ohNCIiKVT1g](https://unsplash.com/photos/ohNCIiKVT1g) | [Antenna](https://unsplash.com/@antenna) | Participate: ambassador (hero); home, ambassador card |
| `team-planning-studio.jpg` | [fm4B1xWEIsU](https://unsplash.com/photos/fm4B1xWEIsU) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | Participate: industry (hero); home, industry card |
| `students-around-laptop.jpg` | [-X4Qx4_4iMU](https://unsplash.com/photos/-X4Qx4_4iMU) | [Vitaly Gariev](https://unsplash.com/@silverkblack) | About, hero |
| `friends-talking-cafe.jpg` | [-uHVRvDr7pg](https://unsplash.com/photos/-uHVRvDr7pg) | [Brooke Cagle](https://unsplash.com/@brookecagle) | About, "How Monark works" |
| `builders-at-work-table.jpg` | [dWYU3i-mqEo](https://unsplash.com/photos/dWYU3i-mqEo) | [Annie Spratt](https://unsplash.com/@anniespratt) | Donation, header (hidden on phones) |

### Adding a photo

1. Use only free Unsplash License photos. Check the photo page, because search results mix in Unsplash+ images.
2. Pick real people in warm, natural light, not posed stock. Avoid crypto clichés and visible brand logos (brand guidelines §7).
3. Export at most 1600px wide as a JPEG at quality 80 into `public/images/people/`, with a descriptive name.
4. Add the photo to `photos.ts` with English and French alt text, and add a row to the table above.
