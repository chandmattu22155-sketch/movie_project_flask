
import React from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

const QUALITIES = ["480p", "720p", "1080p", "2160p", "3D"];

const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "foreign", name: "Foreign" },
    { code: "fr", name: "French", count: 3752 },
    { code: "ja", name: "Japanese", count: 3027 },
    { code: "es", name: "Spanish", count: 2134 },
    { code: "it", name: "Italian", count: 1730 },
    { code: "de", name: "German", count: 1405 },
    { code: "zh", name: "Chinese", count: 1243 },
    { code: "ko", name: "Korean", count: 1051 },
    { code: "hi", name: "Hindi", count: 988 },
    { code: "cn", name: "Cantonese", count: 905 },
    { code: "tr", name: "Turkish", count: 778 },
    { code: "pt", name: "Portuguese", count: 533 },
    { code: "sv", name: "Swedish", count: 514 },
    { code: "ro", name: "Romanian", count: 498 },
    { code: "eng", name: "English", count: 461 },
    { code: "ru", name: "Russian", count: 456 },
    { code: "pl", name: "Polish", count: 428 },
    { code: "nl", name: "Dutch", count: 388 },
    { code: "da", name: "Danish", count: 316 },
    { code: "th", name: "Thai", count: 286 },
    { code: "id", name: "Indonesian", count: 272 },
    { code: "ta", name: "Tamil", count: 271 },
    { code: "te", name: "Telugu", count: 264 },
    { code: "no", name: "Norwegian", count: 238 },
    { code: "ar", name: "Arabic", count: 211 },
    { code: "tl", name: "Tagalog", count: 189 },
    { code: "fi", name: "Finnish", count: 174 },
    { code: "cs", name: "Czech", count: 171 },
    { code: "ml", name: "Malayalam", count: 166 },
    { code: "hu", name: "Hungarian", count: 163 },
    { code: "vi", name: "Vietnamese", count: 140 },
    { code: "fa", name: "Persian", count: 126 },
    { code: "he", name: "Hebrew", count: 110 },
    { code: "pa", name: "Punjabi", count: 105 },
    { code: "uk", name: "Ukrainian", count: 93 },
    { code: "et", name: "Estonian", count: 91 },
    { code: "el", name: "Greek", count: 78 },
    { code: "ms", name: "Malay", count: 61 },
    { code: "bn", name: "Bangla", count: 54 },
    { code: "kn", name: "Kannada", count: 53 },
    { code: "ca", name: "Catalan", count: 49 },
    { code: "is", name: "Icelandic", count: 41 },
    { code: "sk", name: "Slovak", count: 36 },
    { code: "sr", name: "Serbian", count: 35 },
    { code: "lt", name: "Lithuanian", count: 35 },
    { code: "mr", name: "Marathi", count: 34 },
    { code: "ur", name: "Urdu", count: 25 },
    { code: "xx", name: "xx", count: 24 },
    { code: "hr", name: "Croatian", count: 24 },
    { code: "ka", name: "Georgian", count: 21 },
    { code: "lv", name: "Latvian", count: 20 },
    { code: "af", name: "Afrikaans", count: 18 },
    { code: "bg", name: "Bulgarian", count: 17 },
    { code: "sh", name: "Serbo-Croatian", count: 14 },
    { code: "ku", name: "Kurdish", count: 13 },
    { code: "zu", name: "Zulu", count: 12 },
    { code: "eu", name: "Basque", count: 10 },
    { code: "ga", name: "Irish", count: 10 },
    { code: "mk", name: "Macedonian", count: 10 },
    { code: "yo", name: "Yoruba", count: 10 },
    { code: "bs", name: "Bosnian", count: 9 },
    { code: "sw", name: "Swahili", count: 9 },
    { code: "gl", name: "Galician", count: 9 },
    { code: "bo", name: "Tibetan", count: 9 },
    { code: "sl", name: "Slovenian", count: 9 },
    { code: "sq", name: "Albanian", count: 9 },
    { code: "fra", name: "French", count: 9 },
    { code: "wo", name: "Wolof", count: 8 },
    { code: "gu", name: "Gujarati", count: 8 },
    { code: "spa", name: "Spanish", count: 8 },
    { code: "deu", name: "German", count: 8 },
    { code: "kk", name: "Kazakh", count: 7 },
    { code: "jpn", name: "Japanese", count: 7 },
    { code: "mn", name: "Mongolian", count: 6 },
    { code: "kor", name: "Korean", count: 6 },
    { code: "km", name: "Khmer", count: 5 },
    { code: "am", name: "Amharic", count: 5 },
    { code: "ht", name: "Haitian Creole", count: 5 },
    { code: "yi", name: "Yiddish", count: 4 },
    { code: "iu", name: "Inuktitut", count: 4 },
    { code: "ne", name: "Nepali", count: 4 },
    { code: "dz", name: "Dzongkha", count: 4 },
    { code: "swe", name: "Swedish", count: 4 },
    { code: "ita", name: "Italian", count: 4 },
    { code: "ab", name: "Abkhazian", count: 3 },
    { code: "ps", name: "Pashto", count: 3 },
    { code: "hy", name: "Armenian", count: 3 },
    { code: "cy", name: "Welsh", count: 3 },
    { code: "xh", name: "Xhosa", count: 3 },
    { code: "jv", name: "Javanese", count: 3 },
    { code: "mo", name: "Romanian", count: 3 },
    { code: "la", name: "Latin", count: 2 },
    { code: "os", name: "Ossetic", count: 2 },
    { code: "mi", name: "Maori", count: 2 },
    { code: "ak", name: "Akan", count: 2 },
    { code: "st", name: "Southern Sotho", count: 2 },
    { code: "lg", name: "Ganda", count: 2 },
    { code: "ig", name: "Igbo", count: 2 },
    { code: "mt", name: "Maltese", count: 2 },
    { code: "cmn", name: "cmn", count: 2 },
    { code: "yue", name: "Cantonese", count: 2 },
    { code: "rw", name: "Kinyarwanda", count: 2 },
    { code: "my", name: "Burmese", count: 2 },
    { code: "lo", name: "Lao", count: 2 },
    { code: "se", name: "Northern Sami", count: 2 },
    { code: "si", name: "Sinhala", count: 2 },
    { code: "ces", name: "Czech", count: 2 },
    { code: "rus", name: "Russian", count: 2 },
    { code: "ron", name: "Romanian", count: 2 },
    { code: "vie", name: "Vietnamese", count: 2 },
    { code: "nld", name: "Dutch", count: 2 },
    { code: "nb", name: "Norwegian Bokmål", count: 1 },
    { code: "aa", name: "Afar", count: 1 },
    { code: "lb", name: "Luxembourgish", count: 1 },
    { code: "ky", name: "Kyrgyz", count: 1 },
    { code: "az", name: "Azerbaijani", count: 1 },
    { code: "so", name: "Somali", count: 1 },
    { code: "be", name: "Belarusian", count: 1 },
    { code: "zxx", name: "No linguistic content", count: 1 },
    { code: "fil", name: "Filipino", count: 1 },
    { code: "tw", name: "Twi", count: 1 },
    { code: "or", name: "Odia", count: 1 },
    { code: "ase", name: "American Sign Language", count: 1 },
    { code: "nan", name: "Min Nan Chinese", count: 1 },
    { code: "ber", name: "ber", count: 1 },
    { code: "qag", name: "qag", count: 1 },
    { code: "gsw", name: "Swiss German", count: 1 },
    { code: "ln", name: "Lingala", count: 1 },
    { code: "iba", name: "Iban", count: 1 },
    { code: "cr", name: "Cree", count: 1 },
    { code: "tn", name: "Tswana", count: 1 },
    { code: "qab", name: "qab", count: 1 },
    { code: "bm", name: "Bambara", count: 1 },
    { code: "rom", name: "Romany", count: 1 },
    { code: "sa", name: "Sanskrit", count: 1 },
    { code: "ukl", name: "ukl", count: 1 },
    { code: "ug", name: "Uyghur", count: 1 },
    { code: "kvk", name: "kvk", count: 1 },
    { code: "om", name: "Oromo", count: 1 },
    { code: "myn", name: "myn", count: 1 },
    { code: "uz", name: "Uzbek", count: 1 },
    { code: "ff", name: "Fulah", count: 1 },
    { code: "fy", name: "Western Frisian", count: 1 },
    { code: "rup", name: "Aromanian", count: 1 },
    { code: "ti", name: "Tigrinya", count: 1 },
    { code: "qu", name: "Quechua", count: 1 },
    { code: "sah", name: "Sakha", count: 1 },
    { code: "ks", name: "Kashmiri", count: 1 },
    { code: "dan", name: "Danish", count: 1 },
    { code: "tel", name: "Telugu", count: 1 },
    { code: "kas", name: "Kashmiri", count: 1 },
    { code: "ind", name: "Indonesian", count: 1 },
    { code: "msa", name: "Malay", count: 1 },
    { code: "hin", name: "Hindi", count: 1 },
    { code: "tur", name: "Turkish", count: 1 },
    { code: "por", name: "Portuguese", count: 1 },
    { code: "zho", name: "Chinese", count: 1 },
    { code: "tam", name: "Tamil", count: 1 },
    { code: "hun", name: "Hungarian", count: 1 },
    { code: "afr", name: "Afrikaans", count: 1 },
    { code: "ben", name: "Bangla", count: 1 },
    { code: "fin", name: "Finnish", count: 1 },
    { code: "slk", name: "Slovak", count: 1 },
    { code: "bel", name: "Belarusian", count: 1 },
    { code: "mal", name: "Malayalam", count: 1 },
    { code: "ara", name: "Arabic", count: 1 },
    { code: "khm", name: "Khmer", count: 1 },
    { code: "kaz", name: "Kazakh", count: 1 },
    { code: "pol", name: "Polish", count: 1 },
    { code: "fas", name: "Persian", count: 1 },
    { code: "ik", name: "Inupiaq", count: 1 },
    { code: "tg", name: "Tajik", count: 1 },
    { code: "heb", name: "Hebrew", count: 1 },
    { code: "ukr", name: "Ukrainian", count: 1 },
    { code: "hrv", name: "Croatian", count: 1 },
    { code: "tgl", name: "Tagalog", count: 1 },
    { code: "tha", name: "Thai", count: 1 },
    { code: "cat", name: "Catalan", count: 1 },
    { code: "gle", name: "Irish", count: 1 },
    { code: "su", name: "Sundanese", count: 1 },
    { code: "isl", name: "Icelandic", count: 1 },
    { code: "pan", name: "Punjabi", count: 1 },
    { code: "tgk", name: "Tajik", count: 1 },
    { code: "ell", name: "Greek", count: 1 },
    { code: "kat", name: "Georgian", count: 1 },
    { code: "nor", name: "Norwegian", count: 1 },
    { code: "aze", name: "Azerbaijani", count: 1 },
    { code: "ng", name: "Ndonga", count: 1 },
    { code: "mar", name: "Marathi", count: 1 },
];
const YEARS = Array.from(
    { length: 2026 - 2000 + 1 },
    (_, i) => 2026 - i
);

const selectStyle =
    "w-full appearance-none bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 pr-10 text-gray-300 outline-none focus:border-[#8B5CF6] transition cursor-pointer";

function SelectBox({ label, value, onChange, children }) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">
                {label}
            </label>

            <div className="relative">
                <select
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={selectStyle}
                >
                    {children}
                </select>

                <ChevronDown
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
        </div>
    );
}

function MovieFilters({ filters = {}, onChange, onClear }) {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-6">
                <SlidersHorizontal className="text-[#8B5CF6]" size={22} />

                <h2 className="text-xl font-bold text-white">
                    Filter <span className="text-[#8B5CF6]">Movies</span>
                </h2>
            </div>

            <div className="bg-[#18181B] border border-white/10 rounded-xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <SelectBox
                        label="Quality"
                        value={filters.quality}
                        onChange={(v) => onChange?.("quality", v)}
                    >
                        <option value="">All Quality</option>
                        {QUALITIES.map((q) => (
                            <option key={q} value={q}>{q}</option>
                        ))}
                    </SelectBox>

                    <SelectBox
                        label="Rating"
                        value={filters.rating}
                        onChange={(v) => onChange?.("rating", v)}
                    >
                        <option value="">All Ratings</option>
                        {RATINGS.map((r) => (
                            <option key={r} value={String(r)}>{r}+</option>
                        ))}
                    </SelectBox>
                    <SelectBox
                        label="Language"
                        value={filters.language}
                        onChange={(v) => onChange?.("language", v)}
                    >
                        <option value="">All Languages</option>

                        {LANGUAGES.map((language) => (
                            <option key={language.code} value={language.code}>
                                {language.name}
                                {language.count ? ` (${language.count})` : ""}
                            </option>
                        ))}
                    </SelectBox>

                    <SelectBox
                        label="Release Year"
                        value={filters.year}
                        onChange={(v) => onChange?.("year", v)}
                    >
                        <option value="">All Years</option>
                        {YEARS.map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                        ))}
                    </SelectBox>

                    <div className="flex flex-col justify-end">
                        <button
                            type="button"
                            onClick={() => onClear?.()}
                            className="w-full flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-lg px-4 py-3 transition duration-300 cursor-pointer"
                        >
                            <X size={18} />
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MovieFilters;
