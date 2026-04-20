# 📌 Rättningsrapport – fed25s-the-webshop-kaffekodarna

## 🎯 Uppgiftens Krav:
# The Webshop - En inlämningsuppgift

Denna uppgift går ut på att ni skall bygga en webbshop baserat på kraven här under.
Projektet är ett vite-projekt med vanilla/typescript.
Målet är att studenterna skall förstå vad som krävs för att skicka information mellan sidor, använda localStorage och kunna manipulera data i listor och objekt.

## VIKTIGT

Varukorgen skall vara en lista med objekt som baseras på en ny klass eller datatyp. Denna klass/datatyp skall innehålla en produkt men också hur många av denna produkt som varukorgen har. Ibland kan det behövas mer information i detta objekt, men minst skall klassen innhålla produkt och antal på något sätt.

## Teknik

- HTML
- SCSS
- TypeScript

## Krav - Betyg G

- En landningssida (startsida)
- En produktsida (Produktdetaljer)
- En kassasida
- En varukorg
- Kunna lägga produkter i varukorgen
- Simulera att ett köp genomförs på kassasidan
- Beräkna fram ett totalpris på produkterna i varukorgen
- Att informationen i varukorgen lagras genom utökade objekt, inte bara en produkt
- Att kunna öka/minska antalet produkter i varukorgen.
- Att kunna öka/minska antalet produkter på kassasidan
- Koden skall vara mycket väl strukturerad, väl formaterad samt innehålla god namngivning

Majoriteten av dessa G-krav skall vara uppfyllda för att få betyg G.

## Styling

Försök att arbeta med så mycket styling ni hinner. Det är en rolig uppgift att ha med i ett portfolio framöver. Se till att era animationer är subtila. Arbeta med hero-images, kanske med lite video/ljud. Och skapa en bra struktur mer er scss redan från början.

## Krav för styling

Det är inget krav att video och ljud används.
Partials bör användas.
Mixins skall användas om möjligt, t.ex. för mediaqueries.
Ingen dubbelstyling, används mixins i sådana fall.

## 🔍 ESLint-varningar:
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/cart/cart.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/components/HamburgerMenu.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/components/ProductCard.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/components/ShippingForm.ts - no-unused-vars - 'hasErrors' is assigned a value but never used.,@typescript-eslint/no-unused-vars - 'hasErrors' is assigned a value but never used.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/layouts/Footer.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/layouts/Header.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-webshop-kaffekodarna/src/ts/pages/productDetails.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.

## 🏆 **Betyg: G**
📌 **Motivering:** Betyg: G. Projektet uppfyller majoriteten av G-kraven enligt den granskade koden: det finns separata sidor för landning, produktlistning/produktsida, produktdetalj, checkout och orderbekräftelse. Varukorgen är implementerad som en utökad datatyp (CartItem = Product & { quantity: number }) och lagras i localStorage. Det går att lägga till produkter i varukorgen, visa och uppdatera varukorgen (inkl. mini-cart), öka/minska antal både i varukorg och på kassasidan via gemensam logik, samt beräkna och rendera total/subtotal på checkout. Köpflödet simuleras genom validering och därefter tömning av varukorg samt redirect till orderbekräftelse. SCSS är uppdelad i partials och använder variables/mixins, med en samlande style.scss.

Det finns samtidigt kodkvalitetsbrister som drar ned helhetsintrycket av “mycket väl strukturerad” (t.ex. initHamburgerMenu som kan kasta Error och krascha vid saknade element, duplicerat anrop till renderCheckoutPage i main.ts, kvarvarande console.log, samt en faktisk selektor-bugg i _checkout.scss där fel klassnamn gör att desktop-regel inte appliceras). Trots detta är kärnkraven för funktionalitet uppfyllda och helheten når därför betyget G (högsta tillåtna betyg i denna skala).

💡 **Förbättringsförslag:**  
Struktur och init-flöde:
- Ta bort duplicerat anrop till renderCheckoutPage() i main.ts för att undvika dubbelrendering och svårdebuggade sidoeffekter.
- Separera sidinit från header-init: låt initHeader endast hantera header och initiera respektive sida i en tydlig “page entry”/router-liknande kontroll i main.ts.

Robusthet och felhantering:
- Ändra initHamburgerMenu() från att throw:a vid saknade element till att faila mjukt (return + console.warn), särskilt om header kan misslyckas att laddas.
- Lägg till try/catch och kontroll av response.ok i loadProducts() så UI kan visa ett felmeddelande istället för att krascha.

Typning och kodkvalitet:
- Byt updateSummary(cart: any[]) till updateSummary(cart: CartItem[]) för att undvika “any” och få bättre TypeScript-stöd.
- Rensa bort/guard:a console.log i t.ex. cart.ts, ProductCard.ts och HamburgerMenu.ts inför inlämning.

Checkout-validering (undvik race/ordningsproblem):
- Samla checkout-validering i en orchestrator (t.ex. initCheckout) istället för att flera moduler lyssnar på samma knapp och gör preventDefault.
- Låt ShippingForm exponera validate(): boolean (eller returnera isValid) som confirmOrder-funktionen anropar explicit, istället för att indirekt förlita sig på CSS-klassen .input--error.

SCSS/CSS-buggar och styling-hygien:
- Fixa _checkout.scss: i .shipping-form__row används .form__group i media query men borde vara .shipping-form__group, annars träffar inte regeln.
- Begränsa globala selektorer (t.ex. input { ... } i _header.scss) till header/search för att undvika oavsiktlig påverkan på checkout-formulär.

Tillgänglighet och UI:
- Byt klickbara <img>-element till <button> med aria-label (t.ex. cart-trigger/favorit) för bättre keyboard- och skärmläsarstöd.
- Toggla mini-cart med en CSS-klass (t.ex. .is-open) istället för inline style för renare separation mellan logik och presentation.

Avslutningsvis: ni har byggt en fungerande webshop med tydlig varukorgsmodell, localStorage och ett komplett köpflöde. Med några justeringar i init-struktur, valideringsflöde och små bugfixar kommer koden kännas ännu mer stabil och professionell — riktigt bra jobbat, fortsätt så!

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| amwa00 | 83 | 41.1% | 0.25 | 0.31 |
| Jessica Näsman | 60 | 29.7% | 0.25 | 0.27 |
| Linda | 33 | 16.3% | 0.25 | 0.22 |
| Farzad Sanaie | 26 | 12.9% | 0.25 | 0.2 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
