import { defineConfig } from "vitepress"

export default defineConfig({
    title: "cBlock",
    cleanUrls: true,
    head: [["link", { rel: "icon", type: "image/png", href: "/icon.png" }]],

    locales: {
        root: {
            label: "English",
            lang: "en",
            description: "Hides Chinese content on any website.",
            themeConfig: {
                nav: [
                    { text: "How cBlock Decides", link: "/how-it-works" },
                    { text: "Privacy Policy", link: "/privacy-policy" },
                ],
            },
        },
        ja: {
            label: "日本語",
            lang: "ja",
            description:
                "あらゆるWebサイトで中国語・中国系のコンテンツを非表示にするブラウザ拡張機能",
            themeConfig: {
                nav: [
                    { text: "判定のしくみ", link: "/ja/how-it-works" },
                    { text: "プライバシーポリシー", link: "/ja/privacy-policy" },
                ],
                outline: { level: [2, 3], label: "目次" },
                darkModeSwitchLabel: "表示モード",
                lightModeSwitchTitle: "ライトモードに切り替え",
                darkModeSwitchTitle: "ダークモードに切り替え",
                sidebarMenuLabel: "メニュー",
                returnToTopLabel: "トップに戻る",
                langMenuLabel: "言語を変更",
                skipToContentLabel: "本文へ移動",
            },
        },
    },

    themeConfig: {
        logo: "/icon.png",
        outline: [2, 3],
        docFooter: { prev: false, next: false },
        footer: { copyright: "© 2026 The cBlock Authors" },
    },
})
