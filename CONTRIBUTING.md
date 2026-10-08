# Contributing to One Minute From Earth

Thanks for helping make travel discovery more accurate, accessible, and fun.

## Getting started

1. Fork this repository and create a feature branch.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Make a focused change, then verify the production build with `npm run build`.
5. Open a pull request explaining the change and how you tested it.

## Destination content guidelines

- Check the accuracy of place names, countries, cultural descriptions, and food labels.
- Match every image to the destination or subject it describes; avoid unrelated placeholder photos.
- Respect image licensing and provide attribution when required.
- Label illustrative data clearly rather than presenting it as live weather or local time.
- Keep destination content concise and friendly to readers unfamiliar with the location.

## UI and accessibility

- Check layouts on narrow mobile screens as well as desktop.
- Give interactive controls descriptive accessible names.
- Provide meaningful alternative text for informative images.
- Make keyboard navigation and visible focus states work.
- Avoid relying on color alone to communicate state.

## Pull request checklist

- [ ] Change is scoped and explained
- [ ] Destination facts and image matches checked, if applicable
- [ ] Mobile and desktop layouts reviewed
- [ ] `npm run build` succeeds locally
- [ ] Screenshots included for visual changes

Please avoid committing API keys, credentials, or other private data.
