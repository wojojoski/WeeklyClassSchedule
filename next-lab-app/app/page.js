import React from "react";
import "../app/styles/home.css";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Witaj na mojej stronie!</h1>
        <p>Jestem Michał Wojciechowski, student informatyki stosowanej.</p>
      </header>

      <section id="about-me">
        <h2>O mnie</h2>
        <p>
          Nazywam się Michał Wojciechowski, jestem studentem informatyki
          stosowanej na WSEI a mój numer indeksu to 14391.
        </p>
      </section>

      <section id="about-app">
        <h2>O aplikacji</h2>
        <p>
          Aplikacja, którą stworzyłem, jest rozwiązaniem dedykowanym osobom,
          które chcą zarządzać swoim harmonogramem zajęć. Umożliwia tworzenie i
          edytowanie kursów, a także śledzenie planu zajęć w formie kalendarza.
          Dzięki intuicyjnemu interfejsowi użytkownicy mogą w prosty sposób
          dodawać nowe zajęcia, edytować istniejące oraz usuwać je w razie
          potrzeby.
        </p>
        <p>
          Aplikacja została zaprojektowana z myślą o studentach, nauczycielach
          oraz wszystkich, którzy muszą zarządzać swoim czasem w sposób
          efektywny. Dzięki połączeniu z systemem Firebase, dane użytkowników są
          bezpiecznie przechowywane, a interakcje z aplikacją są szybkie i
          niezawodne.
        </p>
      </section>
    </div>
  );
}
