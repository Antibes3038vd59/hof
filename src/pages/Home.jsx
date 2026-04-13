import { useState, useRef, useEffect } from 'react';
import '../css/Home.css';
import '../index.css';
import Overlay from '../components/Overlay';

const Home = () => {
  const [showArrow, setShowArrow] = useState(false);

  // States en refs voor elke overlay
  const [showOverlayPaginaTwee, setShowOverlayPaginaTwee] = useState(false);
  const [showOverlayPaginaDrie, setShowOverlayPaginaDrie] = useState(false);
  const [showOverlayPaginaVier, setShowOverlayPaginaVier] = useState(false);
  const [showOverlayPaginaVijf, setShowOverlayPaginaVijf] = useState(false);
  const [showOverlayPaginaZes, setShowOverlayPaginaZes] = useState(false);
  const [showOverlayPaginaZeven, setShowOverlayPaginaZeven] = useState(false);

  const overlayContainerRefPaginaTwee = useRef(null);
  const overlayContainerRefPaginaDrie = useRef(null);
  const overlayContainerRefPaginaVier = useRef(null);
  const overlayContainerRefPaginaVijf = useRef(null);
  const overlayContainerRefPaginaZes = useRef(null);
  const overlayContainerRefPaginaZeven = useRef(null);

  // arrow main page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPaginaTwee = () => {
    const paginaTwee = document.getElementById('pagina-twee');
    paginaTwee.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generieke toggle-functie voor overlays
  const toggleOverlay = (setShowOverlay, overlayRef, sectionId = null) => () => {
    setShowOverlay(prevShowOverlay => {
      const newShowOverlay = !prevShowOverlay;
  
      if (!newShowOverlay) {
        // Als de overlay gesloten wordt, scroll dan naar boven
        if (overlayRef.current) {
          overlayRef.current.scrollTop = 0;
        }
        // Zet body overflow terug naar normaal
        document.body.style.overflow = '';
      } else {
        // Zet body overflow op hidden als de overlay geopend wordt
        document.body.style.overflow = 'hidden';
      }
  
      return newShowOverlay;
    });
  
    // Als de overlay geopend wordt en er een sectionId is meegegeven
    if (!showOverlayPaginaTwee && sectionId) {
      setTimeout(() => {
        if (sectionId === 'statenzaal-image') {
          // Bij Statenzaal naar de top van de overlay scrollen
          if (overlayContainerRefPaginaTwee.current) {
            overlayContainerRefPaginaTwee.current.scrollTop = 0;
          }
        } else {
          // Bij andere links naar de specifieke sectie scrollen
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  };

  // tonen arrow main page
  useEffect(() => {
    const handleScroll = () => {
      const paginaTwee = document.getElementById('pagina-twee');
      if (paginaTwee) {
        const positie = paginaTwee.getBoundingClientRect();
        setShowArrow(positie.top <= 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* PAGINA 1 */}
      <div id="pagina-een" className="main-pagina">
        <h1 className="main-titel">'t Hof</h1>
        <h2 className="main-kop-anders">De geboorteplaats van de republiek</h2>

        <nav className="nav">
          <ul className="mobiel-horizontaal">
            <li><a href="#pagina-twee" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-twee'); }}>'t Hof</a></li>
            <li><a href="#pagina-drie" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-drie'); }}>Spaanse overheersing</a></li>
            <li><a href="#pagina-vier" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-vier'); }}>Tachtigjarige Oorlog</a></li>
            <li><a href="#pagina-vijf" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-vijf'); }}>Statenvergadering</a></li>
            <li><a href="#pagina-zes" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-zes'); }}>Plakkaat van Verlatinghe</a></li>
            <li><a href="#pagina-zeven" onClick={(e) => { e.preventDefault(); scrollToSection('pagina-zeven'); }}>Overzicht</a></li>
          </ul>
        </nav>

        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/Dordrecht.jpg`}
          alt="Dordrecht"
        />
        <img
          className="cirkel"
          src={`${process.env.PUBLIC_URL}/images/cirkel.png`}
          alt="Ga naar pagina twee"
          onClick={scrollToPaginaTwee}
        />
      </div>



      {/* PAGINA 2 */}

      <div id="pagina-twee" className="main-pagina">
        <h2 className="main-kop">In de binnenstad van Dordrecht</h2>
        <p className="main-tekst">
          staat 't Hof. Een historisch gebouwencomplex bestaande uit de {' '}
          <span
            onClick={toggleOverlay(setShowOverlayPaginaTwee, overlayContainerRefPaginaTwee, 'statenzaal-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            Statenzaal
          </span>
          , <span
            onClick={toggleOverlay(setShowOverlayPaginaTwee, overlayContainerRefPaginaTwee, 'augustijnenkerk-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            Augustijnenkerk </span>en de <span
            onClick={toggleOverlay(setShowOverlayPaginaTwee, overlayContainerRefPaginaTwee, 'kloostertuin-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            kloostertuin
          </span>. Het is bekend om de Eerste Vrije Statenvergadering 
          in 1572.
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/Hof1.jpg`}
          alt="hof"
        />
      </div>

      {/* OVERLAY PAGINA 2 */}
      <Overlay show={showOverlayPaginaTwee} toggle={toggleOverlay(setShowOverlayPaginaTwee, overlayContainerRefPaginaTwee)}>
        <div ref={overlayContainerRefPaginaTwee}>
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/complex.jpg`}
          alt="Statenzaal"
        />
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/Hof4.jpg`}
          alt="hof"
        />
          <h2 id= "statenzaal-section" className="overlay-kop">De Statenzaal</h2>
          <p className="overlay-tekst">
            was oorspronkelijk een Augustijnenklooster en werd gesticht in 1275. Het complex is vooral 
            bekend omdat hier in 1572 de Eerste Vrije Statenvergadering plaatsvond, een cruciaal moment 
            in de Nederlandse geschiedenis en de Tachtigjarige Oorlog. Tijdens deze vergadering werd in de Statenzaal 
            gesproken over de Nederlandse opstand tegen Spanje en werd de vrijheid van godsdienst en 
            geweten vastgelegd. <br /><br />

            Na de Reformatie in 1572 veranderde de functie van het gebouw: het werd onder andere 
            gebruikt als vergaderplaats, oefenplek voor gewapende burgers, beestenmarkt, school en 
            trouwlocatie. In de 20e eeuw raakte het complex in verval, maar tussen 1969 en 1972 werd 
            het gerestaureerd. <br /><br />

            Tegenwoordig huisvest 't Hof het museum Hof van Nederland en het Regionaal 
            Archief Dordrecht. Het museum vertelt het verhaal van de Nederlandse vrijheid, van de 
            middeleeuwen tot nu, aan de hand van historische gebeurtenissen zoals de Eerste Vrije 
            Statenvergadering, de Synode van Dordrecht, de moord op de gebroeders De Witt en de 
            Tweede Wereldoorlog. <br /><br />
            
            Het gebouw en het plein eromheen ademen nog steeds de sfeer van de belangrijke 
            besluiten die hier genomen zijn. Het is een plek waar de geschiedenis van Dordrecht 
            en Nederland tot leven komt, en waar bezoekers worden uitgedaagd na te denken over vrijheid 
            en gelijkheid, zowel in het verleden als in het heden.
          </p>
          <img
            className="overlay-image"
            src={`${process.env.PUBLIC_URL}/images/augustijnenkerk.jpg`}
            alt="Augustijnenkerk"
          />
          <h2 id= "augustijnenkerk-section" className="overlay-kop">De Augustijnenkerk</h2>
          <p className="overlay-tekst">
            is een van de meest historische belangrijke gebouwen van ’t Hof. 
            De kerk werd gesticht in 1275 als onderdeel van het Augustijnenklooster, 
            dat door Floris V, graaf van Holland, aan de Augustijnen werd geschonken. De eerste steen 
            voor het klooster werd gelegd in 1293. <br /> Tijdens de Eerste Vrije Statenvergadering in 1572 
            werd de kerk gebruikt als vergaderruimte voor de Hollandse steden die zich verzetten tegen 
            de Spaanse overheersing. <br /> Hoewel de vergadering zelf plaatsvond in de Statenzaal, 
            was de kerk een onmiskenbaar onderdeel van het complex.<br /><br />

            Na de Reformatie (1572) werd de kerk gereformeerd en verloor het zijn katholieke functie.
            Tijdens de Synode van Dordrecht, 1618-1619 (een belangrijk religieus concilie van de gereformeerde kerk) 
            werd de kerk gebruikt voor bijeenkomsten. Deze synode leidde tot de Statenvertaling van de Bijbel, 
            die nog steeds de basis vormt voor de Nederlandse protestantse traditie.
          </p>
          <img
            className="overlay-image"
            src={`${process.env.PUBLIC_URL}/images/kloostertuin.jpg`}
            alt="kloostertuin"
          />
          <h2 id= "kloostertuin-section"  className="overlay-kop">De kloostertuin</h2>
          <p className="overlay-tekst">
            was oorspronkelijk een besloten tuin binnen het Augustijnenklooster, typisch voor middeleeuwse 
            kloosters. Dergelijke tuinen hadden zowel een praktische als een spirituele functie 
            Monniken verbouwden hier groenten, kruiden, en medicinale planten voor eigen gebruik.
            Een rustige plek voor gebed, meditatie, en contemplatie, vaak met een centrale fontein 
            of waterpartij als symbool van zuiverheid. <br /> Na 1572, toen het klooster zijn religieuze functie verloor, 
            raakte de tuin in onbruik als kloostertuin en werd het minder onderhouden.<br /><br />

            De kloostertuin is nu onderdeel van het Hof van Nederland en fungeert als een rustige, historische 
            buitenruimte waar bezoekers kunnen wandelen en genieten van de sfeer van het klooster.
          </p>
        </div>
      </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaTwee && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaTwee, overlayContainerRefPaginaTwee)}
        />
      )}



      {/* PAGINA 3 */}

      <div id="pagina-drie" className="main-pagina">
        <h2 className="main-kop">Het begin van de opstand</h2>
        <p className="main-tekst">
          komt na een periode van <span onClick={toggleOverlay(setShowOverlayPaginaDrie, overlayContainerRefPaginaDrie, 'filipsII-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            data-show={showOverlayPaginaDrie}>
            Spaanse overheersing
          </span> die gekenmerkt werd door groeiende spanningen, religieus conflict en politieke onderdrukking, 
            wat uiteindelijk uitmondde in het conflict.
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/oorlog.jpg`}
          alt="oorlog"
        />
      </div>

      {/* OVERLAY PAGINA 3 */}
      <Overlay
        show={showOverlayPaginaDrie}
        toggle={toggleOverlay(setShowOverlayPaginaDrie, overlayContainerRefPaginaDrie)}
      >
        <div ref={overlayContainerRefPaginaDrie}>
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/Filips-II.jpg`}
          alt="Filips-II"
        />
        <h2  id= "filipsII-section" className="overlay-kop">De Spaanse overheersing</h2>
        <p className="overlay-tekst">
        begon in 1555 toen Filips II (1527–1598), de zoon van Karel V, de Nederlanden erfde.
        Tot deze periode kenden de Nederlanden nog een relatieve bloei en tolerantie met respect voor autonomie. 
        De Nederlanden waren in die tijd een van de rijkste en meest ontwikkelde gebieden van Europa, 
        met steden zoals Antwerpen, Brugge en Amsterdam als centra van handel en cultuur.  <br /><br />

        Onder Karel V was er ook nog ruimte voor protestantse ideeën, ondanks dat de katholieke kerk de officiële 
        religie bleef. In tegenstelling tot zijn vader was Filips een overtuigd katholiek en centralist. 
        Hij zag de Nederlanden vooral als een bron van inkomsten voor zijn Spaanse Rijk en wilde de macht 
        van de centrale overheid versterken. Dit leidde tot groeiende onvrede, met name omdat Filips een 
        streng katholiek beleid voerde en de protestantse beweging onderdrukte.  <br /><br />
        
        In 1556 droeg hij het bestuur van de Nederlanden over aan zijn halfzus Margaretha van Parma, 
        maar behield zelf de uiteindelijke beslissingsmacht. De komst van kardinaal Granvelle als 
        aartsbisschop van Mechelen in 1559 werd gezien als een symbool van Spaanse onderdrukking en 
        inperking van de Nederlandse autonomie, wat het verzet onder de Nederlandse adel en steden verder 
        aanwakkerde.  <br /><br />
        
        De economische situatie verslechterde door de hoge belastingen die Filips II oplegde om zijn oorlogen 
        in Europa te financieren, zoals de tiende penning, een belasting op onroerend goed. Dit leidde tot 
        klachten onder kooplieden en burgers. Tegelijkertijd groeide het calvinisme in de Nederlanden, 
        vooral onder de burgerij en adel. Filips II zag dit als een directe bedreiging voor zijn katholieke 
        rijk en voerde een hardhandig beleid tegen protestanten, met inbeslagnames en vervolgingen.  <br /><br />

        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/beeldenstorm.jpg`}
          alt="beeldenstorm"
        />
        In augustus 1566 barstte de Beeldenstorm los, waarbij protestanten in een golf van geweld katholieke 
        kerken, beelden en religieuze symbolen vernielden in steden zoals Steenvoorde, Hondschote, Antwerpen 
        en Utrecht. Dit was een reactie op de onderdrukking van het protestantisme en de economische crisis, 
        maar ook een uiting van iconoclasme, waarbij protestanten katholieke afbeeldingen als afgoderij 
        beschouwden. Filips II reageerde furieus en zag de Beeldenstorm als een opstand die hard de kop 
        in gedrukt moest worden door middel van een grote troepenmacht.  <br /><br />

        In 1567 stuurde Filips II de hertog van Alva (Fernando Álvarez de Toledo) naar de Nederlanden 
        met een leger van 10.000 Spaanse soldaten. Alva kreeg de opdracht orde op zaken te stellen en 
        de opstand neer te slaan. Hij richtte de Raad van Beroerten op, ook wel de Bloedraad genoemd, 
        een rechtbank die duizenden Nederlanders vervolgde voor ketterij en verraad. Veel mensen werden 
        geëxecuteerd of verbannen, waaronder Egmont en Horne, die in 1568 op de Grote Markt in Brussel 
        werden onthoofd. Alva voerde ook nieuwe belastingen in, zoals de tiende en honderdste penning, 
        wat de onvrede verder aanwakkerde. Daarnaast verbood hij alle protestantse bijeenkomsten en 
        strafte overtreders hard.
        </p>
      </div>
    </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaDrie && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaDrie, overlayContainerRefPaginaDrie)}
        />
      )}
      


      {/* PAGINA 4 */}

      <div id="pagina-vier" className="main-pagina">
        <h2 className="main-kop">De Tachtigjarige Oorlog</h2>
        <p className="main-tekst">
          werd in gang gezet door <span onClick={toggleOverlay(setShowOverlayPaginaVier, overlayContainerRefPaginaVier, 'willem-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            data-show={showOverlayPaginaVier}>
            Willem van Oranje
          </span> die een centrale en beslissende rol in het verzet tegen de Spaanse overheersing en de 
          strijd voor Nederlandse onafhankelijkheid speelde. 
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/Willem1.jpg`}
          alt="Willem van Oranje"
        />
      </div>

      {/* OVERLAY PAGINA 4 */}
      <Overlay
        show={showOverlayPaginaVier}
        toggle={toggleOverlay(setShowOverlayPaginaVier, overlayContainerRefPaginaVier)}
      >
        <div ref={overlayContainerRefPaginaVier}>
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/Willem3.jpg`}
          alt="Willem van Oranje"
        />
        <h2  id= "willem-section" className="overlay-kop">Willem van Oranje</h2>
        <p className="overlay-tekst">
        werd geboren in 1533 in het Duitse Dillenburg, als graaf van Nassau en 
        prins van Oranje. Hij groeide op in een Duitse, lutherse omgeving, maar werd op jonge leeftijd 
        naar de Nederlanden gestuurd om opgeleid te worden aan het hof van keizer Karel V. Die zag zijn
        potentie en maakte hem tot een van zijn favorieten. In 1555, toen Karel V aftrad, 
        erfde Willem de titel prins van Oranje en werd hij een van de meest invloedrijke edelen in 
        de Nederlanden. Willem was oorspronkelijk een loyaal dienaar van het Habsburgse regime, maar 
        zijn houding veranderde drastisch onder het bewind van Filips II. <br /><br />

        Toen Filips II in 1559 de macht overnam, begon Willem van Oranje steeds kritischer te staan 
        tegenover het Spaanse beleid. Filips II voerde een centralistisch en katholiek beleid, wat botste 
        met de autonomie en religieuze tolerantie waar de Nederlandse gewesten aan gewend waren. Willem, 
        die zelf sympathieën had voor het protestantisme, zag de 
        onderdrukking van protestanten en de inperking van lokale privileges. <br /><br />

        In 1566 barstte de Beeldenstorm los, waarbij protestantse opstandelingen katholieke kerken en 
        beelden vernielden. Filips II reageerde furieus en stuurde de hertog van Alva met een leger 
        naar de Nederlanden om orde op zaken te stellen. Toen Alva in 1567 arriveerde, vluchtte 
        Willem van Oranje naar Duitsland, waar hij zijn verzet tegen de Spaanse overheersing begon 
        te organiseren. Alva richtte de Raad van Beroerten op, die duizenden Nederlanders vervolgde 
        en executeerde. <br /><br />
        
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/oorlog2.jpg`}
          alt="Tachtigjarige Oorlog"
        />
        Willem van Oranje besloot dat gewapend verzet de enige manier was om de Spaanse overheersing 
        te breken. In 1568 begon hij, met steun van zijn broer Lodewijk van Nassau, een invasie in 
        de Nederlanden vanuit Duitsland. Hoewel de eerste pogingen mislukten, was de Slag bij Heiligerlee 
         een belangrijke overwinning voor de opstandelingen. Deze slag markeert het begin 
        van de Tachtigjarige Oorlog. Ondanks tegenslagen, bleef Willem volharden. 
        In 1572 was er een keerpunt in de opstand. <br /><br />

        De inname van Den Briel door de watergeuzen (1 april 1572). 
        Dit inspireerde andere steden om zich bij de opstand aan te sluiten. Willem van Oranje speelde een 
        cruciale rol in de Eerste Vrije Statenvergadering (19–23 juli 1572) in Dordrecht, waar afgevaardigden 
        van twaalf Hollandse steden besloten om hem als stadhouder te erkennen en de opstand te financieren. 
        Deze vergadering was een politieke mijlpaal en legde de basis voor de Nederlandse onafhankelijkheid.
        </p>
      </div>
    </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaVier && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaVier, overlayContainerRefPaginaVier)}
        />
      )}



      {/* PAGINA 5 */}

      <div id="pagina-vijf" className="main-pagina">
        <h2 className="main-kop">De Eerste Vrije Statenvergadering</h2>
        <p className="main-tekst">
        in Dordrecht (19–23 juli 1572) markeerde het begin van de politieke eenheid van de opstandige 
        Nederlandse gewesten en was een <span onClick={toggleOverlay(setShowOverlayPaginaVijf, overlayContainerRefPaginaVijf, 'Willem-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            data-show={showOverlayPaginaVijf}>
            historisch keerpunt
          </span>  in de strijd tegen de Spaanse overheersing.
            
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/statenvergadering.jpg`}
          alt="statenvergadering"
        />
      </div>

      {/* OVERLAY PAGINA 5 */}
      <Overlay
        show={showOverlayPaginaVijf}
        toggle={toggleOverlay(setShowOverlayPaginaVijf, overlayContainerRefPaginaVijf)}
      >
        <div ref={overlayContainerRefPaginaVijf}>
        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/Willem2.jpg`}
          alt="Willem van Oranje"
        />
        <h2  id= "Willem-section" className="overlay-kop">Een historisch keerpunt</h2>
        <p className="overlay-tekst">
        was deze vergadering die het begin markeerde van de politieke eenheid van de opstandige 
        Nederlandse gewesten en de formele erkenning van Willem van Oranje als leider van het verzet.
        In de jaren voor 1572 was de spanning sterk toegenomen. Filips II en zijn landvoogd, 
        de hertog van Alva, hadden een hardhandig beleid gevoerd tegen protestanten en opstandelingen.
        <br /><br />
        
        De Raad van Beroerten (Bloedraad) had duizenden Nederlanders laten executeren, en de hoge belastingen 
        en onderdrukking van lokale privileges leidden tot groeiend verzet. Willem van Oranje, die in 1568 
        naar Duitsland was gevlucht, organiseerde vanaf daar het verzet tegen de Spanjaarden.
        <br /><br />

        Een belangrijk moment was de inname van Den Briel door de watergeuzen op 1 april 1572. 
        Dit was de eerste stad die in handen viel van de opstandelingen en markeerde het begin van een 
        militaire en politieke opstand tegen Spanje. De watergeuzen, een groep protestantse zeevaarders 
        en avonturiers, speelden een sleutelrol in de opstand door steden in te nemen en de Spaanse troepen 
        te bestrijden. Na de inname van Den Briel sloten andere steden, zoals Rotterdam en Dordrecht, 
        zich aan bij de opstand.
        Willem van Oranje zag in dat het moment was aangebroken om de politieke steun voor de opstand 
        te organiseren. Hij riep de Hollandse steden op om een Statenvergadering bijeen te roepen, iets 
        wat normaal gesproken alleen door de koning of zijn stadhouder mocht gebeuren. Dit was een 
        revolutionaire daad, omdat het een directe uitdaging was voor het gezag van Filips II.
        <br /><br />

        De vergadering vond plaats in de refter (de eetzaal) van het Augustijnenklooster in Dordrecht, 
        een plek die tegenwoordig bekendstaat als ’t Hof. Aanwezig waren afgevaardigden van twaalf Hollandse steden:
        <ul>
          <li>Dordrecht</li>
          <li>Haarlem</li>
          <li>Leiden</li>
          <li>Gouda</li>
          <li>Gorinchem (Gorcum)</li>
          <li>Alkmaar</li>
          <li>Enkhuizen</li>
          <li>Hoorn</li>
          <li>Medemblik</li>
          <li>Monnickendam</li>
          <li>Edam</li>
          <li>Oudewater </li>
        </ul>
        Amsterdam ontbrak, omdat de stad toen nog Spaansgezind was en zich niet bij de opstand aansloot.
        <br /><br />

        <img
          className="overlay-image"
          src={`${process.env.PUBLIC_URL}/images/statenvergadering2.jpg`}
          alt="statenvergadering"
        />

        Tijdens de vergadering werden verschillende belangrijke besluiten genomen:
        De steden erkenden Willem van Oranje als de rechtmatige stadhouder van Holland, 
        Zeeland en Utrecht. Dit was een directe uitdaging voor de Spaanse koning, die Willem als een 
        verrader beschouwde. Willem werd zo de politieke leider van de opstand.
        De steden besloten om geld en troepen beschikbaar te stellen voor de strijd tegen de Spanjaarden.<br /> 
        Dit was cruciaal, omdat de opstand zonder financiële steun niet kon slagen.<br />
        Op verzoek van Willem van Oranje werd besloten om godsdienstvrijheid te waarborgen. 
        <br /><br />

        Dit was een radicale stap in een tijd waarin religie en politiek onlosmakelijk met elkaar 
        verbonden waren. Het besluit om godsdienstvrijheid toe te staan, was een direct gevolg van 
        de Beeldenstorm en de vervolging van protestanten door Alva.
        Na de Eerste Vrije Statenvergadering zette Willem van Oranje de strijd tegen de Spanjaarden voort. 
        <br /><br />

        Na de Eerste Vrije Statenvergadering zette Willem van Oranje de strijd tegen de Spanjaarden voort. 
        Hoewel er tegenslagen waren, zoals de inname van Haarlem (1573), bleven de opstandige gewesten 
        standhouden. In 1576 werd de Pacificatie van Gent gesloten, een overeenkomst tussen de noordelijke 
        en zuidelijke gewesten om samen te werken tegen de Spanjaarden. Dit was een belangrijke diplomatieke 
        overwinning voor Willem.
        In 1579 werd de Unie van Utrecht gesloten, waarbij de noordelijke gewesten besloten om samen te 
        werken in hun verzet. Dit was een directe voortzetting van de besluiten die in Dordrecht waren genomen. 
        Uiteindelijk leidde dit tot de stichting van de Republiek der Zeven Verenigde Nederlanden in 1588, 
        een staat die gebaseerd was op de principes van zelfbestuur, tolerantie en vrijheid.
        <br /><br />

        Willem van Oranje zelf zou de onafhankelijkheid niet meer meemaken. In 1584 werd hij in Delft 
        vermoord door Balthasar Gerards, een katholieke fanaticus. Zijn dood maakte hem tot een martelaar 
        en versterkte het verzet tegen Spanje.
        </p>
      </div>
    </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaVijf && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaVijf, overlayContainerRefPaginaVijf)}
        />
      )}



      {/* PAGINA 6 */}

      <div id="pagina-zes" className="main-pagina">
        <h2 className="main-kop">Het Plakkaat van Verlatinghe</h2>
        <p className="main-tekst">
          is een van de meest belangrijke en symbolische documenten in de Nederlandse geschiedenis en 
          werd op 26 juli 1581 ondertekend in Den Haag, tijdens een vergadering van de <span 
            onClick={toggleOverlay(setShowOverlayPaginaZes, overlayContainerRefPaginaZes, 'plakkaat-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            data-show={showOverlayPaginaZes}>
            Staten-Generaal
          </span>.
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/afzwering.jpg`}
          alt="afzwering"
        />
      </div>

      {/* OVERLAY PAGINA 6 */}
      <Overlay
        show={showOverlayPaginaZes}
        toggle={toggleOverlay(setShowOverlayPaginaZes, overlayContainerRefPaginaZes)}
      >
        <div ref={overlayContainerRefPaginaZes}>  
        <h2  id= "plakkaat-section" className="overlay-kop">In Den Haag</h2>
        <p className="overlay-tekst">
        werd op 26 juli 1581 het Plakkaat van Verlatinghe ondertekend door de Staten-Generaal van de 
        Verenigde Nederlanden en markeert het moment waarop de Nederlandse gewesten Filips II van 
        Spanje officieel "verlieten" als hun heerser. Dit document wordt beschouwd als de formele 
        onafhankelijkheidsverklaring van de Nederlanden en een cruciaal keerpunt in de Tachtigjarige Oorlog 
        (1568–1648).
        <br /><br />

        Het Plakkaat van Verlatinghe bestaat uit drie hoofdonderdelen:

        Het document begint met een theoretische onderbouwing van het recht van een volk om een 
        tirannieke heerser af te zweren. Het stelt dat een vorst door God is aangesteld om zijn onderdanen 
        te beschermen en rechtvaardig te regeren, zoals een herder zijn schapen.
        Als een vorst zijn plichten niet nakomt en zijn onderdanen onderdrukt, belast, en als slaven behandelt, 
        verliest hij zijn rechtmatige gezag en mag het volk hem verlaten.
        Filips II wordt beschuldigd van tirannie, omdat hij de oude rechten en privileges van de Nederlanden 
        heeft geschonden, onrechtvaardige belastingen heeft opgelegd, en het protestantisme heeft onderdrukt.
        <br /><br />

        Het document somt concreet op hoe Filips II zijn plichten als vorst heeft verzaakt. 
        Dit omvat onder andere:
        <br /><br />

        Het negeren van smeekbeden van de Nederlandse edelen en steden om de onderdrukking te stoppen.
        Het opleggen van onrechtvaardige belastingen, zoals de tiende en honderdste penning.
        Het invoeren van de Inquisitie en het vervolgen van protestanten.
        Het sturen van Alva en zijn Bloedraad, die duizenden Nederlanders hebben laten executeren.
        Deze opsomming diende als juridische rechtvaardiging voor het afzweren van Filips II.
        <br /><br />

        De Staten-Generaal besluiten dat Filips II zijn rechtmatige gezag heeft verspeeld en verklaren 
        hem vervallen van zijn heerschappij over de Nederlanden.
        Het volk wordt ontslagen van de eed van trouw aan Filips II.
        De gewesten besluiten om zelf hun lot in handen te nemen en een nieuwe soeverein te zoeken of, 
        indien dat niet lukt, zelfstandig verder te gaan.
        <br /><br />

        Het Plakkaat van Verlatinghe was baanbrekend omdat het voor het eerst in de geschiedenis een 
        juridische onderbouwing gaf voor het recht van een volk om een tirannieke heerser af te zweren. 
        Dit principe werd later een inspiratiebron voor andere onafhankelijkheidsverklaringen, zoals 
        de Amerikaanse Onafhankelijkheidsverklaring (1776).
        Het document was ook een politieke daad van verzet, omdat het aantoonde dat de Nederlandse 
        gewesten niet langer bereid waren om onder het Spaanse juk te leven.
        <br /><br />

        In 1588 besloten de gewesten om zonder vorst verder te gaan en de Republiek der Zeven Verenigde 
        Nederlanden uit te roepen. Dit was een unieke staat in Europa, omdat het een republiek was 
        zonder koning, bestuurd door de Staten-Generaal en de stadhouders.
        <br /><br />

        Het originele document wordt bewaard in het Nationaal Archief in Den Haag. Het is een van de 
        belangrijkste stukken in de Nederlandse geschiedenis en wordt soms tentoongesteld voor het publiek.
        <br /><br />

        Plakkaat van Verlatinghe (26 juli 1581)<br />
        (Een bewerkte weergave van de belangrijkste passages)<br /><br />

        "Het is iedereen bekend dat een landsvorst door God als hoofd van zijn onderdanen is aangesteld om 
        hen te beschermen tegen alle vormen van onrecht, schade en geweld, zoals een herder dat is ter 
        bescherming van zijn schapen. De onderdanen zijn door God niet geschapen omwille van de vorst, om 
        hem in alles wat hij beveelt, of het nu godgevallig of goddeloos is, onderdanig te zijn en als 
        slaven te dienen. De vorst regeert juist omwille van zijn onderdanen, zonder wie hij geen vorst is, 
        om hen rechtvaardig en redelijk te besturen en te leiden, en om hen lief te hebben, zoals een vader 
        zijn kinderen en een herder zijn schapen, die lijf en leven op het spel zet om ze te behouden.""
        <br /><br />

        "Als een vorst echter niet zo handelt, maar in plaats van zijn onderdanen te beschermen, hen probeert 
        te onderdrukken, overmatig te belasten, hun oude vrijheid, rechten en gewoonten af te nemen en hen 
        te bevelen en te behandelen als slaven, moet hij niet als vorst, maar als tiran worden beschouwd. 
        In dat geval staat het naar recht en reden zijn onderdanen stellig vrij – zeker in overleg met de 
        Staten van het land – om hem niet als vorst te erkennen, maar hem te verlaten, en in zijn plaats 
        een ander tot hun bescherming rechtmatig tot staatshoofd te kiezen.""
        <br /><br />

        "Daarom verklaren wij, de Staten-Generaal der Verenigde Nederlanden, bij deze dat wij Filips II, 
        koning van Spanje, niet langer erkennen als onze rechtmatige heerser. Wij verklaren hem vervallen 
        van zijn heerschappij, jurisdictie en erfelijke aanspraken op de Nederlanden. Wij ontslaan alle 
        ambtsdragers en ingezetenen van de eed van trouw aan hem en verklaren dat wij voortaan ons eigen 
        lot in handen zullen nemen. Wij zullen een nieuwe soeverein zoeken die ons kan beschermen en 
        rechtvaardig kan regeren, of, indien dat niet lukt, zelfstandig verdergaan."        
        </p>
        <br /><br />


        <img
          src={`${process.env.PUBLIC_URL}/images/1.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/2.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/3.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
         <img
          src={`${process.env.PUBLIC_URL}/images/4.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/5.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/6.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/7.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/8.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/9.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
         <img
          src={`${process.env.PUBLIC_URL}/images/10.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/11.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/12.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/13.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/14.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/15.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
         <img
          src={`${process.env.PUBLIC_URL}/images/16.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/17.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/18.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/19.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/20.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/21.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
         <img
          src={`${process.env.PUBLIC_URL}/images/22.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/23.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/24.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/25.jpg`}
          alt="Plakkaat van Verlatinghe"
        />
        
       
      </div>
    </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaZes && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaZes, overlayContainerRefPaginaZes)}
        />
      )}



      {/* PAGINA 7 */}

      <div id="pagina-zeven" className="main-pagina">
        <h2 className="main-kop">De onafhankelijkheid van Nederland</h2>
        <p className="main-tekst">
          Een reis door verzet, politiek en cultuur. Een verhaal van opstand, eenheid en soevereiniteit.
          Samengevat in een chronologisch, <span 
            onClick={toggleOverlay(setShowOverlayPaginaZeven, overlayContainerRefPaginaZeven, 'overzicht-section')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            data-show={showOverlayPaginaZeven}>
            overzichtelijke tijdlijn
          </span> beginnend bij Karel V tot de Vrede van Münster.
        </p>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/Hof2.jpg`}
          alt="hof"
        />
      </div>

      {/* OVERLAY PAGINA 7 */}
      <Overlay
        show={showOverlayPaginaZeven}
        toggle={toggleOverlay(setShowOverlayPaginaZeven, overlayContainerRefPaginaZeven)}
      >
        <div ref={overlayContainerRefPaginaZeven}>  
        <p className="overlay-tekst">
        1. Karel V (1500–1558): De erfenis van de Nederlanden
        <br /><br />
        1506–1555: Karel V erft de Nederlanden via zijn grootvader Maximiliaan van Oostenrijk en wordt 
        heerser over een wereldrijk (Spanje, Nederlanden, Oostenrijk, delen van Italië, en de koloniën in 
        Amerika).
        <br /><br />
        1515–1555: Karel V regeert als keizer van het Heilige Roomse Rijk en koning van Spanje. Hij respecteert 
        grotendeels de autonomie en privileges van de Nederlandse gewesten, maar centraliseert wel het bestuur.
        <br /><br />
        1543: De Pragmatieke Sanctie wordt afgekondigd, waarbij de Nederlanden als één geheel onder de 
        Habsburgers worden bestuurd. Dit versterkt de eenheid, maar beperkt ook de lokale autonomie.
        <br /><br />
        1549: Karel V belooft in de Blijde Inkomst dat hij de oude rechten en privileges van de Nederlanden 
        zal respecteren.
        <br /><br />
        1555: Karel V doet troonsafstand en splitst zijn rijk op. Zijn zoon Filips II erft de Nederlanden, 
        Spanje, en de koloniën; zijn broer Ferdinand krijgt Oostenrijk en het Heilige Roomse Rijk.
        <br /><br />
        <br /><br />

        2. Filips II (1555–1598): Onderdukking en Opstand.<br />
        Vroege Jaren: Groeiende Spanningen (1555–1566)
        <br /><br />
        1555–1559: Filips II wordt heerser over de Nederlanden. Hij is een overtuigd katholiek en centralist, 
        wat botst met de protestantse beweging en de autonomie van de Nederlandse gewesten.
        <br /><br />
        1559: Filips II benoemt kardinaal Granvelle als aartsbisschop van Mechelen. Granvelle wordt gezien als 
        een symbool van Spaanse inmenging en leidt tot verzet onder de Nederlandse adel, waaronder Willem van 
        Oranje.
        <br /><br />
        1561: De Smeekschrift der Edelen wordt aan Margaretha van Parma (landvoogdes) aangeboden. De edelen 
        vragen om matiging van de religieuze vervolgingen, maar Filips II wijst hun verzoeken af.
        <br /><br />
        1566: De Beeldenstorm barst los. Protestanten vernielen in augustus katholieke kerken en beelden in 
        steden als Steenvoorde, Hondschote, en later Antwerpen en Utrecht. Dit is een reactie op de 
        onderdrukking van het protestantisme en de economische crisis.
        <br /><br />
        Alva en de Bloedraad (1567–1572)
        <br /><br />
        1567: Filips II stuurt de hertog van Alva met een leger naar de Nederlanden om orde op zaken te 
        stellen. Alva richt de Raad van Beroerten (Bloedraad) op, die duizenden Nederlanders laat executeren, 
        waaronder Egmont en Horne (1568).
        <br /><br />
        1568: Begin van de Tachtigjarige Oorlog. Willem van Oranje vlucht naar Duitsland en begint vanaf 
        daar het verzet te organiseren. De Slag bij Heiligerlee (23 mei 1568) is de eerste militaire 
        overwinning van de opstandelingen.
        <br /><br />
        1572: De inname van Den Briel door de watergeuzen (1 april 1572) markeert het begin van een 
        militaire en politieke opstand in het noorden. Andere steden, zoals Dordrecht, sluiten zich aan.
        Eerste Vrije Statenvergadering (1572)
        <br /><br />
        19–23 juli 1572: De Eerste Vrije Statenvergadering vindt plaats in Dordrecht. Afgevaardigden 
        van twaalf Hollandse steden erkennen Willem van Oranje als stadhouder en besluiten de opstand te 
        financieren. Dit is een revolutionaire daad, omdat de vergadering zonder toestemming van Filips II 
        wordt gehouden.
        <br /><br />
        <br /><br />

        3. Pacificatie en Unie (1576–1581)
        <br /><br />
        8 november 1576: De Pacificatie van Gent wordt gesloten. Noordelijke en zuidelijke gewesten besluiten 
        samen te werken tegen de Spanjaarden. Filips II gaat schijnbaar akkoord met de Eeuwig Edict, waarbij 
        hij de Nederlandse privileges en godsdienstvrijheid lijkt te erkennen.
        Unie van Utrecht (1579)
        <br /><br />
        23 januari 1579: De Unie van Utrecht wordt gesloten. De noordelijke gewesten (Holland, Zeeland, 
        Utrecht, Gelderland, Overijssel, Friesland, Groningen) besluiten om samen te werken in hun verzet 
        tegen Spanje. Dit is een cruciale stap in de vorming van de toekomstige Republiek.
        Plakkaat van Verlatinge (1581)
        <br /><br />
        26 juli 1581: Het Plakkaat van Verlatinge wordt ondertekend. De Staten-Generaal verklaren dat 
        Filips II zijn plichten als vorst heeft verzaakt en "verlaten" hem als heerser. Dit is de formele 
        onafhankelijkheidsverklaring van de Nederlanden.
        <br /><br />
        <br /><br />

        4. De Republiek der Zeven Verenigde Nederlanden (1581–1648)<br /><br />
        1581–1587: De Nederlandse gewesten zoeken naar een nieuwe vorst om Filips II te vervangen. 
        Francois, hertog van Anjou (broer van de Franse koning), wordt kortstondig als soeverein erkend, 
        maar zijn bewind mislukt.
        <br /><br />
        1584: Willem van Oranje wordt in Delft vermoord door Balthasar Gerards. Zijn dood maakt hem tot 
        een martelaar en versterkt het verzet tegen Spanje.
        Stichting van de Republiek (1588)
        <br /><br />
        1588: De Republiek der Zeven Verenigde Nederlanden wordt officieel uitgeroepen. De gewesten 
        besluiten om zonder vorst verder te gaan en worden bestuurd door de Staten-Generaal en de 
        stadhouders (vaak uit het huis van Oranje).
        Tienjarige Oorlog en Bestand (1588–1621)
        <br /><br />
        1588–1609: Onder leiding van Maurits van Nassau (zoon van Willem van Oranje) boekt de Republiek 
        militaire successen, zoals de inname van Breda (1590).
        <br /><br />
        1609–1621: Het Twaalfjarig Bestand wordt gesloten. De Republiek ervaart een periode van economische 
        bloei (de Gouden Eeuw), maar de oorlog laait in 1621 weer op.
        <br /><br />
        <br /><br />

        5. De Vrede van Münster (1648): Erkenning van de Onafhankelijkheid
        <br /><br />
        1648: De Vrede van Münster (onderdeel van de Vrede van Westfalen) wordt gesloten. Spanje erkent 
        hierin de onafhankelijkheid van de Republiek der Zeven Verenigde Nederlanden.
        <br /><br />
        Belangrijkste punten:
        <br /><br />
        Spanje erkent de soevereiniteit van de noordelijke Nederlanden.
        De zuidelijke Nederlanden (ongeveer het huidige België) blijven onder Spaans gezag.
        De Republiek wordt een volwaardige speler in de Europese politiek.
        <br /><br />
        Gevolgen:
        <br /><br />
        De Republiek blijft een republiek zonder koning, bestuurd door de Staten-Generaal en de stadhouders.
        De Gouden Eeuw zet door: de Republiek domineert de wereldhandel, wetenschap en kunst (bijv. 
        Rembrandt, Vermeer).
        </p>
        <br /><br />
      </div>
    </Overlay>

      {/* Arrow voor het sluiten van de overlay (altijd zichtbaar) */}
      {showOverlayPaginaZeven && (
        <img
          className="arrow-overlay"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Sluit overlay"
          onClick={toggleOverlay(setShowOverlayPaginaZeven, overlayContainerRefPaginaZeven)}
        />
      )}



      {/* PAGINA 8 */} 

      <div id="pagina-acht" className="main-pagina">
        <h1 className="main-titel">'t Hof</h1>
        <h2 className="main-kop-anders">Bezoek het museum <a
            href="https://www.hofvannederland.nl"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >Hof van Nederland
          </a>
        </h2>
        <img
          className="main-image"
          src={`${process.env.PUBLIC_URL}/images/Hof3.jpg`}
          alt="hof"
        />
        <footer className="footer">© 't Hof 2026</footer>
      </div>

      {showArrow && (
        <img
          className="arrow"
          src={`${process.env.PUBLIC_URL}/images/arrow.png`}
          alt="Naar boven"
          onClick={scrollToTop}
        />
      )}
    </main>
  );
};

export default Home;

