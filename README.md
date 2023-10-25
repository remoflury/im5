# Projekt IM5

## Projekt Setup

Installiere alle Dependencies.

```bash
npm install
```

Erstelle eine .env Datei im project root und kopiere die environment variables rein. Kannst du gerne bei mir anfragen (;

Entwickle mit

```bash
npm run dev
```

## Ziel

Die Bachelorarbeit befasst sich mit dem Thema Kundenbindung in Agenturen. Deshalb habe ich ein rudimentäres Tool erstellt, auf dem sich auserwählte Kunden einloggen können und ihre aktuellen Projekte einsehen.
Kunden können sich nicht selber registrieren, da nicht jeder Kunde Zugriff zur Plattform haben soll.
Das heisst, dass aber jede Person der Agentur neue Kunden dem Portal freischalten muss, sodass sich diese Kunden nur noch einloggen können.
Somit gibt es zwei Rollen: User und Admins.

1. Admins
   Die Berechtigungen und Funktionen für Admins sind umfänglicher:
1. Sie müssen Firmen hinzufügen können.
1. Sie müssen Personen hinzufügen können. So wird auch gleich ein Login auf ihre Emailadresse erstellt. Die Personen werden auch einer Firma zugeteilt, da es möglich ist mehrere Kundenlogins pro Kunde zu haben.
1. Sie müssen Projekte erfassen können und einer Person zuweisen.

1. User
   Haben aktuell nur Einsicht in die ihnen zugewiesenen Projekte.

## Techstack

Das Tool benutzt folgende Technologien:

1. Svelte bzw. SvelteKit als JS-Framework (mit SSR)
2. Tailwind CSS
3. Supabase mit SvelteKit Auth Helpers
4. Zod für Formvalidierungen

## Challenges

Die Entwicklung des Frontends war relativ einfach. Challenge war für mich die Implementierung der Rollen, da diese verschiedene Berechtigungen haben. So konnte ich mit Enum Types eine gute Lösung finden, um diese Rollen in einer Column auf Supabase abzufangen. Was mir jedoch bis heute Probleme bereited sind die RLS (Row Level Security). Ein User sollte nicht in der Lage sein, ein Projekt in der Datenbank zu erfassen. Dies sollte Usern mit der Rolle Admin vorbehalten sein. Dies konnte ich mit RLS nicht implementieren.
Auch die Nutzung von Zod war eine Challenge, da ich dies vorher noch nie benutzt hatte. Jedoch kommt man schnell rein, da es relativ logisch aufgebaut ist. Manchmal half hier auch ChatGPT (;

## Quellen

1. Dokumentationen (SvelteKit, Supabase, Zod)
2. Stackoverflow
3. ChatGPT
