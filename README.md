# Project Usage Notes

## Direction of Use

This project is an influencer discovery interface with a saved list flow.

1. Start the app with `npm run dev`.
2. Choose a platform using the platform buttons.
3. Search by username or full name.
4. Open a profile to inspect details.
5. Use **Add to List** to save a profile to the persistent shortlist.
6. Review the saved list in the centered list section.
7. Remove items individually or clear the list when needed.

## Assumptions

- Persistence is handled locally in the browser through Zustand and `localStorage`.
- Duplicate entries are prevented for the same profile on the same platform.
- The app is designed around the provided JSON data and does not require a backend.

## Trade-offs

- The list is kept in the middle of the page to preserve visual balance, even though the interaction is intentionally simple.
- Local persistence keeps the implementation simple and fast, but it does not sync across devices or browsers.
- The UI uses a restrained purple-to-blue gradient and simpler surfaces instead of a highly decorative design, to keep the experience more standard and readable.
- Profile details are loaded from static JSON files, which keeps the app lightweight but limits dynamic data updates.
- The current architecture favors clear component boundaries and smaller presentational pieces over a more abstract shared UI layer.

## Notes

- `npm run build` passes successfully.
- If you run commands from the workspace root, use the root npm shim that forwards into `vibe-coder-assignment/`.
