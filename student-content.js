// Krátké výklady a úkoly zobrazované studentkám.
const studentInstructions = {
  hello: {
    goal: 'Představíš se, řekneš, odkud jsi, a zeptáš se druhého.',
    explanation:
      'V angličtině potřebuješ říct i „jsem“. O sobě použij I am, často zkráceně I’m. Pro „ty jsi“ je you are a pro „ona je“ she is. Otázku vytvoříš prohozením: You are → Are you…?',
    task: 'Řekni své jméno, odkud jsi a co děláš. Pak se lektora zeptej na jméno a odkud je.',
    warning:
      'Jsem Anna = I’m Anna. Nevynechávej am. Jsem učitelka = I’m a teacher; před povoláním je a/an.',
  },
  help: {
    goal: 'Řekneš si o pomoc, když něčemu nerozumíš.',
    explanation:
      'Tyhle věty se nejdřív nauč jako celé fráze. Nemusíš umět vysvětlit každé slovo. Can you repeat that, please? znamená „Můžeš to prosím zopakovat?“ a můžeš ji použít při každé hodině.',
    task: 'Představ si, že lektor řekl něco moc rychle. Popros ho o zopakování. Pak se zeptej, co znamená slovo ticket.',
    warning: 'Když nerozumíš, řekni si o pomoc. I don’t understand je úplně v pořádku.',
  },
  likes: {
    goal: 'Řekneš, co máš ráda, a zjistíš, co máte společného.',
    explanation:
      'Začni člověkem, potom řekni sloveso a nakonec věc: I + like + music. Pro zápor vlož don’t: I don’t like coffee. Otázku začni Do you: Do you like music?',
    task: 'Řekni tři věci, které máš ráda, a jednu, kterou ráda nemáš. Zeptej se lektora na jeho oblíbené věci.',
    warning:
      'Do you like coffee? je správná otázka. Are you…? používáš ve větách s být, třeba Are you tired?',
  },
  routine: {
    goal: 'Popíšeš několik věcí ze svého běžného dne.',
    explanation:
      'Pro běžné činnosti použij I work, I live, I get up. Otázka na místo začíná Where do you…? „V kolik vstáváš?“ je What time do you get up? Nejprve se drž vět o sobě a otázek na druhého.',
    task: 'Popiš, kde bydlíš, kde pracuješ nebo studuješ a kdy vstáváš. Pak zjisti dvě stejné věci v lektorově dni.',
    warning:
      'Kde pracuješ? = Where do you work? Nezapomeň na do. U she/he pak řekneš she works, ale Does she work?',
  },
  can: {
    goal: 'Řekneš, co máš a co umíš. A zeptáš se na to druhého.',
    explanation:
      'Mám psa = I have a dog. Otázka je Do you have a dog? Umím plavat = I can swim. Tady je otázka rovnou Can you swim? Za can nepřidávej to a sloveso neměň.',
    task: 'Řekni jednu věc, kterou máš, jednu, kterou nemáš, a dvě schopnosti. Pak se zeptej Can you…? a Do you have…?',
    warning:
      'Can you swim? Nepřidávej do. I can swim, bez to. Pokud je toho hodně, prober s lektorem have a can zvlášť.',
  },
  cafe: {
    goal: 'Objednáš si něco v kavárně a zeptáš se na cenu.',
    explanation:
      'Na objednávku stačí Can I have…, please? Doplň, co chceš: a coffee, a tea. Otázku na cenu se nauč jako celek: How much is it? That’s all, thank you znamená „To je vše, děkuji“.',
    task: 'Zahraj si zákaznici. Objednej si oblíbené pití, odpověz na otázku With milk? a zeptej se na cenu. Potom si role vyměňte.',
    warning:
      'Jedna káva je a coffee, dvě kávy two coffees. Uč se nejdřív položky, které si sama objednáváš.',
  },
  now: {
    goal: 'Řekneš, co právě děláš, a zeptáš se druhého.',
    explanation:
      'Pro činnost právě teď spoj „jsem“ se slovesem na -ing: I am working, zkráceně I’m working. U she je She is working. Otázka: What are you doing? Běžný zvyk je jiný vzor: I work every day.',
    task: 'Řekni, co právě děláš ty a co dělá člověk na obrázku. Potom řekni jednu věc, kterou děláš běžně každý den.',
    warning:
      'I’m working potřebuje am. I work every day je zvyk; I’m working now je činnost právě teď.',
  },
  weekend: {
    goal: 'Nejdřív řekneš něco o včerejšku. Plány si nech na další krok.',
    explanation:
      'Pro „byla jsem“ použij I was: I was at home. U běžných sloves má minulost často -ed: I watched a film. Některá jsou nepravidelná: go → went. Až budeš mít minulost jistou, zkus plán: I’m going to visit a friend.',
    task: 'Začni třemi větami o včerejšku. V některé další hodině přidej plány na příští víkend. Není potřeba naučit se oba vzory najednou.',
    warning:
      'Did you watch a film? Po did už nepřidávej -ed. Poslední věta ve cvičení je plán; pokud jste ho ještě neprobírali, můžeš ji přeskočit.',
  },
};
