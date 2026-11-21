<script setup lang="ts">
import { computed, ref } from "vue"
import { useData } from "vitepress"
import list from "../../companies.json"

const { lang } = useData()

const TEXT = {
    en: {
        search: "Search companies, websites, or names",
        all: "All",
        company: "Company",
        sites: "Websites",
        names: "Names",
        note: "Note",
        genres: {
            electronics: "Electronics",
            games: "Games",
            ai: "AI models",
            social: "Social and video apps",
            shopping: "Shopping and payments",
            companies: "Companies",
        },
    },
    ja: {
        search: "企業、Webサイト、名前で検索",
        all: "すべて",
        company: "企業",
        sites: "Webサイト",
        names: "名前",
        note: "備考",
        genres: {
            electronics: "家電・電子機器",
            games: "ゲーム",
            ai: "AIモデル",
            social: "SNS・動画アプリ",
            shopping: "ショッピング・決済",
            companies: "企業",
        },
    },
}
const text = computed(() => (lang.value === "ja" ? TEXT.ja : TEXT.en))

const query = ref("")

// The genre shown, or "" for all
const genre = ref("")

// Rows in the genre whose company, websites or names hold the query, ignoring case
const rows = computed(() => {
    const q = query.value.trim().toLowerCase()
    return list.filter(
        (c) =>
            (!genre.value || c.genres.includes(genre.value)) &&
            [c.company, ...c.domains, ...c.names].some((s) => s.toLowerCase().includes(q)),
    )
})
</script>

<template>
    <div class="search">
        <input v-model="query" type="search" :placeholder="text.search" :aria-label="text.search" />
        <span>{{ rows.length }} / {{ list.length }}</span>
    </div>
    <div class="genres">
        <button :aria-pressed="!genre" @click="genre = ''">{{ text.all }}</button>
        <button
            v-for="(label, g) in text.genres"
            :key="g"
            :aria-pressed="genre === g"
            @click="genre = g"
        >
            {{ label }}
        </button>
    </div>
    <table class="list">
        <thead>
            <tr>
                <th>{{ text.company }}</th>
                <th>{{ text.sites }}</th>
                <th>{{ text.names }}</th>
                <th>{{ text.note }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in rows" :key="c.company">
                <td>{{ c.company }}</td>
                <td v-for="items in [c.domains, c.names]">
                    <template v-for="(item, i) in items"
                        ><span v-if="i" class="sep">, </span>{{ item }}</template
                    >
                </td>
                <td class="note">{{ c.note }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.search {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
}

.search input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: var(--vp-c-bg-soft);
}

.search input:focus {
    border-color: var(--vp-c-brand-1);
}

.search span {
    color: var(--vp-c-text-2);
    font-size: 14px;
}

.genres {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
}

.genres button {
    padding: 4px 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    color: var(--vp-c-text-2);
    font-size: 14px;
}

.genres button:hover {
    color: var(--vp-c-text-1);
}

.genres button[aria-pressed="true"] {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

/* Full width even when a filter leaves few rows */
table.list {
    display: table;
    width: 100%;
}

.sep {
    opacity: 0.6;
}

.note {
    font-size: 13px;
    color: var(--vp-c-text-2);
}
</style>
