export interface RadarSignalNode {
  id: string
  code: string
  alias: string
  age: number
  city: string
  coordinates: string
  angleDeg: number
  radiusPct: number // 22 to 82
  resonancePct: number
  stateLabel: string
  stateKey: "Curiosity" | "Calm" | "Attraction" | "Adventure" | "Intimacy"
  pulseSpeed: "slow" | "medium" | "fast"
  image: string
  imageAlt: string
  quote: string
  rhythmNote: string
  sharedImpulses: string[]
}

export interface SignalStateConfig {
  key: "Curiosity" | "Calm" | "Attraction" | "Adventure" | "Intimacy"
  titleEn: string
  titleRu: string
  frequencyHz: string
  wavelength: string
  orbitEccentricity: number
  waveCount: number
  amplitude: number
  accentHex: string
  secondaryHex: string
  tagline: string
  description: string
  matchingQualities: string[]
  ambientMetric: string
}

export interface DesireItem {
  id: string
  index: string
  title: string
  subtitle: string
  prose: string
  sensoryTag: string
  orbitMetric: string
  intensity: number
}

export const RADAR_SIGNALS: RadarSignalNode[] = [
  {
    id: "sig-lyra",
    code: "SIG // 01-LYRA",
    alias: "Элина",
    age: 27,
    city: "Ночной мегаполис · UTC+3",
    coordinates: "RA 18h 36m · DEC +38° 47′",
    angleDeg: 38,
    radiusPct: 44,
    resonancePct: 96.4,
    stateLabel: "Attraction · Глубокое притяжение",
    stateKey: "Attraction",
    pulseSpeed: "medium",
    image: "./images/hero-portrait.webp",
    imageAlt: "Кинематографический портрет взрослой женщины в глубоком полуночно-синем и фиолетовом свете",
    quote: "Ищу не анкету, а человека, с которым тишина в два часа ночи звучит как продолжение разговора.",
    rhythmNote: "Совпадение вечерних биоритмов, кинематографической эстетики и медленного сближения.",
    sharedImpulses: ["Ночные прогулки", "Винил и аналоговый звук", "Тактильная честность"],
  },
  {
    id: "sig-orion",
    code: "SIG // 04-VEGA",
    alias: "Марк",
    age: 29,
    city: "Северная широта · UTC+3",
    coordinates: "RA 05h 55m · DEC +07° 24′",
    angleDeg: 142,
    radiusPct: 62,
    resonancePct: 93.8,
    stateLabel: "Calm · Внимательный покой",
    stateKey: "Calm",
    pulseSpeed: "slow",
    image: "./images/signal-portrait-male.webp",
    imageAlt: "Портрет взрослого мужчины в кинематографическом освещении с мягким серебристо-лавандовым контровым светом",
    quote: "В мире бесконечного шума ценю редкие сигналы — взгляд через комнату, точное слово и отсутствие спешки.",
    rhythmNote: "Высокая синхронность по темпу диалога, бережному отношению к личным границам и архитектуре.",
    sharedImpulses: ["Современная фотография", "Камерные пространства", "Спонтанные маршруты"],
  },
  {
    id: "sig-cygnus",
    code: "SIG // 07-CYGNUS",
    alias: "Клара",
    age: 26,
    city: "Европейский пояс · UTC+1",
    coordinates: "RA 20h 41m · DEC +45° 16′",
    angleDeg: 235,
    radiusPct: 52,
    resonancePct: 91.2,
    stateLabel: "Intimacy · Эмоциональная близость",
    stateKey: "Intimacy",
    pulseSpeed: "medium",
    image: "./images/signal-portrait-female.webp",
    imageAlt: "Естественный портрет взрослой женщины с мягким фиолетово-серебристым отблеском в глазах",
    quote: "Притяжение начинается задолго до первого прикосновения — с интонации и способности слышать полутона.",
    rhythmNote: "Резонанс в эмоциональной открытости, тонком юморе и ночном времени активности.",
    sharedImpulses: ["Авторское кино", "Ночные поезда", "Чувственная эстетика"],
  },
  {
    id: "sig-altair",
    code: "SIG // 09-ALTAIR",
    alias: "Нора и Даниэль (Двойной резонанс)",
    age: 28,
    city: "Транзитная орбита · UTC+2",
    coordinates: "RA 19h 50m · DEC +08° 52′",
    angleDeg: 312,
    radiusPct: 74,
    resonancePct: 89.5,
    stateLabel: "Curiosity · Исследование неизвестного",
    stateKey: "Curiosity",
    pulseSpeed: "fast",
    image: "./images/human-connection.webp",
    imageAlt: "Два взрослых человека в атмосферном современном пространстве, обменивающиеся сдержанным взглядом",
    quote: "Два человека в одном пространстве, которые ещё не произнесли ни слова, но уже изменили траекторию друг друга.",
    rhythmNote: "Пример зафиксированного пересечения двух независимых орбит в едином эмоциональном поле.",
    sharedImpulses: ["Закрытые выставки", "Синхронный ритм", "Интеллектуальный магнетизм"],
  },
]

export const SIGNAL_STATES: SignalStateConfig[] = [
  {
    key: "Curiosity",
    titleEn: "Curiosity",
    titleRu: "Любопытство и открытие",
    frequencyHz: "432.8 Hz · Высокая восприимчивость",
    wavelength: "λ 620 nm · Световая спираль",
    orbitEccentricity: 0.42,
    waveCount: 5,
    amplitude: 34,
    accentHex: "#A79AFF",
    secondaryHex: "#6E5BFF",
    tagline: "Готовность заметить необычное в незнакомом человеке.",
    description:
      "Ваш сигнал открыт к неожиданным траекториям. В этом состоянии алгоритм концептуальной модели фокусируется на людях с комплементарным опытом, редкими культурными кодами и живым исследовательским интересом к диалогу.",
    matchingQualities: [
      "Неожиданные темы разговоров без шаблонных приветствий",
      "Сходство эстетических и музыкальных импульсов",
      "Открытость к спонтанным вечерним маршрутам",
    ],
    ambientMetric: "Радиус поиска: Расширенный горизонт · 78% асимметрии",
  },
  {
    key: "Calm",
    titleEn: "Calm",
    titleRu: "Тишина и созерцание",
    frequencyHz: "288.4 Hz · Стабильный резонанс",
    wavelength: "λ 740 nm · Ламинарная орбита",
    orbitEccentricity: 0.14,
    waveCount: 3,
    amplitude: 18,
    accentHex: "#F4F0FF",
    secondaryHex: "#A7A6B8",
    tagline: "Притяжение без спешки, давления и информационного шума.",
    description:
      "Состояние ровного внутреннего света. Сигнал притягивает тех, кто ценит вдумчивые паузы, бережное отношение к личному пространству и медленное, но глубокое взаимное узнавание.",
    matchingQualities: [
      "Медленный, осознанный темп переписки и голосовых заметок",
      "Комфорт в тишине и отсутствие навязчивых ожиданий",
      "Глубокая эмоциональная устойчивость",
    ],
    ambientMetric: "Радиус поиска: Гармоническая орбита · 94% стабильности",
  },
  {
    key: "Attraction",
    titleEn: "Attraction",
    titleRu: "Магнетизм и искра",
    frequencyHz: "528.0 Hz · Интенсивный импульс",
    wavelength: "λ 495 nm · Гравитационный захват",
    orbitEccentricity: 0.58,
    waveCount: 7,
    amplitude: 48,
    accentHex: "#6E5BFF",
    secondaryHex: "#A79AFF",
    tagline: "Тонкое напряжение взгляда, которое невозможно объяснить логикой.",
    description:
      "Высококонтрастный сигнал, настроенный на эстетическое и чувственное притяжение. Визуализирует момент, когда две независимые траектории испытывают взаимное гравитационное ускорение.",
    matchingQualities: [
      "Высокая чувствительность к голосу, пластике и визуальным деталям",
      "Живая химия в диалоге и тонкая ирония",
      "Готовность перевести цифровой сигнал в реальную встречу",
    ],
    ambientMetric: "Радиус поиска: Ближний перигелий · 98% интенсивности",
  },
  {
    key: "Adventure",
    titleEn: "Adventure",
    titleRu: "Выход за пределы",
    frequencyHz: "612.5 Hz · Импульсная траектория",
    wavelength: "λ 410 nm · Гиперболический манёвр",
    orbitEccentricity: 0.72,
    waveCount: 8,
    amplitude: 54,
    accentHex: "#A79AFF",
    secondaryHex: "#F4F0FF",
    tagline: "Когда совпадение двух людей становится началом нового сюжета.",
    description:
      "Динамический сигнал для тех, кто ищет соучастника в полуночных поездках, новых городах, закрытых событиях и смелых эмоциональных экспериментах.",
    matchingQualities: [
      "Лёгкость на подъём и любовь к ночной жизни мегаполиса",
      "Свобода от сценариев и предсказуемых свиданий",
      "Высокая энергия и кинематографичное восприятие момента",
    ],
    ambientMetric: "Радиус поиска: Открытая траектория · 89% динамики",
  },
  {
    key: "Intimacy",
    titleEn: "Intimacy",
    titleRu: "Интимность и глубина",
    frequencyHz: "396.0 Hz · Камерный спектр",
    wavelength: "λ 580 nm · Тесная двойная система",
    orbitEccentricity: 0.24,
    waveCount: 4,
    amplitude: 28,
    accentHex: "#6E5BFF",
    secondaryHex: "#F4F0FF",
    tagline: "Редкая роскошь быть увиденным по-настоящему и без защитных масок.",
    description:
      "Самый деликатный режим сигнала. Фокусируется на эмоциональной зрелости, тактильной чуткости, доверии и способности разделить уязвимость в защищённом приватном пространстве.",
    matchingQualities: [
      "Искренность без перформанса и социальных ролей",
      "Внимание к оттенкам настроения и несказанным словам",
      "Приоритет глубокой личной связи над количеством контактов",
    ],
    ambientMetric: "Радиус поиска: Защищённый контур · 99% приватности",
  },
]

export const DESIRE_ITEMS: DesireItem[] = [
  {
    id: "desire-01",
    index: "01",
    title: "Полуночный резонанс",
    subtitle: "Голос в темноте и честность после полуночи",
    prose:
      "Самые настоящие разговоры случаются тогда, когда город засыпает. В AstroSyncho вы можете открыть свой сигнал только для тех, кто бодрствует на вашей частоте прямо сейчас — для тихого аудиосообщения, спонтанного признания или взгляда без фильтров.",
    sensoryTag: "АУДИО · ПОЛУТОНА · НОЧНОЙ ЭФИР",
    orbitMetric: "Синхронность фазы: 00:00 — 04:00",
    intensity: 88,
  },
  {
    id: "desire-02",
    index: "02",
    title: "Тактильное притяжение",
    subtitle: "Эстетика кожи, света и неслучайного присутствия",
    prose:
      "Мы отказались от механики бесконечного свайпа. Вместо потока карточек — редкие, тщательно сфокусированные пересечения, где фотография передаёт фактуру, взгляд и живое дыхание, а интерес возникает взаимно.",
    sensoryTag: "ВЗГЛЯД · ФАКТУРА · ГРАВИТАЦИЯ",
    orbitMetric: "Экспозиция: До 3 сигналов за вечер",
    intensity: 95,
  },
  {
    id: "desire-03",
    index: "03",
    title: "Тайные совпадения",
    subtitle: "Желания, которые раскрываются только при взаимном выборе",
    prose:
      "Вы отмечаете тонкие эмоциональные и чувственные импульсы в закрытом контуре. Другой человек узнает о них лишь в том случае, если его собственный вектор желаний совпадёт с вашим — создавая безопасное пространство для взрослой близости.",
    sensoryTag: "ВЗАИМНОСТЬ · ТАЙНА · ДОВЕРИЕ",
    orbitMetric: "Протокол: Двойное подтверждение импульса",
    intensity: 92,
  },
  {
    id: "desire-04",
    index: "04",
    title: "Кинематограф встречи",
    subtitle: "Переход из цифрового эфира в реальное пространство",
    prose:
      "Когда две орбиты входят в устойчивый резонанс, интерфейс предлагает не бесконечный чат, а атмосферный сценарий первой встречи — от камерного бара с приглушённым светом до ночной обсерватории или закрытой выставки.",
    sensoryTag: "РЕАЛЬНОСТЬ · АТМОСФЕРА · СЮЖЕТ",
    orbitMetric: "Переход: От сигнала к присутствию",
    intensity: 90,
  },
]
