import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// ДАННЫЕ
// ═══════════════════════════════════════════════════════════════════

const HEROES = [
  { name:"Anti-Mage", slug:"antimage", attr:"AGI", desc:"Сжигает ману. Любую. Всем.", tags:["carry","escape"] },
  { name:"Axe", slug:"axe", attr:"STR", desc:"Зовёт всех на свой Call. Снова и снова.", tags:["initiator","durable"] },
  { name:"Bane", slug:"bane", attr:"UNI", desc:"Усыпляет, кошмарит. Самый раздражающий саппорт.", tags:["support","disabler"] },
  { name:"Bloodseeker", slug:"bloodseeker", attr:"AGI", desc:"Чует твою кровь. Ты уже мёртв.", tags:["carry","disabler"] },
  { name:"Crystal Maiden", slug:"crystal_maiden", attr:"INT", desc:"Слишком медленная, слишком мощная.", tags:["support","disabler"] },
  { name:"Drow Ranger", slug:"drow_ranger", attr:"AGI", desc:"Предпочитает тишину и стрелы любому разговору.", tags:["carry","disabler"] },
  { name:"Earthshaker", slug:"earthshaker", attr:"STR", desc:"Земля дрожит при каждом его шаге.", tags:["support","initiator"] },
  { name:"Juggernaut", slug:"juggernaut", attr:"AGI", desc:"Спиннит. Всегда. Даже когда не надо.", tags:["carry","pusher"] },
  { name:"Mirana", slug:"mirana", attr:"UNI", desc:"Есть кот. Стрелы всё равно мажут.", tags:["carry","support"] },
  { name:"Morphling", slug:"morphling", attr:"AGI", desc:"Меняет форму, силу, роль. Не знаешь кто перед тобой.", tags:["carry","escape"] },
  { name:"Shadow Fiend", slug:"nevermore", attr:"AGI", desc:"Собирает души как торговые карточки.", tags:["carry","nuker"] },
  { name:"Phantom Lancer", slug:"phantom_lancer", attr:"AGI", desc:"Создаёт армию клонов. Путаница гарантирована.", tags:["carry","escape"] },
  { name:"Puck", slug:"puck", attr:"INT", desc:"Исчезает в фазовом сдвиге прямо перед твоим ультом.", tags:["initiator","disabler"] },
  { name:"Pudge", slug:"pudge", attr:"STR", desc:"Крюк летит туда, куда ты не смотришь.", tags:["disabler","initiator"] },
  { name:"Razor", slug:"razor", attr:"AGI", desc:"Крадёт твой урон. Буквально.", tags:["carry","durable"] },
  { name:"Sand King", slug:"sand_king", attr:"UNI", desc:"Закапывается и выскакивает в самый неожиданный момент.", tags:["initiator","disabler"] },
  { name:"Storm Spirit", slug:"storm_spirit", attr:"INT", desc:"Шарик молнии с бесконечной маной и нулём тормозов.", tags:["carry","escape"] },
  { name:"Sven", slug:"sven", attr:"STR", desc:"Один удар решает всё. Остальное — последствия.", tags:["carry","disabler"] },
  { name:"Tiny", slug:"tiny", attr:"STR", desc:"Бросает тебя. Потом бьёт горой.", tags:["carry","nuker"] },
  { name:"Vengeful Spirit", slug:"vengefulspirit", attr:"UNI", desc:"Меняется местами с тобой. Это плохо для тебя.", tags:["support","initiator"] },
  { name:"Windranger", slug:"windrunner", attr:"UNI", desc:"Привязывает к дереву и расстреливает в упор.", tags:["carry","support"] },
  { name:"Zeus", slug:"zuus", attr:"INT", desc:"Молния везде. Даже за туманом войны.", tags:["nuker","carry"] },
  { name:"Kunkka", slug:"kunkka", attr:"STR", desc:"Корабль, меч, призрак. Лучший капитан в деле.", tags:["carry","support"] },
  { name:"Lina", slug:"lina", attr:"INT", desc:"Сжигает всё. Особенно союзников.", tags:["support","carry"] },
  { name:"Lion", slug:"lion", attr:"INT", desc:"Превращает врагов в лягушек. Ну и что.", tags:["support","disabler"] },
  { name:"Shadow Shaman", slug:"shadow_shaman", attr:"INT", desc:"Привязывает тебя. Шакалы делают остальное.", tags:["support","pusher"] },
  { name:"Slardar", slug:"slardar", attr:"STR", desc:"Снимает скрытность. Усиливает удары. Без слов.", tags:["carry","durable"] },
  { name:"Tidehunter", slug:"tidehunter", attr:"STR", desc:"Кракен зовёт — и всё поле замирает.", tags:["initiator","durable"] },
  { name:"Witch Doctor", slug:"witch_doctor", attr:"INT", desc:"Танцует у твоего трупа. С энтузиазмом.", tags:["support","nuker"] },
  { name:"Lich", slug:"lich", attr:"INT", desc:"Ульт прыгает между всеми. Никто не спасётся.", tags:["support","nuker"] },
  { name:"Riki", slug:"riki", attr:"AGI", desc:"Невидим. Убивает. Пропадает. Банят первым.", tags:["carry","escape"] },
  { name:"Enigma", slug:"enigma", attr:"UNI", desc:"Чёрная дыра затягивает весь вражеский тим.", tags:["disabler","jungler"] },
  { name:"Tinker", slug:"tinker", attr:"INT", desc:"Перезаряжается. Снова марш. Снова. Снова.", tags:["carry","nuker"] },
  { name:"Sniper", slug:"sniper", attr:"AGI", desc:"Убивает с другого конца карты. Неуязвим на дистанции.", tags:["carry","nuker"] },
  { name:"Necrophos", slug:"necrolyte", attr:"INT", desc:"Убивает и лечится. Потом ждёт.", tags:["carry","nuker"] },
  { name:"Warlock", slug:"warlock", attr:"INT", desc:"Призывает голема. Хаос гарантирован.", tags:["support","initiator"] },
  { name:"Beastmaster", slug:"beastmaster", attr:"UNI", desc:"Звери везде. Роара слышно по всей карте.", tags:["initiator","disabler"] },
  { name:"Queen of Pain", slug:"queenofpain", attr:"INT", desc:"Телепортируется, кричит, убивает. Очень громко.", tags:["carry","nuker"] },
  { name:"Venomancer", slug:"venomancer", attr:"UNI", desc:"Засыпает всё ядом. Медленная смерть.", tags:["support","nuker"] },
  { name:"Faceless Void", slug:"faceless_void", attr:"AGI", desc:"Запирает всех в пузыре. Союзников тоже.", tags:["carry","initiator"] },
  { name:"Wraith King", slug:"skeleton_king", attr:"STR", desc:"Умирает и воскресает. Враги в панике.", tags:["carry","support"] },
  { name:"Death Prophet", slug:"death_prophet", attr:"INT", desc:"Призраки летят. Сносит всё на пути.", tags:["carry","pusher"] },
  { name:"Phantom Assassin", slug:"phantom_assassin", attr:"AGI", desc:"Критует с такой силой, что экран краснеет.", tags:["carry","escape"] },
  { name:"Pugna", slug:"pugna", attr:"INT", desc:"Уменьшает тебя. Потом растворяет.", tags:["nuker","pusher"] },
  { name:"Templar Assassin", slug:"templar_assassin", attr:"AGI", desc:"Невидима в засаде. Рефракция держит урон.", tags:["carry","escape"] },
  { name:"Viper", slug:"viper", attr:"AGI", desc:"Замедляет, ядовит, надоедливый на лайне.", tags:["carry","durable"] },
  { name:"Luna", slug:"luna", attr:"AGI", desc:"Серп лунного света косит всех вокруг.", tags:["carry","nuker"] },
  { name:"Dragon Knight", slug:"dragon_knight", attr:"STR", desc:"Превращается в дракона и сжигает всё.", tags:["carry","pusher"] },
  { name:"Dazzle", slug:"dazzle", attr:"UNI", desc:"Лечит союзников за долю секунды до смерти.", tags:["support","nuker"] },
  { name:"Clockwerk", slug:"rattletrap", attr:"UNI", desc:"Крюк, клетка, батарея. Никуда не денешься.", tags:["initiator","disabler"] },
  { name:"Leshrac", slug:"leshrac", attr:"INT", desc:"Взрывает землю и танцует на руинах.", tags:["carry","support"] },
  { name:"Nature's Prophet", slug:"furion", attr:"INT", desc:"Телепортируется по всей карте. Везде и нигде.", tags:["carry","jungler"] },
  { name:"Lifestealer", slug:"life_stealer", attr:"STR", desc:"Поглощает хп врагов. Неубиваем в ближнем бою.", tags:["carry","durable"] },
  { name:"Dark Seer", slug:"dark_seer", attr:"UNI", desc:"Вакуум собирает всех в кучу. Дальше ты знаешь.", tags:["initiator","jungler"] },
  { name:"Clinkz", slug:"clinkz", attr:"AGI", desc:"Невидимый лучник. Убивает одним выстрелом.", tags:["carry","escape"] },
  { name:"Omniknight", slug:"omniknight", attr:"STR", desc:"Хранитель не даёт союзникам умереть. Никогда.", tags:["support","durable"] },
  { name:"Enchantress", slug:"enchantress", attr:"INT", desc:"Подчиняет крипов. Леса теперь против тебя.", tags:["support","jungler"] },
  { name:"Huskar", slug:"huskar", attr:"STR", desc:"Чем меньше хп — тем опаснее. Не подходи.", tags:["carry","durable"] },
  { name:"Night Stalker", slug:"night_stalker", attr:"STR", desc:"Ночью — абсолютный кошмар. Днём просто страшный.", tags:["carry","initiator"] },
  { name:"Broodmother", slug:"broodmother", attr:"UNI", desc:"Паутина, пауки, хаос. Ни пройти ни проехать.", tags:["carry","pusher"] },
  { name:"Bounty Hunter", slug:"bounty_hunter", attr:"AGI", desc:"Ставит метку. Слежка. Деньги за убийство.", tags:["escape","nuker"] },
  { name:"Weaver", slug:"weaver", attr:"AGI", desc:"Откатывает время назад и выживает.", tags:["carry","escape"] },
  { name:"Jakiro", slug:"jakiro", attr:"INT", desc:"Двухголовый дракон — огонь и лёд одновременно.", tags:["support","nuker"] },
  { name:"Batrider", slug:"batrider", attr:"UNI", desc:"Поджигает всё. Увозит тебя к своей команде.", tags:["initiator","jungler"] },
  { name:"Chen", slug:"chen", attr:"UNI", desc:"Армия крипов под его контролем сносит тавер.", tags:["support","jungler"] },
  { name:"Spectre", slug:"spectre", attr:"AGI", desc:"Телепортируется к любому врагу в любой момент.", tags:["carry","durable"] },
  { name:"Ancient Apparition", slug:"ancient_apparition", attr:"INT", desc:"Ульт не даёт восстановить хп. Никому.", tags:["support","disabler"] },
  { name:"Doom", slug:"doom_bringer", attr:"STR", desc:"Замолкай. Буквально — заглушает и убивает.", tags:["carry","disabler"] },
  { name:"Ursa", slug:"ursa", attr:"AGI", desc:"Три удара — и ты умер. Без вариантов.", tags:["carry","jungler"] },
  { name:"Spirit Breaker", slug:"spirit_breaker", attr:"STR", desc:"Разгоняется по карте и сбивает с ног.", tags:["carry","initiator"] },
  { name:"Gyrocopter", slug:"gyrocopter", attr:"AGI", desc:"Обстреливает всю карту ракетами с воздуха.", tags:["carry","nuker"] },
  { name:"Alchemist", slug:"alchemist", attr:"STR", desc:"Фармит быстрее всех. Богаче всех. Всегда.", tags:["carry","support"] },
  { name:"Invoker", slug:"invoker", attr:"INT", desc:"10 000 лет мастерства. 0 друзей.", tags:["carry","nuker"] },
  { name:"Silencer", slug:"silencer", attr:"INT", desc:"Глушит всех. Последнее слово за ним.", tags:["carry","support"] },
  { name:"Outworld Destroyer", slug:"obsidian_destroyer", attr:"INT", desc:"Забирает ману и бьёт ею же. Поэтично.", tags:["carry","nuker"] },
  { name:"Lycan", slug:"lycan", attr:"UNI", desc:"Воет на луну. Команда волков сносит базу.", tags:["carry","pusher"] },
  { name:"Brewmaster", slug:"brewmaster", attr:"UNI", desc:"Распадается на трёх духов. Трудно фокусить.", tags:["carry","initiator"] },
  { name:"Shadow Demon", slug:"shadow_demon", attr:"INT", desc:"Иллюзии, проклятия, хаос. Слишком сложно.", tags:["support","disabler"] },
  { name:"Lone Druid", slug:"lone_druid", attr:"UNI", desc:"Медведь отдельно, друид отдельно. Двое против пяти.", tags:["carry","pusher"] },
  { name:"Chaos Knight", slug:"chaos_knight", attr:"STR", desc:"Иллюзии с полным уроном. Попробуй найди реального.", tags:["carry","disabler"] },
  { name:"Meepo", slug:"meepo", attr:"AGI", desc:"Пять клонов одновременно. У противника паника.", tags:["carry","escape"] },
  { name:"Treant Protector", slug:"treant", attr:"STR", desc:"Деревья оживают. Буквально — карта против тебя.", tags:["support","initiator"] },
  { name:"Ogre Magi", slug:"ogre_magi", attr:"INT", desc:"Мультикаст рандомный. Или убьёт, или промажет.", tags:["support","nuker"] },
  { name:"Undying", slug:"undying", attr:"STR", desc:"Растёт с каждым убийством. Зомби везде.", tags:["support","durable"] },
  { name:"Rubick", slug:"rubick", attr:"INT", desc:"Крадёт заклинания. Использует против тебя.", tags:["support","disabler"] },
  { name:"Disruptor", slug:"disruptor", attr:"INT", desc:"Поле статики и кинематик. Никуда не убежишь.", tags:["support","disabler"] },
  { name:"Nyx Assassin", slug:"nyx_assassin", attr:"UNI", desc:"Из-под земли, оглушение, смерть. Всё быстро.", tags:["disabler","nuker"] },
  { name:"Naga Siren", slug:"naga_siren", attr:"AGI", desc:"Усыпляет всех. Пять секунд полного контроля.", tags:["carry","support"] },
  { name:"Keeper of the Light", slug:"keeper_of_the_light", attr:"INT", desc:"Вспышка слепит. Мана кончилась? Подари ещё.", tags:["support","nuker"] },
  { name:"Io", slug:"wisp", attr:"UNI", desc:"Телепортирует союзника. Спасает. Непонятный герой.", tags:["support","escape"] },
  { name:"Visage", slug:"visage", attr:"UNI", desc:"Птицы убивают. Броня не помогает.", tags:["support","nuker"] },
  { name:"Slark", slug:"slark", attr:"AGI", desc:"Крадёт баффы, уходит в тень. Не поймать.", tags:["carry","escape"] },
  { name:"Medusa", slug:"medusa", attr:"AGI", desc:"Окаменяет взглядом. Поздно убивать — уже несмертна.", tags:["carry","disabler"] },
  { name:"Troll Warlord", slug:"troll_warlord", attr:"AGI", desc:"Дуэль один на один. Почти всегда побеждает.", tags:["carry","pusher"] },
  { name:"Centaur Warrunner", slug:"centaur", attr:"STR", desc:"Каждый удар в него возвращается атакующему.", tags:["durable","initiator"] },
  { name:"Magnus", slug:"magnataur", attr:"UNI", desc:"Засасывает всех. Союзники дорубают.", tags:["initiator","disabler"] },
  { name:"Timbersaw", slug:"shredder", attr:"UNI", desc:"Цепная пила сквозь деревья. Контрит всех жирных.", tags:["nuker","durable"] },
  { name:"Bristleback", slug:"bristleback", attr:"STR", desc:"Шипы за спиной. Бей — получишь обратно.", tags:["carry","durable"] },
  { name:"Tusk", slug:"tusk", attr:"STR", desc:"Ледяное вращение и кулак в лицо.", tags:["initiator","disabler"] },
  { name:"Skywrath Mage", slug:"skywrath_mage", attr:"INT", desc:"Мистическая вспышка и ульт — два удара, ты мёртв.", tags:["support","nuker"] },
  { name:"Abaddon", slug:"abaddon", attr:"UNI", desc:"Щит превращает урон в лечение. Не трогай.", tags:["support","carry"] },
  { name:"Elder Titan", slug:"elder_titan", attr:"STR", desc:"Убирает армор. Ульт делает всё остальное.", tags:["initiator","disabler"] },
  { name:"Legion Commander", slug:"legion_commander", attr:"STR", desc:"Дуэль. Победитель забирает урон навсегда.", tags:["carry","disabler"] },
  { name:"Techies", slug:"techies", attr:"UNI", desc:"Мины везде. Никто не чувствует себя в безопасности.", tags:["nuker","disabler"] },
  { name:"Ember Spirit", slug:"ember_spirit", attr:"AGI", desc:"Огонь, прыжки, скорость. Нельзя поймать.", tags:["carry","escape"] },
  { name:"Earth Spirit", slug:"earth_spirit", attr:"STR", desc:"Прыжки, оглушения, заморозки. Один на один страшен.", tags:["nuker","escape"] },
  { name:"Underlord", slug:"abyssal_underlord", attr:"STR", desc:"Открывает портал. Вся команда телепортируется.", tags:["support","nuker"] },
  { name:"Terrorblade", slug:"terrorblade", attr:"AGI", desc:"Иллюзии с огромным уроном. Поздно убивать.", tags:["carry","pusher"] },
  { name:"Phoenix", slug:"phoenix", attr:"UNI", desc:"Летит как птица, взрывается как звезда.", tags:["support","nuker"] },
  { name:"Oracle", slug:"oracle", attr:"INT", desc:"Очищает, лечит, убивает. Зависит от ситуации.", tags:["support","nuker"] },
  { name:"Winter Wyvern", slug:"winter_wyvern", attr:"UNI", desc:"Замораживает союзников врага. Они бьют друг друга.", tags:["support","disabler"] },
  { name:"Arc Warden", slug:"arc_warden", attr:"AGI", desc:"Клон с полным комплектом предметов. Два Зета.", tags:["carry","escape"] },
  { name:"Monkey King", slug:"monkey_king", attr:"AGI", desc:"Прыгает по деревьям. Притворяется крипом. Убивает.", tags:["carry","escape"] },
  { name:"Dark Willow", slug:"dark_willow", attr:"UNI", desc:"Кустарники, проклятия, кошмары. Неприятный саппорт.", tags:["support","nuker"] },
  { name:"Pangolier", slug:"pangolier", attr:"UNI", desc:"Катится и сбивает всех с ног. Буквально.", tags:["carry","nuker"] },
  { name:"Grimstroke", slug:"grimstroke", attr:"INT", desc:"Соединяет врагов вместе. Ульт на двоих.", tags:["support","nuker"] },
  { name:"Hoodwink", slug:"hoodwink", attr:"AGI", desc:"Прячется за деревьями. Акорн в лоб оглушает.", tags:["support","nuker"] },
  { name:"Void Spirit", slug:"void_spirit", attr:"UNI", desc:"Четыре фазы, уходы, появления. Неуловим.", tags:["carry","escape"] },
  { name:"Snapfire", slug:"snapfire", attr:"UNI", desc:"Печенье лечит. Ящерица — это пушка.", tags:["support","nuker"] },
  { name:"Mars", slug:"mars", attr:"STR", desc:"Арена не даёт никому уйти. Команда добивает.", tags:["carry","initiator"] },
  { name:"Dawnbreaker", slug:"dawnbreaker", attr:"STR", desc:"Прилетает к союзнику. Ульт — рассвет на всю карту.", tags:["carry","durable"] },
  { name:"Marci", slug:"marci", attr:"UNI", desc:"Слов нет. Только кулаки. Очень много.", tags:["support","carry"] },
  { name:"Primal Beast", slug:"primal_beast", attr:"UNI", desc:"Топчет, давит, ломает. Без исключений.", tags:["carry","initiator"] },
  { name:"Muerta", slug:"muerta", attr:"UNI", desc:"Призрак и пистолет. Смерть неизбежна.", tags:["carry","nuker"] },
  { name:"Ringmaster", slug:"ringmaster", attr:"UNI", desc:"Шоу должно продолжаться. Даже в тимфайте.", tags:["support","disabler"] },
];

// Официальные цвета атрибутов Dota 2
const HC = {
  STR: { from:"#5c1111", glow:"#e84118", label:"⚔ СИЛА",       badge:"rgba(232,65,24,.15)", bdBorder:"#e8411855" },
  AGI: { from:"#0b3d2e", glow:"#44db6e", label:"🏃 ЛОВКОСТЬ",  badge:"rgba(68,219,110,.12)", bdBorder:"#44db6e55" },
  INT: { from:"#0d2453", glow:"#3d9be9", label:"🔮 ИНТЕЛЛЕКТ", badge:"rgba(61,155,233,.12)", bdBorder:"#3d9be955" },
  UNI: { from:"#2d1844", glow:"#c987f5", label:"✦ УНИВЕРСАЛ",  badge:"rgba(201,135,245,.12)", bdBorder:"#c987f555" },
};

const ATTR_CFG = {
  STR: { label:"Сила",      icon:"⚔", color:"#ff7043", glow:"#e84118", bg:"rgba(92,17,17,.4)",  border:"#e8411855" },
  AGI: { label:"Ловкость",  icon:"🏃", color:"#44db6e", glow:"#44db6e", bg:"rgba(11,61,46,.4)",  border:"#44db6e55" },
  INT: { label:"Интеллект", icon:"🔮", color:"#3d9be9", glow:"#3d9be9", bg:"rgba(13,36,83,.4)",  border:"#3d9be955" },
  UNI: { label:"Универсал", icon:"✦", color:"#c987f5", glow:"#c987f5", bg:"rgba(45,24,68,.35)", border:"#c987f555", isUni:true },
};

const PROMPTS = [
  { icon:"⚔", text:"Опиши главную способность этого героя — что она делает в бою?",              hint:"Намекай на механику, не называй скилл" },
  { icon:"🏃", text:"Этого героя легче поймать или он сам догоняет кого угодно?",                  hint:"Его мобильность на карте" },
  { icon:"💥", text:"Этот герой убивает мгновенно или берёт врага измором?",                      hint:"Бёрст урон или постепенный" },
  { icon:"🛡", text:"Он стоит в первых рядах тимфайта или прячется за союзниками?",               hint:"Позиционирование в бою" },
  { icon:"🔮", text:"Что важнее этому герою — мана, хп, или просто быть рядом?",                  hint:"Ключевой ресурс героя" },
  { icon:"🌑", text:"Его боишься встретить в одиночку на чужой территории?",                      hint:"Угроза на карте" },
  { icon:"💀", text:"Что случится с командой, если игнорировать его весь матч?",                   hint:"Масштабирование к поздней игре" },
  { icon:"🎯", text:"Этот герой опаснее в начале игры или ближе к финалу?",                        hint:"Пик силы" },
  { icon:"🔥", text:"Есть ли у него способность, которая меняет тимфайт за секунду?",             hint:"Ульт или ключевой скилл" },
  { icon:"❄",  text:"Может ли он в одиночку убить Рошана или снести строение?",                   hint:"Соло-потенциал" },
  { icon:"⚡", text:"Он обычно первый умирает в командном бою или последний?",                     hint:"Выживаемость в тимфайте" },
  { icon:"🌀", text:"Его ульт бьёт по всем вокруг или только по одному врагу?",                   hint:"AOE или сингл-таргет" },
  { icon:"🗡", text:"Он атакует физически или наносит магический урон?",                           hint:"Тип урона" },
  { icon:"🏹", text:"Он сражается вблизи или держится на расстоянии?",                             hint:"Дальний или ближний бой" },
  { icon:"👁", text:"Можно убежать от него или он всегда настигнет?",                              hint:"Контроль и преследование" },
];

const ICONS = ["⚔","🛡","🔮","🏹","💀","🔥","❄","⚡","🌑","👁"];

function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ═══════════════════════════════════════════════════════════════════
// ХУКИ
// ═══════════════════════════════════════════════════════════════════

function useCountdown(sec, active, onEnd) {
  const [r, setR] = useState(sec);
  const ref = useRef(null);
  useEffect(()=>{ setR(sec); },[sec]);
  useEffect(()=>{
    if(!active) return;
    ref.current = setInterval(()=>setR(v=>{
      if(v<=1){ clearInterval(ref.current); onEnd?.(); return 0; }
      return v-1;
    }),1000);
    return ()=>clearInterval(ref.current);
  },[active]);
  return r;
}

// ═══════════════════════════════════════════════════════════════════
// БАЗОВЫЕ UI-КОМПОНЕНТЫ
// ═══════════════════════════════════════════════════════════════════

function Particles() {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current, ctx=c.getContext("2d");
    let raf;
    const sz=()=>{ c.width=window.innerWidth; c.height=window.innerHeight; };
    sz();
    const ps = Array.from({length:55},()=>({
      x:Math.random()*c.width, y:Math.random()*c.height,
      r:Math.random()*1.6+.3, sp:Math.random()*.28+.07,
      dr:(Math.random()-.5)*.22, op:Math.random()*.4+.07,
      col:Math.random()>.55?"#e84118":Math.random()>.4?"#f97316":"#fbbf24",
    }));
    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height);
      ps.forEach(p=>{
        ctx.save(); ctx.globalAlpha=p.op; ctx.shadowBlur=5;
        ctx.shadowColor=p.col; ctx.fillStyle=p.col;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.restore();
        p.y-=p.sp; p.x+=p.dr;
        if(p.y<-5){ p.y=c.height+5; p.x=Math.random()*c.width; }
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize",sz);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",sz); };
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:.55}}/>;
}

// Базовый URL прокси — меняй на свой домен после деплоя на Vercel
// Пока деплоя нет — используем прямые CDN ссылки как fallback
const PROXY_BASE = typeof window !== "undefined" && window.location.hostname !== "localhost"
  ? `https://${window.location.hostname}/api/hero-image?slug=`
  : null;

function Avatar({hero, size=80}) {
  const c = HC[hero.attr]||HC.STR;
  const [idx,setIdx] = useState(0);
  const init = hero.name.split(" ").map(w=>w[0]).join("").slice(0,2);

  const urls = hero.slug ? [
    // 1. Через свой прокси (работает после деплоя на Vercel)
    ...(PROXY_BASE ? [`${PROXY_BASE}${hero.slug}`] : []),
    // 2. Прямой CDN Valve — вертикальный портрет
    `https://cdn.dota2.com/apps/dota2/images/heroes/${hero.slug}_vert.jpg`,
    // 3. Steamstatic CDN
    `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${hero.slug}_vert.jpg`,
    // 4. Широкий портрет как запасной
    `https://cdn.dota2.com/apps/dota2/images/heroes/${hero.slug}_full.png`,
  ] : [];

  const url = urls[idx];
  const failed = idx >= urls.length;

  return (
    <div style={{
      width:size, height:size, borderRadius:"50%", flexShrink:0,
      border:`2.5px solid ${c.glow}`,
      boxShadow:`0 0 ${size*.3}px ${c.glow}55, inset 0 0 ${size*.18}px ${c.from}99`,
      overflow:"hidden", position:"relative",
      background:`radial-gradient(circle at 35% 30%, ${c.from}cc, #050508)`,
    }}>
      {url && !failed ? (
        <img src={url} alt={hero.name} onError={()=>setIdx(i=>i+1)}
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 10%",
            position:"absolute",inset:0,filter:"saturate(1.2) contrast(1.05)"}}/>
      ):(
        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:size*.28,fontFamily:"'Anton',sans-serif",
          color:c.glow,textShadow:`0 0 10px ${c.glow}`}}>
          {init}
        </div>
      )}
      <div style={{position:"absolute",inset:0,borderRadius:"50%",
        boxShadow:`inset 0 0 0 1.5px ${c.glow}33`,pointerEvents:"none"}}/>
    </div>
  );
}

// Угловая рамка в стиле Dota
function CardFrame({color="#ef4444"}) {
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}}>
      {/* Основная рамка */}
      <div style={{position:"absolute",inset:0,borderRadius:"inherit",
        border:`1.5px solid ${color}44`,boxShadow:`inset 0 0 0 1px ${color}18`}}/>
      {/* Угловые засечки */}
      {[
        {top:0,left:0,borderTop:`2px solid ${color}`,borderLeft:`2px solid ${color}`,borderTopLeftRadius:10},
        {top:0,right:0,borderTop:`2px solid ${color}`,borderRight:`2px solid ${color}`,borderTopRightRadius:10},
        {bottom:0,left:0,borderBottom:`2px solid ${color}`,borderLeft:`2px solid ${color}`,borderBottomLeftRadius:10},
        {bottom:0,right:0,borderBottom:`2px solid ${color}`,borderRight:`2px solid ${color}`,borderBottomRightRadius:10},
      ].map((s,i)=>(
        <div key={i} style={{position:"absolute",width:18,height:18,...s,opacity:.85}}/>
      ))}
    </div>
  );
}

function Btn({children,onClick,v="primary",style={},disabled=false}) {
  const [pr,setPr]=useState(false);
  const vs={
    primary:  {bg:"linear-gradient(135deg,#7f1d1d,#991b1b,#b91c1c)",br:"#ef4444",sh:"#ef4444"},
    secondary:{bg:"linear-gradient(135deg,#1a1a2e,#16213e)",br:"#6366f1",sh:"#6366f1"},
    ghost:    {bg:"rgba(255,255,255,.08)",br:"#4b5563",sh:"#9ca3af"},
    danger:   {bg:"linear-gradient(135deg,#450a0a,#7f1d1d)",br:"#dc2626",sh:"#dc2626"},
    gold:     {bg:"linear-gradient(135deg,#78350f,#92400e)",br:"#f59e0b",sh:"#f59e0b"},
    green:    {bg:"linear-gradient(135deg,#14532d,#166534)",br:"#22c55e",sh:"#22c55e"},
  };
  const m=vs[v]||vs.primary;
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseDown={()=>setPr(true)} onMouseUp={()=>setPr(false)}
      onTouchStart={()=>setPr(true)} onTouchEnd={()=>setPr(false)}
      style={{
        background:m.bg, border:`1px solid ${m.br}`, color:"#fff",
        padding:"0 24px", borderRadius:"8px", fontSize:"13px",
        fontFamily:"'Anton','Impact',sans-serif", letterSpacing:".1em",
        cursor:disabled?"not-allowed":"pointer", opacity:disabled?.4:1,
        boxShadow:pr?`0 0 4px ${m.sh}33`:`0 0 18px ${m.sh}44,0 4px 12px rgba(0,0,0,.5)`,
        transform:pr?"scale(0.97)":"scale(1)", transition:"all .1s ease",
        textTransform:"uppercase", height:"52px", width:"100%",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        ...style,
      }}>
      {children}
    </button>
  );
}

function Input({value,onChange,placeholder,max=24,style={},onKey}) {
  return (
    <input value={value} onChange={e=>onChange(e.target.value)}
      placeholder={placeholder} maxLength={max} onKeyDown={onKey}
      style={{
        background:"rgba(18,18,36,.95)", border:"1px solid #353575",
        borderBottom:"2px solid #ef444455", color:"#f9fafb",
        padding:"14px 16px", borderRadius:"8px", fontSize:"16px",
        fontFamily:"'Philosopher',sans-serif", width:"100%", outline:"none",
        boxSizing:"border-box", boxShadow:"inset 0 2px 8px rgba(0,0,0,.4)",
        transition:"border-color .2s", ...style,
      }}/>
  );
}

function Screen({children, center=false}) {
  return (
    <div style={{
      position:"relative", zIndex:1, minHeight:"100dvh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:center?"center":"flex-start",
      padding:"clamp(20px,4vw,36px) clamp(16px,4vw,24px) 60px",
      maxWidth:"600px", margin:"0 auto", width:"100%", boxSizing:"border-box",
    }}>
      {children}
    </div>
  );
}

function Logo({small=false}) {
  return (
    <div style={{textAlign:"center",display:"flex",flexDirection:"column",
      alignItems:"center",gap:small?2:5,marginBottom:small?4:0}}>
      <div style={{
        fontSize:small?"clamp(22px,5vw,30px)":"clamp(60px,12vw,88px)",
        fontFamily:"'Anton','Impact',sans-serif",
        lineHeight:1, letterSpacing:".01em",
        background:"linear-gradient(180deg,#ffffff 0%,#e5e7eb 30%,#9ca3af 100%)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        filter:"drop-shadow(0 2px 18px rgba(232,65,24,.45)) drop-shadow(0 0 40px rgba(249,115,22,.25))",
        userSelect:"none",
      }}>GGSpy</div>
      {!small&&(
        <div style={{fontSize:10,fontFamily:"'Philosopher',sans-serif",
          color:"#3f3f5a",letterSpacing:".35em",paddingLeft:".35em"}}>
          × Social Deduction ×
        </div>
      )}
    </div>
  );
}

function SectionLabel({children}) {
  return (
    <div style={{color:"#3f3f5a",fontSize:10,fontFamily:"'Philosopher',sans-serif",
      letterSpacing:".22em",marginBottom:8,textTransform:"uppercase"}}>
      {children}
    </div>
  );
}

function BackBtn({onClick}) {
  return (
    <button onClick={onClick} style={{
      background:"none", border:"none", color:"#4b5563",
      cursor:"pointer", fontFamily:"'Philosopher',sans-serif", fontSize:13,
      alignSelf:"flex-start", padding:"4px 0", display:"flex",
      alignItems:"center", gap:6, transition:"color .15s",
    }}
    onMouseEnter={e=>e.currentTarget.style.color="#9ca3af"}
    onMouseLeave={e=>e.currentTarget.style.color="#4b5563"}>
      ← Назад
    </button>
  );
}

function Divider() {
  return <div style={{height:1,background:"linear-gradient(90deg,transparent,#1f2937 30%,#1f2937 70%,transparent)"}}/>;
}

// ═══════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════
function HomeScreen({onStart}) {
  return (
    <Screen center>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"clamp(18px,4vw,28px)"}}>

        {/* Лого с декором */}
        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <div style={{
            width:"clamp(72px,16vw,100px)", height:"clamp(72px,16vw,100px)",
            borderRadius:"50%",
            background:"radial-gradient(circle at 38% 32%,#5c1111,#050508)",
            border:"2px solid #e8411855",
            boxShadow:"0 0 50px #e8411840,0 0 100px #e8411820",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"clamp(28px,7vw,44px)",
          }}>👁
            <div style={{position:"absolute",inset:-10,borderRadius:"50%",border:"1px solid #e8411818",pointerEvents:"none"}}/>
            <div style={{position:"absolute",inset:-20,borderRadius:"50%",border:"1px solid #e8411810",pointerEvents:"none"}}/>
          </div>
          <Logo/>
        </div>

        {/* Описание */}
        <div style={{
          color:"#6b7280",fontSize:"clamp(13px,2.8vw,15px)",textAlign:"center",
          fontFamily:"'Philosopher',sans-serif",lineHeight:2,maxWidth:340,
        }}>
          Один <span style={{color:"#e84118",fontWeight:700}}>шпион</span> прячется среди героев Dota 2.<br/>
          Обсуждайте героя намёками.<br/>
          Разоблачите предателя до конца раунда.
        </div>

        {/* Карточки правил */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"clamp(6px,2vw,10px)",width:"100%"}}>
          {[
            {i:"🃏",t:"Роль",s:"Герой или шпион"},
            {i:"💬",t:"Обсуждение",s:"Намёками"},
            {i:"🗳",t:"Голосование",s:"Кто шпион?"},
          ].map(r=>(
            <div key={r.i} style={{
              background:"rgba(22,22,42,.92)",
              border:"1px solid #1a1a2e",
              borderRadius:12,padding:"clamp(10px,2.5vw,16px) 8px",
              textAlign:"center",
              boxShadow:"0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.03)",
            }}>
              <div style={{fontSize:"clamp(20px,4vw,26px)",marginBottom:6}}>{r.i}</div>
              <div style={{color:"#f9fafb",fontSize:"clamp(10px,2.2vw,12px)",
                fontFamily:"'Anton',sans-serif",letterSpacing:".06em",marginBottom:2}}>{r.t}</div>
              <div style={{color:"#374151",fontSize:"clamp(9px,1.8vw,11px)",
                fontFamily:"'Philosopher',sans-serif"}}>{r.s}</div>
            </div>
          ))}
        </div>

        <div style={{width:"100%",maxWidth:380}}>
          <Btn onClick={onStart}>⚔ Начать игру</Btn>
        </div>

        <div style={{color:"#252540",fontSize:10,fontFamily:"'Philosopher',sans-serif",
          letterSpacing:".15em",textAlign:"center"}}>
          3–10 ИГРОКОВ · 125 ГЕРОЕВ · БЕСПЛАТНО
        </div>

      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SETUP — добавление игроков
// ═══════════════════════════════════════════════════════════════════
function SetupScreen({onBack,onReady}) {
  const [host,setHost]=useState("");
  const [others,setOthers]=useState([]);
  const [inp,setInp]=useState("");
  const [err,setErr]=useState("");
  const inputRef = useRef(null);

  const all = host.trim() ? [host.trim(),...others] : others;

  const add=()=>{
    const n=inp.trim();
    if(!n){ inputRef.current?.focus(); return; }
    if(all.map(x=>x.toLowerCase()).includes(n.toLowerCase()))
      { setErr("Это имя уже занято"); return; }
    if(all.length>=10){ setErr("Максимум 10 игроков"); return; }
    setOthers(p=>[...p,n]); setInp(""); setErr(""); inputRef.current?.focus();
  };

  const remove=(name)=>setOthers(p=>p.filter(x=>x!==name));

  const go=()=>{
    if(!host.trim()){ setErr("Введи своё имя"); return; }
    if(all.length<3){ setErr(`Нужно ещё ${3-all.length} игрока`); return; }
    setErr(""); onReady(all);
  };

  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:16}}>
        <BackBtn onClick={onBack}/>
        <Logo small/>

        <div style={{color:"#e84118",fontFamily:"'Anton',sans-serif",fontSize:20,
          textAlign:"center",letterSpacing:".1em",textShadow:"0 0 20px #e8411840"}}>
          СОСТАВ ИГРОКОВ
        </div>

        <Divider/>

        {/* Своё имя */}
        <div>
          <SectionLabel>Твоё имя (организатор)</SectionLabel>
          <Input value={host} onChange={v=>{setHost(v);setErr("");}}
            placeholder="Введи своё имя..."/>
        </div>

        {/* Добавить других */}
        <div>
          <SectionLabel>Остальные игроки</SectionLabel>
          <div style={{display:"flex",gap:8}}>
            <Input ref={inputRef} value={inp} onChange={v=>{setInp(v);setErr("");}}
              placeholder="Имя игрока..." onKey={e=>e.key==="Enter"&&add()} style={{flex:1}}/>
            <button onClick={add} style={{
              width:52,height:52,flexShrink:0,borderRadius:8,
              background:"linear-gradient(135deg,#1a1a2e,#16213e)",
              border:"1px solid #4f46e5",color:"#818cf8",fontSize:24,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 0 14px #4f46e522",transition:"all .1s",
            }}>+</button>
          </div>
        </div>

        {/* Ошибка */}
        {err&&(
          <div style={{color:"#e84118",fontSize:13,fontFamily:"'Philosopher',sans-serif",
            textAlign:"center",padding:"8px 12px",background:"rgba(232,65,24,.08)",
            borderRadius:6,border:"1px solid #e8411822"}}>
            {err}
          </div>
        )}

        {/* Список игроков */}
        {all.length>0&&(
          <div>
            <SectionLabel>Все игроки ({all.length}/10)</SectionLabel>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {all.map((name,i)=>(
                <div key={name} style={{
                  display:"flex",alignItems:"center",gap:12,
                  background:"rgba(22,22,42,.92)",
                  border:"1px solid #303060",
                  borderLeft:`3px solid ${i===0?"#f59e0b":"#252550"}`,
                  borderRadius:8,padding:"10px 14px",
                  animation:"fadeIn .2s ease",
                }}>
                  <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,
                    background:`hsl(${(i*43)%360},55%,22%)`,
                    border:`1.5px solid hsl(${(i*43)%360},70%,48%)`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>
                    {ICONS[i%10]}
                  </div>
                  <div style={{flex:1,color:"#f9fafb",fontSize:14,
                    fontFamily:"'Philosopher',sans-serif",fontWeight:600}}>
                    {name}
                    {i===0&&<span style={{color:"#f59e0b",fontSize:9,
                      marginLeft:8,letterSpacing:".1em",
                      background:"rgba(245,158,11,.1)",padding:"2px 6px",borderRadius:10}}>ВЫ</span>}
                  </div>
                  {i>0&&(
                    <button onClick={()=>remove(name)} style={{
                      background:"none",border:"none",color:"#374151",
                      cursor:"pointer",fontSize:14,padding:"4px 6px",
                      borderRadius:4,transition:"color .15s",lineHeight:1,
                    }}
                    onMouseEnter={e=>e.currentTarget.style.color="#ef4444"}
                    onMouseLeave={e=>e.currentTarget.style.color="#374151"}>✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Btn onClick={go} disabled={all.length<3} v={all.length>=3?"primary":"ghost"}>
          {all.length<3
            ? `Нужно ещё ${3-all.length} ${3-all.length===1?"игрока":"игрока"}`
            : `⚡ Продолжить — ${all.length} игроков`}
        </Btn>

        {all.length<3&&(
          <div style={{color:"#374151",fontSize:11,textAlign:"center",
            fontFamily:"'Philosopher',sans-serif",lineHeight:1.8}}>
            Минимум 3 игрока для старта<br/>
            Каждый видит роль приватно — передавайте телефон
          </div>
        )}
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GAME SETTINGS
// ═══════════════════════════════════════════════════════════════════
function UniIcon({size=24}) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <defs><clipPath id="uc"><circle cx="14" cy="14" r="13"/></clipPath></defs>
      <circle cx="14" cy="14" r="13" fill="#111"/>
      <path d="M14,14 L14,1 A13,13 0 0,1 25.3,7.5 Z" fill="#e84118" clipPath="url(#uc)"/>
      <path d="M14,14 L25.3,7.5 A13,13 0 0,1 25.3,20.5 Z" fill="#44db6e" clipPath="url(#uc)"/>
      <path d="M14,14 L25.3,20.5 A13,13 0 0,1 14,27 L14,14 Z" fill="#3d9be9" clipPath="url(#uc)"/>
      <path d="M14,14 L14,27 A13,13 0 0,1 2.7,20.5 Z" fill="#3d9be9" clipPath="url(#uc)"/>
      <path d="M14,14 L2.7,20.5 A13,13 0 0,1 2.7,7.5 Z" fill="#e84118" clipPath="url(#uc)"/>
      <path d="M14,14 L2.7,7.5 A13,13 0 0,1 14,1 Z" fill="#44db6e" clipPath="url(#uc)"/>
      <circle cx="14" cy="14" r="5.5" fill="#050508"/>
      <text x="14" y="17.5" textAnchor="middle" fontSize="6.5" fontWeight="900"
        fontFamily="'Anton',sans-serif" fill="#fff">UNI</text>
    </svg>
  );
}

function CounterControl({label, value, onDec, onInc, display, sub}) {
  return (
    <div style={{background:"rgba(10,10,22,.9)",borderRadius:12,padding:"14px 16px",
      border:"1px solid #303060"}}>
      <SectionLabel>{label}</SectionLabel>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onDec} style={{
          width:44,height:44,borderRadius:8,flexShrink:0,
          border:"1px solid #252545",background:"rgba(10,10,22,.9)",
          color:"#9ca3af",fontSize:20,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:"'Anton',sans-serif",transition:"all .1s",
        }}>−</button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:"clamp(32px,8vw,44px)",fontFamily:"'Anton',sans-serif",
            lineHeight:1,color:display.color,textShadow:`0 0 20px ${display.color}44`}}>
            {display.value}
          </div>
          {sub&&<div style={{color:"#374151",fontSize:10,fontFamily:"'Philosopher',sans-serif",marginTop:3}}>{sub}</div>}
        </div>
        <button onClick={onInc} style={{
          width:44,height:44,borderRadius:8,flexShrink:0,
          border:"1px solid #252545",background:"rgba(10,10,22,.9)",
          color:"#9ca3af",fontSize:20,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:"'Anton',sans-serif",transition:"all .1s",
        }}>+</button>
      </div>
      {display.extra}
    </div>
  );
}

function formatTime(s){ const m=Math.floor(s/60); return m>0?`${m}:${String(s%60).padStart(2,"0")}`:`${s}с`; }

function GameSettingsScreen({heroes, players,onBack,onStart}) {
  const [dur,setDur]=useState(120);
  const [spyCount,setSpyCount]=useState(1);
  const [filter,setFilter]=useState("ALL");
  const [dropOpen,setDropOpen]=useState(false);
  const maxSpies=Math.max(1,players.length-1);
  const pool=filter==="ALL"?heroes:heroes.filter(h=>h.attr===filter);

  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:14}}>
        <BackBtn onClick={onBack}/>
        <Logo small/>

        <div style={{color:"#e84118",fontFamily:"'Anton',sans-serif",fontSize:20,
          textAlign:"center",letterSpacing:".1em",textShadow:"0 0 20px #e8411840"}}>
          НАСТРОЙКИ
        </div>
        <Divider/>

        {/* Длительность */}
        <CounterControl
          label="⏱ Длительность раунда"
          value={dur} onDec={()=>setDur(d=>Math.max(10,d-15))} onInc={()=>setDur(d=>Math.min(600,d+15))}
          display={{value:formatTime(dur), color:"#fb923c"}}
          sub={dur<60?"меньше минуты":dur===120?"стандарт":dur>=300?"эпичный раунд":""}/>

        {/* Пресеты времени */}
        <div style={{display:"flex",gap:6}}>
          {[60,90,120,180,300].map(v=>(
            <div key={v} onClick={()=>setDur(v)} style={{
              flex:1,height:32,borderRadius:6,textAlign:"center",cursor:"pointer",
              border:`1px solid ${dur===v?"#f97316":"#1a1a30"}`,
              background:dur===v?"rgba(124,45,18,.3)":"rgba(10,10,22,.5)",
              color:dur===v?"#fb923c":"#374151",fontSize:10,
              fontFamily:"'Philosopher',sans-serif",transition:"all .15s",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>{formatTime(v)}</div>
          ))}
        </div>

        {/* Шпионы */}
        <CounterControl
          label="👁 Количество шпионов"
          value={spyCount} onDec={()=>setSpyCount(n=>Math.max(1,n-1))} onInc={()=>setSpyCount(n=>Math.min(maxSpies,n+1))}
          display={{value:String(spyCount), color:"#fca5a5"}}
          sub={`максимум ${maxSpies} для ${players.length} игроков`}/>

        {/* Категории */}
        <div style={{position:"relative"}}>
          <SectionLabel>🎲 Категории героев</SectionLabel>
          <div onClick={()=>setDropOpen(o=>!o)} style={{
            display:"flex",alignItems:"center",gap:12,padding:"13px 16px",
            borderRadius:10,cursor:"pointer",userSelect:"none",
            border:`1px solid ${dropOpen?"#374151":"#1a1a30"}`,
            background:"rgba(10,10,22,.95)",transition:"all .15s",
            boxShadow:dropOpen?"0 0 0 1px #374151":"none",
          }}>
            <div style={{width:28,height:28,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {filter==="ALL"?<span style={{fontSize:18}}>🌐</span>
               :filter==="UNI"?<UniIcon size={24}/>
               :<span style={{fontSize:18,filter:`drop-shadow(0 0 5px ${ATTR_CFG[filter].glow})`}}>{ATTR_CFG[filter].icon}</span>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontFamily:"'Philosopher',sans-serif",fontWeight:700,
                color:filter==="ALL"?"#f9fafb":(ATTR_CFG[filter]?.isUni?"#e0e0ff":ATTR_CFG[filter]?.color||"#f9fafb")}}>
                {filter==="ALL"?"Все категории":ATTR_CFG[filter].label}
              </div>
              <div style={{fontSize:10,color:"#374151",fontFamily:"'Philosopher',sans-serif",marginTop:1}}>
                {pool.length} героев доступно
              </div>
            </div>
            <span style={{color:"#374151",fontSize:10,transition:"transform .2s",
              transform:dropOpen?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
          </div>

          {dropOpen&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:80,
              background:"#080812",border:"1px solid #303060",borderRadius:10,
              overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,.9)",animation:"fadeIn .15s ease"}}>
              {/* Все */}
              <div onClick={()=>{setFilter("ALL");setDropOpen(false);}} style={{
                display:"flex",alignItems:"center",gap:12,padding:"12px 16px",cursor:"pointer",
                background:filter==="ALL"?"rgba(255,255,255,.05)":"transparent",
                borderLeft:`3px solid ${filter==="ALL"?"#f9fafb":"transparent"}`,
              }}>
                <div style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:18}}>🌐</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontFamily:"'Philosopher',sans-serif",fontWeight:700,
                    color:filter==="ALL"?"#f9fafb":"#6b7280"}}>Все категории</div>
                  <div style={{fontSize:10,color:"#374151",fontFamily:"'Philosopher',sans-serif"}}>{heroes.length} героев</div>
                </div>
                {filter==="ALL"&&<span style={{color:"#f9fafb",fontSize:12}}>✓</span>}
              </div>
              <div style={{height:1,background:"#1a1a30",margin:"0 16px"}}/>
              {Object.entries(ATTR_CFG).map(([key,ac])=>{
                const cnt=heroes.filter(h=>h.attr===key).length;
                const active=filter===key;
                return (
                  <div key={key} onClick={()=>{setFilter(key);setDropOpen(false);}} style={{
                    display:"flex",alignItems:"center",gap:12,padding:"12px 16px",cursor:"pointer",
                    background:active?ac.bg:"transparent",
                    borderLeft:`3px solid ${active?ac.glow:"transparent"}`,
                    transition:"all .12s",
                  }}>
                    <div style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {key==="UNI"?<UniIcon size={24}/>:<span style={{fontSize:18,filter:`drop-shadow(0 0 5px ${ac.glow})`}}>{ac.icon}</span>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontFamily:"'Philosopher',sans-serif",fontWeight:700,
                        color:active?(ac.isUni?"#e0e0ff":ac.color):"#6b7280"}}>{ac.label}</div>
                      <div style={{fontSize:10,color:"#374151",fontFamily:"'Philosopher',sans-serif"}}>{cnt} героев</div>
                    </div>
                    <div style={{width:3,height:24,borderRadius:2,flexShrink:0,
                      background:key==="UNI"?"linear-gradient(#e84118,#44db6e,#3d9be9)":ac.glow,
                      opacity:active?1:.2}}/>
                    {active&&<span style={{color:ac.isUni?"#e0e0ff":ac.color,fontSize:12}}>✓</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Divider/>

        {/* Сводка */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 12px",
          background:"rgba(10,10,22,.7)",borderRadius:10,padding:"12px 16px",
          border:"1px solid #303060"}}>
          {[
            {l:"Игроков",v:`${players.length} чел.`,c:"#9ca3af"},
            {l:"Время",  v:formatTime(dur),           c:"#fb923c"},
            {l:"Шпионов",v:String(spyCount),           c:"#fca5a5"},
            {l:"Героев", v:`${pool.length} шт.`,       c:"#3d9be9"},
          ].map(({l,v,c})=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2px 0"}}>
              <span style={{color:"#374151",fontSize:11,fontFamily:"'Philosopher',sans-serif"}}>{l}</span>
              <span style={{color:c,fontSize:13,fontFamily:"'Anton',sans-serif"}}>{v}</span>
            </div>
          ))}
        </div>

        <Btn onClick={()=>onStart({players,duration:dur,spyCount,attrs:filter==="ALL"?["STR","AGI","INT","UNI"]:[filter]})}>
          ⚔ Начать игру
        </Btn>
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// КАРТОЧКИ РОЛЕЙ
// ═══════════════════════════════════════════════════════════════════
function HeroCard({hero}) {
  const c=HC[hero.attr]||HC.STR;
  const label=c.label;
  return (
    <div style={{
      background:`radial-gradient(ellipse at 28% 18%,${c.from}99,#050508 62%)`,
      border:`2px solid ${c.glow}66`, borderRadius:16,
      padding:"22px 18px 18px", position:"relative",
      boxShadow:`0 0 55px ${c.glow}33, 0 0 20px ${c.glow}18, 0 8px 40px rgba(0,0,0,.8)`,
    }}>
      <div style={{position:"absolute",inset:0,borderRadius:16,pointerEvents:"none",zIndex:0,
        backgroundImage:`radial-gradient(circle at 78%82%,${c.from}14,transparent 48%)`}}/>
      <CardFrame color={c.glow}/>
      <div style={{position:"relative",zIndex:1,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{color:`${c.glow}99`,fontSize:9,fontFamily:"'Philosopher',sans-serif",
          letterSpacing:".42em",marginBottom:14,textTransform:"uppercase"}}>Твой Герой</div>
        <Avatar hero={hero} size={110}/>
        <div style={{color:"#f9fafb",fontSize:"clamp(22px,5vw,28px)",fontFamily:"'Anton',sans-serif",
          marginTop:12,marginBottom:8,lineHeight:1,textShadow:`0 0 24px ${c.glow}99`}}>
          {hero.name}
        </div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,
          background:c.badge||`${c.from}cc`,border:`1.5px solid ${c.bdBorder||c.glow+"88"}`,
          color:c.glow,fontSize:10,padding:"5px 16px",borderRadius:20,
          fontFamily:"'Philosopher',sans-serif",letterSpacing:".18em",
          marginBottom:14,boxShadow:`0 0 14px ${c.glow}33`,fontWeight:700}}>
          {label}
        </div>
        <div style={{color:"#9ca3af",fontSize:12,fontFamily:"'Almendra',serif",
          fontStyle:"italic",lineHeight:1.7,padding:"0 4px",marginBottom:14}}>
          "{hero.desc}"
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:16}}>
          {hero.tags.map(t=>(
            <span key={t} style={{background:`${c.from}44`,border:`1px solid ${c.glow}33`,
              color:`${c.glow}99`,fontSize:9,padding:"3px 10px",borderRadius:20,
              fontFamily:"'Philosopher',sans-serif"}}>{t}</span>
          ))}
        </div>
        <div style={{width:"100%",background:"rgba(0,0,0,.45)",borderRadius:10,
          padding:"12px 14px",border:`1px solid ${c.glow}18`}}>
          <div style={{color:"#fbbf24",fontSize:10,fontFamily:"'Philosopher',sans-serif",
            letterSpacing:".15em",marginBottom:5}}>🎯 ЗАДАЧА</div>
          <div style={{color:"#9ca3af",fontSize:12,lineHeight:1.65,fontFamily:"'Philosopher',sans-serif"}}>
            Обсуждай героя намёками. Найди Шпиона — он не знает кто это!
          </div>
        </div>
      </div>
    </div>
  );
}


function SpyCard() {
  return (
    <div style={{
      background:"radial-gradient(ellipse at 28%18%,#5c111199,#050508 62%)",
      border:"2px solid #e8411866",borderRadius:16,
      padding:"22px 18px 18px",position:"relative",
      boxShadow:"0 0 55px #e8411833,0 0 20px #e8411818,0 8px 40px rgba(0,0,0,.8)",
    }}>
      <div style={{position:"absolute",inset:0,borderRadius:16,pointerEvents:"none",zIndex:0,
        backgroundImage:"radial-gradient(circle at 78%82%,#5c111114,transparent 48%)"}}/>
      <CardFrame color="#e84118"/>
      <div style={{position:"relative",zIndex:1,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{color:"#e8411899",fontSize:9,fontFamily:"'Philosopher',sans-serif",
          letterSpacing:".42em",marginBottom:14,textTransform:"uppercase"}}>Твоя Роль</div>
        <div style={{
          width:"clamp(90px,22vw,120px)",height:"clamp(90px,22vw,120px)",
          borderRadius:"50%",
          background:"radial-gradient(circle at 35%30%,#5c1111,#050508)",
          border:"2.5px solid #e84118",
          boxShadow:"0 0 50px #e8411888,inset 0 0 24px #5c111199",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"clamp(36px,10vw,52px)",
          animation:"spyPulse 2s ease-in-out infinite",
        }}>👁</div>
        <div style={{color:"#e84118",fontSize:"clamp(28px,7vw,36px)",
          fontFamily:"'Anton',sans-serif",margin:"12px 0 8px",lineHeight:1,
          letterSpacing:".08em",textShadow:"0 0 30px #e84118,0 0 60px #e8411855"}}>
          ШПИОН
        </div>
        <div style={{color:"#fca5a5",fontSize:13,fontFamily:"'Almendra',serif",
          fontStyle:"italic",lineHeight:1.65,marginBottom:16}}>
          "Ты — скрытый клинок среди героев."
        </div>
        <div style={{width:"100%",background:"rgba(92,17,17,.18)",borderRadius:10,
          padding:"14px",border:"1px solid #5c111155"}}>
          <div style={{color:"#e84118",fontSize:10,fontFamily:"'Philosopher',sans-serif",
            letterSpacing:".15em",marginBottom:6}}>⚠ ЗАДАЧА ШПИОНА</div>
          <div style={{color:"#fca5a5",fontSize:12,lineHeight:1.8,fontFamily:"'Philosopher',sans-serif"}}>
            Ты <strong>НЕ знаешь</strong> героя.<br/>
            Слушай намёки других игроков.<br/>
            Притворяйся своим.<br/>
            Избеги голосования. Выживи.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// РАЗДАЧА РОЛЕЙ
// ═══════════════════════════════════════════════════════════════════
function RoleRevealScreen({game,onDone}) {
  const [step,setStep]=useState("intro");
  const [idx,setIdx]=useState(0);
  const [shown,setShown]=useState(false);
  const players=game.players, cur=players[idx];
  const isSpy=game.spies?.includes(cur);

  const dots=(
    <div style={{display:"flex",gap:6,justifyContent:"center"}}>
      {players.map((_,i)=>(
        <div key={i} style={{
          width:i===idx?20:8,height:8,borderRadius:4,transition:"all .35s",
          background:i<idx?"#22c55e":i===idx?"#e84118":"#1a1a30",
          boxShadow:i===idx?"0 0 6px #e84118":"none",
        }}/>
      ))}
    </div>
  );

  if(step==="intro") return (
    <Screen center>
      <div style={{width:"100%",textAlign:"center",display:"flex",flexDirection:"column",
        gap:20,alignItems:"center",maxWidth:380,margin:"0 auto"}}>
        <div style={{
          width:80,height:80,borderRadius:"50%",
          background:"radial-gradient(circle at 38%32%,#5c1111,#050508)",
          border:"2px solid #e84118",boxShadow:"0 0 40px #e8411866",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,
        }}>⚔</div>
        <div>
          <div style={{color:"#e84118",fontFamily:"'Anton',sans-serif",fontSize:24,
            textShadow:"0 0 20px #e8411866",letterSpacing:".08em",marginBottom:8}}>
            РОЛИ НАЗНАЧЕНЫ
          </div>
          <div style={{color:"#4b5563",fontFamily:"'Philosopher',sans-serif",fontSize:14,lineHeight:2}}>
            Каждый игрок видит роль{" "}
            <span style={{color:"#fbbf24",fontWeight:700}}>приватно</span>.<br/>
            Передавайте телефон по очереди.
          </div>
        </div>
        <div style={{
          background:"rgba(22,22,42,.92)",border:"1px solid #303060",
          borderRadius:10,padding:"12px 20px",width:"100%",
          display:"flex",gap:0,justifyContent:"space-around",
        }}>
          {[
            {v:players.length,l:"игроков"},
            {v:game.spies?.length||1,l:game.spies?.length===1?"шпион":"шпиона"},
            {v:formatTime(game.duration||120),l:"обсуждение"},
          ].map(({v,l})=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{color:"#f9fafb",fontSize:18,fontFamily:"'Anton',sans-serif"}}>{v}</div>
              <div style={{color:"#374151",fontSize:10,fontFamily:"'Philosopher',sans-serif"}}>{l}</div>
            </div>
          ))}
        </div>
        <Btn onClick={()=>setStep("pass")}>⚡ Начать раздачу ролей</Btn>
      </div>
    </Screen>
  );

  if(step==="pass") return (
    <Screen center>
      <div style={{width:"100%",textAlign:"center",display:"flex",
        flexDirection:"column",gap:22,alignItems:"center",maxWidth:380,margin:"0 auto"}}>
        <div style={{
          width:72,height:72,borderRadius:"50%",
          background:"radial-gradient(circle at 38%32%,#1a1a2e,#050508)",
          border:"2px solid #4f46e5",boxShadow:"0 0 28px #4f46e533",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,
        }}>📱</div>
        <div>
          <div style={{color:"#4b5563",fontFamily:"'Philosopher',sans-serif",
            fontSize:10,letterSpacing:".22em",marginBottom:8,textTransform:"uppercase"}}>
            Игрок {idx+1} из {players.length}
          </div>
          <div style={{color:"#f9fafb",fontFamily:"'Anton',sans-serif",
            fontSize:"clamp(26px,6vw,36px)",textShadow:"0 0 20px rgba(79,70,229,.4)",lineHeight:1}}>
            {cur}
          </div>
          <div style={{color:"#374151",fontFamily:"'Philosopher',sans-serif",fontSize:13,marginTop:10}}>
            передай телефон этому игроку
          </div>
        </div>
        {dots}
        <Btn onClick={()=>{setShown(false);setStep("view");}}>
          👁 Я готов смотреть
        </Btn>
      </div>
    </Screen>
  );

  // view step
  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
          <div style={{color:"#374151",fontFamily:"'Philosopher',sans-serif",
            fontSize:10,letterSpacing:".22em",textTransform:"uppercase"}}>
            Игрок {idx+1}/{players.length}
          </div>
          <div style={{color:"#f9fafb",fontFamily:"'Anton',sans-serif",fontSize:18}}>{cur}</div>
        </div>

        {!shown ? (
          <div onClick={()=>setShown(true)} style={{
            width:"100%",background:"rgba(10,10,22,.97)",
            border:"2px dashed #252545",borderRadius:16,
            padding:"clamp(48px,12vw,80px) 24px",cursor:"pointer",textAlign:"center",
            boxShadow:"0 0 40px rgba(0,0,0,.6)",userSelect:"none",
            transition:"border-color .2s,transform .1s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#4f46e5";e.currentTarget.style.transform="scale(1.01)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#252545";e.currentTarget.style.transform="scale(1)";}}>
            <div style={{fontSize:"clamp(40px,10vw,60px)",marginBottom:12}}>👁</div>
            <div style={{color:"#374151",fontFamily:"'Philosopher',sans-serif",fontSize:15,marginBottom:4}}>
              Нажми, чтобы увидеть роль
            </div>
            <div style={{color:"#1f2937",fontFamily:"'Philosopher',sans-serif",fontSize:11}}>
              Убедись, что другие не смотрят
            </div>
          </div>
        ):(
          <div style={{width:"100%",animation:"cardReveal .4s ease"}}>
            {isSpy ? <SpyCard/> : <HeroCard hero={game.hero}/>}
          </div>
        )}

        {shown&&(
          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:10}}>
            <div style={{color:"#252545",fontSize:11,fontFamily:"'Philosopher',sans-serif",
              textAlign:"center",letterSpacing:".1em"}}>
              Запомни роль · Не показывай другим
            </div>
            {idx<players.length-1 ? (
              <Btn v="ghost" onClick={()=>{setIdx(i=>i+1);setStep("pass");}}>
                ✓ Запомнил — передать следующему
              </Btn>
            ):(
              <Btn onClick={onDone}>⚔ Все посмотрели — начинаем!</Btn>
            )}
          </div>
        )}
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ОБСУЖДЕНИЕ
// ═══════════════════════════════════════════════════════════════════
function DiscussionScreen({game,onVoteTime}) {
  const [pidx,setPidx]=useState(()=>Math.floor(Math.random()*PROMPTS.length));
  const [flash,setFlash]=useState(false);
  const dur=game.duration||120;
  const rem=useCountdown(dur,true,onVoteTime);
  const pct=rem/dur;
  const tc=pct>.5?"#22c55e":pct>.25?"#f59e0b":"#ef4444";
  const p=PROMPTS[pidx];

  const next=()=>{
    setFlash(true);
    setTimeout(()=>{ setPidx(i=>(i+1)%PROMPTS.length); setFlash(false); },130);
  };

  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
        <Logo small/>

        {/* Таймер */}
        <div style={{background:"rgba(10,10,22,.9)",borderRadius:14,padding:"16px 20px",
          border:"1px solid #303060",textAlign:"center"}}>
          <div style={{
            fontSize:"clamp(50px,13vw,72px)",fontFamily:"'Anton',sans-serif",lineHeight:1,
            color:rem<=30?tc:"#f9fafb",
            textShadow:rem<=30?`0 0 30px ${tc},0 0 60px ${tc}44`:"none",
            transition:"color .3s,text-shadow .3s",
          }}>{Math.floor(rem/60)}:{String(rem%60).padStart(2,"0")}</div>
          <div style={{height:5,background:"#0d0d1a",borderRadius:3,margin:"10px 0 6px",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:3,width:`${pct*100}%`,
              background:tc,boxShadow:`0 0 10px ${tc}`,transition:"width 1s linear,background .3s"}}/>
          </div>
          <div style={{color:"#252545",fontSize:9,fontFamily:"'Philosopher',sans-serif",letterSpacing:".2em"}}>
            ФАЗА ОБСУЖДЕНИЯ
          </div>
        </div>

        {/* Подсказка */}
        <div onClick={next} style={{
          background:"rgba(20,20,45,.96)",border:"1.5px solid #4a46a0",borderRadius:14,
          padding:"16px 16px 14px",cursor:"pointer",userSelect:"none",
          boxShadow:"0 0 22px #312e8122",
          opacity:flash?0:1,transition:"opacity .13s",position:"relative",
        }}>
          {/* Угловые декоры */}
          {[{top:0,left:0,btl:"2px solid #6366f1",bll:"2px solid #6366f1"},
            {top:0,right:0,btr:"2px solid #6366f1",brr:"2px solid #6366f1"},
            {bottom:0,left:0,bbl:"2px solid #6366f1",bll2:"2px solid #6366f1"},
            {bottom:0,right:0,bbr:"2px solid #6366f1",brr2:"2px solid #6366f1"},
          ].map((_,i)=>{
            const corners=[
              {top:0,left:0,borderTop:"2px solid #6366f1",borderLeft:"2px solid #6366f1",borderTopLeftRadius:8},
              {top:0,right:0,borderTop:"2px solid #6366f1",borderRight:"2px solid #6366f1",borderTopRightRadius:8},
              {bottom:0,left:0,borderBottom:"2px solid #6366f1",borderLeft:"2px solid #6366f1",borderBottomLeftRadius:8},
              {bottom:0,right:0,borderBottom:"2px solid #6366f1",borderRight:"2px solid #6366f1",borderBottomRightRadius:8},
            ];
            return <div key={i} style={{position:"absolute",width:14,height:14,opacity:.7,...corners[i]}}/>;
          })}

          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <span style={{fontSize:16}}>{p.icon}</span>
              <span style={{color:"#818cf8",fontSize:9,fontFamily:"'Philosopher',sans-serif",
                letterSpacing:".28em",fontWeight:700}}>ПОДСКАЗКА {pidx+1}/{PROMPTS.length}</span>
            </div>
            <span style={{color:"#818cf8",fontSize:14}}>↻</span>
          </div>

          <div style={{color:"#e5e7eb",fontSize:"clamp(13px,3vw,15px)",fontFamily:"'Almendra',serif",
            fontStyle:"italic",lineHeight:1.7,marginBottom:10}}>
            "{p.text}"
          </div>

          <div style={{display:"flex",alignItems:"center",gap:5,borderTop:"1px solid #1a1a30",paddingTop:8}}>
            <span style={{fontSize:11}}>💡</span>
            <span style={{color:"#252545",fontSize:11,fontFamily:"'Philosopher',sans-serif",fontStyle:"italic"}}>
              {p.hint}
            </span>
          </div>

          <div style={{textAlign:"center",marginTop:8}}>
            <span style={{color:"#1a1a30",fontSize:10,fontFamily:"'Philosopher',sans-serif"}}>
              нажми на карточку чтобы сменить подсказку
            </span>
          </div>
        </div>

        {/* Игроки */}
        <div>
          <SectionLabel>Игроки</SectionLabel>
          <div style={{display:"grid",
            gridTemplateColumns:`repeat(${Math.min(Math.ceil(game.players.length/2),4)},1fr)`,gap:6}}>
            {game.players.map((pl,i)=>(
              <div key={pl} style={{
                background:"rgba(10,10,22,.8)",border:"1px solid #303060",
                borderRadius:8,padding:"8px 6px",textAlign:"center",
              }}>
                <div style={{fontSize:14,marginBottom:2}}>{ICONS[i%10]}</div>
                <div style={{color:"#4b5563",fontSize:10,fontFamily:"'Philosopher',sans-serif",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                  padding:"0 2px"}}>{pl}</div>
              </div>
            ))}
          </div>
        </div>

        <Btn v="danger" onClick={onVoteTime}>⚡ Голосовать досрочно</Btn>
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ГОЛОСОВАНИЕ
// ═══════════════════════════════════════════════════════════════════
function VotingScreen({game,onAllVoted}) {
  const players=game.players;
  const [vidx,setVidx]=useState(0);
  const [votes,setVotes]=useState({});
  const [sel,setSel]=useState(null);
  const [step,setStep]=useState("pass");
  const voter=players[vidx];

  const confirm=()=>{
    if(!sel) return;
    const nv={...votes,[voter]:sel};
    setVotes(nv);
    if(vidx>=players.length-1){ onAllVoted(nv); return; }
    setVidx(i=>i+1); setSel(null); setStep("pass");
  };

  const dots=(
    <div style={{display:"flex",gap:5,justifyContent:"center"}}>
      {players.map((_,i)=>(
        <div key={i} style={{
          width:i===vidx?18:7,height:7,borderRadius:4,transition:"all .3s",
          background:i<vidx?"#22c55e":i===vidx?"#e84118":"#1a1a30",
          boxShadow:i===vidx?"0 0 6px #e84118":"none",
        }}/>
      ))}
    </div>
  );

  if(step==="pass") return (
    <Screen center>
      <div style={{width:"100%",textAlign:"center",display:"flex",
        flexDirection:"column",gap:22,alignItems:"center",maxWidth:380,margin:"0 auto"}}>
        <div style={{
          width:72,height:72,borderRadius:"50%",
          background:"radial-gradient(circle at 38%32%,#5c1111,#050508)",
          border:"2px solid #e84118",boxShadow:"0 0 28px #e8411866",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,
        }}>🗳</div>
        <div>
          <div style={{color:"#374151",fontFamily:"'Philosopher',sans-serif",
            fontSize:10,letterSpacing:".22em",marginBottom:8,textTransform:"uppercase"}}>
            Голосует {vidx+1} из {players.length}
          </div>
          <div style={{color:"#f9fafb",fontFamily:"'Anton',sans-serif",
            fontSize:"clamp(24px,6vw,34px)",textShadow:"0 0 20px rgba(232,65,24,.4)",lineHeight:1}}>
            {voter}
          </div>
          <div style={{color:"#374151",fontFamily:"'Philosopher',sans-serif",fontSize:13,marginTop:8}}>
            передай телефон этому игроку
          </div>
        </div>
        {dots}
        <Btn onClick={()=>setStep("vote")}>👁 Я готов голосовать</Btn>
      </div>
    </Screen>
  );

  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{textAlign:"center",paddingTop:4}}>
          <div style={{color:"#e84118",fontSize:22,fontFamily:"'Anton',sans-serif",
            textShadow:"0 0 20px #e8411855",letterSpacing:".08em"}}>КТО ШПИОН?</div>
          <div style={{color:"#4b5563",fontSize:13,fontFamily:"'Philosopher',sans-serif",marginTop:4}}>
            <span style={{color:"#f9fafb",fontWeight:700}}>{voter}</span> — выбери подозреваемого
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {players.map((pl,i)=>{
            const isMe=pl===voter, isVoted=sel===pl;
            return (
              <div key={pl} onClick={()=>!isMe&&setSel(pl)} style={{
                background:isVoted?"rgba(92,17,17,.55)":"rgba(22,22,42,.92)",
                border:`${isVoted?2:1}px solid ${isVoted?"#e84118":"#353570"}`,
                borderRadius:10,padding:"12px 14px",cursor:isMe?"default":"pointer",
                display:"flex",alignItems:"center",gap:14,
                boxShadow:isVoted?"0 0 24px #e8411833":"none",
                opacity:isMe?.3:1,transform:isVoted?"scale(1.01)":"scale(1)",
                transition:"all .15s",
              }}>
                <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,
                  background:`hsl(${(i*43)%360},55%,22%)`,
                  border:`2px solid hsl(${(i*43)%360},70%,48%)`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                  {ICONS[i%10]}
                </div>
                <div style={{flex:1}}>
                  <div style={{color:"#f9fafb",fontSize:15,fontFamily:"'Philosopher',sans-serif",fontWeight:600}}>
                    {pl}
                  </div>
                  {isMe&&<div style={{color:"#252545",fontSize:10,fontFamily:"'Philosopher',sans-serif",marginTop:2}}>
                    нельзя голосовать за себя
                  </div>}
                </div>
                {isVoted&&<div style={{color:"#e84118",fontSize:20,animation:"spyPulse 1.5s infinite"}}>👁</div>}
              </div>
            );
          })}
        </div>

        <Btn onClick={confirm} disabled={!sel} v={sel?"danger":"ghost"}>
          {sel?`⚔ Обвиняю ${sel}`:"Выбери подозреваемого"}
        </Btn>

        {dots}
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// РАЗВЯЗКА
// ═══════════════════════════════════════════════════════════════════
function RevealScreen({game,votes,onPlayAgain,onHome}) {
  const [step,setStep]=useState(0);

  const vc={};
  game.players.forEach(p=>{vc[p]=0;});
  Object.values(votes).forEach(v=>{vc[v]=(vc[v]||0)+1;});
  const sorted=Object.entries(vc).sort((a,b)=>b[1]-a[1]);
  const top=sorted[0];
  const spies=game.spies||[];
  const caught=spies.includes(top?.[0]);
  const hero=game.hero;
  const hc=HC[hero.attr]||HC.STR;

  useEffect(()=>{
    const ts=[
      setTimeout(()=>setStep(1),700),
      setTimeout(()=>setStep(2),2200),
      setTimeout(()=>setStep(3),4500),
    ];
    return ()=>ts.forEach(clearTimeout);
  },[]);

  return (
    <Screen>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>

        <div style={{textAlign:"center",paddingTop:8}}>
          <div style={{color:"#e84118",fontFamily:"'Anton',sans-serif",fontSize:22,
            letterSpacing:".1em",textShadow:"0 0 20px #e8411855",animation:"glow 2s ease-in-out infinite"}}>
            ПРАВДА РАСКРЫТА
          </div>
        </div>

        {/* Голоса */}
        {step>=1&&(
          <div style={{width:"100%",animation:"fadeIn .5s ease"}}>
            <SectionLabel>Результаты голосования</SectionLabel>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {sorted.map(([name,cnt],i)=>(
                <div key={name} style={{
                  display:"flex",alignItems:"center",gap:10,
                  background:i===0?"rgba(92,17,17,.28)":"rgba(10,10,22,.8)",
                  border:`1px solid ${i===0?"#e8411833":"#1a1a30"}`,
                  borderRadius:8,padding:"9px 12px",
                }}>
                  <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#4b5563",fontSize:11,fontFamily:"'Philosopher',sans-serif",minWidth:18}}>{i+1}.</span>
                    <span style={{color:"#f9fafb",fontSize:14,fontFamily:"'Philosopher',sans-serif",fontWeight:600}}>
                      {name}
                    </span>
                    {spies.includes(name)&&(
                      <span style={{fontSize:9,color:"#e84118",letterSpacing:".1em",
                        background:"rgba(232,65,24,.12)",padding:"2px 6px",borderRadius:10,
                        fontFamily:"'Philosopher',sans-serif",border:"1px solid #e8411833"}}>ШПИОН</span>
                    )}
                  </div>
                  <div style={{display:"flex",gap:2,alignItems:"center"}}>
                    {Array.from({length:cnt}).map((_,j)=>(
                      <span key={j} style={{fontSize:12}}>👁</span>
                    ))}
                  </div>
                  <div style={{color:i===0?"#e84118":"#4b5563",fontFamily:"'Anton',sans-serif",
                    fontSize:18,minWidth:22,textAlign:"right"}}>{cnt}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Шпион */}
        {step>=2&&(
          <div style={{width:"100%",animation:"fadeIn .6s ease",position:"relative",
            background:"rgba(10,10,22,.97)",
            border:`2px solid ${caught?"#22c55e88":"#e8411888"}`,
            borderRadius:14,padding:"20px",textAlign:"center",
            boxShadow:`0 0 45px ${caught?"#22c55e":"#e84118"}44`}}>
            <CardFrame color={caught?"#22c55e":"#e84118"}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:10,fontFamily:"'Philosopher',sans-serif",
                letterSpacing:".22em",color:"#374151",marginBottom:10}}>
                {spies.length>1?"ШПИОНАМИ БЫЛИ":"ШПИОНОМ БЫЛ"}
              </div>
              <div style={{fontSize:spies.length>1?19:26,fontFamily:"'Anton',sans-serif",
                color:"#f9fafb",textShadow:"0 0 20px #e84118",marginBottom:12,lineHeight:1.4}}>
                {spies.join(" & ")}
              </div>
              <div style={{
                display:"inline-block",
                background:caught?"rgba(34,197,94,.15)":"rgba(232,65,24,.15)",
                border:`1px solid ${caught?"#22c55e":"#e84118"}`,
                color:caught?"#4ade80":"#fca5a5",
                padding:"9px 28px",borderRadius:28,
                fontFamily:"'Anton',sans-serif",fontSize:15,letterSpacing:".1em",
              }}>
                {caught?(spies.length>1?"🎉 ШПИОНЫ ПОЙМАНЫ!":"🎉 ШПИОН ПОЙМАН!")
                       :(spies.length>1?"😈 ШПИОНЫ УСКОЛЬЗНУЛИ!":"😈 ШПИОН УСКОЛЬЗНУЛ!")}
              </div>
              {!caught&&top&&(
                <div style={{color:"#4b5563",fontSize:12,marginTop:8,fontFamily:"'Philosopher',sans-serif"}}>
                  Большинство голосовало за <span style={{color:"#fca5a5"}}>{top[0]}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Герой */}
        {step>=3&&(
          <div style={{width:"100%",animation:"fadeIn .6s ease"}}>
            <SectionLabel>Загаданный герой</SectionLabel>
            <div style={{
              background:`radial-gradient(ellipse at 28%18%,${hc.from}55,#050508 68%)`,
              border:`1.5px solid ${hc.glow}55`,borderRadius:14,padding:"18px",
              textAlign:"center",boxShadow:`0 0 30px ${hc.glow}33`,position:"relative",
            }}>
              <CardFrame color={hc.glow}/>
              <div style={{position:"relative",zIndex:1}}>
                <Avatar hero={hero} size={80}/>
                <div style={{color:"#f9fafb",fontSize:24,fontFamily:"'Anton',sans-serif",
                  marginTop:10,textShadow:`0 0 20px ${hc.glow}77`}}>{hero.name}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:6,
                  background:hc.badge,border:`1px solid ${hc.bdBorder}`,
                  color:hc.glow,fontSize:9,padding:"3px 12px",borderRadius:20,
                  fontFamily:"'Philosopher',sans-serif",letterSpacing:".15em"}}>
                  {hc.label}
                </div>
                <div style={{color:"#4b5563",fontSize:12,fontFamily:"'Almendra',serif",
                  fontStyle:"italic",marginTop:8}}>"{hero.desc}"</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}>
              <Btn v="ghost" onClick={onHome}>🏠 В меню</Btn>
              <Btn onClick={onPlayAgain}>⚔ Ещё раз!</Btn>
            </div>
          </div>
        )}

      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════
export default function GGSpy() {
  const [phase,setPhase]=useState("HOME");
  const [pending,setPending]=useState([]);
  const [game,setGame]=useState(null);
  const [votes,setVotes]=useState({});
  const heroes = HEROES;

  const startGame=({players,duration,spyCount,attrs})=>{
    const pool=heroes.filter(h=>attrs.includes(h.attr));
    const hero=rnd(pool.length>0?pool:heroes);
    const shuffled=[...players].sort(()=>Math.random()-.5);
    const spies=shuffled.slice(0,Math.min(spyCount,players.length-1));
    setGame({players,spies,hero,duration,attrs});
    setVotes({});
    setPhase("ROLES");
  };

  const playAgain=()=>{
    if(!game) return;
    const pool=heroes.filter(h=>game.attrs.includes(h.attr));
    const hero=rnd(pool.length>0?pool:heroes);
    const shuffled=[...game.players].sort(()=>Math.random()-.5);
    const spies=shuffled.slice(0,game.spies.length);
    setGame(g=>({...g,spies,hero}));
    setVotes({});
    setPhase("ROLES");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&family=Almendra:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
        html { scroll-behavior:smooth; font-size:16px; }
        body {
          background:#050508;
          min-height:100dvh;
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }
        @media(min-width:640px){
          body { display:flex; justify-content:center; }
          #root { width:100%; max-width:640px; position:relative; }
          #root::before {
            content:''; position:fixed; top:0; bottom:0;
            left:50%; transform:translateX(-320px);
            width:1px; background:linear-gradient(to bottom,transparent,#1a1a3022,#1a1a3022,transparent);
            pointer-events:none; z-index:2;
          }
          #root::after {
            content:''; position:fixed; top:0; bottom:0;
            left:50%; transform:translateX(320px);
            width:1px; background:linear-gradient(to bottom,transparent,#1a1a3022,#1a1a3022,transparent);
            pointer-events:none; z-index:2;
          }
        }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardReveal{ from{opacity:0;transform:scale(.94)}       to{opacity:1;transform:scale(1)} }
        @keyframes spyPulse  { 0%,100%{box-shadow:0 0 40px #e8411888} 50%{box-shadow:0 0 80px #e84118cc} }
        @keyframes glow      { 0%,100%{opacity:.75;text-shadow:0 0 20px #e8411855} 50%{opacity:1;text-shadow:0 0 30px #e84118} }
        input::placeholder { color:#252545; }
        input:focus {
          border-color:#4f46e5 !important;
          box-shadow:inset 0 2px 8px rgba(0,0,0,.4),0 0 0 2px rgba(79,70,229,.2) !important;
        }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#050508; }
        ::-webkit-scrollbar-thumb { background:#1a1a30; border-radius:2px; }
        button:focus-visible { outline:2px solid #6366f1; outline-offset:3px; }
        * { -webkit-overflow-scrolling:touch; }
      `}</style>

      <div style={{background:"#050508",minHeight:"100dvh",position:"relative"}}>
        <Particles/>
        <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
          background:"radial-gradient(ellipse at 50% -5%,rgba(92,17,17,.2),transparent 52%)"}}/>

        {phase==="HOME"     &&<HomeScreen onStart={()=>setPhase("SETUP")}/>}
        {phase==="SETUP"    &&<SetupScreen onBack={()=>setPhase("HOME")} onReady={p=>{setPending(p);setPhase("SETTINGS");}}/>}
        {phase==="SETTINGS" &&<GameSettingsScreen heroes={heroes} players={pending} onBack={()=>setPhase("SETUP")} onStart={startGame}/>}
        {phase==="ROLES"    &&game&&<RoleRevealScreen game={game} onDone={()=>setPhase("DISCUSS")}/>}
        {phase==="DISCUSS"  &&game&&<DiscussionScreen game={game} onVoteTime={()=>setPhase("VOTE")}/>}
        {phase==="VOTE"     &&game&&<VotingScreen game={game} onAllVoted={v=>{setVotes(v);setPhase("REVEAL");}}/>}
        {phase==="REVEAL"   &&game&&<RevealScreen game={game} votes={votes} onPlayAgain={playAgain} onHome={()=>setPhase("HOME")}/>}
      </div>
    </>
  );
}
