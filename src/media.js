export const curatedVideos = {
  "maasai-mara": [
    { title: "Wildlife, culture & adventure", youtubeId: "rkCMlxYj3ns", type: "Culture + wildlife" }
  ],
  "stone-town": [
    { title: "Street flavors of Stone Town", youtubeId: "cSSHT8NtJIY", type: "Food + culture" }
  ]
};

const cultureHighlightsByDestination = {
  santorini: [
    { name: "Orthodox island traditions", fact: "Religious festivals and village churches remain visible parts of island life.", query: "Santorini Greek Orthodox church festival" },
    { name: "Volcanic wine culture", fact: "Santorini is especially known for Assyrtiko grapes grown in mineral-rich volcanic soil.", query: "Santorini Assyrtiko vineyards kouloura vines" },
    { name: "Cave architecture", fact: "Traditional homes were often carved into soft volcanic rock to stay cooler in summer.", query: "Santorini cave houses yposkafa" }
  ],
  athens: [
    { name: "Athenian café culture", fact: "Long coffee breaks and outdoor conversation are a familiar part of city social life.", query: "Athens Greece cafe culture" },
    { name: "Rebetiko music", fact: "Rebetiko developed in Greek urban communities and became an important part of modern Greek musical heritage.", query: "Rebetiko music Greece musicians" },
    { name: "Evening volta", fact: "A relaxed evening walk through squares and neighbourhoods remains a common Mediterranean social habit.", query: "Athens evening promenade Plaka" }
  ],
  rome: [
    { name: "Passeggiata", fact: "The evening passeggiata is a social stroll through streets and piazzas rather than a hurried commute.", query: "Rome Italy passeggiata piazza evening" },
    { name: "Neighbourhood trattorias", fact: "Roman food culture is strongly tied to small neighbourhood restaurants and seasonal local dishes.", query: "Rome trattoria Roman cuisine" },
    { name: "Fountain and piazza life", fact: "Public squares and fountains function as social spaces as well as historic landmarks.", query: "Rome piazza fountain people" }
  ],
  venice: [
    { name: "Carnival mask-making", fact: "Venetian masks are closely associated with Carnival and a long craft tradition.", query: "Venice carnival mask artisan" },
    { name: "Murano glassmaking", fact: "Murano has been associated with specialist Venetian glassmaking for centuries.", query: "Murano glassmaker Venice" },
    { name: "Gondolier tradition", fact: "Gondoliers remain part of Venice's distinctive water-based transport culture.", query: "Venice gondolier gondola" }
  ],
  paris: [
    { name: "Terrace café culture", fact: "Parisian cafés have long served as meeting places for everyday social life, artists and writers.", query: "Paris terrace cafe people" },
    { name: "Fashion craftsmanship", fact: "Paris remains associated with couture, ateliers and major fashion houses.", query: "Paris haute couture atelier fashion" },
    { name: "Neighbourhood markets", fact: "Street and covered markets are still part of daily food culture across many Paris neighbourhoods.", query: "Paris street market food" }
  ],
  barcelona: [
    { name: "Castellers", fact: "Catalan castellers build multi-level human towers during festivals and community events.", query: "Castellers Catalonia human towers Barcelona" },
    { name: "Catalan language", fact: "Catalan is widely used in public life, education and cultural expression in Barcelona.", query: "Barcelona Catalan language street signs" },
    { name: "Festes majors", fact: "Neighbourhood festivals often fill streets with decorations, music and community events.", query: "Barcelona festa major street festival" }
  ],
  lisbon: [
    { name: "Fado music", fact: "Fado is a deeply expressive Portuguese song tradition strongly associated with Lisbon.", query: "Lisbon fado singer guitarra portuguesa" },
    { name: "Azulejo tiles", fact: "Decorative ceramic tiles cover churches, stations and building façades across Lisbon.", query: "Lisbon azulejo tiles Portugal" },
    { name: "Neighbourhood festas", fact: "Summer neighbourhood festivals bring music, grilled sardines and street decorations to older districts.", query: "Lisbon festas populares street festival" }
  ],
  vienna: [
    { name: "Coffeehouse culture", fact: "Viennese coffeehouses became famous as places for conversation, reading, writing and lingering.", query: "Vienna traditional coffeehouse interior" },
    { name: "Classical music", fact: "Vienna's identity is strongly linked to composers, orchestras and a continuing concert tradition.", query: "Vienna classical concert orchestra" },
    { name: "Ball season", fact: "Formal balls remain a distinctive part of Vienna's winter social calendar.", query: "Vienna ball season waltz" }
  ],
  prague: [
    { name: "Czech puppetry", fact: "Puppetry and marionette theatre have a long place in Czech cultural life.", query: "Czech marionette puppetry Prague" },
    { name: "Beer culture", fact: "Czech pub culture is closely tied to social life and a long brewing tradition.", query: "Prague Czech pub beer culture" },
    { name: "Classical music", fact: "Concert halls, churches and historic venues host a strong classical music tradition.", query: "Prague classical music concert" }
  ],
  amsterdam: [
    { name: "Cycling culture", fact: "Bicycles are a normal everyday transport choice and shape Amsterdam's streets and public space.", query: "Amsterdam cycling bicycles people" },
    { name: "Canal-house living", fact: "Narrow canal houses reflect the city's trading history and dense urban form.", query: "Amsterdam canal houses Netherlands" },
    { name: "Street markets", fact: "Markets remain part of neighbourhood shopping and food culture.", query: "Amsterdam street market Netherlands" }
  ],
  edinburgh: [
    { name: "Scottish storytelling", fact: "Edinburgh's literary identity is reinforced by writers, book culture and storytelling traditions.", query: "Edinburgh storytelling Scotland literature" },
    { name: "Festival culture", fact: "The city hosts major annual arts festivals that transform streets and venues.", query: "Edinburgh Festival performers street" },
    { name: "Bagpipe tradition", fact: "Bagpipes are one of Scotland's most recognizable musical traditions.", query: "Scottish bagpiper Edinburgh" }
  ],
  reykjavik: [
    { name: "Geothermal pool culture", fact: "Public swimming pools are important social spaces in Icelandic everyday life.", query: "Reykjavik geothermal swimming pool Iceland" },
    { name: "Literary culture", fact: "Iceland has a strong reading and publishing tradition, especially visible in Reykjavík.", query: "Reykjavik Iceland books literature" },
    { name: "Independent music", fact: "Reykjavík has an internationally visible music scene despite its relatively small population.", query: "Reykjavik Iceland live music" }
  ],
  istanbul: [
    { name: "Tea culture", fact: "Tea is served throughout the day in homes, cafés, shops and workplaces.", query: "Istanbul Turkish tea culture cay" },
    { name: "Bosphorus ferry life", fact: "Ferries are both practical transport and a defining everyday experience between the city's shores.", query: "Istanbul Bosphorus ferry passengers" },
    { name: "Bazaar craftsmanship", fact: "Markets preserve traditions of ceramics, textiles, metalwork, spices and other crafts.", query: "Istanbul Grand Bazaar artisan crafts" }
  ],
  cappadocia: [
    { name: "Avanos pottery", fact: "Avanos is known for pottery traditions using clay from the Kızılırmak River region.", query: "Avanos pottery Cappadocia artisan" },
    { name: "Cave architecture", fact: "People carved homes, churches and storage spaces directly into soft volcanic rock.", query: "Cappadocia cave houses Turkey" },
    { name: "Regional carpet weaving", fact: "Handwoven carpets and kilims remain associated with regional Anatolian craft traditions.", query: "Cappadocia Turkish carpet weaving" }
  ],
  petra: [
    { name: "Nabataean heritage", fact: "Petra was built by the Nabataeans, an Arab people skilled in trade and desert water management.", query: "Petra Nabataean culture Jordan" },
    { name: "Bedouin traditions", fact: "Bedouin communities in southern Jordan maintain traditions of hospitality, music and desert knowledge.", query: "Jordan Bedouin culture Petra" },
    { name: "Desert hospitality", fact: "Tea and generous hosting are important social customs across Jordanian desert communities.", query: "Jordan Bedouin tea hospitality" }
  ],
  cairo: [
    { name: "Ramadan nights", fact: "During Ramadan, Cairo's streets often become especially lively after sunset.", query: "Cairo Ramadan lanterns streets night" },
    { name: "Egyptian café culture", fact: "Traditional cafés are gathering places for tea, conversation, games and shisha.", query: "Cairo traditional ahwa cafe Egypt" },
    { name: "Arabic music", fact: "Cairo has played a major role in modern Arabic music and cinema.", query: "Cairo Egyptian Arabic music musicians" }
  ],
  marrakech: [
    { name: "Amazigh heritage", fact: "Amazigh culture is foundational to Morocco and visible in language, craft and rural traditions.", query: "Morocco Amazigh culture clothing crafts" },
    { name: "Souk craftsmanship", fact: "Marrakech's souks are known for leatherwork, metalwork, textiles, woodwork and ceramics.", query: "Marrakech souk artisan crafts" },
    { name: "Mint tea hospitality", fact: "Serving sweet mint tea is a familiar symbol of Moroccan hospitality.", query: "Moroccan mint tea hospitality Marrakech" }
  ],
  nairobi: [
    { name: "Matatu art culture", fact: "Nairobi's matatus are known for bold paintwork, music and pop-culture-inspired visual design.", query: "Nairobi matatu art graffiti Kenya" },
    { name: "Kenyan nyama choma culture", fact: "Nyama choma is grilled meat commonly shared socially with accompaniments such as kachumbari and ugali.", query: "Nyama choma Kenya grilled meat" },
    { name: "Contemporary Kenyan fashion", fact: "Nairobi designers blend local textiles, streetwear and contemporary African fashion influences.", query: "Nairobi Kenya fashion designers clothing" }
  ],
  "maasai-mara": [
    { name: "Maasai beadwork", fact: "Maasai beadwork uses colour and pattern in jewellery and adornment with strong social and aesthetic importance.", query: "Maasai beadwork jewelry Kenya" },
    { name: "Maasai shuka", fact: "The brightly coloured shuka is widely associated with Maasai dress and identity.", query: "Maasai shuka clothing Kenya" },
    { name: "Maasai jumping dance", fact: "The adumu is a well-known ceremonial jumping dance associated with Maasai warriors.", query: "Maasai adumu jumping dance Kenya" }
  ],
  "stone-town": [
    { name: "Zanzibar carved doors", fact: "Stone Town's carved wooden doors reflect Swahili, Arab and Indian Ocean design influences.", query: "Zanzibar carved doors Stone Town" },
    { name: "Taarab music", fact: "Taarab combines East African, Arab, Indian and other musical influences and is strongly associated with Zanzibar.", query: "Zanzibar taarab music musicians" },
    { name: "Swahili coastal culture", fact: "Stone Town reflects centuries of Swahili urban life shaped by Indian Ocean exchange.", query: "Stone Town Zanzibar Swahili culture" }
  ],
  "cape-town": [
    { name: "Cape Malay heritage", fact: "Cape Malay culture shaped local food, language, music and Muslim community life in Cape Town.", query: "Cape Malay culture Bo-Kaap South Africa" },
    { name: "isiXhosa culture", fact: "isiXhosa language and Xhosa traditions are an important part of the Western Cape's cultural landscape.", query: "Xhosa culture South Africa traditional dress" },
    { name: "Cape Town minstrels", fact: "The Kaapse Klopse carnival tradition features colourful uniforms, music and street processions.", query: "Kaapse Klopse Cape Town minstrel carnival" }
  ],
  "victoria-falls": [
    { name: "Mosi-oa-Tunya heritage", fact: "The name Mosi-oa-Tunya means 'The Smoke That Thunders' and reflects local naming of the falls.", query: "Mosi oa Tunya Victoria Falls local culture" },
    { name: "Zambezi river life", fact: "Communities along the Zambezi have long depended on the river for transport, fishing and livelihoods.", query: "Zambezi river community culture Zambia Zimbabwe" },
    { name: "Regional craft markets", fact: "Markets near the falls sell woodcarving, textiles, basketry and other regional crafts.", query: "Victoria Falls craft market Zimbabwe" }
  ],
  socotra: [
    { name: "Soqotri language", fact: "Soqotri is a Modern South Arabian language spoken by people of Socotra.", query: "Socotra Soqotri people Yemen culture" },
    { name: "Pastoral traditions", fact: "Many island communities historically combined livestock keeping with fishing and trade.", query: "Socotra island pastoral people Yemen" },
    { name: "Frankincense heritage", fact: "Socotra has long been associated with aromatic resins including frankincense and dragon's blood.", query: "Socotra frankincense resin tradition" }
  ],
  sossusvlei: [
    { name: "Namib desert knowledge", fact: "People living in Namibia's arid regions developed deep knowledge of scarce water and desert environments.", query: "Namibia desert community traditional culture" },
    { name: "Himba visual culture", fact: "Himba communities of northern Namibia are known for distinctive dress, jewellery and ochre-based body adornment.", query: "Himba people Namibia traditional dress" },
    { name: "Namibian craft traditions", fact: "Basketry, textiles, leatherwork and jewellery are among craft traditions found across Namibia.", query: "Namibia traditional crafts basketry" }
  ],
  kyoto: [
    { name: "Tea ceremony", fact: "Kyoto is closely connected to chanoyu, the Japanese tea ceremony and its highly refined etiquette.", query: "Kyoto Japanese tea ceremony chanoyu" },
    { name: "Kimono craftsmanship", fact: "Kyoto has long been a major centre for kimono textiles and dyeing traditions.", query: "Kyoto kimono artisan textile" },
    { name: "Gion Matsuri", fact: "Gion Matsuri is one of Japan's most famous annual festivals and has been held for centuries.", query: "Gion Matsuri Kyoto festival float" }
  ],
  seoul: [
    { name: "Hanbok", fact: "Hanbok is traditional Korean dress, now commonly worn for ceremonies, celebrations and cultural visits.", query: "Korean hanbok Seoul traditional dress" },
    { name: "Kimjang", fact: "Kimjang is the communal practice of making and sharing kimchi for winter.", query: "Korea kimjang kimchi tradition" },
    { name: "K-pop performance culture", fact: "Seoul is a global centre for contemporary Korean pop music, dance and entertainment production.", query: "Seoul K-pop dance performance" }
  ],
  bangkok: [
    { name: "Thai Buddhist temple culture", fact: "Temples are important religious and community spaces throughout Bangkok.", query: "Bangkok Buddhist temple worship Thailand" },
    { name: "Floating and street markets", fact: "Markets are central to Bangkok's food culture and everyday commerce.", query: "Bangkok street market Thailand food" },
    { name: "Muay Thai", fact: "Muay Thai is Thailand's traditional combat sport and an important part of national sporting culture.", query: "Muay Thai Bangkok Thailand" }
  ],
  singapore: [
    { name: "Hawker centre culture", fact: "Hawker centres bring together affordable dishes from Singapore's many culinary traditions.", query: "Singapore hawker centre food culture" },
    { name: "Peranakan heritage", fact: "Peranakan culture blends Chinese and local Southeast Asian influences in food, dress and architecture.", query: "Peranakan culture Singapore traditional dress" },
    { name: "Multilingual everyday life", fact: "English, Malay, Mandarin and Tamil all have official roles in Singapore.", query: "Singapore multilingual signs Malay Mandarin Tamil English" }
  ],
  bali: [
    { name: "Daily Hindu offerings", fact: "Small offerings called canang sari are a visible part of daily Balinese Hindu practice.", query: "Bali canang sari offerings" },
    { name: "Gamelan music", fact: "Balinese gamelan ensembles use interlocking rhythms and metallophone-based instruments.", query: "Balinese gamelan musicians" },
    { name: "Traditional dance", fact: "Balinese dance combines precise movement, costume and storytelling in temple and stage settings.", query: "Balinese traditional dance costume" }
  ],
  sydney: [
    { name: "Aboriginal cultural heritage", fact: "The Sydney region is on Aboriginal Country with living cultures extending back tens of thousands of years.", query: "Sydney Aboriginal culture Gadigal art" },
    { name: "Beach culture", fact: "Swimming, surfing and coastal recreation are central to Sydney's outdoor identity.", query: "Sydney beach surfing culture Australia" },
    { name: "Multicultural food culture", fact: "Migration has shaped Sydney into one of Australia's most diverse dining cities.", query: "Sydney multicultural food market Australia" }
  ],
  auckland: [
    { name: "Māori haka and performance", fact: "Māori performing arts include haka, waiata and poi, each with cultural meaning beyond tourism.", query: "Maori kapa haka Auckland New Zealand" },
    { name: "Pacific Island cultures", fact: "Auckland is home to large Pacific communities whose music, churches, food and festivals shape city life.", query: "Auckland Pacific Island festival culture" },
    { name: "Māori carving", fact: "Whakairo carving appears in meeting houses and taonga, carrying genealogy and cultural narratives.", query: "Maori whakairo carving New Zealand" }
  ],
  banff: [
    { name: "Mountain conservation culture", fact: "Banff's identity is tied to national-park conservation, outdoor recreation and wildlife stewardship.", query: "Banff National Park conservation hiking Canada" },
    { name: "Indigenous heritage", fact: "The Canadian Rockies are part of the traditional territories of several Indigenous peoples.", query: "Canadian Rockies Indigenous culture Alberta" },
    { name: "Alpine outdoor culture", fact: "Hiking, skiing, climbing and trail culture strongly shape everyday Banff life.", query: "Banff skiing hiking outdoor culture" }
  ],
  lofoten: [
    { name: "Stockfish tradition", fact: "Air-dried cod, or stockfish, has been central to Lofoten's economy and food culture for centuries.", query: "Lofoten stockfish racks Norway" },
    { name: "Fishing village life", fact: "Historic fishing villages developed around seasonal cod fisheries and sheltered harbours.", query: "Lofoten fishing village Norway rorbuer" },
    { name: "Coastal craft culture", fact: "Boatbuilding, fishing gear and maritime knowledge remain part of the islands' heritage.", query: "Lofoten traditional fishing boat Norway" }
  ],
  "mexico-city": [
    { name: "Muralism", fact: "Mexican muralists used large public artworks to tell political, social and historical stories.", query: "Mexico City muralism Diego Rivera murals" },
    { name: "Mercado culture", fact: "Markets remain important spaces for food, flowers, crafts and everyday neighbourhood trade.", query: "Mexico City mercado market culture" },
    { name: "Día de Muertos traditions", fact: "Day of the Dead traditions honour deceased relatives through altars, flowers, food and remembrance.", query: "Mexico City Dia de Muertos altar culture" }
  ],
  "new-orleans": [
    { name: "Second line parades", fact: "Second lines are community parades built around brass bands, dancing and social-aid-club traditions.", query: "New Orleans second line parade brass band" },
    { name: "Jazz heritage", fact: "New Orleans is widely recognized as one of the birthplaces of jazz.", query: "New Orleans jazz musicians street" },
    { name: "Mardi Gras traditions", fact: "Mardi Gras includes parades, krewes, costumes, music and neighbourhood celebrations.", query: "New Orleans Mardi Gras parade culture" }
  ],
  "buenos-aires": [
    { name: "Tango", fact: "Tango developed around the Río de la Plata and became central to Buenos Aires cultural identity.", query: "Buenos Aires tango dancers Argentina" },
    { name: "Mate culture", fact: "Mate is commonly shared socially using a gourd and metal straw called a bombilla.", query: "Argentina mate drinking culture Buenos Aires" },
    { name: "Porteño café culture", fact: "Historic cafés remain important spaces for conversation, reading and city life.", query: "Buenos Aires historic cafe Argentina" }
  ],
  cusco: [
    { name: "Quechua heritage", fact: "Quechua language and traditions remain highly visible in Cusco and the surrounding Andes.", query: "Cusco Quechua culture traditional clothing Peru" },
    { name: "Andean weaving", fact: "Textile weaving uses distinctive patterns, colours and techniques passed through generations.", query: "Cusco Andean weaving textiles Peru" },
    { name: "Inti Raymi", fact: "Inti Raymi is a modern celebration inspired by Inca traditions honouring the sun.", query: "Cusco Inti Raymi festival Peru" }
  ],
  "machu-picchu": [
    { name: "Inca stonework", fact: "Inca builders fitted stones precisely without mortar in many important structures.", query: "Machu Picchu Inca stonework Peru" },
    { name: "Quechua cultural landscape", fact: "The wider region remains connected to Quechua language, agriculture and Andean traditions.", query: "Quechua culture Sacred Valley Peru" },
    { name: "Terrace agriculture", fact: "Terraces helped manage steep terrain, drainage and cultivation in the Andes.", query: "Machu Picchu agricultural terraces Peru" }
  ],
  lencois: [
    { name: "Seasonal lagoon life", fact: "Local movement and livelihoods adapt to the dramatic yearly change between dry dunes and rain-fed lagoons.", query: "Lencois Maranhenses local community Brazil dunes lagoon" },
    { name: "Northeastern Brazilian traditions", fact: "Maranhão blends Indigenous, African and Portuguese influences in music, food and festivals.", query: "Maranhao Brazil traditional culture festival" },
    { name: "Artisanal fishing", fact: "Fishing remains an important livelihood in communities around the park and nearby coast.", query: "Maranhao artisanal fishing Brazil" }
  ],
  rio: [
    { name: "Samba", fact: "Samba is central to Rio's musical identity and Carnival traditions.", query: "Rio samba dancers Brazil carnival" },
    { name: "Carnival schools", fact: "Samba schools are year-round community organizations that prepare music, costumes and parade performances.", query: "Rio samba school carnival Brazil" },
    { name: "Beach culture", fact: "Rio's beaches function as major public social spaces for sport, music and everyday life.", query: "Rio de Janeiro beach culture Brazil" }
  ],
  dubrovnik: [
    { name: "Maritime heritage", fact: "Dubrovnik grew wealthy as the centre of the seafaring Republic of Ragusa.", query: "Dubrovnik maritime heritage Croatia" },
    { name: "Klapa singing", fact: "Klapa is a traditional Croatian multipart vocal style strongly associated with Dalmatia.", query: "Croatian klapa singers Dalmatia" },
    { name: "Saint Blaise festival", fact: "Dubrovnik's annual celebration of Saint Blaise is one of the city's most important traditions.", query: "Dubrovnik Saint Blaise festival Croatia" }
  ],
  "singapore-gardens": [
    { name: "City in Nature", fact: "Singapore integrates parks, planted streets and major gardens into dense urban planning.", query: "Singapore City in Nature urban greenery" },
    { name: "Horticultural design", fact: "Gardens by the Bay combines engineering, architecture and large-scale plant collections.", query: "Gardens by the Bay horticulture Singapore" },
    { name: "Supertree light shows", fact: "The Supertrees host evening light-and-sound displays in the gardens.", query: "Gardens by the Bay Supertree light show" }
  ],
  "marrakech-medina": [
    { name: "Souk craftsmanship", fact: "The medina's workshops produce leather goods, metalwork, textiles, woodwork and ceramics.", query: "Marrakech Medina artisan crafts Morocco" },
    { name: "Jemaa el-Fnaa storytelling", fact: "The square has long hosted performers, musicians, food sellers and oral storytelling traditions.", query: "Jemaa el Fnaa storytellers Marrakech" },
    { name: "Riad architecture", fact: "Traditional riads are inward-facing homes organized around private courtyards.", query: "Marrakech riad courtyard Morocco" }
  ]
};

export async function fetchWikiImages(query, limit = 4) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: String(Math.max(limit, 4)),
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "900",
    format: "json",
    origin: "*"
  });

  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Image search failed");
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {});
  return pages
    .map((page) => ({ title: page.title, url: page.thumbnail?.source || "" }))
    .filter((item) => item.url)
    .slice(0, limit);
}

async function fetchCommonsImage(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "900",
    format: "json",
    origin: "*"
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Commons search failed");
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {});
  const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 3);
  const ranked = pages
    .map((page) => ({
      title: page.title || "",
      url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url || "",
      score: tokens.filter((token) => (page.title || "").toLowerCase().includes(token)).length
    }))
    .filter((item) => item.url)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score > 0 ? ranked[0] : null;
}

async function fetchWikipediaSummary(query) {
  const searchParams = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: "5",
    format: "json",
    origin: "*"
  });
  const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?${searchParams.toString()}`);
  if (!searchResponse.ok) return null;
  const searchJson = await searchResponse.json();
  const results = searchJson?.query?.search || [];
  const mainTokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 3);
  const best = results
    .map((item) => ({
      ...item,
      score: mainTokens.filter((token) => item.title.toLowerCase().includes(token)).length
    }))
    .sort((a,b) => b.score - a.score)[0];
  if (!best || best.score === 0) return null;

  const summaryResponse = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(best.title)}`
  );
  if (!summaryResponse.ok) return null;
  const summary = await summaryResponse.json();
  return {
    title: best.title,
    fact: summary.extract?.split(/(?<=[.!?])\s/)[0] || "",
    image: summary.thumbnail?.source || summary.originalimage?.source || ""
  };
}

export function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function topFoodHighlights(destination) {
  return String(destination.food || "")
    .replace(/\.$/, "")
    .split(/,|\band\b/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 2)
    .slice(0, 3);
}

export function topCultureHighlights(destination) {
  return cultureHighlightsByDestination[destination.id] || (destination.knownFor || []).slice(0,3).map((name) => ({
    name,
    fact: destination.unique || destination.culture || "",
    query: `${name} ${destination.country}`
  }));
}

export async function fetchVerifiedFeatureCard(nameOrFeature, destination, type = "feature") {
  const feature = typeof nameOrFeature === "string"
    ? { name: nameOrFeature, fact: "", query: `${nameOrFeature} ${destination.country}` }
    : nameOrFeature;

  const exactQuery = feature.query || `${feature.name} ${destination.country}`;
  const summary = await fetchWikipediaSummary(exactQuery).catch(() => null);
  const commons = await fetchCommonsImage(exactQuery).catch(() => null);

  const image = commons?.url || summary?.image || "";
  const fact = feature.fact || summary?.fact || (
    type === "food"
      ? `${feature.name} is one of the well-known foods associated with ${destination.country}.`
      : destination.culture
  );

  return {
    name: feature.name,
    fact,
    image,
    sourceTitle: commons?.title || summary?.title || ""
  };
}
