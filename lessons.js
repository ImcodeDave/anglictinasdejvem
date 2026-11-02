const lessons = [
  {
    id: 'hello',
    title: 'První věty o sobě',
    description: 'Jméno, odkud jsem a co dělám. První rozhovor bez stresu.',
    icon: '☀',
    tint: '#f7ecd6',
    tone: '#a78943',
    category: 'start',
    grammar: 'am / is / are',
    goal: 'Studentka se představí ve 4 větách a zeptá se druhého na jméno, původ a práci.',
    pattern: ['I', 'am', 'a student.'],
    rule: 'Kdo + tvar slovesa be + informace. V otázce se be přesune před osobu: You are → Are you…? U jména použij My name is… nebo I’m…',
    phrases: [
      ['I’m Anna.', 'Jsem Anna.'],
      ['I’m from Prague.', 'Jsem z Prahy.'],
      ['I’m a student.', 'Jsem studentka.'],
      ['What’s your name?', 'Jak se jmenuješ?'],
      ['Where are you from?', 'Odkud jsi?'],
      ['Are you a student?', 'Jsi studentka?'],
    ],
    warning:
      '„I Anna“ → „I’m Anna.“ Anglická věta tu potřebuje sloveso. U povolání v jednotném čísle připomeň a/an: I’m a teacher.',
    steps: [
      [
        'Naladění a bezpečný start',
        'Pozdrav anglicky, představ se a ukaž význam gestem. Zjisti česky, kdy chce studentka angličtinu používat. Nezkoušej ji ze seznamu slov.',
      ],
      [
        'Krátký vzorový rozhovor',
        'Zahraj obě role: Hi, I’m Alex. What’s your name? / I’m Anna. / Where are you from? / I’m from Prague. Nejprve ať jen poslouchá, potom doplní vlastní údaje.',
      ],
      [
        'Postavte první věty',
        'Napiš I + am + Anna / from Prague / a student. Vyměňujte poslední část. Přidej You are… a otázku Are you…? Vysvětli jen to, co teď potřebujete.',
      ],
      [
        'Rozhovor s novou identitou',
        'Každý si vymyslí jméno, město a práci. Ptejte se jeden druhého. Pak odložte tahák a zkuste rozhovor se skutečnými údaji.',
      ],
      [
        'Samostatný výstup a úkol',
        'Bez předlohy se představí a položí dvě otázky. Zapiš jednu věc, která už jde, a jednu k opakování. Domluvte krátkou domácí nahrávku.',
      ],
    ],
    prompts: [
      'What’s your name?',
      'Where are you from?',
      'Are you a student?',
      'Are you from Prague?',
    ],
    role: 'Potkáváte se poprvé na jazykovém kurzu. Zjistěte jméno, město a zaměstnání druhého. Potom ho jednou větou představte: This is…',
    transfer: 'Změňte jméno, město a povolání. Při druhém kole schovejte napsané otázky.',
    homework:
      'Nahraj 30 sekund: pozdrav, řekni své jméno, odkud jsi a co děláš. Pak polož dvě otázky novému spolužákovi.',
    exercises: [
      ['Jsem z Prahy.', ['I', 'am', 'from', 'Prague']],
      ['Jsi studentka?', ['Are', 'you', 'a', 'student']],
      ['Jmenuje se Anna.', ['Her', 'name', 'is', 'Anna']],
      ['Odkud jsi?', ['Where', 'are', 'you', 'from']],
    ],
  },
  {
    id: 'help',
    title: 'Když nerozumím',
    description: 'Fráze, díky kterým se neztratí ani na první hodině.',
    icon: '↻',
    tint: '#e8edf8',
    tone: '#7185ac',
    category: 'start',
    grammar: 'užitečné fráze',
    goal: 'Studentka si anglicky řekne o zopakování, pomalejší řeč a vysvětlení slova.',
    pattern: ['Can', 'you', 'repeat that?'],
    rule: 'Tyto věty se nejprve učí jako celé užitečné fráze. U Can you…? nech can před you; nepřidávej do. Rozbor všech slov může počkat.',
    phrases: [
      ['I don’t understand.', 'Nerozumím.'],
      ['Can you repeat that, please?', 'Můžeš to prosím zopakovat?'],
      ['Can you speak more slowly, please?', 'Můžeš prosím mluvit pomaleji?'],
      ['What does “ticket” mean?', 'Co znamená „ticket“?'],
      ['How do you say “vlak” in English?', 'Jak se anglicky řekne „vlak“?'],
      ['I don’t know.', 'Nevím.'],
    ],
    warning:
      'Pouhé přikývnutí nemusí znamenat porozumění. Vytvoř situaci, kdy je správným řešením říct si o pomoc, a oceň použitou frázi.',
    steps: [
      [
        'Navázání na minule',
        'Zopakujte krátké představení. Pak polož jednu otázku příliš rychle a ukaž, že nerozumět je normální.',
      ],
      [
        'Ukaž fráze v situaci',
        'Předveď I don’t understand a Can you repeat that? Zopakuj otázku pomalu. Studentka přiřadí fráze ke třem situacím: neslyšela, nerozumí slovu, potřebuje zpomalit.',
      ],
      [
        'Nácvik po krátkých úsecích',
        'Opakujte nejprve repeat that, pak Can you repeat that, please? Vyměňujte konkrétní neznámá slova ve What does … mean?',
      ],
      [
        'Hra na dorozumění',
        'Diktuj jednoduché jméno, město nebo čas. Občas mluv rychleji nebo použij neznámé slovo. Studentka má získat informaci pomocí záchranných frází. Vystřídejte role.',
      ],
      [
        'Výstup a přenos do dalších hodin',
        'Bez předlohy zvolí vhodnou frázi pro dvě situace. Domluvte se, že odteď si na hodině zkusí o pomoc nejprve říct anglicky.',
      ],
    ],
    prompts: [
      'Can you repeat that, please?',
      'What does “ticket” mean?',
      'How do you say “vlak” in English?',
      'Can you speak more slowly, please?',
    ],
    role: 'Jeden vysvětluje cestu, druhý nerozumí místu nebo času. Cílem je získat správnou informaci, klidně po několika zopakováních.',
    transfer: 'Při dalších hodinách nech fráze viditelně na stole. Postupně tahák odložte.',
    homework:
      'Vyber tři záchranné fráze a nahraj je. Na příští hodině alespoň jednu sama použij, když budeš potřebovat pomoc.',
    exercises: [
      ['Nerozumím.', ['I', 'do', 'not', 'understand']],
      ['Můžeš to prosím zopakovat?', ['Can', 'you', 'repeat', 'that', 'please']],
      ['Co znamená „ticket“?', ['What', 'does', 'ticket', 'mean']],
      ['Nevím.', ['I', 'do', 'not', 'know']],
    ],
  },
  {
    id: 'likes',
    title: 'Co mám ráda',
    description: 'Hudba, káva, volný čas. Věty, o kterých je co říct.',
    icon: '♡',
    tint: '#fbe6df',
    tone: '#ba806b',
    category: 'daily',
    grammar: 'like / don’t / do',
    goal: 'Studentka řekne tři věci, které má a nemá ráda, a zjistí, co má společného s druhým.',
    pattern: ['I', 'like', 'music.'],
    rule: 'Kladná věta: I/you + like + věc. Zápor: I/you + don’t + like. Otázka: Do + you + like…? Začni s I/you, he/she přidej, až je tento vzor jistý.',
    phrases: [
      ['I like music.', 'Mám ráda hudbu.'],
      ['I don’t like coffee.', 'Nemám ráda kávu.'],
      ['Do you like films?', 'Máš ráda filmy?'],
      ['Yes, I do. / No, I don’t.', 'Ano. / Ne.'],
      ['What do you like?', 'Co máš ráda?'],
      ['I want a coffee, please.', 'Chci kávu, prosím.'],
    ],
    warning:
      '„Are you like coffee?“ → „Do you like coffee?“ Porovnej I am tired × I like coffee. Nech studentku hledat sloveso, podle kterého otázku tvoří.',
    steps: [
      [
        'Osobní rozjezd',
        'Ukaž pár obrázků věcí blízkých studentce: hudba, pes, film, káva. Vyberte společně jen 5–8 výrazů, které opravdu využije.',
      ],
      [
        'Poslech malého rozhovoru',
        'Zahraj: I like music. Do you like music? / Yes, I do. / Do you like coffee? / No, I don’t. Studentka nejprve označí, co má mluvčí rád.',
      ],
      [
        'Tři varianty jedné věty',
        'Vedle sebe napiš I like coffee / I don’t like coffee / Do you like coffee? Měňte jen poslední výraz. Odděl krátce I want… jako další užitečnou větu.',
      ],
      [
        'Najděte tři společné věci',
        'Ptejte se bez čtení celých vět. Cílem je zjistit tři společné zájmy. Potom použijte nová slova podle skutečných odpovědí studentky.',
      ],
      [
        'Kontrola bez nabídky slov',
        'Studentka řekne dvě kladné věty, jeden zápor a položí dvě otázky. Domácí úkol má navázat na její vlastní zájmy.',
      ],
    ],
    prompts: [
      'Do you like music?',
      'Do you like coffee?',
      'What do you like?',
      'Do you like football?',
    ],
    role: 'Vybíráte společný večerní program. Zjistěte, jestli máte rádi filmy, hudbu nebo sport. Domluvte se na jedné možnosti.',
    transfer:
      'Nahraďte obecná témata konkrétními kapelami, jídly nebo aktivitami, které studentka zná.',
    homework:
      'Napiš tři pravdivé věty s I like a dvě s I don’t like. Připrav tři otázky pro lektora. Příště je polož bez čtení.',
    exercises: [
      ['Mám ráda hudbu.', ['I', 'like', 'music']],
      ['Nemám ráda kávu.', ['I', 'do', 'not', 'like', 'coffee']],
      ['Máš ráda filmy?', ['Do', 'you', 'like', 'films']],
      ['Chci kávu, prosím.', ['I', 'want', 'a', 'coffee', 'please']],
    ],
  },
  {
    id: 'routine',
    title: 'Můj běžný den',
    description: 'Práce, bydlení a každodenní život ve vlastních větách.',
    icon: '◷',
    tint: '#e4efdf',
    tone: '#73935f',
    category: 'daily',
    grammar: 'přítomný prostý',
    goal: 'Studentka popíše běžný den v pěti větách a zeptá se na práci, bydliště a čas vstávání.',
    pattern: ['I', 'work', 'in Prague.'],
    rule: 'I/you + sloveso + další informace. Zápor tvoř pomocí don’t; otázku pomocí Do you…? nebo Where/When + do you…? Při jistém I/you přidej She works / Does she work?',
    phrases: [
      ['I live in Prague.', 'Bydlím v Praze.'],
      ['I work in a shop.', 'Pracuji v obchodě.'],
      ['I get up at seven.', 'Vstávám v sedm.'],
      ['I don’t work on Sundays.', 'V neděli nepracuji.'],
      ['Where do you work?', 'Kde pracuješ?'],
      ['What time do you get up?', 'V kolik vstáváš?'],
    ],
    warning:
      '„Where you work?“ → „Where do you work?“ U he/she pak hlídej Does she work?, bez -s na work. Tyto dvě obtížnosti nepřidávej najednou, pokud I/you ještě není jisté.',
    steps: [
      [
        'Vraťte známé věty',
        'Začni třemi otázkami z minulých hodin. Přidej jednu o dnešním dni a zjisti, která slovesa bude studentka potřebovat.',
      ],
      [
        'Den jednoho člověka',
        'Řekni pomalu pět vět o svém dni. Studentka seřadí činnosti: get up, work, have lunch, go home, go to bed. Vysvětli čas jen v rozsahu, který využijete.',
      ],
      [
        'Od vzoru k vlastní větě',
        'Procvičte I live…, I work…, I get up at… a odpovídající otázky. Přidej zápor u jedné skutečné informace.',
      ],
      [
        'Rozhovor o pracovním a volném dni',
        'Studentka popíše svůj den, ty se doptáváš. Pak si role vyměňte. Hledejte dva rozdíly mezi vašimi režimy.',
      ],
      [
        'Pět vět zpaměti',
        'Ať popíše den bez předlohy a položí dvě otázky. Pokud je to snadné, zkusí představit den někoho dalšího s he/she.',
      ],
    ],
    prompts: [
      'Where do you live?',
      'Where do you work?',
      'What time do you get up?',
      'Do you work on Sundays?',
    ],
    role: 'Poznáváte novou kolegyni. Zjistěte, kde bydlí, kdy vstává a kdy pracuje. Najděte jednu věc, kterou máte stejně.',
    transfer:
      'Změňte pracovní den na sobotu. Při dalším kole přidejte usually nebo sometimes až do známých vět.',
    homework:
      'Připrav pět vět o běžném dni a dvě otázky pro lektora. Nahraj je bez čtení, klidně podle obrázků nebo hesel.',
    exercises: [
      ['Bydlím v Praze.', ['I', 'live', 'in', 'Prague']],
      ['Kde pracuješ?', ['Where', 'do', 'you', 'work']],
      ['Vstávám v sedm.', ['I', 'get', 'up', 'at', 'seven']],
      ['V neděli nepracuji.', ['I', 'do', 'not', 'work', 'on', 'Sundays']],
    ],
  },
  {
    id: 'can',
    title: 'Co mám a co umím',
    description: 'Rodina, věci a schopnosti. Zjistěte něco nového.',
    icon: '✦',
    tint: '#ede8f6',
    tone: '#9280ad',
    category: 'daily',
    grammar: 'have / can',
    goal: 'Studentka řekne, co má a co umí, a položí otázky s Do you have…? a Can you…?',
    pattern: ['I', 'can', 'swim.'],
    rule: 'S have použij známé do/don’t: Do you have…? S can tvoř otázku přímo: Can you swim? Za can je základní tvar slovesa bez to. Oba vzory můžeš rozdělit do dvou hodin.',
    phrases: [
      ['I have a dog.', 'Mám psa.'],
      ['Do you have a car?', 'Máš auto?'],
      ['I don’t have a car.', 'Nemám auto.'],
      ['I can swim.', 'Umím plavat.'],
      ['I can’t drive.', 'Neumím řídit.'],
      ['Can you help me?', 'Můžeš mi pomoct?'],
    ],
    warning:
      '„Do you can…?“ → „Can you…?“ a „I can to swim“ → „I can swim“. Drž se jednoho způsobu pro have; have got přidej později podle potřeby.',
    steps: [
      [
        'Známe se trochu lépe',
        'Navazuj na otázky o běžném dni. Ukaž jednoduché věty I have… s věcmi nebo lidmi ze života studentky.',
      ],
      [
        'Dva malé rozhovory',
        'Předveď Do you have a car? / No, I don’t. a Can you drive? / Yes, I can. Ukaž, že mít auto a umět řídit jsou dvě různé informace.',
      ],
      [
        'Dva přehledné vzory',
        'Postav vedle sebe Do you have…? a Can you…? Studentka třídí příklady. Pokud je to moc nového, zůstaň dnes jen u jednoho vzoru.',
      ],
      [
        'Minirozhovor před cestou',
        'Plánujete výlet: kdo má auto, kdo umí řídit, kdo má čas? Použijte jen známou slovní zásobu a skutečné odpovědi.',
      ],
      [
        'Samostatná otázka',
        'Řekne dvě schopnosti, jednu věc, kterou nemá, a položí otázku od každého vzoru. Nech ji opravit vlastní chybu pomocí taháku.',
      ],
    ],
    prompts: ['Do you have a car?', 'Do you have a dog?', 'Can you swim?', 'Can you drive?'],
    role: 'Chystáte společný výlet. Zjistěte, kdo má auto, kdo může řídit a kdo umí plavat. Rozdělte si jednoduché úkoly.',
    transfer:
      'Přidejte schopnosti související s její prací nebo koníčky. Každé nové sloveso hned použijte ve větě.',
    homework:
      'Napiš dvě věty s I have, dvě s I can a dvě s I can’t. Připrav otázku s have a otázku s can.',
    exercises: [
      ['Mám psa.', ['I', 'have', 'a', 'dog']],
      ['Máš auto?', ['Do', 'you', 'have', 'a', 'car']],
      ['Umíš plavat?', ['Can', 'you', 'swim']],
      ['Neumím řídit.', ['I', 'cannot', 'drive']],
    ],
  },
  {
    id: 'cafe',
    title: 'Domluvím se venku',
    description: 'Objednávka v kavárně, cena a jednoduchá prosba.',
    icon: '♧',
    tint: '#f6eadc',
    tone: '#ac845d',
    category: 'situations',
    grammar: 'Can I have…?',
    goal: 'Studentka si objedná pití, zeptá se na cenu a reaguje na jednoduchou doplňující otázku.',
    pattern: ['Can', 'I have', 'a coffee, please?'],
    rule: 'Can I have…? procvič jako celý zdvořilý vzor. U jedné kávy potřebuje a; u dvou two coffees. Pro cenu se nauč celou otázku How much is it?',
    phrases: [
      ['Can I have a coffee, please?', 'Můžu dostat kávu, prosím?'],
      ['Tea or coffee?', 'Čaj, nebo kávu?'],
      ['With milk, please.', 'S mlékem, prosím.'],
      ['Anything else?', 'Ještě něco?'],
      ['That’s all, thank you.', 'To je vše, děkuji.'],
      ['How much is it?', 'Kolik to stojí?'],
    ],
    warning:
      'Není potřeba probrat celý jídelní lístek. Začni tím, co si opravdu objednává. „I want…“ je srozumitelné, ale tady nacvič zdvořilou objednávku Can I have…?',
    steps: [
      [
        'Vlastní zkušenost',
        'Zeptej se, co si studentka skutečně objednává. Společně vytvořte malé menu se 4–6 položkami a jednoduchými cenami.',
      ],
      [
        'Poslech objednávky',
        'Zahraj zákazníka i obsluhu. Studentka si zapíše objednanou věc a cenu. Předveď i Anything else? a That’s all, thank you.',
      ],
      [
        'Jedna prosba, více možností',
        'Měňte položky ve Can I have…, please? Procvičte vyslovení cen a otázku How much is it? Nezahlcuj ji dalšími zdvořilými konstrukcemi.',
      ],
      [
        'Kavárna na stole',
        'Vystřídejte si role obsluhy a zákazníka. Přidej volbu tea or coffee, with milk a jednu chvíli, kdy si musí říct o zopakování.',
      ],
      [
        'Objednávka bez taháku',
        'Nové menu, stejný vzor. Studentka objedná, odpoví na doplňující otázku, zeptá se na cenu a poděkuje.',
      ],
    ],
    prompts: ['Tea or coffee?', 'With milk?', 'Anything else?', 'How much is it?'],
    role: 'Jsi v kavárně. Objednej si něco, co máš opravdu ráda. Obsluha se doptá na mléko a další objednávku. Na konci zjisti cenu.',
    transfer:
      'Změň menu a ceny. Ve druhém kole mluv o trochu rychleji, aby mohla využít záchrannou frázi.',
    homework:
      'Napiš krátký dialog zákazníka a obsluhy, maximálně osm replik. Potom nahraj zákazníkovy věty podle vlastního miniaturního menu.',
    exercises: [
      ['Můžu dostat kávu, prosím?', ['Can', 'I', 'have', 'a', 'coffee', 'please']],
      ['Kolik to stojí?', ['How', 'much', 'is', 'it']],
      ['To je vše, děkuji.', ['That', 'is', 'all', 'thank', 'you']],
      ['S mlékem, prosím.', ['With', 'milk', 'please']],
    ],
  },
  {
    id: 'now',
    title: 'Co se děje právě teď',
    description: 'Rozlišit běžný den a to, co dělám v tuhle chvíli.',
    icon: '◎',
    tint: '#e0eef0',
    tone: '#6c979c',
    category: 'daily',
    grammar: 'am / is / are + -ing',
    goal: 'Studentka popíše právě probíhající činnost a odliší ji od jednoduchého popisu rutiny.',
    pattern: ['I', 'am', 'working.'],
    rule: 'Kdo + am/is/are + sloveso s -ing. Otázka: Are you working? Zápor: I’m not working. Porovnej I work every day × I’m working now až po zvládnutí jednotlivých vzorů.',
    phrases: [
      ['I’m working now.', 'Právě pracuji.'],
      ['She’s drinking coffee.', 'Ona pije kávu.'],
      ['What are you doing?', 'Co právě děláš?'],
      ['Are you studying?', 'Učíš se právě?'],
      ['I’m not working.', 'Právě nepracuji.'],
      ['I work every day.', 'Pracuji každý den.'],
    ],
    warning:
      '„I working“ → „I’m working.“ Hlídej pomocné be. Nevyžaduj rozlišení všech použití časů; začni jasným kontrastem every day × now.',
    steps: [
      [
        'Oživení rutiny',
        'Nech studentku říct tři věty o běžném dni. Pak předveď reálnou činnost, například pití kávy, a řekni I’m drinking coffee now.',
      ],
      [
        'Popis viditelné situace',
        'Vyber obrázek běžné situace. Popiš tři činnosti. Studentka ukazuje na lidi, o kterých mluvíš. Vol známá slovesa.',
      ],
      [
        'Sestavte průběhový tvar',
        'Napiš I + am + working a She + is + reading. Přidej otázku Are you…? Nacvič vybrané tvary slov, například making a sitting, jen pokud je potřebujete.',
      ],
      [
        'Telefonát a pantomima',
        'Jeden volá a ptá se What are you doing? Druhý podle kartičky odpoví. V dalším kole předvádějte a hádejte: Are you cooking?',
      ],
      [
        'Právě teď versus obvykle',
        'Řekne dvě věty o obrázku a dvě o běžném dni. Když se časy pletou, vrať se k jasným příkladům a nepřidávej další výjimky.',
      ],
    ],
    prompts: [
      'What are you doing?',
      'Are you studying?',
      'What is she doing?',
      'Are you drinking coffee?',
    ],
    role: 'Voláte si po práci. Jeden právě vaří, druhý čte. Zjistěte, co ten druhý dělá. Pak se zeptejte na jeho běžný večer.',
    transfer: 'Vezměte vlastní fotku nebo obrázek z časopisu a popište tři viditelné činnosti.',
    homework:
      'Napiš tři věty o tom, co lidé právě dělají na vybraném obrázku. Přidej dvě pravdivé věty o své rutině.',
    exercises: [
      ['Právě pracuji.', ['I', 'am', 'working', 'now']],
      ['Co právě děláš?', ['What', 'are', 'you', 'doing']],
      ['Ona pije kávu.', ['She', 'is', 'drinking', 'coffee']],
      ['Právě nepracuji.', ['I', 'am', 'not', 'working']],
    ],
  },
  {
    id: 'weekend',
    title: 'Včera a příští víkend',
    description: 'Krátký příběh a jednoduchý plán. Další krok, až budou základy jisté.',
    icon: '↗',
    tint: '#f5e5e7',
    tone: '#b17c8a',
    category: 'situations',
    grammar: 'was / past / going to',
    goal: 'Ve dvou oddělených hodinách: nejdřív řekne, kde byla a co dělala; potom popíše jednoduchý plán.',
    pattern: ['I', 'was', 'at home.'],
    rule: 'Rozděl do dvou hodin. Minulost: I was… / I watched… / I went… Otázka u běžných sloves: Did you watch…? Plán až později: I’m going to + sloveso. Začni vždy jedním vzorem.',
    phrases: [
      ['I was at home yesterday.', 'Včera jsem byla doma.'],
      ['I watched a film.', 'Dívala jsem se na film.'],
      ['I went to work.', 'Šla jsem do práce.'],
      ['What did you do yesterday?', 'Co jsi dělala včera?'],
      ['I’m going to visit a friend.', 'Chystám se navštívit kamarádku.'],
      ['What are you going to do?', 'Co se chystáš dělat?'],
    ],
    warning:
      'Toto jsou alespoň dvě hodiny, nikoli jeden balík nových časů. „Did you watched?“ → „Did you watch?“ Po did se vrací základní tvar. Nejprve se drž známých sloves.',
    steps: [
      [
        'Připomeňte známé situace',
        'Začni běžným víkendem v přítomném čase. Pak ukaž na včerejšek v kalendáři. Dnešní cíl omez na minulost; plány ponech na další hodinu.',
      ],
      [
        'Krátké vyprávění o včerejšku',
        'Řekni: Yesterday I was at home. I watched a film. I cooked dinner. Studentka vybere nebo seřadí odpovídající obrázky.',
      ],
      [
        'Několik použitelných vzorů',
        'Procvič I was… a I watched… Přidej jen potřebné nepravidelné sloveso, třeba went. U jistější studentky nacvič Did you…? a What did you do…?',
      ],
      [
        'Sestavte skutečný včerejšek',
        'Studentka vypráví s oporou o tři hesla. Doptávej se na obsah. Pak si role vyměňte. Když potřebuje slovo, využije známou záchrannou frázi.',
      ],
      [
        'Shrnutí a navazující hodina',
        'Bez předlohy řekne tři věty o včerejšku. Příště po opakování zaveď going to na skutečných plánech, použij stejný postup poslech → vzor → rozhovor.',
      ],
    ],
    prompts: [
      'Were you at home yesterday?',
      'What did you do yesterday?',
      'Did you watch a film?',
      'What are you going to do at the weekend?',
    ],
    role: 'První kolo: v pondělí si povídáte o uplynulém víkendu. Druhé kolo až v další hodině: v pátek si vyprávíte, co plánujete na víkend.',
    transfer:
      'Nech studentku vybrat, které tři činnosti chce umět říct. Podle toho doplň slovesa, ne podle seznamu nepravidelných tvarů.',
    homework:
      'Po hodině o minulosti: nahraj tři věty o včerejšku. Po samostatné hodině o plánech: připrav tři věty s I’m going to o příštím víkendu.',
    exercises: [
      ['Včera jsem byla doma.', ['I', 'was', 'at', 'home', 'yesterday']],
      ['Dívala jsem se na film.', ['I', 'watched', 'a', 'film']],
      ['Dívala ses na film?', ['Did', 'you', 'watch', 'a', 'film']],
      ['Chystám se navštívit kamarádku.', ['I', 'am', 'going', 'to', 'visit', 'a', 'friend']],
    ],
  },
];
