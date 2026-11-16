# How cBlock Decides

cBlock finds and hides Chinese content in the four ways below. All decisions are made inside your browser.

| Method                              | What it looks at                                                       |
| ----------------------------------- | ---------------------------------------------------------------------- |
| [Text filter](#text-filter)         | Text on the page, and links to China-linked websites                   |
| [Name filter](#name-filter)         | Names of China-linked companies and products                           |
| [Website scripts](#website-scripts) | Sellers, game developers, post authors, artists, and a page’s own text |
| [Domain block](#domain-block)       | The domain of the page you’re opening                                  |

## China-linked companies and websites

A China-linked company is one that meets either of these, wherever it is registered:

- It was founded in mainland China.
- Its main base for running the business or for development is in mainland China.

A company is not included just because a Chinese company has invested in it. Only mainland China counts, so companies, sellers, and accounts in Hong Kong and Macau are not included, unless there is a sign such as a mainland phone number or connection source.

China-linked websites are the websites of China-linked companies, and websites whose domain ends in `.cn`, `.中国`, or `.中國`.

## Text filter

Runs with the “Chinese text” and “Links to China-linked websites” options. Both are on by default.

### Text it reads

- Text shown on the page
- Image alt text (`alt`), tooltips (`title`), labels for screen readers (`aria-label`, `aria-description`)

It does not read text in these elements:

- Input fields (`input`, `textarea`) and editable areas (`contenteditable`)
- Program code (`code`, `pre`)
- Scripts and styles (`script`, `style`), and page metadata (`head`)

### Telling Chinese apart

cBlock judges each unit of text, such as a paragraph or a list item (a “block” below), in this order:

1. A block without Han characters (kanji) is not Chinese.
2. A part the page marks as Chinese as used in Taiwan, with `lang="zh-TW"`, is not treated as Chinese.
3. A part the page marks as Chinese, such as with `lang="zh-CN"`, is Chinese.
4. A block with kana (hiragana or katakana) is Japanese. But if any part between the kana has two or more different Han characters that Japanese does not use, it is Chinese.
5. A block without kana is Chinese if any of these is true:
    - It has a Han character that Japanese does not use (e.g. 们, 这, 说).
    - It has a character or word common in Chinese but rare in Japanese (e.g. 很, 什麼, 沒有, 有限公司).
    - It has 10 or more different Han characters, and 2 or more of them are not Level 1 kanji (e.g. 國, 體).

> “Han characters that Japanese does not use” are those missing from the Japanese character sets (JIS X 0208, JIS X 0212, and Shift_JIS). “Level 1 kanji” are the 2,965 everyday kanji of JIS X 0208.

### Telling Traditional apart

With “Show Traditional Chinese” on, cBlock hides only the Chinese blocks that are in Simplified Chinese. This option is off by default.

1. A block the page marks as Traditional with `lang` (`zh-Hant`, `zh-TW`, `zh-HK`, `zh-MO`) is Traditional.
2. A block marked as Simplified (`zh-Hans`, `zh-CN`, `zh-SG`) is Simplified.
3. Otherwise, the characters decide. A block is Traditional if it has a Traditional-only character and no Simplified-only character.
4. Everything else is Simplified. This includes blocks with both kinds of characters, and blocks with neither.

| Kind of character | Rule                                                      | Examples   |
| ----------------- | --------------------------------------------------------- | ---------- |
| Simplified-only   | In GB2312, but not in Big5 or the Japanese character sets | 们, 这, 说 |
| Traditional-only  | Among the common characters of Big5, but not in GB2312    | 們, 這, 說 |

> GB2312 is the character set of mainland China; Big5 is the one of Taiwan and Hong Kong.

### What gets hidden

- cBlock hides the post, card, or list item that holds a Chinese block.
- To avoid hiding most of a page, blocks over 2,000 characters are not judged.
- On the websites below, the unit to hide is set in advance for each website, so the layout stays intact (e.g. one YouTube video, one search result).
    - YouTube, Reddit, X, TVer, pixiv, Wikipedia, Yahoo! News Japan, Rakuten Ichiba, GitHub, Hacker News
    - Google (google.com, google.co.jp), Bing, DuckDuckGo, Yahoo! JAPAN, Yahoo (US), Brave, Ecosia, Startpage
    - Impress Watch, Famitsu.com

### Links to China-linked websites

cBlock hides links to China-linked websites, other than the website you’re on, together with the card around them. If there is no card, it hides just the link.

### Hidden in any language

With “Chinese text” on, cBlock also hides these:

| Website | What it hides                                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| X       | Posts labeled “Translated from Chinese” (「中国語からの翻訳」 in the Japanese UI)                                                                                      |
| TVer    | Shows whose title starts with 「中国ドラマ」, 「中国時代劇」, 「中国映画」, 「中国アニメ」, or 「華流」 (Chinese drama, period drama, film, anime, and “Chinese wave”) |

## Name filter

Runs with the “Names of China-linked companies and products” option, which is off by default.

cBlock has a built-in list of names of China-linked companies and products (the “name list” below). When this option is on, cBlock hides blocks that mention a name in the name list, on any website.

### Matching names

- Latin names match as whole words, ignoring case. Digits may follow (e.g. Qwen3).
- Short names, and names easily confused with other words, match only with the exact capitals (e.g. TCL, BYD, ERNIE).
- Kana and kanji names match anywhere, even in the middle of a sentence (e.g. 原神).

### Names with other meanings

Names with other meanings, such as アリババ (Alibaba) or vivo, hide a block only when the same block also has one of these clues. A name that clearly means the company, such as 「アリババグループ」 (Alibaba Group), hides a block with no clue needed.

- Another name in the name list (other than names with other meanings)
- A word for China (中国, 中華, China, Chinese)
- A word tied to that company (e.g. for Alibaba: 「決算」 earnings, 「株価」 stock price, 「ジャック・マー」 Jack Ma)

## Website scripts

These check, website by website, what the page text alone can’t tell.

- “Website lookups” can be turned on per website, and all are off by default.
- Lookups are made only for items on screen and items just about to scroll into view.
- Lookup results are saved in your browser for 30 days, so the same thing is not asked twice.
- When a website returns an error, cBlock stops lookups for a while (5 minutes or more).

### Amazon

cBlock hides products whose title has a China-linked brand name from the name list. On a product page, the main part of the page is hidden.

- It works on amazon.co.jp, amazon.com, and amazon.co.uk.
- A name in a product title refers to the brand, so [names with other meanings](#names-with-other-meanings) also hide a product with no clue needed.
- China-linked brands in the search filter list are hidden too.

::: info When “Website lookups” is on
cBlock reads the seller’s information page and hides products from sellers that meet any of these:

- The country of the address is China (`CN`).
- The phone number starts with China’s country code (+86).
- The name of the person in charge (amazon.co.jp) is written in pinyin (Chinese in Latin letters) or in Chinese.
- The business name is written in Chinese, or has “有限公司” (Co., Ltd.) in pinyin (youxian gongsi).
- The registration number (amazon.co.uk) has the form of a Chinese unified social credit code.

> - For sellers with an address in Taiwan, Hong Kong, or Macau, the name and registration number checks are not used.
> - “Show Traditional Chinese” does not apply to the seller name checks.
> - Sellers already judged are also hidden from the search filter list.
> - When Amazon shows a CAPTCHA, lookups stop for 10 minutes.
:::

### Steam

cBlock hides games whose developer or publisher is a China-linked studio. When “Website lookups” is off, it hides only game pages.

- Endings like “Ltd.” in company names are ignored, and the rest must match exactly.
- Studios outside China that only have investment from a Chinese company are not included.

::: info When “Website lookups” is on
Game cards in search results, on the front page, and on category and curator pages are hidden too. For each card’s game, cBlock asks Steam for its developer and publisher.
:::

### X

cBlock hides posts from a fixed list of about 50 accounts, such as Chinese government ministries and spokespeople, embassies, consulates, ambassadors, and state media and their editors.

::: info When “Website lookups” is on
Among posts the text filter shows, cBlock checks the authors of these:

- Posts marked as Chinese with `lang`
- Posts with Han characters but no kana

It checks each author’s “About this account” on X. If the account’s location or connection source is China, all of that author’s posts are hidden.

> When X’s lookup limit (50 per 15 minutes) gets down to 5, lookups stop until the limit resets.
:::

### pixiv

When a work or its artist meets the rules below, cBlock hides their cards and comments. On a work page or the artist’s profile page, it hides the main part of the page.

Works are judged in this order, and hidden if Chinese:

1. A novel whose language is Chinese (other than Chinese as used in Taiwan) is Chinese. So is a work with a tag naming the language (中国語, 中文, 简体中文).
2. A work whose title is Chinese is Chinese; one whose title has kana is Japanese.
3. If the title doesn’t tell, a work is Chinese when it has more Chinese tags than tags with kana.

Artists are judged as follows:

- If two or more works by the same artist are shown and more than half are Chinese, all works by that artist are hidden.
- On a profile page, if the profile pixiv loads meets any of these, the artist’s works are hidden:
    - The region is China.
    - The bio is mostly Chinese, and the region is not Hong Kong, Macau, or Taiwan.
    - The profile has a link to a China-linked website or a China-linked mail address (e.g. @qq.com), and the bio is not mostly Japanese.
- If an X lookup has placed the X account in the profile in China, the artist’s works are hidden.

> A bio is “mostly Chinese” when more of its lines are Chinese than contain kana.

::: info When “Website lookups” is on
Outside profile pages too, cBlock fetches the profile of each shown work’s artist and judges it by the rules above.
:::

### GitHub

With “Chinese text” on, cBlock hides the main part of a page whose own text is Chinese.

- It judges by the repository description, or the title of an issue, pull request, or discussion.
- On a repository’s main page, it also hides the page when more than half the README lines are Chinese. One “简体中文” link line in an English README is not enough.
- Search results, list rows, and comments are hidden one by one by the text filter.

## Domain block

Runs with the “Block pages of China-linked websites” option, which is on by default.

- cBlock blocks pages of China-linked websites before they load. Pages embedded in a page (frames) are blocked too.
- Images and scripts are not blocked.
- It matches by the end of the domain: `bilibili.com` and `www.bilibili.com` are blocked, but `bilibili.com.example.org` is not.
- Every website under `.cn`, `.中国`, or `.中國` is blocked, such as `example.cn`, but `example.cn.com` and `cn.bing.com` are not.
- Turning cBlock off for a website in the popup does not stop the block. To stop it, turn off this option or cBlock itself.

## Limits

- Traditional Chinese from Taiwan, Hong Kong, and Macau is also hidden by default. Only parts marked `lang="zh-TW"` are shown.
- Even with “Show Traditional Chinese” on, text alone can’t tell Taiwan from Hong Kong.
- Japanese text with rare kanji (e.g. 剝, 幷) may be hidden by mistake, mostly short text without kana.
- Short Chinese text that uses only kanji found in the Japanese character sets (e.g. 原神官網) may not be hidden.
- Chinese pages written in English or pinyin are not hidden, unless their domain is blocked.
- The text filter can’t detect text that companies or accounts based in China write in Japanese or English.
