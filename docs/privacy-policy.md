# Privacy Policy

cBlock collects no data at all.

- cBlock uses no server.
- cBlock reads page text only inside your browser and never sends it anywhere, including to cBlock’s developers.
- Settings and lookup results are saved only in your browser, and are deleted when you remove the extension.

## Website lookups

When you turn on any of the “Website lookups” in Options, cBlock asks the website you’re on about items on the page, to judge more accurately.

For example, Amazon search results don’t show the seller’s location, and Steam search results don’t show the developer or publisher. Likewise, X posts don’t show the author’s location, and pixiv works don’t show the artist’s location. So cBlock asks the website for what the page doesn’t show, and judges from the answer.

**All of these are off by default.**

| Website    | What cBlock sends                   | Why                                                         | Where it goes                |
| ---------- | ----------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| **Amazon** | A product ID and a seller ID        | To find the seller’s address, phone, and name               | The Amazon website you’re on |
| **Steam**  | A game ID                           | To find the developer and publisher                         | `store.steampowered.com`     |
| **X**      | The handle of a shown post’s author | To find the author’s account location and connection source | `x.com`                      |
| **pixiv**  | The artist ID of a shown work       | To find the artist’s profile                                | `www.pixiv.net`              |

- cBlock asks only the website you’re on, and sends nothing to cBlock’s developers or anyone else.
- To avoid asking the same thing again, lookup results are saved in your browser for 30 days.
