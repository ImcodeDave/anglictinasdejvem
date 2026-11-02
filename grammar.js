// Přehledové karty pro lektora. Úrovně jsou orientační, nikoli pevná osnova.
const grammarSections = [
  'Stavba věty',
  'Slovesné tvary',
  'Časy a děje',
  'Modální slovesa',
  'Jména a určování',
  'Přídavná jména a příslovce',
  'Souvětí a pokročilé vazby',
];

// Každou kartu lze upravit samostatně podle pojmenovaných položek.
const grammarTopics = [
  {
    id: 'word-order',
    section: 'Stavba věty',
    title: 'Slovosled základní věty',
    level: 'A1',
    term: 'Word order · subject, verb, object',
    structure: 'KDO + SLOVESO + CO + KDE + KDY',
    explain:
      'Angličtina spoléhá na pořadí slov. Podmět říká, kdo něco dělá; přísudek co dělá; předmět koho nebo čeho se děj týká.',
    use: 'Výchozí pořadí pro jednoduché oznamovací věty. Ne každá věta obsahuje všechny části.',
    examples: [
      ['I drink coffee at home every morning.', 'Každé ráno piju doma kávu.'],
      ['She is tired.', 'Je unavená. Tired je doplnění po be, ne předmět.'],
    ],
    mistake: '„Like I coffee“ → „I like coffee.“ České pořadí slov se nedá přenášet mechanicky.',
    teach:
      'Dej tři kartičky I / like / music. Měň jen jednu část a nech studentku vytvořit vlastní věty.',
  },
  {
    id: 'questions',
    section: 'Stavba věty',
    title: 'Otázky: be, do, have, can',
    level: 'A1–A2',
    term: 'Questions · auxiliary inversion',
    structure: '(TÁZACÍ SLOVO) + POMOCNÉ SLOVESO + PODMĚT + ZBYTEK',
    explain:
      'Je-li přítomné be, modální sloveso nebo pomocné have, přesuň je před podmět. V přítomném a minulém prostém čase běžných sloves použij do/does/did.',
    use: 'Zjišťovací otázky a většina doplňovacích otázek.',
    examples: [
      ['Are you tired? / Do you like coffee?', 'Jsi unavená? / Máš ráda kávu?'],
      ['Have you finished? / Can you swim?', 'Už jsi skončila? / Umíš plavat?'],
    ],
    mistake:
      '„Do you are…?“ je chybně. Po does a did už na hlavním slovese není -s ani minulý tvar.',
    teach: 'Nech nejprve najít sloveso ve větě. Až potom vybírejte způsob tvoření otázky.',
  },
  {
    id: 'subject-questions',
    section: 'Stavba věty',
    title: 'Otázka na podmět a předmět',
    level: 'A2',
    term: 'Subject questions / object questions',
    structure: 'Who called you? × Who did you call?',
    explain:
      'Když who/what samo zastupuje podmět, v běžné kladné otázce nepřidáváme do. Když se ptáme na předmět, podmět zůstává a potřebujeme obvyklou otázkovou stavbu.',
    use: 'Rozlišení „kdo to udělal“ a „koho jsi oslovila“.',
    examples: [
      ['Who called you?', 'Kdo ti volal?'],
      ['Who did you call?', 'Komu jsi volala?'],
    ],
    mistake:
      '„Who did call you?“ se pro neutrální otázku na podmět nepoužívá; did by zde vyjadřovalo zvláštní důraz.',
    teach: 'Začni větou Anna called Tom. Jednou zakryj Annu, podruhé Toma.',
  },
  {
    id: 'negatives',
    section: 'Stavba věty',
    title: 'Zápor a krátké odpovědi',
    level: 'A1',
    term: 'Negation · short answers',
    structure: 'be/modal/auxiliary + not; do/does/did + not + V1',
    explain:
      'Not se pojí s pomocným nebo modálním slovesem. U běžného slovesa v prostém čase přidáme do. V krátké odpovědi hlavní sloveso obvykle neopakujeme.',
    use: 'Odmítnutí, popření i krátká reakce.',
    examples: [
      ['I’m not tired. / I don’t work here.', 'Nejsem unavená. / Nepracuji tady.'],
      ['Can you drive? — Yes, I can.', 'Umíš řídit? — Ano.'],
    ],
    mistake: '„I not like…“ → „I don’t like…“ Po záporném pomocném slovese zůstává základní tvar.',
    teach: 'Střídejte jednu kladnou větu, její zápor a otázku. Nezaváděj hned všechny časy.',
  },
  {
    id: 'imperative',
    section: 'Stavba věty',
    title: 'Rozkaz a návrh s let’s',
    level: 'A1',
    term: 'Imperative · let’s',
    structure: 'V1… / Don’t + V1… / Let’s + V1…',
    explain:
      'Rozkazovací způsob běžně nemá vyjádřený podmět. Let’s znamená návrh společné činnosti.',
    use: 'Pokyny, návody a společné návrhy.',
    examples: [
      ['Open the window, please.', 'Otevři prosím okno.'],
      ['Don’t worry. Let’s go.', 'Neboj se. Pojďme.'],
    ],
    mistake:
      '„You open!“ nemusí znít jako neutrální prosba. Please pomůže, otázka s can bývá zdvořilejší.',
    teach: 'Použij skutečné pokyny během hodiny: Listen, repeat, try again.',
  },
  {
    id: 'there',
    section: 'Stavba věty',
    title: 'There is / there are',
    level: 'A1',
    term: 'Existential there',
    structure: 'There is + jednotné číslo / There are + množné číslo',
    explain:
      'Uvádíme, že se někde něco nachází nebo existuje. There zde neznamená prostě „tam“; je součástí větné konstrukce.',
    use: 'Popis místa, vybavení a dostupných věcí.',
    examples: [
      ['There is a café near my house.', 'Blízko mého domu je kavárna.'],
      ['Are there any shops?', 'Jsou tam nějaké obchody?'],
    ],
    mistake: '„There have…“ → „There is/are…“ Rozliš I have a car a There is a car outside.',
    teach: 'Popisujte obrázek místnosti. Potom se ptejte na věci, které na obrázku nejsou.',
  },
  {
    id: 'dummy-it',
    section: 'Stavba věty',
    title: 'It jako formální podmět',
    level: 'A1–A2',
    term: 'Dummy / anticipatory it',
    structure: 'It is + počasí / čas / hodnocení',
    explain:
      'Angličtina obvykle potřebuje vyjádřený podmět i tam, kde čeština říká jen „prší“ nebo „je pozdě“. It může také předjímat delší infinitivní či vedlejší větu.',
    use: 'Počasí, čas, vzdálenost a hodnocení činnosti.',
    examples: [
      ['It’s raining. It’s late.', 'Prší. Je pozdě.'],
      ['It is important to practise.', 'Je důležité procvičovat.'],
    ],
    mistake: '„Is cold“ → „It’s cold.“ V I’m cold mluvíš o svém pocitu chladu.',
    teach: 'Porovnej It’s cold a I’m cold pomocí dvou jednoduchých situací.',
  },
  {
    id: 'be',
    section: 'Slovesné tvary',
    title: 'Be · am/is/are · was/were · been · being',
    level: 'A1–B2',
    term: 'Be = základní tvar; been = past participle, V3',
    structure: 'be → am/is/are → was/were → been; -ing: being',
    explain:
      'Jde o různé tvary jediného nepravidelného slovesa být. Be je základní tvar, was/were minulý tvar a been příčestí minulé. Being je -ing tvar; funkce závisí na větě.',
    use: 'Be: po can/will nebo v infinitivu. Been: po have/has/had ve složených tvarech. Being: průběh, trpný rod nebo jmenné použití -ing.',
    examples: [
      ['I can be there at six.', 'Můžu tam být v šest. Be po can.'],
      [
        'I was tired. / I have been ill.',
        'Byla jsem unavená. / Byla jsem nemocná; je to součást aktuálního kontextu.',
      ],
      ['The car is being repaired.', 'Auto se právě opravuje. Being tvoří průběhový trpný rod.'],
    ],
    mistake:
      '„I been tired“ není standardní minulý čas. Pro prostou minulost I was tired; pro perfect potřebuješ have/has/had + been.',
    teach:
      'Řekni: „Been není samostatný čas. Je to dílek slovesa be, který používáme po have, has nebo had.“ Otevři i kartu Tvary sloves.',
  },
  {
    id: 'verb-forms',
    section: 'Slovesné tvary',
    title: 'V1, V2, V3 a -ing: co znamenají',
    level: 'A1–B1',
    term: 'Base form · past simple form · past participle · -ing form',
    structure: 'write → wrote → written → writing',
    explain:
      'V1/V2/V3 jsou výukové zkratky pro tvary, ne názvy tří časů. Pravidelná slovesa mají V2 a V3 stejné, u nepravidelných se mohou lišit.',
    use: 'V1 například po did/can; V2 pro kladnou prostou minulost; V3 po have a v trpném rodě; -ing po be nebo v dalších vazbách.',
    examples: [
      [
        'I wrote a letter. / I have written a letter.',
        'Napsala jsem dopis. / Dopis jsem už napsala.',
      ],
      ['Did you write it?', 'Napsala jsi to? Po did se vrací write.'],
    ],
    mistake:
      '„V3 je předpřítomný čas“ je nepřesné. V3 je tvar, který vstupuje do více různých konstrukcí.',
    teach: 'Ukazuj tři konkrétní věty místo izolovaného seznamu tvarů.',
  },
  {
    id: 'infinitive',
    section: 'Slovesné tvary',
    title: 'Infinitiv s to a bez to',
    level: 'A1–B1',
    term: 'To-infinitive · bare infinitive',
    structure: 'want to go / can go / let me go',
    explain:
      'Infinitiv je neurčitý slovesný tvar. To-infinitiv má to; bare infinitive je bez něj. Volba závisí na předchozí konstrukci.',
    use: 'Po want, decide, hope obvykle to; po modálních slovesech a aktivním let/make bez to.',
    examples: [
      ['I want to leave. / I can leave.', 'Chci odejít. / Můžu odejít.'],
      ['Let me help you.', 'Nech mě ti pomoct.'],
    ],
    mistake:
      '„I can to go“ → „I can go.“ Částice to není součástí každého výskytu základního tvaru.',
    teach: 'Postav vedle sebe I want to… a I can…; doplňujte stejná slovesa.',
  },
  {
    id: 'ing',
    section: 'Slovesné tvary',
    title: '-ing: příčestí a gerundium',
    level: 'A2–B2',
    term: 'Present participle · gerund',
    structure: 'be + working; enjoy working; after working',
    explain:
      'Stejný -ing tvar má různé funkce. Po be vytváří průběhový slovesný tvar; jako jméno činnosti se tradičně nazývá gerundium. Moderní popisy někdy oba případy sdružují.',
    use: 'Průběhové konstrukce, některé slovesné vazby, po předložkách a jako podmět.',
    examples: [
      ['I’m swimming. / Swimming is fun.', 'Právě plavu. / Plavání je zábava.'],
      ['Thanks for helping.', 'Díky za pomoc. Po for je zde -ing.'],
    ],
    mistake: '„I enjoy to swim“ → „I enjoy swimming.“ Ne každý -ing znamená, že se něco děje teď.',
    teach: 'Porovnej děj právě teď a název činnosti: I’m reading × Reading helps me relax.',
  },
  {
    id: 'auxiliaries',
    section: 'Slovesné tvary',
    title: 'Pomocná slovesa be, have, do',
    level: 'A1–B1',
    term: 'Auxiliary verbs',
    structure: 'be + -ing/V3; have + V3; do + V1',
    explain:
      'Pomocná slovesa nesou gramatickou informaci a kombinují se s hlavním slovesem. Be, have i do mohou být i hlavními slovesy s vlastním významem.',
    use: 'Tvoření průběhu, perfect, trpného rodu, otázek, záporu a důrazu.',
    examples: [
      ['I have a car. / I have finished.', 'Mám auto. / Už jsem skončila. Have má dvě různé role.'],
      ['I do my homework. / Do you work?', 'Dělám úkol. / Pracuješ?'],
    ],
    mistake: '„Do you have finished?“ → „Have you finished?“ Věta už má pomocné have.',
    teach: 'Barevně odliš pomocné a hlavní sloveso. Nech najít první pomocné sloveso pro otázku.',
  },
  {
    id: 'spelling',
    section: 'Slovesné tvary',
    title: 'Koncovky -s, -ed a -ing',
    level: 'A1–A2',
    term: 'Inflection · spelling changes',
    structure: 'work → works/worked/working; study → studies/studied/studying',
    explain:
      'Pravopis závisí na konci slova a někdy na přízvuku: make → making, stop → stopped/stopping, lie → lying. Koncovka -s se pojí s 3. osobou jednotného čísla.',
    use: 'Tvorba pravidelných slovesných tvarů.',
    examples: [
      ['She studies. She studied. She is studying.', 'Studuje. Studovala. Právě studuje.'],
      ['He makes tea. He is making tea.', 'Dělá čaj. Právě dělá čaj.'],
    ],
    mistake:
      'Zdvojování souhlásky se nedá zobecnit na všechna krátká slova. Play → playing, open → opening, prefer → preferring.',
    teach: 'Nejdřív nacvič několik používaných sloves; pak z nich vyvoď pravidlo a jeho meze.',
  },
  {
    id: 'present-simple',
    section: 'Časy a děje',
    title: 'Přítomný prostý',
    level: 'A1',
    term: 'Present simple',
    structure: 'I work / she works; do/does + V1',
    explain:
      'Vyjadřuje zvyky, obecně platné skutečnosti a stavy. Pro třetí osobu jednotného čísla přidáváme -s/-es; be má vlastní tvary.',
    use: 'Rutiny, preference, fakta i jízdní řády.',
    examples: [
      ['She works in Prague.', 'Pracuje v Praze.'],
      ['Does she work here?', 'Pracuje tady?'],
    ],
    mistake: '„Does she works?“ → „Does she work?“ -s už nese does.',
    teach: 'Nech studentku popsat vlastní den. Teprve potom vyprávět stejný den za někoho jiného.',
  },
  {
    id: 'present-continuous',
    section: 'Časy a děje',
    title: 'Přítomný průběhový',
    level: 'A1–A2',
    term: 'Present continuous / progressive',
    structure: 'am/is/are + V-ing',
    explain:
      'Zdůrazňuje probíhající nebo dočasný děj v současném období. Může popisovat i domluvenou budoucí událost.',
    use: 'Co se děje teď, dočasná situace, domluvená schůzka.',
    examples: [
      ['I’m studying now.', 'Právě se učím.'],
      ['I’m meeting Anna tomorrow.', 'Zítra se setkám s Annou; je to domluvené.'],
    ],
    mistake: '„I studying“ → „I’m studying.“ Nezaměňuj průběh a všechny situace v přítomnosti.',
    teach: 'Porovnej I work every day × I’m working now na jedné konkrétní osobě.',
  },
  {
    id: 'stative',
    section: 'Časy a děje',
    title: 'Stavová a dějová slovesa',
    level: 'A2–B1',
    term: 'Stative / dynamic verbs',
    structure: 'I know… / I think… × I’m thinking…',
    explain:
      'Některé významy sloves se běžně používají v prostých tvarech: know, belong, need. Jedno sloveso ale může mít stavový i dějový význam.',
    use: 'Volba prostého a průběhového tvaru podle významu.',
    examples: [
      ['I think you’re right.', 'Myslím, že máš pravdu; názor.'],
      ['I’m thinking about it.', 'Přemýšlím o tom; činnost.'],
    ],
    mistake: '„I’m knowing“ → „I know.“ Poučka „think nikdy nemá -ing“ je také chybná.',
    teach: 'Vysvětli rozdíl na významu dvou vět, ne jen seznamem zakázaných sloves.',
  },
  {
    id: 'past-simple',
    section: 'Časy a děje',
    title: 'Minulý prostý',
    level: 'A1–A2',
    term: 'Past simple',
    structure: 'V2; did/didn’t + V1; be: was/were',
    explain:
      'Popisuje minulou událost jako celek nebo minulý stav. V otázce a záporu běžných sloves používáme did a základní tvar.',
    use: 'Příběhy, včerejšek, konkrétní ukončené události.',
    examples: [
      ['I went home yesterday.', 'Včera jsem šla domů.'],
      ['Did you go home? / I didn’t go.', 'Šla jsi domů? / Nešla jsem.'],
    ],
    mistake: '„Did you went?“ → „Did you go?“ Be tvoří otázku samo: Were you there?',
    teach: 'Začni třemi pravdivými větami o včerejšku; nepravidelná slovesa doplňuj podle potřeby.',
  },
  {
    id: 'past-continuous',
    section: 'Časy a děje',
    title: 'Minulý průběhový',
    level: 'A2',
    term: 'Past continuous',
    structure: 'was/were + V-ing',
    explain:
      'Dívá se na děj v průběhu v minulém okamžiku. Často tvoří pozadí k události v past simple.',
    use: 'Rozpracovaná činnost, pozadí příběhu, souběžné děje.',
    examples: [
      ['I was cooking when you called.', 'Vařila jsem, když jsi zavolala.'],
      ['At eight, we were watching TV.', 'V osm jsme se dívali na televizi.'],
    ],
    mistake: 'Volba není jen o tom, že děj byl „dlouhý“. Důležitý je pohled na jeho průběh.',
    teach: 'Nakresli časovou osu: delší průběh vaření a bod telefonátu.',
  },
  {
    id: 'present-perfect',
    section: 'Časy a děje',
    title: 'Předpřítomný prostý',
    level: 'A2–B1',
    term: 'Present perfect simple',
    structure: 'have/has + V3',
    explain:
      'Spojuje dění před teď s přítomným pohledem: zkušenost, aktuální výsledek nebo dosud trvající stav. Není to automatický překlad českého minulého času.',
    use: 'Zkušenosti bez určené ukončené doby, aktuální výsledek, for/since.',
    examples: [
      ['I’ve lost my keys.', 'Ztratila jsem klíče; teď je nemám.'],
      ['I’ve known her for years.', 'Znám ji už roky.'],
    ],
    mistake: 'Pro konkrétní ukončené yesterday použij obvykle past simple: I saw her yesterday.',
    teach: 'Porovnej I lost my keys yesterday a I’ve lost my keys — I can’t get in.',
  },
  {
    id: 'present-perfect-cont',
    section: 'Časy a děje',
    title: 'Předpřítomný průběhový',
    level: 'B1',
    term: 'Present perfect continuous',
    structure: 'have/has + been + V-ing',
    explain:
      'Zdůrazňuje činnost probíhající od minulosti k přítomnosti, případně nedávno ukončenou činnost s viditelným důsledkem.',
    use: 'Jak dlouho činnost běží, nedávná aktivita, opakovaná dočasná činnost.',
    examples: [
      ['I’ve been studying for two hours.', 'Učím se už dvě hodiny.'],
      ['You’re wet. Has it been raining?', 'Jsi mokrá. Pršelo?'],
    ],
    mistake: '„I have studying“ → „I have been studying.“ Been je zde V3 od be.',
    teach: 'Nech porovnat výsledek I’ve read three pages a činnost I’ve been reading for an hour.',
  },
  {
    id: 'past-perfect',
    section: 'Časy a děje',
    title: 'Předminulý prostý',
    level: 'B1',
    term: 'Past perfect simple',
    structure: 'had + V3',
    explain:
      'Děj se odehrál před jiným minulým referenčním okamžikem. Had je stejné pro všechny osoby.',
    use: 'Zpětný pohled v příběhu, vysvětlení dřívější příčiny.',
    examples: [
      ['When I arrived, she had left.', 'Když jsem dorazila, už odešla.'],
      ['I was tired because I hadn’t slept.', 'Byla jsem unavená, protože jsem nespala.'],
    ],
    mistake:
      'Není nutné dávat každý „starší“ minulý děj do past perfect, když pořadí jasně vyjadřuje kontext.',
    teach: 'Na ose vyznač odchod a pozdější příchod. Který z nich už byl hotový?',
  },
  {
    id: 'past-perfect-cont',
    section: 'Časy a děje',
    title: 'Předminulý průběhový',
    level: 'B1–B2',
    term: 'Past perfect continuous',
    structure: 'had + been + V-ing',
    explain:
      'Dívá se na průběh činnosti před minulým bodem. Často vysvětluje tehdejší stav a uvádí dobu trvání.',
    use: 'Délka činnosti před minulou událostí nebo její minulý důsledek.',
    examples: [
      ['I had been working for hours when she called.', 'Pracovala jsem už hodiny, když zavolala.'],
      ['He was tired because he had been running.', 'Byl unavený, protože předtím běhal.'],
    ],
    mistake: 'Had been není samo minulý průběhový čas. Past continuous je was/were + -ing.',
    teach: 'Porovnej I was running at five a I had been running for an hour by five.',
  },
  {
    id: 'will',
    section: 'Časy a děje',
    title: 'Budoucnost s will',
    level: 'A2',
    term: 'Will-future · future simple (výukový název)',
    structure: 'will + V1; won’t + V1',
    explain:
      'Will je modální sloveso. Ve výuce se konstrukce často řadí k budoucím časům; angličtina ale nemá samostatnou budoucí slovesnou koncovku.',
    use: 'Předpověď, spontánní rozhodnutí, nabídka, slib.',
    examples: [
      ['I’ll help you.', 'Pomůžu ti.'],
      ['I think it will rain.', 'Myslím, že bude pršet.'],
    ],
    mistake:
      '„She will goes“ → „She will go.“ Will nepatří automaticky do každé věty o budoucnosti.',
    teach: 'Zahraj problém a spontánní nabídku pomoci. Pak porovnej s dříve hotovým plánem.',
  },
  {
    id: 'going-to',
    section: 'Časy a děje',
    title: 'Going to a další budoucí plány',
    level: 'A2',
    term: 'Be going to · present forms for future',
    structure: 'am/is/are + going to + V1',
    explain:
      'Going to často vyjadřuje záměr nebo odhad z přítomných známek. Přítomný průběhový může označit domluvu, přítomný prostý jízdní řád.',
    use: 'Záměr, viditelný vývoj, domluvená událost a rozvrh.',
    examples: [
      ['I’m going to study tonight.', 'Večer se chystám učit.'],
      ['The train leaves at six.', 'Vlak odjíždí v šest.'],
    ],
    mistake:
      '„I going to…“ → „I’m going to…“ Volba mezi budoucími konstrukcemi závisí na významu, ne jen na tomorrow.',
    teach: 'Porovnej plán, domluvenou schůzku a jízdní řád v jednom kalendáři.',
  },
  {
    id: 'future-cont',
    section: 'Časy a děje',
    title: 'Budoucí průběhový',
    level: 'B1–B2',
    term: 'Future continuous',
    structure: 'will + be + V-ing',
    explain:
      'Popisuje děj v průběhu v budoucím okamžiku; může neutrálně zjišťovat předpokládaný plán.',
    use: 'Co bude právě probíhat, očekávaný průběh.',
    examples: [
      ['This time tomorrow, I’ll be travelling.', 'Zítra touhle dobou budu na cestě.'],
      ['Will you be using the car tonight?', 'Budeš dnes večer používat auto?'],
    ],
    mistake: '„Will be travel“ → „will be travelling“. Be potřebuje pro průběh -ing tvar.',
    teach: 'Zvol budoucí čas na hodinách a ptej se, co bude v ten okamžik probíhat.',
  },
  {
    id: 'future-perfect',
    section: 'Časy a děje',
    title: 'Budoucí předčasnost',
    level: 'B2',
    term: 'Future perfect simple / continuous',
    structure: 'will have + V3; will have been + V-ing',
    explain:
      'Perfect se vztahuje k budoucímu bodu. Prostý tvar zdůrazní hotový výsledek, průběhový dobu činnosti do tohoto bodu.',
    use: 'Co bude do určité doby hotové nebo jak dlouho bude činnost trvat.',
    examples: [
      ['By Friday, I’ll have finished.', 'Do pátku budu mít hotovo.'],
      ['By June, I’ll have been working here for a year.', 'V červnu to bude rok, co tu pracuji.'],
    ],
    mistake: 'By Friday znamená „nejpozději do pátku“, ne automaticky „v pátek“.',
    teach: 'Použij termín dokončení úkolu a bod, ze kterého se na něj díváme zpět.',
  },
  {
    id: 'used-to',
    section: 'Časy a děje',
    title: 'Used to, would a be used to',
    level: 'B1',
    term: 'Past habits · be/get used to',
    structure: 'used to + V1; be used to + noun/-ing',
    explain:
      'Used to popisuje dřívější zvyk nebo stav, který se změnil. Would může v minulém kontextu opakovat děje, běžně ne stavy. Be used to znamená být zvyklý na něco.',
    use: 'Minulé zvyky a současná zvyklost.',
    examples: [
      ['I used to live here.', 'Dřív jsem tu bydlela.'],
      ['I’m used to getting up early.', 'Jsem zvyklá vstávat brzy.'],
    ],
    mistake: '„I am used to get up“ → „I am used to getting up“. V této vazbě je to předložka.',
    teach: 'Dvě osy: jak to bývalo dřív a na co jsem zvyklá teď.',
  },
  {
    id: 'can-could',
    section: 'Modální slovesa',
    title: 'Can, could a be able to',
    level: 'A1–B1',
    term: 'Ability · permission · possibility',
    structure: 'can/could + V1; be able to + V1',
    explain:
      'Can/could vyjadřují schopnost, možnost i zdvořilost. Be able to umožní použít schopnost v tvarech, kde can nemá potřebný tvar.',
    use: 'Dovednosti, prosby, dovolení a schopnost v jiných časech.',
    examples: [
      ['Can you help me?', 'Můžeš mi pomoct?'],
      ['I’ll be able to come.', 'Budu moct přijít.'],
    ],
    mistake:
      '„Will can“ → „will be able to“. Could není jen minulost can; může být zdvořilé nebo hypotetické.',
    teach: 'Odděl dovednost I can swim a prosbu Can you help me? pomocí situací.',
  },
  {
    id: 'must-have-to',
    section: 'Modální slovesa',
    title: 'Must, have to, mustn’t, don’t have to',
    level: 'A2',
    term: 'Obligation · prohibition · lack of necessity',
    structure: 'must + V1; have to + V1',
    explain:
      'Must a have to vyjadřují povinnost. Mustn’t je zákaz; don’t have to znamená, že něco není nutné. Minulou povinnost běžně tvoří had to.',
    use: 'Pravidla, povinnosti a dobrovolnost.',
    examples: [
      ['You mustn’t smoke here.', 'Tady nesmíš kouřit.'],
      ['You don’t have to come.', 'Nemusíš přijít.'],
    ],
    mistake: 'Mustn’t a don’t have to nejsou synonyma. „Nemusíš“ nepřekládej jako mustn’t.',
    teach: 'Dej vedle sebe zákazovou značku a nepovinný domácí úkol.',
  },
  {
    id: 'should',
    section: 'Modální slovesa',
    title: 'Should, ought to a had better',
    level: 'A2–B1',
    term: 'Advice · recommendation',
    structure: 'should/ought to + V1; had better + V1',
    explain:
      'Should a ought to dávají radu nebo vyjadřují očekávání. Had better může zdůraznit nežádoucí důsledek, když radu neposlechneš.',
    use: 'Doporučení, rada a naléhavé varování.',
    examples: [
      ['You should rest.', 'Měla by sis odpočinout.'],
      ['You’d better leave now.', 'Radši už odejdi.'],
    ],
    mistake:
      '„You should to rest“ → „You should rest“. Had better má had, i když mluví o teď nebo později.',
    teach: 'Nech studentku poradit kamarádce s několika běžnými problémy.',
  },
  {
    id: 'may-might',
    section: 'Modální slovesa',
    title: 'May, might a could: možnost',
    level: 'A2–B1',
    term: 'Possibility · may for permission',
    structure: 'may/might/could + V1',
    explain:
      'Vyjadřují nejistou možnost. May může v jiném kontextu vyjadřovat formální dovolení. Rozdíl mezi may a might není pevná číselná pravděpodobnost.',
    use: 'Odhad, nejistý plán, zdvořilé dovolení.',
    examples: [
      ['It might rain.', 'Možná bude pršet.'],
      ['May I come in?', 'Smím dál?'],
    ],
    mistake: '„It might rains“ → „It might rain“. Neuč may = přesně 50 % a might = přesně 30 %.',
    teach: 'Porovnej jistý a nejistý plán a nech studentku vybrat odpovídající formulaci.',
  },
  {
    id: 'would',
    section: 'Modální slovesa',
    title: 'Would, would like a would rather',
    level: 'A2–B2',
    term: 'Politeness · hypothetical meaning · preference',
    structure: 'would + V1; would like to + V1; would rather + V1',
    explain:
      'Would vstupuje do zdvořilých žádostí, hypotetických vět, minulých zvyků a budoucnosti z minulého pohledu. Would like vyjadřuje přání.',
    use: 'Zdvořilá objednávka, přání a preference.',
    examples: [
      ['I’d like to book a room.', 'Ráda bych si rezervovala pokoj.'],
      ['I’d rather stay at home.', 'Raději bych zůstala doma.'],
    ],
    mistake: '„I would like go“ → „I would like to go“. U would rather ale to není.',
    teach: 'Procvič objednávku v hotelu, potom dva možné plány na večer.',
  },
  {
    id: 'modal-perfect',
    section: 'Modální slovesa',
    title: 'Modál + have + V3',
    level: 'B2',
    term: 'Perfect modal constructions',
    structure: 'must/might/can’t/should + have + V3',
    explain:
      'Pomocí have + V3 se modální význam vztahuje k dřívějšímu ději. Must have může vyjadřovat úsudek, should have zpětnou kritiku nebo lítost.',
    use: 'Odhady o minulosti a hodnocení dřívějšího rozhodnutí.',
    examples: [
      ['She must have forgotten.', 'Určitě zapomněla; je to můj úsudek.'],
      ['I should have called.', 'Měla jsem zavolat, ale nezavolala.'],
    ],
    mistake:
      'Must have done není běžný minulý ekvivalent povinnosti must; pro minulou povinnost použij had to.',
    teach: 'Ukaž prázdnou židli a nechte odhadovat, proč někdo nepřišel.',
  },
  {
    id: 'articles',
    section: 'Jména a určování',
    title: 'Členy a/an, the a nulový člen',
    level: 'A1–B1',
    term: 'Articles · zero article',
    structure: 'a/an + jednotné počitatelné jméno; the + konkrétní známá věc',
    explain:
      'A/an představuje jeden blíže neurčený exemplář. The identifikuje věc, kterou lze určit z kontextu. Bez členu bývají obecná množná a nepočitatelná jména.',
    use: 'Uvádění nové věci, odkaz na známou věc a obecné výroky.',
    examples: [
      ['I have a dog. The dog is friendly.', 'Mám psa. Ten pes je přátelský.'],
      ['I like coffee.', 'Mám ráda kávu obecně.'],
    ],
    mistake:
      'A/an se volí podle počátečního zvuku: an hour, a university. „I’m teacher“ → „I’m a teacher“.',
    teach: 'Pracuj s jednou novou a potom už známou věcí na stole.',
  },
  {
    id: 'countability',
    section: 'Jména a určování',
    title: 'Počitatelnost a množné číslo',
    level: 'A1–A2',
    term: 'Countable / uncountable nouns · plurals',
    structure: 'a book / two books; some water',
    explain:
      'Počitatelná jména mají jednotlivé kusy a množné číslo. Nepočitatelná bereme v daném významu jako látku nebo celek. Počitatelnost se může měnit podle významu.',
    use: 'Členy, množství, jednotky a shoda.',
    examples: [
      ['Some advice / two pieces of advice.', 'Nějaká rada / dvě rady.'],
      ['Two coffees, please.', 'Dvě kávy, prosím; dvě porce.'],
    ],
    mistake:
      '„Informations“ → „information“. U nepravidelného množného čísla například person → people, child → children.',
    teach: 'Nech oddělit věc a jednotku: water × a glass of water.',
  },
  {
    id: 'quantifiers',
    section: 'Jména a určování',
    title: 'Some, any, much, many, few, little',
    level: 'A1–B1',
    term: 'Quantifiers',
    structure: 'many/few + počitatelné množné; much/little + nepočitatelné',
    explain:
      'Výraz pro množství závisí na počitatelnosti a významu. Some se objevuje i v otázkách, hlavně v nabídkách a prosbách. A few/a little znamená určité malé množství; few/little zdůrazňuje nedostatek.',
    use: 'Množství, nabídky, zásoby a nedostatek.',
    examples: [
      ['Would you like some tea?', 'Dáš si čaj?'],
      ['I have a few friends, but little time.', 'Mám pár přátel, ale málo času.'],
    ],
    mistake:
      '„Much people“ → „many people“. Some/any nefungují podle absolutního pravidla „otázka = any“.',
    teach: 'Použij zásoby v kuchyni a nabídku čaje. Ukaž rozdíl a few × few v kontextu.',
  },
  {
    id: 'pronouns',
    section: 'Jména a určování',
    title: 'Osobní a přivlastňovací zájmena',
    level: 'A1',
    term: 'Personal pronouns · possessive determiners/pronouns',
    structure: 'I → me → my → mine; she → her → her → hers',
    explain:
      'Podmětové zájmeno koná děj, předmětové je zasažené dějem nebo stojí po předložce. My/her stojí před jménem; mine/hers je nahrazuje.',
    use: 'Odkaz na lidi a věci, vlastnictví.',
    examples: [
      ['She knows me.', 'Ona mě zná.'],
      ['This is my bag. It’s mine.', 'To je moje taška. Je moje.'],
    ],
    mistake: '„Give it to I“ → „Give it to me“. „This is mine bag“ → „This is my bag“.',
    teach: 'Barevně označ osobu před a za slovesem, potom přiřaď věci jejich majitelům.',
  },
  {
    id: 'reflexives',
    section: 'Jména a určování',
    title: 'Zvratná zájmena a each other',
    level: 'A2',
    term: 'Reflexive pronouns · reciprocal pronouns',
    structure: 'myself/yourself/herself…; each other',
    explain:
      'Zvratné zájmeno odkazuje zpět na podmět. Each other znamená vzájemnost dvou nebo více účastníků. Anglické reflexivní vazby se nekryjí s českým „se“.',
    use: 'Děj vůči sobě, důraz a vzájemné vztahy.',
    examples: [
      ['She hurt herself.', 'Zranila se.'],
      ['They helped each other.', 'Pomohli si navzájem.'],
    ],
    mistake: '„I feel myself tired“ → „I feel tired“. České „cítím se“ nevyžaduje myself.',
    teach: 'Ukaž šipku zpět k jedné osobě a dvě šipky mezi dvěma osobami.',
  },
  {
    id: 'demonstratives',
    section: 'Jména a určování',
    title: 'This, that, these, those',
    level: 'A1',
    term: 'Demonstratives',
    structure: 'this/that + jednotné; these/those + množné',
    explain:
      'Výrazy ukazují na lidi a věci nebo odkazují na obsah rozhovoru. Rozlišují číslo a obvykle blízkost či vzdálenost v kontextu.',
    use: 'Ukazování a identifikace.',
    examples: [
      ['This is my book. Those are yours.', 'Tohle je moje kniha. Tamhlety jsou tvoje.'],
      ['These shoes are new.', 'Tyto boty jsou nové.'],
    ],
    mistake: '„This shoes“ → „these shoes“. This se nepojí s množným číslem.',
    teach: 'Použij skutečné předměty blízko a dál od studentky.',
  },
  {
    id: 'possessive-s',
    section: 'Jména a určování',
    title: 'Přivlastňovací ’s a vazba s of',
    level: 'A1–A2',
    term: 'Possessive / genitive',
    structure: 'Anna’s car; my parents’ house; the end of the road',
    explain:
      'Přivlastňovací ’s často označuje vztah k osobě, skupině nebo časovému údaji. Of je běžné u částí celků a mnoha neživotných vztahů; není to absolutní rozdělení.',
    use: 'Vlastnictví, příbuzenství a vztahy mezi jmény.',
    examples: [
      ['My sister’s friend.', 'Kamarád mé sestry.'],
      ['The door of the house.', 'Dveře domu.'],
    ],
    mistake:
      'Množné číslo books nemá apostrof. Parents’ je přivlastnění více rodičům, parent’s jednomu rodiči.',
    teach: 'Začni konkrétními věcmi studentky a její rodiny.',
  },
  {
    id: 'determiners',
    section: 'Jména a určování',
    title: 'Each, every, all, both, either, neither',
    level: 'A2–B1',
    term: 'Determiners · distributives',
    structure: 'each/every + jednotné; both + množné; neither of + skupina',
    explain:
      'Tyto výrazy určují rozsah: jednotlivci, všichni, oba, kterýkoli ze dvou nebo ani jeden. Stavba se mění při of a zájmenech.',
    use: 'Rozdělení do skupin, výběr a zobecnění.',
    examples: [
      ['Every student has a book.', 'Každý student má knihu.'],
      ['Both of them are here.', 'Oba jsou tady.'],
    ],
    mistake: '„Every students“ → „every student“. All the students ale vyžaduje množné číslo.',
    teach: 'Polož na stůl dva až tři předměty a ukazuj rozsah každého výrazu.',
  },
  {
    id: 'agreement',
    section: 'Jména a určování',
    title: 'Shoda podmětu a slovesa',
    level: 'A1–B2',
    term: 'Subject–verb agreement',
    structure: 'She works; they work; information is…',
    explain:
      'Sloveso se v přítomném čase a u be řídí číslem a osobou podmětu. Dlouhý předmětový nebo předložkový výraz může skutečný podmět zakrýt.',
    use: 'Správný tvar slovesa v jednoduchých i delších větách.',
    examples: [
      ['The list of names is on the desk.', 'Seznam jmen je na stole.'],
      ['The news is good.', 'Zprávy jsou dobré. News má jednotnou shodu.'],
    ],
    mistake: 'Neřiď sloveso jen podle nejbližšího podstatného jména. People obvykle vyžaduje are.',
    teach: 'Nech vyškrtnout rozvíjející výrazy a najít jádro podmětu.',
  },
  {
    id: 'adjectives',
    section: 'Přídavná jména a příslovce',
    title: 'Přídavné jméno a příslovce',
    level: 'A1–A2',
    term: 'Adjectives · adverbs',
    structure: 'a careful driver / drives carefully',
    explain:
      'Přídavné jméno popisuje člověka nebo věc. Příslovce může popsat způsob děje, míru nebo celou výpověď. Mnohá vznikají pomocí -ly, ale ne všechna.',
    use: 'Popis vlastností a způsobu činnosti.',
    examples: [
      ['She is a good singer. She sings well.', 'Je dobrá zpěvačka. Dobře zpívá.'],
      ['He drives fast.', 'Jezdí rychle. Fast může být i příslovce.'],
    ],
    mistake:
      '„She sings good“ → „She sings well“. Po look/feel se při popisu stavu často používá přídavné jméno: You look tired.',
    teach: 'Ptejte se nejprve „jaká je?“ a potom „jak to dělá?“. Ukazuj výjimky well/fast.',
  },
  {
    id: 'comparison',
    section: 'Přídavná jména a příslovce',
    title: 'Stupňování a srovnávání',
    level: 'A1–B1',
    term: 'Comparatives · superlatives',
    structure: '-er / more… than; the -est / the most; as… as',
    explain:
      'Srovnáváme dva nebo více členů. Krátká přídavná jména často mají -er/-est, delší more/most; některá jsou nepravidelná.',
    use: 'Rozdíly, nejvyšší míra a rovnost.',
    examples: [
      ['This is cheaper than that.', 'Tohle je levnější než tamto.'],
      ['It’s as good as mine.', 'Je to stejně dobré jako moje.'],
    ],
    mistake: '„More better“ → „better“. Good → better → best; bad → worse → worst.',
    teach: 'Porovnejte dvě reálné nabídky nebo města, která studentka zná.',
  },
  {
    id: 'frequency',
    section: 'Přídavná jména a příslovce',
    title: 'Četnost a pozice příslovcí',
    level: 'A1–B1',
    term: 'Adverbs of frequency · mid-position',
    structure: 'I usually work; I am usually tired; I have never been…',
    explain:
      'Příslovce četnosti běžně stojí před hlavním slovesem, po be nebo po prvním pomocném slovese. Některá příslovce lze přesunout pro důraz.',
    use: 'Zvyky, opakování a zkušenosti.',
    examples: [
      ['She often cooks. / She is often late.', 'Často vaří. / Často chodí pozdě.'],
      ['I have never been there.', 'Nikdy jsem tam nebyla.'],
    ],
    mistake: '„I never have been…“ není neutrální výchozí vzor. Procvič have never been.',
    teach: 'Přidej usually do už známé věty, potom porovnej větu s be.',
  },
  {
    id: 'degree',
    section: 'Přídavná jména a příslovce',
    title: 'Too, enough, so a such',
    level: 'A2–B1',
    term: 'Degree expressions',
    structure: 'too + adjective; adjective + enough; enough + noun',
    explain:
      'Too vyjadřuje překročenou vhodnou míru, enough dostatečnou míru. So zesiluje přídavné jméno či příslovce, such celou jmennou skupinu.',
    use: 'Míra, vhodnost a důsledek.',
    examples: [
      ['It’s too hot to drink.', 'Je to příliš horké na pití.'],
      ['She’s old enough. We have enough time.', 'Je dost stará. Máme dost času.'],
    ],
    mistake: '„Enough old“ → „old enough“. Ale u jména enough stojí před ním: enough money.',
    teach: 'Použij velikosti oblečení nebo teplotu čaje jako konkrétní situaci.',
  },
  {
    id: 'adjective-order',
    section: 'Přídavná jména a příslovce',
    title: 'Pořadí přídavných jmen, -ed a -ing',
    level: 'A2–B1',
    term: 'Adjective order · participial adjectives',
    structure: 'a lovely small old house; bored × boring',
    explain:
      'Několik přídavných jmen má obvyklé pořadí podle významu. Participiální přídavná jména často rozlišují prožívaný pocit (-ed) a vlastnost, která jej vyvolává (-ing).',
    use: 'Přesnější popis věcí a pocitů.',
    examples: [
      ['I’m bored. The film is boring.', 'Nudím se. Ten film je nudný.'],
      ['A beautiful old Italian car.', 'Krásné staré italské auto.'],
    ],
    mistake:
      '„I’m boring“ obvykle znamená „jsem nudná“, ne „nudím se“. Pravidlo není o lidech versus věcech.',
    teach: 'Nech popsat film a svůj pocit při jeho sledování.',
  },
  {
    id: 'prepositions',
    section: 'Přídavná jména a příslovce',
    title: 'Předložky času, místa a pohybu',
    level: 'A1–B1',
    term: 'Prepositions of time, place, movement',
    structure: 'at six / on Monday / in June; at/in/on; to/into/through',
    explain:
      'Předložky vyjadřují vztahy, ale netvoří přesnou kopii českých pádů. Stejná předložka může mít více významů a vazeb.',
    use: 'Kdy, kde a kam; běžné pevné vazby.',
    examples: [
      ['I’m at home. I go home at six.', 'Jsem doma. Jdu domů v šest; go home je bez to.'],
      ['She went into the room.', 'Vešla do místnosti; pohyb dovnitř.'],
    ],
    mistake:
      '„In Monday“ → „on Monday“. Výrazy next Monday a last week jsou běžně bez časové předložky.',
    teach: 'Nejdřív kalendář a mapa, potom několik nejčastějších ustálených spojení.',
  },
  {
    id: 'phrasal-verbs',
    section: 'Slovesné tvary',
    title: 'Frázová a předložková slovesa',
    level: 'A2–B2',
    term: 'Phrasal verbs · prepositional verbs',
    structure: 'turn on / turn it on; look after someone',
    explain:
      'Sloveso s částicí nebo předložkou může tvořit nový význam. U oddělitelných frázových sloves stojí zájmenný předmět mezi slovesem a částicí.',
    use: 'Běžná mluvená angličtina i přesnější významy.',
    examples: [
      ['Turn the light on. Turn it on.', 'Rozsviť světlo. Rozsviť ho.'],
      ['She looks after her brother.', 'Stará se o bratra.'],
    ],
    mistake: '„Turn on it“ → „turn it on“. Ale look after him se nerozděluje jako turn it on.',
    teach: 'Uč jeden význam v celé větě a hned ukaž polohu zájmena.',
  },
  {
    id: 'verb-patterns',
    section: 'Slovesné tvary',
    title: 'Slovesné vazby: -ing nebo infinitiv',
    level: 'A2–B2',
    term: 'Verb patterns · complementation',
    structure: 'enjoy doing / want to do / ask someone to do',
    explain:
      'Druhé sloveso dostává tvar podle prvního slovesa nebo celé vazby. U některých sloves se změnou tvaru změní význam.',
    use: 'Vyjádření přání, rozhodnutí, vzpomínky a následnosti.',
    examples: [
      [
        'I stopped smoking. / I stopped to smoke.',
        'Přestala jsem kouřit. / Zastavila jsem se, abych si zakouřila.',
      ],
      [
        'Remember to call. / I remember calling.',
        'Nezapomeň zavolat. / Pamatuji si, jak jsem volala.',
      ],
    ],
    mistake:
      'Neexistuje jedno pravidlo „po slovese vždy to“. Vazbu je třeba učit s daným významem.',
    teach:
      'Použij dva krátké příběhy se stop nebo remember a nech rozhodnout, co se skutečně stalo.',
  },
  {
    id: 'passive',
    section: 'Souvětí a pokročilé vazby',
    title: 'Trpný rod',
    level: 'B1–B2',
    term: 'Passive voice',
    structure: 'příslušný tvar be + V3',
    explain:
      'Přesouváme pozornost na zasaženou věc nebo osobu. Čas vyjadřuje be; hlavní sloveso má V3. Původce lze doplnit pomocí by.',
    use: 'Neznámý nebo nedůležitý původce, procesy a formální text.',
    examples: [
      ['The car was repaired yesterday.', 'Auto bylo včera opraveno.'],
      ['It has been repaired.', 'Už bylo opraveno. Been je V3 od pomocného be.'],
    ],
    mistake:
      '„The car repaired“ nemusí znamenat „auto bylo opraveno“. V trpném rodě nezapomeň na be.',
    teach: 'Převrať Mechanic repaired the car na The car was repaired. Co je teď hlavní téma?',
  },
  {
    id: 'causative',
    section: 'Souvětí a pokročilé vazby',
    title: 'Nechat si něco udělat',
    level: 'B2',
    term: 'Causative have/get',
    structure: 'have/get + předmět + V3',
    explain:
      'Vyjadřujeme, že službu nebo činnost provádí pro nás někdo jiný. Stejná stavba někdy popisuje i nepříjemnou událost, která se někomu stala.',
    use: 'Služby, opravy, kadeřník a události typu krádeže.',
    examples: [
      ['I had my hair cut.', 'Nechala jsem se ostříhat.'],
      ['She had her phone stolen.', 'Ukradli jí telefon.'],
    ],
    mistake:
      'I cut my hair znamená, že jsem si je stříhala sama; I had my hair cut vyjadřuje službu.',
    teach: 'Porovnej vlastní opravu a návštěvu servisu.',
  },
  {
    id: 'conditionals',
    section: 'Souvětí a pokročilé vazby',
    title: 'Podmínkové věty 0, 1, 2, 3',
    level: 'A2–B2',
    term: 'Zero / first / second / third conditional',
    structure: 'if present → present/will; if past → would; if had V3 → would have V3',
    explain:
      'Výukové typy rozlišují obecnou podmínku, reálnou budoucí možnost, hypotetickou přítomnost/budoucnost a hypotetickou minulost. Jde o užitečné vzory, ne všechny možné kombinace.',
    use: 'Pravidla, podmínky plánů, představy a neuskutečněná minulost.',
    examples: [
      ['If it rains, I’ll stay home.', 'Jestli bude pršet, zůstanu doma.'],
      ['If I had more time, I would travel.', 'Kdybych měla víc času, cestovala bych.'],
      ['If I had known, I would have called.', 'Kdybych to bývala věděla, zavolala bych.'],
    ],
    mistake:
      'V běžné první podmínce „if it will rain“ → „if it rains“. Will v if-větě ale může mít jiný význam, třeba ochotu.',
    teach: 'Začni jedním reálným plánem. Hypotetické typy přidávej až s jistými základními tvary.',
  },
  {
    id: 'mixed-conditions',
    section: 'Souvětí a pokročilé vazby',
    title: 'Smíšené podmínky, unless, provided',
    level: 'B2–C1',
    term: 'Mixed conditionals · conditional linkers',
    structure: 'If + past perfect → would + V1; unless = if not',
    explain:
      'Smíšená podmínka spojuje různé časové vztahy, například minulou příčinu se současným výsledkem. Unless vyjadřuje zápornou podmínku, provided/as long as stanovuje omezení.',
    use: 'Hypotetický dopad minulosti na přítomnost a přesnější podmínky.',
    examples: [
      [
        'If I had studied medicine, I would be a doctor now.',
        'Kdybych vystudovala medicínu, byla bych teď lékařka.',
      ],
      ['I’ll go unless it rains.', 'Půjdu, pokud nebude pršet.'],
    ],
    mistake:
      'Neurčuj typ jen podle naučeného čísla. Zjisti, ke kdy se vztahuje příčina a výsledek.',
    teach: 'Nakresli zvlášť minulou příčinu a současný výsledek; nech je spojit.',
  },
  {
    id: 'time-clauses',
    section: 'Souvětí a pokročilé vazby',
    title: 'Časové věty o budoucnosti',
    level: 'A2–B1',
    term: 'Future time clauses',
    structure: 'when/as soon as/before/until + present form',
    explain:
      'V běžné časové vedlejší větě se budoucnost vyjadřuje přítomným tvarem, nikoli automaticky will. Hlavní věta může will mít.',
    use: 'Plány a návaznost dějů.',
    examples: [
      ['I’ll call you when I get home.', 'Zavolám ti, až dorazím domů.'],
      ['Wait until she arrives.', 'Počkej, dokud nedorazí.'],
    ],
    mistake:
      '„When I will get home“ → v této časové větě „when I get home“. V nepřímé otázce je možné I don’t know when she will arrive.',
    teach: 'Ptej se, jestli when znamená „až“, nebo zda jde o otázku „kdy“.',
  },
  {
    id: 'reported',
    section: 'Souvětí a pokročilé vazby',
    title: 'Nepřímá řeč',
    level: 'B1–B2',
    term: 'Reported speech · backshift',
    structure: 'She said (that)…; She told me (that)…',
    explain:
      'Předáváme obsah cizí řeči. Po minulém uvozovacím slovese se často posunují časy a podle situace mění zájmena, místo a časové výrazy. Posun není vždy povinný.',
    use: 'Předání informace, zprávy a výpovědi.',
    examples: [
      ['“I’m tired.” → She said she was tired.', '„Jsem unavená.“ → Řekla, že je/byla unavená.'],
      ['She told me she lived here.', 'Řekla mi, že tu bydlí/bydlela.'],
    ],
    mistake:
      '„She said me“ → „She told me“ nebo „She said to me“. Změny here/there závisí na reálném kontextu.',
    teach: 'Zahraj vzkaz mezi třemi lidmi a ukaž, z čího pohledu teď mluvíme.',
  },
  {
    id: 'indirect-questions',
    section: 'Souvětí a pokročilé vazby',
    title: 'Nepřímé otázky a žádosti',
    level: 'B1',
    term: 'Indirect / reported questions · requests',
    structure: 'Do you know where she lives?; asked me to…',
    explain:
      'Ve vložené otázce používáme oznamovací slovosled. U ano/ne otázky může být if/whether. Nepřímý pokyn nebo prosba může mít to-infinitiv.',
    use: 'Zdvořilé dotazy a předání otázky či požadavku.',
    examples: [
      ['Can you tell me where the station is?', 'Můžete mi říct, kde je nádraží?'],
      ['She asked me not to leave.', 'Požádala mě, abych neodcházela.'],
    ],
    mistake: '„Do you know where does she live?“ → „Do you know where she lives?“',
    teach:
      'Napiš přímou otázku Where does she live? a vlož ji za Do you know…; vrať pořadí podmět–sloveso.',
  },
  {
    id: 'relative',
    section: 'Souvětí a pokročilé vazby',
    title: 'Vztažné věty: who, which, that, whose',
    level: 'A2–B2',
    term: 'Defining / non-defining relative clauses',
    structure: 'the woman who lives here; Anna, who lives here,…',
    explain:
      'Určující věta identifikuje osobu/věc. Neurčující přidává doplňující informaci a odděluje se čárkami. That patří do určujících, ne do neurčujících vět.',
    use: 'Spojení informací a popis osoby nebo věci.',
    examples: [
      ['The book that I bought is good.', 'Kniha, kterou jsem koupila, je dobrá.'],
      ['Anna, who lives next door, is a teacher.', 'Anna, která bydlí vedle, je učitelka.'],
    ],
    mistake:
      'Předmětové vztažné zájmeno v určující větě lze často vypustit; podmětové ne: the woman who lives here.',
    teach: 'Porovnej skupinu žen, kde jednu teprve určuješ, a Annu, kterou už posluchač zná.',
  },
  {
    id: 'linkers',
    section: 'Souvětí a pokročilé vazby',
    title: 'Spojování vět: důvod, kontrast, účel',
    level: 'A2–B2',
    term: 'Conjunctions · linking expressions',
    structure: 'because + věta; because of + jméno; although + věta; to + V1',
    explain:
      'Spojovací prostředky vyjadřují vztah mezi myšlenkami. Různé výrazy vyžadují různé pokračování: celou větu, jméno, nebo infinitiv.',
    use: 'Důvod, výsledek, kontrast, účel a připuštění.',
    examples: [
      ['Although it rained, we went out.', 'Přestože pršelo, šli jsme ven.'],
      ['I stayed home because of the rain.', 'Zůstala jsem doma kvůli dešti.'],
    ],
    mistake:
      '„Despite it rained“ → „Despite the rain“ nebo „Although it rained“. Although a but ve stejném spojení běžně nedvoj.',
    teach: 'Nech nejprve určit vztah myšlenek, až potom vybrat spojovací výraz.',
  },
  {
    id: 'wish',
    section: 'Souvětí a pokročilé vazby',
    title: 'Wish a if only',
    level: 'B1–B2',
    term: 'Unreal wishes · regrets',
    structure: 'wish + past; wish + had V3; wish + would',
    explain:
      'Přítomné nereálné přání se často vyjadřuje minulým tvarem, lítost nad minulostí předminulým. Wish + would často vyjadřuje žádoucí změnu chování nebo situace.',
    use: 'Přání odporující skutečnosti a lítost.',
    examples: [
      ['I wish I had more time.', 'Kéž bych měla víc času.'],
      ['I wish I had called her.', 'Kéž bych jí bývala zavolala.'],
    ],
    mistake:
      '„I wish I have…“ pro nereálné přání → „I wish I had…“. Pro reálnou naději bývá vhodné hope.',
    teach: 'Nech doplnit skutečnost: I don’t have time. Potom proti ní postav nereálné přání.',
  },
  {
    id: 'tags',
    section: 'Souvětí a pokročilé vazby',
    title: 'Tázací dovětky a echo otázky',
    level: 'A2–B2',
    term: 'Question tags · echo questions',
    structure: 'She is here, isn’t she?; You did what?',
    explain:
      'Běžný potvrzovací dovětek má opačnou polaritu a opakuje odpovídající pomocné sloveso. Intonace může změnit význam od očekávání souhlasu k opravdové otázce.',
    use: 'Potvrzení, kontakt v rozhovoru a překvapení.',
    examples: [
      ['You don’t smoke, do you?', 'Nekouříš, že ne?'],
      ['I’m late, aren’t I?', 'Jdu pozdě, že? Běžný zvláštní tvar u I am.'],
    ],
    mistake:
      '„She works, isn’t she?“ → „She works, doesn’t she?“ Pomocné sloveso vybírej podle věty.',
    teach: 'Nejdřív určete pomocné sloveso, potom polaritu a nakonec natrénujte dvě intonace.',
  },
  {
    id: 'ellipsis',
    section: 'Souvětí a pokročilé vazby',
    title: 'Vynechávání a so/neither',
    level: 'B1–B2',
    term: 'Ellipsis · substitution',
    structure: 'So do I. Neither can I. I hope so.',
    explain:
      'Známé části věty často neopakujeme. Volíme pomocné sloveso podle předchozí věty; kladná a záporná reakce mají různé konstrukce.',
    use: 'Přirozené krátké reakce a návaznost dialogu.',
    examples: [
      ['I like tea. — So do I.', 'Mám ráda čaj. — Já taky.'],
      ['I can’t swim. — Neither can I.', 'Neumím plavat. — Já taky ne.'],
    ],
    mistake: '„So am I“ nereaguje na I like tea. Vyber do podle like v přítomném prostém.',
    teach: 'Navaž na skutečné společné zájmy a střídej věty s be, can a běžným slovesem.',
  },
  {
    id: 'inversion',
    section: 'Souvětí a pokročilé vazby',
    title: 'Inverze po omezujících výrazech',
    level: 'B2–C1',
    term: 'Negative / restrictive inversion',
    structure: 'Never have I seen…; Only then did I…',
    explain:
      'Po některých omezujících nebo záporných výrazech na začátku věty se ve formálním či důrazném stylu mění pořadí pomocného slovesa a podmětu.',
    use: 'Důraz, formální psaní a rétorika.',
    examples: [
      ['Never have I seen such a thing.', 'Nikdy jsem nic takového neviděla.'],
      ['Only then did I understand.', 'Teprve tehdy jsem pochopila.'],
    ],
    mistake:
      '„Never I have seen“ → „Never have I seen“. Inverze se netýká každého příslovce na začátku.',
    teach:
      'Porovnej neutrální I have never seen… a důraznou variantu. Pro začátečníky jen rozpoznání.',
  },
  {
    id: 'cleft',
    section: 'Souvětí a pokročilé vazby',
    title: 'Zdůrazňovací věty',
    level: 'B2–C1',
    term: 'Cleft / pseudo-cleft sentences',
    structure: 'It was Anna who called. What I need is…',
    explain:
      'Větu rozdělíme tak, aby jedna informace vynikla. It-cleft i what-cleft mění informační strukturu, nikoli samotnou základní událost.',
    use: 'Oprava předpokladu a zdůraznění klíčové informace.',
    examples: [
      ['It was Anna who called, not Tom.', 'Volala Anna, ne Tom.'],
      ['What I need is a break.', 'To, co potřebuji, je přestávka.'],
    ],
    mistake: 'Nezaměňuj zdůrazňovací it s běžným it pro počasí. Jde o jiný typ konstrukce.',
    teach: 'Začni chybným předpokladem „Volal Tom“ a nech ho opravit s důrazem na Annu.',
  },
  {
    id: 'participle-clauses',
    section: 'Souvětí a pokročilé vazby',
    title: 'Zkrácené věty s příčestím',
    level: 'B2–C1',
    term: 'Participle clauses · reduced clauses',
    structure: 'Having finished…, she…; The man standing there…',
    explain:
      'Příčestí může zkrátit vedlejší větu. Úvodní příčestní konstrukce se běžně vztahuje k podmětu hlavní věty; having + V3 vyjadřuje dřívější děj.',
    use: 'Úspornější formální text a zkrácené popisy.',
    examples: [
      ['Having finished her work, she left.', 'Když dokončila práci, odešla.'],
      ['The man standing there is my brother.', 'Muž, který tam stojí, je můj bratr.'],
    ],
    mistake:
      'Pozor na visící příčestí: Walking home, the rain started mylně přiřazuje chůzi dešti.',
    teach: 'Rozbal zkrácenou konstrukci do plné věty a ověř, kdo koná oba děje.',
  },
  {
    id: 'subjunctive',
    section: 'Souvětí a pokročilé vazby',
    title: 'Subjunktiv a nereálné were',
    level: 'B2–C1',
    term: 'Mandative subjunctive · irrealis were',
    structure: 'They suggested that she be…; If I were…',
    explain:
      'V některých požadavkových that-větách stojí základní tvar slovesa bez ohledu na osobu. Were může vyjadřovat nereálnost i s I/he/she. Ve variantách angličtiny se liší frekvence a alternativy.',
    use: 'Formální návrhy a požadavky, nereálná podmínka.',
    examples: [
      ['They insisted that he be present.', 'Trvali na tom, aby byl přítomen.'],
      ['If I were you, I’d wait.', 'Na tvém místě bych počkala.'],
    ],
    mistake:
      'Ve formálním mandative subjunctive nepiš he is místo he be. V britské angličtině je častá i vazba se should.',
    teach: 'Vysvětli rozdíl mezi tvrzením he is here a požadavkem that he be here.',
  },
  {
    id: 'focus-register',
    section: 'Souvětí a pokročilé vazby',
    title: 'Důraz, formálnost a mluvené zkratky',
    level: 'B1–C1',
    term: 'Emphatic do · register · contractions',
    structure: 'I do understand; I’d = I would / I had',
    explain:
      'Gramatická volba nese i styl. Důrazné do potvrzuje nebo opravuje; stažené tvary jsou běžné v řeči. I’d se vyloží podle následující konstrukce.',
    use: 'Přirozená řeč, důraz a rozlišení neutrálního/formálního stylu.',
    examples: [
      ['I do understand, but I disagree.', 'Opravdu rozumím, ale nesouhlasím.'],
      ['I’d go. / I’d gone.', 'Šla bych. / Byla jsem odešla; would + V1 versus had + V3.'],
    ],
    mistake:
      'Zkratku ’d nelze vždy přeložit jako would. Rozhoduje základní nebo příčestní tvar a kontext.',
    teach: 'Nech studentku rozvinout zkratky ve dvou větách a pak je přečíst přirozeně nahlas.',
  },
];

// Sloupce: základní tvar, český význam, přítomný tvar, V2, V3, -ing.
const verbForms = [
  ['be', 'být', 'am/is/are', 'was/were', 'been', 'being'],
  ['have', 'mít', 'has', 'had', 'had', 'having'],
  ['do', 'dělat', 'does', 'did', 'done', 'doing'],
  ['go', 'jít, jet', 'goes', 'went', 'gone', 'going'],
  ['come', 'přijít', 'comes', 'came', 'come', 'coming'],
  ['get', 'dostat, získat', 'gets', 'got', 'got / gotten (AmE)', 'getting'],
  ['make', 'udělat, vytvořit', 'makes', 'made', 'made', 'making'],
  ['take', 'vzít', 'takes', 'took', 'taken', 'taking'],
  ['give', 'dát', 'gives', 'gave', 'given', 'giving'],
  ['see', 'vidět', 'sees', 'saw', 'seen', 'seeing'],
  ['know', 'vědět, znát', 'knows', 'knew', 'known', 'knowing'],
  ['think', 'myslet', 'thinks', 'thought', 'thought', 'thinking'],
  ['say', 'říct', 'says', 'said', 'said', 'saying'],
  ['tell', 'říct někomu', 'tells', 'told', 'told', 'telling'],
  ['speak', 'mluvit', 'speaks', 'spoke', 'spoken', 'speaking'],
  ['write', 'psát', 'writes', 'wrote', 'written', 'writing'],
  ['read', 'číst', 'reads', 'read /red/', 'read /red/', 'reading'],
  ['eat', 'jíst', 'eats', 'ate', 'eaten', 'eating'],
  ['drink', 'pít', 'drinks', 'drank', 'drunk', 'drinking'],
  ['buy', 'koupit', 'buys', 'bought', 'bought', 'buying'],
  ['bring', 'přinést', 'brings', 'brought', 'brought', 'bringing'],
  ['leave', 'odejít, nechat', 'leaves', 'left', 'left', 'leaving'],
  ['find', 'najít', 'finds', 'found', 'found', 'finding'],
  ['feel', 'cítit', 'feels', 'felt', 'felt', 'feeling'],
  ['meet', 'potkat', 'meets', 'met', 'met', 'meeting'],
  ['put', 'položit', 'puts', 'put', 'put', 'putting'],
  ['run', 'běžet', 'runs', 'ran', 'run', 'running'],
  ['swim', 'plavat', 'swims', 'swam', 'swum', 'swimming'],
  ['drive', 'řídit', 'drives', 'drove', 'driven', 'driving'],
  ['sleep', 'spát', 'sleeps', 'slept', 'slept', 'sleeping'],
  ['break', 'rozbít', 'breaks', 'broke', 'broken', 'breaking'],
  ['choose', 'vybrat', 'chooses', 'chose', 'chosen', 'choosing'],
  ['forget', 'zapomenout', 'forgets', 'forgot', 'forgotten', 'forgetting'],
  ['begin', 'začít', 'begins', 'began', 'begun', 'beginning'],
  ['become', 'stát se', 'becomes', 'became', 'become', 'becoming'],
  ['work', 'pracovat', 'works', 'worked', 'worked', 'working'],
  ['live', 'bydlet, žít', 'lives', 'lived', 'lived', 'living'],
  ['like', 'mít rád', 'likes', 'liked', 'liked', 'liking'],
  ['want', 'chtít', 'wants', 'wanted', 'wanted', 'wanting'],
  ['study', 'studovat', 'studies', 'studied', 'studied', 'studying'],
  ['play', 'hrát', 'plays', 'played', 'played', 'playing'],
  ['try', 'zkusit', 'tries', 'tried', 'tried', 'trying'],
  ['stop', 'zastavit', 'stops', 'stopped', 'stopped', 'stopping'],
  [
    'travel',
    'cestovat',
    'travels',
    'travelled / traveled',
    'travelled / traveled',
    'travelling / traveling',
  ],
  ['help', 'pomoci', 'helps', 'helped', 'helped', 'helping'],
];

// Sloupce: tvar, název, vysvětlení, použití, příklad, překlad, tip pro výuku.
const beDetails = [
  [
    'be',
    'Základní tvar · base form / bare infinitive',
    'Není to sám o sobě přítomný čas. Objevuje se po modálních slovesech, po infinitivním to a v rozkazu.',
    'can be · will be · want to be · Be careful.',
    'I can be there at six.',
    'Můžu tam být v šest.',
    '„Be je základní podoba být. Po can už neměníme tvar podle osoby.“',
  ],
  [
    'to be',
    'Infinitiv s to · to-infinitive',
    'To je infinitivní částice před základním tvarem. Tato vazba sama neoznačuje konkrétní čas.',
    'want to be · hope to be · to be honest',
    'I want to be a teacher.',
    'Chci být učitelka.',
    '„Po want řekneme to be. Po can jen be: I want to be × I can be.“',
  ],
  [
    'am / is / are',
    'Přítomné určité tvary · present forms',
    'Am pro I, is pro he/she/it a jednotné jméno, are pro you/we/they a množná jména. Nesou osobu a čas.',
    'I am · she is · you/we/they are',
    'She is at home.',
    'Je doma.',
    '„V přítomné větě vybíráme podobu být podle toho, o kom mluvíme.“',
  ],
  [
    'was / were',
    'Minulý tvar · past simple, V2',
    'Was obvykle pro I/he/she/it, were pro you/we/they. Zvlášť existuje nereálné were: If I were you.',
    'I/she was · you/we/they were',
    'I was tired yesterday.',
    'Včera jsem byla unavená.',
    '„Mluvíme o včerejšku. Pro I použijeme was; been sem samotné nepatří.“',
  ],
  [
    'been',
    'Příčestí minulé · past participle, V3',
    'Nejde o samostatný minulý čas. Po have/has/had tvoří perfect; po have může následovat další -ing tvar nebo V3.',
    'have/has/had been · have been working · has been repaired',
    'I have been ill.',
    'Byla jsem nemocná; nemoc souvisí s aktuálním kontextem.',
    '„Been je třetí tvar od be. Potřebuje před sebou have, has nebo had. I was ill je prostá minulost; I have been ill propojuje minulost s teď.“',
  ],
  [
    'being',
    '-ing tvar · present participle / gerund podle funkce',
    'V průběhové konstrukci znamená průběh, v průběhovém pasivu se pojí s V3; jindy označuje činnost nebo stav jako celek.',
    'is being repaired · is being rude · Being kind…',
    'The car is being repaired.',
    'Auto se právě opravuje.',
    '„Being není totéž co been. Podívej se, zda věta popisuje průběh nebo mluví o činnosti jako o věci.“',
  ],
];
