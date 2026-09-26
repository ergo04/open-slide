---
"@open-slide/core": minor
---

Make the presenter transport replaceable: the link between projection and presenter views now comes from `virtual:open-slide/presenter-transport`, which a Vite plugin can resolve to its own implementation (the `BroadcastChannel` default stays available at `virtual:open-slide/presenter-transport/broadcast`). Presenter message types are exported from `@open-slide/core`.
